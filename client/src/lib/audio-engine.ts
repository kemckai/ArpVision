import { NOTES } from "./music-theory";

const A4 = 440;

/** MIDI for open strings high E → low E in standard tuning */
const STANDARD_OPEN_MIDI = [64, 59, 55, 50, 45, 40]; // E4 B3 G3 D3 A2 E2
const STANDARD_OPEN_CHROMA = [4, 11, 7, 2, 9, 4];

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
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
 * Karplus–Strong plucked-string voice with a brief pick transient.
 * Sounds much more like a guitar than a raw oscillator beep.
 */
function pluck(
  freq: number,
  duration = 2.8,
  stringIdx = 2,
  velocity = 0.95
): void {
  const ctx = getContext();
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const length = Math.ceil(sr * duration);
  const buffer = ctx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);

  // Brightness / decay vary by string (high E brighter, low E darker & longer)
  const brightness = 0.62 + (5 - stringIdx) * 0.05;
  // Decay very close to 1.0 = long sustain (thicker strings ring even longer)
  const decay = 0.9965 + stringIdx * 0.00055;
  const pickNoise = 0.42 + brightness * 0.2;

  // Initial excitation: filtered noise burst (the "pick")
  for (let i = 0; i < period; i++) {
    const noise = Math.random() * 2 - 1;
    const envelope = 1 - i / period;
    data[i] = noise * envelope * pickNoise;
  }

  // Karplus–Strong loop with mild low-pass in the feedback path
  for (let i = period; i < length; i++) {
    const a = data[i - period];
    const b = data[i - period - 1] ?? a;
    const avg = a * brightness + b * (1 - brightness);
    data[i] = avg * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Soft body / amp tone shaping
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2200 + (5 - stringIdx) * 600;
  filter.Q.value = 0.65;

  const presence = ctx.createBiquadFilter();
  presence.type = "peaking";
  presence.frequency.value = 1100;
  presence.Q.value = 0.7;
  presence.gain.value = 3.2;

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  const peak = 0.38 * velocity;
  // Strong attack, then long natural sustain instead of a quick fade
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(peak * 0.85, now + 0.12);
  gain.gain.exponentialRampToValueAtTime(peak * 0.45, now + duration * 0.55);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(presence);
  presence.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
  source.stop(now + duration + 0.08);
}

export function playNote(
  openNoteIndex: number,
  fret: number,
  tuning: number[],
  stringIdx: number,
  duration = 2.6
): void {
  const open = tuning[stringIdx] ?? openNoteIndex;
  const freq = stringFretToFreq(stringIdx, fret, tuning.length ? tuning : [open]);
  const sustain = duration + stringIdx * 0.2;
  pluck(freq, sustain, stringIdx);
}

export function playNoteByName(noteName: string, duration = 2.2): void {
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
    playNoteByName(NOTES[noteIdx], 1.1);
    beat++;
    timeoutId = setTimeout(tick, beatMs);
  };

  tick();

  return () => {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
}
