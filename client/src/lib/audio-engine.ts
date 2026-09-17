import { NOTES } from "./music-theory";

const A4 = 440;

/** MIDI for open strings high E → low E in standard tuning */
const STANDARD_OPEN_MIDI = [64, 59, 55, 50, 45, 40]; // E4 B3 G3 D3 A2 E2
const STANDARD_OPEN_CHROMA = [4, 11, 7, 2, 9, 4];

let audioCtx: AudioContext | null = null;
let sharedMaster: GainNode | null = null;
let roomDelay: DelayNode | null = null;
let roomFeedback: GainNode | null = null;
let roomFilter: BiquadFilterNode | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/** Shared master + soft body resonance + short acoustic room */
function getMaster(): GainNode {
  const ctx = getContext();
  if (sharedMaster) return sharedMaster;

  sharedMaster = ctx.createGain();
  sharedMaster.gain.value = 0.92;

  // Guitar body: air cavity + top-plate character
  const air = ctx.createBiquadFilter();
  air.type = "peaking";
  air.frequency.value = 105;
  air.Q.value = 1.8;
  air.gain.value = 5.5;

  const top = ctx.createBiquadFilter();
  top.type = "peaking";
  top.frequency.value = 210;
  top.Q.value = 1.4;
  top.gain.value = 4.2;

  const wood = ctx.createBiquadFilter();
  wood.type = "peaking";
  wood.frequency.value = 420;
  wood.Q.value = 1.1;
  wood.gain.value = 2.8;

  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowshelf";
  warmth.frequency.value = 180;
  warmth.gain.value = 3.5;

  const airiness = ctx.createBiquadFilter();
  airiness.type = "highshelf";
  airiness.frequency.value = 3500;
  airiness.gain.value = -2.5;

  sharedMaster.connect(air);
  air.connect(top);
  top.connect(wood);
  wood.connect(warmth);
  warmth.connect(airiness);
  airiness.connect(ctx.destination);

  // Short woody room (feedback delay), very subtle
  roomDelay = ctx.createDelay(0.08);
  roomDelay.delayTime.value = 0.028;
  roomFeedback = ctx.createGain();
  roomFeedback.gain.value = 0.18;
  roomFilter = ctx.createBiquadFilter();
  roomFilter.type = "lowpass";
  roomFilter.frequency.value = 2800;
  roomFilter.Q.value = 0.5;

  const roomSend = ctx.createGain();
  roomSend.gain.value = 0.22;
  airiness.connect(roomSend);
  roomSend.connect(roomDelay);
  roomDelay.connect(roomFilter);
  roomFilter.connect(roomFeedback);
  roomFeedback.connect(roomDelay);
  roomFilter.connect(ctx.destination);

  return sharedMaster;
}

function midiToFreq(midi: number): number {
  return A4 * Math.pow(2, (midi - 69) / 12);
}

function chromaOffset(from: number, to: number): number {
  let d = to - from;
  if (d > 6) d -= 12;
  if (d < -6) d += 12;
  return d;
}

/** Frequency for a string+fret in the current tuning */
function stringFretToFreq(stringIdx: number, fret: number, tuning: number[]): number {
  const openChroma = tuning[stringIdx] ?? STANDARD_OPEN_CHROMA[stringIdx] ?? 4;
  const baseMidi = STANDARD_OPEN_MIDI[stringIdx] ?? 64;
  const tuneOffset = chromaOffset(STANDARD_OPEN_CHROMA[stringIdx] ?? openChroma, openChroma);
  return midiToFreq(baseMidi + tuneOffset + fret);
}

function noteNameToFreq(noteName: string, octave = 3): number {
  const idx = NOTES.indexOf(noteName);
  if (idx === -1) return A4;
  // MIDI: C4 = 60
  return midiToFreq((octave + 1) * 12 + idx);
}

/**
 * Soft tanh-ish clip for acoustic warmth (avoids harsh digital peaks).
 */
function makeSoftClip(ctx: AudioContext, amount = 1.4): WaveShaperNode {
  const shaper = ctx.createWaveShaper();
  const n = 2048;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  shaper.curve = curve;
  shaper.oversample = "2x";
  return shaper;
}

/**
 * Acoustic guitar pluck: physical-style string + body + soft room.
 * Excitation is a displaced string (not white noise), which removes the
 * "computer beep / synth pluck" character of basic Karplus–Strong.
 */
