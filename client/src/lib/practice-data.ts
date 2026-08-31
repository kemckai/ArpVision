import type { Lick } from "./music-theory";

export type TechniquePattern = {
  id: string;
  name: string;
  category: "sweep" | "tapping";
  description: string;
  root: string;
  type: string;
  positions: { string: number; fret: number }[];
};

export const SWEEP_PATTERNS: TechniquePattern[] = [
  {
    id: "sweep-maj-triad",
    name: "Major Triad Sweep",
    category: "sweep",
    description: "3-string A major triad sweep. Foundation of rock and metal arpeggio technique.",
    root: "A",
    type: "maj",
    positions: [
      { string: 0, fret: 17 }, { string: 1, fret: 17 }, { string: 2, fret: 16 },
      { string: 2, fret: 14 }, { string: 1, fret: 14 }, { string: 0, fret: 14 },
    ],
  },
  {
    id: "sweep-min-triad",
    name: "Minor Triad Sweep",
    category: "sweep",
    description: "A minor 3-string sweep. Essential for metal and neo-classical soloing.",
    root: "A",
    type: "min",
    positions: [
      { string: 0, fret: 17 }, { string: 1, fret: 17 }, { string: 2, fret: 16 },
      { string: 2, fret: 14 }, { string: 1, fret: 13 }, { string: 0, fret: 13 },
    ],
  },
  {
    id: "sweep-maj7",
    name: "Major 7 Sweep",
    category: "sweep",
    description: "4-note A maj7 sweep across high strings.",
    root: "A",
    type: "maj7",
    positions: [
      { string: 0, fret: 17 }, { string: 1, fret: 17 }, { string: 2, fret: 16 },
      { string: 3, fret: 16 }, { string: 2, fret: 14 }, { string: 1, fret: 14 },
      { string: 0, fret: 14 },
    ],
  },
  {
    id: "sweep-dim7",
    name: "Diminished 7 Sweep",
    category: "sweep",
    description: "Symmetric diminished sweep — 3 frets per string, move in minor 3rds.",
    root: "A",
    type: "dim7",
    positions: [
      { string: 0, fret: 17 }, { string: 0, fret: 14 }, { string: 1, fret: 16 },
      { string: 2, fret: 17 }, { string: 2, fret: 14 }, { string: 3, fret: 16 },
    ],
  },
  {
    id: "sweep-dom7",
    name: "Dominant 7 Sweep",
    category: "sweep",
    description: "A7 sweep shape for blues and jazz fusion.",
    root: "A",
    type: "dom7",
    positions: [
      { string: 0, fret: 17 }, { string: 1, fret: 17 }, { string: 2, fret: 16 },
      { string: 3, fret: 17 }, { string: 2, fret: 14 }, { string: 1, fret: 14 },
      { string: 0, fret: 14 },
    ],
  },
];

export const TAPPING_PATTERNS: TechniquePattern[] = [
  {
    id: "tap-maj-triad",
    name: "Major Triad Tapping",
    category: "tapping",
    description: "Van Halen-style A major triad tap pattern on one string.",
    root: "A",
    type: "maj",
    positions: [
      { string: 0, fret: 5 }, { string: 0, fret: 9 }, { string: 0, fret: 12 },
      { string: 0, fret: 9 }, { string: 0, fret: 5 },
    ],
  },
  {
    id: "tap-min-triad",
    name: "Minor Triad Tapping",
    category: "tapping",
    description: "A minor tapped triad — root, b3, 5 hammer-tap sequence.",
    root: "A",
    type: "min",
    positions: [
      { string: 0, fret: 5 }, { string: 0, fret: 8 }, { string: 0, fret: 12 },
      { string: 0, fret: 8 }, { string: 0, fret: 5 },
    ],
  },
  {
    id: "tap-evh-style",
    name: "EVH 2-Hand Tap",
    category: "tapping",
    description: "Classic two-hand tapping figure across B and high E strings.",
    root: "A",
    type: "maj",
    positions: [
      { string: 0, fret: 12 }, { string: 0, fret: 17 }, { string: 1, fret: 12 },
      { string: 1, fret: 17 }, { string: 0, fret: 17 }, { string: 0, fret: 12 },
    ],
  },
  {
    id: "tap-8finger",
    name: "8-Finger Tapping",
    category: "tapping",
    description: "Extended tapping arpeggio across three strings.",
    root: "E",
    type: "min",
    positions: [
      { string: 0, fret: 12 }, { string: 0, fret: 15 }, { string: 1, fret: 12 },
      { string: 1, fret: 15 }, { string: 2, fret: 12 }, { string: 2, fret: 14 },
      { string: 1, fret: 12 }, { string: 0, fret: 12 },
    ],
  },
];

export type BackingTrack = {
  id: string;
  name: string;
  key: string;
  type: string;
  bpm: number;
  description: string;
};

export const BACKING_TRACKS: BackingTrack[] = [
  { id: "am-blues", name: "A Minor Blues", key: "A", type: "min", bpm: 80, description: "Slow blues in A minor" },
  { id: "em-rock", name: "E Minor Rock", key: "E", type: "min", bpm: 120, description: "Mid-tempo rock groove" },
  { id: "g-maj", name: "G Major", key: "G", type: "maj", bpm: 100, description: "Bright major key jam" },
  { id: "dm-neo", name: "D Minor Neo-Classical", key: "D", type: "min", bpm: 140, description: "Rhoads-style harmonic minor" },
  { id: "a-funk", name: "A7 Funk", key: "A", type: "dom7", bpm: 110, description: "Prince-style funk vamp" },
];

export function techniqueToLick(p: TechniquePattern): Lick {
  return {
    id: p.id,
    artist: p.category === "sweep" ? "Sweep" : "Tapping",
    name: p.name,
    description: p.description,
    root: p.root,
    type: p.type,
    positions: p.positions,
  };
}
