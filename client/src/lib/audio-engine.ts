import { NOTES } from "./music-theory";

const A4 = 440;

function noteToFrequency(noteIndex: number, octave = 4): number {
  const semitonesFromA4 = noteIndex - 9 + (octave - 4) * 12;
  return A4 * Math.pow(2, semitonesFromA4 / 12);
}

function fretToFrequency(openNoteIndex: number, fret: number): number {
  const noteIndex = (openNoteIndex + fret) % 12;
  const octave = 4 + Math.floor((openNoteIndex + fret) / 12);
  return noteToFrequency(noteIndex, octave);
}

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

export function playNote(
  openNoteIndex: number,
  fret: number,
  tuning: number[],
  stringIdx: number,
  duration = 0.35
): void {
  const ctx = getContext();
  const open = tuning[stringIdx] ?? openNoteIndex;
  const freq = fretToFrequency(open, fret);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.05);
}

export function playNoteByName(noteName: string, duration = 0.35): void {
  const idx = NOTES.indexOf(noteName);
  if (idx === -1) return;
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = noteToFrequency(idx, 4);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.05);
}

export function playClick(accent = false): void {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = accent ? 1200 : 800;
  gain.gain.setValueAtTime(accent ? 0.15 : 0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
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
    playNoteByName(NOTES[noteIdx], 0.25);
    beat++;
    timeoutId = setTimeout(tick, beatMs);
  };

  tick();

  return () => {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
}