function pluck(
  freq: number,
  duration = 3.4,
  stringIdx = 2,
  velocity = 0.95
): void {
  const ctx = getContext();
  const master = getMaster();
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const length = Math.ceil(sr * duration);
  const data = new Float32Array(length);

  // Thicker/lower strings: darker filter, longer ring
  const stringDark = 0.38 + stringIdx * 0.07; // higher = darker avg blend
  const decay = 0.9982 + stringIdx * 0.00028; // closer to 1 = more sustain
  // Pluck position ~1/5 along the string (typical fingerstyle)
  const pluckPos = Math.max(2, Math.round(period * 0.18));

  // Initial string displacement: triangular "ramp" (physical pluck),
  // plus a tiny bit of noise for nail/pick texture — not a noise burst.
  for (let i = 0; i < period; i++) {
    const tri =
      i < pluckPos
        ? i / pluckPos
        : 1 - (i - pluckPos) / Math.max(1, period - pluckPos);
    const texture = (Math.random() * 2 - 1) * 0.06;
    data[i] = (tri * 0.94 + texture) * (0.55 + velocity * 0.45);
  }

  // Karplus–Strong with averaging + very light stretch (string stiffness)
  let prev = data[0];
  for (let i = period; i < length; i++) {
    const a = data[i - period];
    const b = data[i - period - 1] ?? a;
    // One-pole lowpass in the loop (darkens over time like a real string)
    const avg = a * (1 - stringDark) + b * stringDark;
    // Mild dispersion / stretch for inharmonic warmth
    const stretched = avg * 0.97 + prev * 0.03;
    prev = stretched;
    data[i] = stretched * decay;
  }

  // Normalize peak so velocity maps consistently
  let peakSample = 0;
  for (let i = 0; i < length; i++) {
    const abs = Math.abs(data[i]);
    if (abs > peakSample) peakSample = abs;
  }
  const norm = peakSample > 0 ? 0.9 / peakSample : 1;
  for (let i = 0; i < length; i++) data[i] *= norm;

  const buffer = ctx.createBuffer(1, length, sr);
  buffer.copyToChannel(data, 0);

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Per-note string tone (brighter on high strings)
  const stringTone = ctx.createBiquadFilter();
  stringTone.type = "lowpass";
  stringTone.frequency.value = 1600 + (5 - stringIdx) * 900;
  stringTone.Q.value = 0.55;

  // Gentle mid presence of an acoustic top
  const presence = ctx.createBiquadFilter();
  presence.type = "peaking";
  presence.frequency.value = 1200 + (5 - stringIdx) * 150;
  presence.Q.value = 0.85;
  presence.gain.value = 2.4;

  const clip = makeSoftClip(ctx, 1.25);

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  const peak = 0.42 * velocity;
  // Natural acoustic envelope: quick attack, slow woody decay
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(peak * 0.72, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(peak * 0.38, now + duration * 0.45);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  // Quiet sympathetic body bloom (sine at fundamental, very soft)
  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.value = freq;
  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(peak * 0.12, now + 0.02);
  bodyGain.gain.exponentialRampToValueAtTime(peak * 0.04, now + duration * 0.5);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(stringTone);
  stringTone.connect(presence);
  presence.connect(clip);
  clip.connect(gain);
  gain.connect(master);

  body.connect(bodyGain);
  bodyGain.connect(master);

  source.start(now);
  source.stop(now + duration + 0.05);
  body.start(now);
  body.stop(now + duration + 0.05);
}

export function playNote(
  openNoteIndex: number,
  fret: number,
  tuning: number[],
  stringIdx: number,
  duration = 3.2
): void {
  const open = tuning[stringIdx] ?? openNoteIndex;
  const freq = stringFretToFreq(stringIdx, fret, tuning.length ? tuning : [open]);
  const sustain = duration + stringIdx * 0.35;
  pluck(freq, sustain, stringIdx);
}

export function playNoteByName(noteName: string, duration = 2.6): void {
  const freq = noteNameToFreq(noteName, 3);
  pluck(freq, duration, 2, 0.9);
}

export function playClick(accent = false): void {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = accent ? 1200 : 800;
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(accent ? 0.1 : 0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

export function playSequence(
  positions: { string: number; fret: number }[],
  tuning: number[],
  intervalMs = 400,
  onStep?: (index: number) => void
): () => void {
  let i = 0;
  let cancelled = false;
  const tick = () => {
    if (cancelled || i >= positions.length) {
      onStep?.(-1);
      return;
    }
    const p = positions[i];
    playNote(tuning[p.string], p.fret, tuning, p.string);
    onStep?.(i);
    i++;
    setTimeout(tick, intervalMs);
  };
  tick();
  return () => {
    cancelled = true;
    onStep?.(-1);
  };
}

const CHORD_INTERVALS: Record<string, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dom7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
};

export function startBackingLoop(
  root: string,
  chordType: string,
  bpm: number
): () => void {
  const rootIdx = NOTES.indexOf(root);
  if (rootIdx === -1) return () => {};

  const intervals = CHORD_INTERVALS[chordType] ?? CHORD_INTERVALS.maj;
  const beatMs = (60 / bpm) * 1000;
  let beat = 0;
  let cancelled = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const tick = () => {
    if (cancelled) return;
    const interval = intervals[beat % intervals.length];
    const noteIdx = (rootIdx + interval) % 12;
    playNoteByName(NOTES[noteIdx], 1.4);
    beat++;
    timeoutId = setTimeout(tick, beatMs);
  };

  tick();

  return () => {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
}
