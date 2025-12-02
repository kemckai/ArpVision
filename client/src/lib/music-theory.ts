// Music Theory Utilities

export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Intervals relative to Root (0)
export const ARPEGGIO_TYPES = [
  { id: "maj", name: "Major Triad", intervals: [0, 4, 7] },
  { id: "min", name: "Minor Triad", intervals: [0, 3, 7] },
  { id: "dim", name: "Diminished Triad", intervals: [0, 3, 6] },
  { id: "maj7", name: "Major 7", intervals: [0, 4, 7, 11] },
  { id: "min7", name: "Minor 7", intervals: [0, 3, 7, 10] },
  { id: "dom7", name: "Dominant 7", intervals: [0, 4, 7, 10] },
  { id: "maj6", name: "Major 6", intervals: [0, 4, 7, 9] },
  { id: "min6", name: "Minor 6", intervals: [0, 3, 7, 9] },
  { id: "m7b5", name: "m7b5 (Half Dim)", intervals: [0, 3, 6, 10] },
  { id: "dim7", name: "Diminished 7", intervals: [0, 3, 6, 9] },
  { id: "maj9", name: "Major 9", intervals: [0, 4, 7, 11, 2] },
  { id: "min9", name: "Minor 9", intervals: [0, 3, 7, 10, 2] },
  { id: "min11", name: "Minor 11", intervals: [0, 3, 7, 10, 2, 5] },
  { id: "min13", name: "Minor 13", intervals: [0, 3, 7, 10, 2, 5, 9] },
  { id: "minMaj7", name: "Minor Major 7", intervals: [0, 3, 7, 11] },
  { id: "minAdd9", name: "Minor Add 9", intervals: [0, 3, 7, 2] },
  { id: "dom9", name: "Dominant 9", intervals: [0, 4, 7, 10, 2] },
  // Additional common extended / altered types
  { id: "majAdd9", name: "Major Add 9", intervals: [0, 4, 7, 2] },
  { id: "majAdd11", name: "Major Add 11", intervals: [0, 4, 7, 5] },
  { id: "maj69", name: "Major 6/9", intervals: [0, 4, 7, 9, 2] },
  { id: "dom7b9", name: "Dom7♭9", intervals: [0, 4, 7, 10, 1] },
  { id: "dom7#9", name: "Dom7#9", intervals: [0, 4, 7, 10, 3] },
  { id: "dom7b5", name: "Dom7♭5", intervals: [0, 4, 6, 10] },
  { id: "dom7#5", name: "Dom7#5", intervals: [0, 4, 8, 10] },
  { id: "dom7b9b13", name: "Dom7♭9♭13", intervals: [0, 4, 7, 10, 1, 9] },
  { id: "m7b9", name: "Min7♭9", intervals: [0, 3, 7, 10, 1] },
  { id: "aug", name: "Augmented", intervals: [0, 4, 8] },
  { id: "sus4", name: "Sus4", intervals: [0, 5, 7] },
  { id: "sus2", name: "Sus2", intervals: [0, 2, 7] },
];

// 7-note scale modes (intervals relative to the root)
export const SCALE_MODES = [
  {
    id: "ionian",
    name: "Ionian (Major)",
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: "dorian",
    name: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    id: "phrygian",
    name: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
  },
  {
    id: "lydian",
    name: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    id: "mixolydian",
    name: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    id: "aeolian",
    name: "Aeolian (Natural Minor)",
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: "locrian",
    name: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
  },
];

// Pentatonic & hexatonic scales (relative to the root)
export const SCALE_PENTATONICS = [
  {
    id: "majPent",
    name: "Major Pentatonic",
    intervals: [0, 2, 4, 7, 9], // 1 2 3 5 6
  },
  {
    id: "minPent",
    name: "Minor Pentatonic",
    intervals: [0, 3, 5, 7, 10], // 1 b3 4 5 b7
  },
  {
    id: "blues",
    name: "Blues Scale",
    intervals: [0, 3, 5, 6, 7, 10], // 1 b3 4 b5 5 b7
  },
];

// Comprehensive scale types - all known scales
export type ScaleType = {
  id: string;
  name: string;
  intervals: number[];
  category: "mode" | "pentatonic" | "minor" | "exotic" | "symmetric" | "other";
};

export const ALL_SCALES: ScaleType[] = [
  // Modes (7-note)
  { id: "ionian", name: "Ionian (Major)", intervals: [0, 2, 4, 5, 7, 9, 11], category: "mode" },
  { id: "dorian", name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10], category: "mode" },
  { id: "phrygian", name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10], category: "mode" },
  { id: "lydian", name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11], category: "mode" },
  { id: "mixolydian", name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10], category: "mode" },
  { id: "aeolian", name: "Aeolian (Natural Minor)", intervals: [0, 2, 3, 5, 7, 8, 10], category: "mode" },
  { id: "locrian", name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10], category: "mode" },
  
  // Pentatonics
  { id: "majPent", name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9], category: "pentatonic" },
  { id: "minPent", name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10], category: "pentatonic" },
  { id: "blues", name: "Blues Scale", intervals: [0, 3, 5, 6, 7, 10], category: "pentatonic" },
  
  // Minor scales
  { id: "harmonicMinor", name: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11], category: "minor" },
  { id: "melodicMinor", name: "Melodic Minor (Ascending)", intervals: [0, 2, 3, 5, 7, 9, 11], category: "minor" },
  { id: "dorianb2", name: "Dorian b2", intervals: [0, 1, 3, 5, 7, 9, 10], category: "minor" },
  { id: "lydianAug", name: "Lydian Augmented", intervals: [0, 2, 4, 6, 8, 9, 11], category: "minor" },
  { id: "lydianDom", name: "Lydian Dominant", intervals: [0, 2, 4, 6, 7, 9, 10], category: "minor" },
  { id: "mixolydianb6", name: "Mixolydian b6", intervals: [0, 2, 4, 5, 7, 8, 10], category: "minor" },
  { id: "locrian2", name: "Locrian #2", intervals: [0, 2, 3, 5, 6, 8, 10], category: "minor" },
  { id: "altered", name: "Altered (Super Locrian)", intervals: [0, 1, 3, 4, 6, 8, 10], category: "minor" },
  
  // Symmetric scales
  { id: "wholeTone", name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10], category: "symmetric" },
  { id: "dimHalfWhole", name: "Diminished (Half-Whole)", intervals: [0, 1, 3, 4, 6, 7, 9, 10], category: "symmetric" },
  { id: "dimWholeHalf", name: "Diminished (Whole-Half)", intervals: [0, 2, 3, 5, 6, 8, 9, 11], category: "symmetric" },
  
  // Exotic/World scales
  { id: "hungarianMinor", name: "Hungarian Minor", intervals: [0, 2, 3, 6, 7, 8, 11], category: "exotic" },
  { id: "neapolitanMinor", name: "Neapolitan Minor", intervals: [0, 1, 3, 5, 7, 8, 11], category: "exotic" },
  { id: "neapolitanMajor", name: "Neapolitan Major", intervals: [0, 1, 3, 5, 7, 9, 11], category: "exotic" },
  { id: "doubleHarmonic", name: "Double Harmonic", intervals: [0, 1, 4, 5, 7, 8, 11], category: "exotic" },
  { id: "persian", name: "Persian", intervals: [0, 1, 4, 5, 6, 8, 11], category: "exotic" },
  { id: "enigmatic", name: "Enigmatic", intervals: [0, 1, 4, 6, 8, 10, 11], category: "exotic" },
  { id: "hirajoshi", name: "Hirajoshi", intervals: [0, 2, 3, 7, 8], category: "exotic" },
  { id: "inSen", name: "In Sen", intervals: [0, 1, 5, 7, 10], category: "exotic" },
  { id: "iwato", name: "Iwato", intervals: [0, 1, 5, 6, 10], category: "exotic" },
  { id: "yo", name: "Yo", intervals: [0, 2, 5, 7, 9], category: "exotic" },
  { id: "scottish", name: "Scottish Pentatonic", intervals: [0, 2, 4, 5, 9], category: "exotic" },
  
  // Other common scales
  { id: "chromatic", name: "Chromatic", intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], category: "other" },
  { id: "majorBebop", name: "Major Bebop", intervals: [0, 2, 4, 5, 7, 8, 9, 11], category: "other" },
  { id: "dominantBebop", name: "Dominant Bebop", intervals: [0, 2, 4, 5, 7, 9, 10, 11], category: "other" },
  { id: "minorBebop", name: "Minor Bebop", intervals: [0, 2, 3, 4, 5, 7, 9, 10], category: "other" },
  { id: "augmented", name: "Augmented", intervals: [0, 3, 4, 7, 8, 11], category: "other" },
  { id: "prometheus", name: "Prometheus", intervals: [0, 2, 4, 6, 9, 10], category: "other" },
  { id: "tritone", name: "Tritone", intervals: [0, 1, 4, 6, 7, 10], category: "other" },
];

// CAGED major triad chord shapes, defined for their natural open chord
// keys (C, A, G, E, D). We transpose these shapes by semitone to get any
// other major key, preserving correct 1–3–5 chord tones.
export type CagedShapeTemplate = {
  id: "C" | "A" | "G" | "E" | "D";
  name: string;
  baseRoot: string; // natural open-chord root for this shape
  positions: { string: number; fret: number }[]; // open-position frets for that key
};

export const CAGED_SHAPES: CagedShapeTemplate[] = [
  {
    id: "C",
    name: "C shape",
    baseRoot: "C",
    // Open C major: x 3 2 0 1 0 (Low E muted)
    positions: [
      { string: 4, fret: 3 }, // A string, C (R)
      { string: 3, fret: 2 }, // D string, E (3)
      { string: 2, fret: 0 }, // G string, G (5)
      { string: 1, fret: 1 }, // B string, C (R)
      { string: 0, fret: 0 }, // high E, E (3)
    ],
  },
  {
    id: "A",
    name: "A shape",
    baseRoot: "A",
    // Open A major: x 0 2 2 2 0 (Low E muted)
    positions: [
      { string: 4, fret: 0 }, // A string, A (R)
      { string: 3, fret: 2 }, // D string, E (5)
      { string: 2, fret: 2 }, // G string, A (R)
      { string: 1, fret: 2 }, // B string, C# (3)
      { string: 0, fret: 0 }, // high E, E (5)
    ],
  },
  {
    id: "G",
    name: "G shape",
    baseRoot: "G",
    // Open G major: 3 2 0 0 0 3
    positions: [
      { string: 5, fret: 3 }, // low E, G (R)
      { string: 4, fret: 2 }, // A, B (3)
      { string: 3, fret: 0 }, // D, D (5)
      { string: 2, fret: 0 }, // G, G (R)
      { string: 1, fret: 0 }, // B, B (3)
      { string: 0, fret: 3 }, // high E, G (R)
    ],
  },
  {
    id: "E",
    name: "E shape",
    baseRoot: "E",
    // Open E major: 0 2 2 1 0 0
    positions: [
      { string: 5, fret: 0 }, // low E, E (R)
      { string: 4, fret: 2 }, // A, B (5)
      { string: 3, fret: 2 }, // D, E (R)
      { string: 2, fret: 1 }, // G, G# (3)
      { string: 1, fret: 0 }, // B, B (5)
      { string: 0, fret: 0 }, // high E, E (R)
    ],
  },
  {
    id: "D",
    name: "D shape",
    baseRoot: "D",
    // Open D major: x x 0 2 3 2
    positions: [
      { string: 3, fret: 0 }, // D, D (R)
      { string: 2, fret: 2 }, // G, A (5)
      { string: 1, fret: 3 }, // B, D (R)
      { string: 0, fret: 2 }, // high E, F# (3)
    ],
  },
];

export type Lick = {
  id: string;
  artist: string;
  name: string;
  description: string;
  root: string;
  type: string; // specific arpeggio type ID or custom
  positions?: { string: number; fret: number }[]; // 0 = High E, 5 = Low E
};

export const FAMOUS_LICKS: Lick[] = [
  {
    id: "rhoads-crowley",
    artist: "Randy Rhoads",
    name: "Mr. Crowley Intro",
    description: "The iconic neo-classical D Minor arpeggio that defines metal lead guitar. Descending triplet feel.",
    root: "D",
    type: "min",
    positions: [
      { string: 0, fret: 13 }, { string: 0, fret: 10 }, { string: 1, fret: 10 }, 
      { string: 2, fret: 10 }, { string: 0, fret: 12 }, { string: 0, fret: 9 },
      { string: 1, fret: 10 }, { string: 2, fret: 9 }
    ]
  },
  {
    id: "evh-eruption",
    artist: "Eddie Van Halen",
    name: "Eruption Tapping",
    description: "The groundbreaking tapping triad sequence. C# Minor triad tapped with the right hand.",
    root: "C#",
    type: "min",
    positions: [
      { string: 1, fret: 9 }, { string: 1, fret: 12 }, { string: 1, fret: 17 }, // Tapping pattern representation
      { string: 1, fret: 9 }, { string: 1, fret: 12 }, { string: 1, fret: 17 }
    ]
  },
  {
    id: "yngwie-dim",
    artist: "Yngwie Malmsteen",
    name: "Diminished Sweep",
    description: "A lightning fast A Diminished 7th sweep picking run across 3 strings.",
    root: "A",
    type: "dim7",
    positions: [
      { string: 0, fret: 17 }, { string: 0, fret: 14 }, 
      { string: 1, fret: 16 }, { string: 2, fret: 17 },
      { string: 2, fret: 14 }, { string: 3, fret: 16 }
    ]
  },
  {
    id: "slash-sweet",
    artist: "Slash",
    name: "Sweet Child Intro",
    description: "Technically a riff based on a D Major scale pattern with string skipping.",
    root: "D",
    type: "maj", // loosely
    positions: [
      { string: 2, fret: 12 }, { string: 0, fret: 15 }, { string: 1, fret: 14 }, { string: 2, fret: 12 }, 
      { string: 0, fret: 14 }, { string: 2, fret: 12 }, { string: 0, fret: 14 }, { string: 1, fret: 14 }
    ]
  },
  {
    id: "gilmour-shine",
    artist: "David Gilmour",
    name: "Shine On 4-Note Arp",
    description: "The haunting G Minor 4-note phrase that echoes through history.",
    root: "G",
    type: "min",
    positions: [
      { string: 2, fret: 12 }, { string: 1, fret: 11 }, { string: 0, fret: 10 }, { string: 0, fret: 13 }
    ]
  },
  {
    id: "beck-sustain",
    artist: "Jeff Beck",
    name: "Singing D Major Arp",
    description: "A vocal-style D major arpeggio figure, outlining pure 1–3–5 with wide vibrato on the top note.",
    root: "D",
    type: "maj",
    // D major triad (D–F#–A) around 10th position, standard tuning (E B G D A E high→low)
    // Pattern: high E (10) -> B (10) -> G (11) -> D (12) -> G (11) -> B (10) -> high E (10)
    positions: [
      { string: 0, fret: 10 }, // D (R)
      { string: 1, fret: 10 }, // A (5)
      { string: 2, fret: 11 }, // F# (3)
      { string: 3, fret: 12 }, // D (R)
      { string: 2, fret: 11 }, // F# (3)
      { string: 1, fret: 10 }, // A (5)
      { string: 0, fret: 10 }  // D (R, sustain)
    ]
  },
  {
    id: "page-blackdog",
    artist: "Jimmy Page",
    name: "Black Dog A7 Arp",
    description: "An A7 arpeggio idea in the spirit of Black Dog: 1–3–5–b7 with a bluesy turnaround.",
    root: "A",
    type: "dom7",
    // A7 arpeggio (A–C#–E–G) around 5th position.
    // Pattern: high E (5) -> B (5) -> G (6) -> D (7) -> G (6) -> B (5) -> high E (5)
    positions: [
      { string: 0, fret: 5 }, // A (R)
      { string: 1, fret: 5 }, // E (5)
      { string: 2, fret: 6 }, // C# (3)
      { string: 3, fret: 7 }, // A (R)
      { string: 2, fret: 6 }, // C# (3)
      { string: 1, fret: 5 }, // E (5)
      { string: 0, fret: 5 }  // A (R)
    ]
  }
];

// Standard Guitar Tuning (Low E to High E)
// Note indices in the NOTES array
// E2, A2, D3, G3, B3, E4
// We just care about the chroma (0-11) for this visualizer mostly, 
// but keeping track of octave would be good for sound later.
// E = 4, A = 9, D = 2, G = 7, B = 11, E = 4
export type Tuning = {
  id: string;
  name: string;
  notes: number[]; // High E to Low E (0-5)
};

export const TUNINGS: Tuning[] = [
  { id: "standard", name: "Standard (E A D G B E)", notes: [4, 11, 7, 2, 9, 4] },
  { id: "drop-d", name: "Drop D (E B G D A D)", notes: [4, 11, 7, 2, 9, 2] },
  { id: "half-step", name: "Eb Standard (Eb Bb Gb Db Ab Eb)", notes: [3, 10, 6, 1, 8, 3] },
  { id: "whole-step", name: "D Standard (D A F C G D)", notes: [2, 9, 5, 0, 7, 2] },
  { id: "open-g", name: "Open G (D B G D G D)", notes: [2, 11, 7, 2, 7, 2] },
  { id: "open-d", name: "Open D (D A F# D A D)", notes: [2, 9, 6, 2, 9, 2] },
  { id: "dadgad", name: "DADGAD (D A G D A D)", notes: [2, 9, 7, 2, 9, 2] },
  { id: "open-c", name: "Open C (C G C G C E)", notes: [4, 0, 7, 0, 7, 0] },
  { id: "daeac#e", name: "Math Rock (D A E A C# E)", notes: [4, 1, 9, 4, 9, 2] },
  { id: "facgce", name: "American Football (F A C G C E)", notes: [4, 0, 7, 0, 9, 5] },
  { id: "open-e-maj9", name: "Open E Maj9 (E G# B F# B E)", notes: [4, 11, 6, 11, 8, 4] },
  { id: "fcdgcd", name: "FCDGCD (F C D G C D)", notes: [2, 0, 7, 2, 0, 5] },
  { id: "gcdgcd", name: "GCDGCD (G C D G C D)", notes: [2, 0, 7, 2, 0, 7] },
];

export const STRING_TUNING = TUNINGS[0].notes; // Default

export const getNoteFromInterval = (rootIndex: number, interval: number) => {
  return (rootIndex + interval) % 12;
};

export const getIntervalName = (interval: number) => {
  switch (interval) {
    case 0: return "R";
    case 1: return "b2";
    case 2: return "2"; // or 9
    case 3: return "b3";
    case 4: return "3";
    case 5: return "4"; // or 11
    case 6: return "b5";
    case 7: return "5";
    case 8: return "#5";
    case 9: return "6"; // or 13 or bb7
    case 10: return "b7";
    case 11: return "7";
    default: return "?";
  }
};

// Convert sharp note names to flat note names with small "b"
export const formatNoteNameWithFlat = (noteName: string): string => {
  const sharpToFlat: Record<string, string> = {
    "C#": "Dᵇ",
    "D#": "Eᵇ",
    "F#": "Gᵇ",
    "G#": "Aᵇ",
    "A#": "Bᵇ",
  };
  return sharpToFlat[noteName] || noteName;
};

export type FretNote = {
  noteIndex: number;
  noteName: string;
  interval: number;
  intervalName: string;
  fret: number;
  string: number; // 0-5 (High E to Low E)
  isRoot: boolean;
};

// Find the first fret on a given string where the note equals the target root.
export const findRootFretOnString = (
  rootNote: string,
  stringNoteIndex: number,
  maxFret = 24
): number | null => {
  const rootIndex = NOTES.indexOf(rootNote);
  if (rootIndex === -1) return null;

  for (let fret = 0; fret <= maxFret; fret++) {
    if ((stringNoteIndex + fret) % 12 === rootIndex) {
      return fret;
    }
  }
  return null;
};

// Generate notes for a scale (modes, pentatonics, etc.)
export const generateScaleFretboardMap = (
  rootNote: string,
  scaleId: string,
  numFrets = 15,
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const rootIndex = NOTES.indexOf(rootNote);
  const scale =
    SCALE_MODES.find((m) => m.id === scaleId) ||
    SCALE_PENTATONICS.find((p) => p.id === scaleId) ||
    ALL_SCALES.find((s) => s.id === scaleId);

  if (!scale || rootIndex === -1) return [];

  const activeIntervals = new Set(scale.intervals);
  const result: FretNote[] = [];

  tuning.forEach((openStringNoteIndex, stringIdx) => {
    for (let fret = 0; fret <= numFrets; fret++) {
      const currentNoteIndex = (openStringNoteIndex + fret) % 12;
      const interval = (currentNoteIndex - rootIndex + 12) % 12;

      if (activeIntervals.has(interval)) {
        result.push({
          noteIndex: currentNoteIndex,
          noteName: NOTES[currentNoteIndex],
          interval,
          intervalName: getIntervalName(interval),
          fret,
          string: stringIdx,
          isRoot: interval === 0,
        });
      }
    }
  });

  return result;
};

// Generate a *box* view of the minor pentatonic scale (boxes 1–5),
// relative to the root on the low E string, matching classic guitar shapes.
export const generatePentatonicBoxFretboardMap = (
  rootNote: string,
  box: 1 | 2 | 3 | 4 | 5,
  numFrets = 24,
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  // Only defined for minor pentatonic
  const allNotes = generateScaleFretboardMap(rootNote, "minPent", numFrets, tuning);
  if (!allNotes.length) return [];

  // Low E string in our tuning array is index 5 (notes defined High E -> Low E)
  const lowEIndex = tuning[5];
  const rootFretOnLowE = findRootFretOnString(rootNote, lowEIndex, numFrets);
  if (rootFretOnLowE == null) return allNotes;

  // Box windows relative to the root fret on low E, based on A minor reference:
  // Box 1: frets 5–8  -> root+0 .. root+3
  // Box 2: frets 8–10 -> root+3 .. root+5
  // Box 3: frets 10–13 -> root+5 .. root+8
  // Box 4: frets 12–15 -> root+7 .. root+10
  // Box 5: frets 15–17 -> root+10 .. root+12
  const offsets: Record<1 | 2 | 3 | 4 | 5, { min: number; max: number }> = {
    1: { min: 0, max: 3 },
    2: { min: 3, max: 5 },
    3: { min: 5, max: 8 },
    4: { min: 7, max: 10 },
    5: { min: 10, max: 12 },
  };

  const window = offsets[box];
  const minFret = rootFretOnLowE + window.min;
  const maxFret = rootFretOnLowE + window.max;

  return allNotes.filter((n) => n.fret >= minFret && n.fret <= maxFret);
};

// Generate CAGED major triad chord tones for a given root and shape.
export const generateCagedFretboardMap = (
  rootNote: string,
  shapeId: CagedShapeTemplate["id"],
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const targetRootIndex = NOTES.indexOf(rootNote);
  if (targetRootIndex === -1) return [];

  const shape = CAGED_SHAPES.find((s) => s.id === shapeId);
  if (!shape) return [];

  const baseRootIndex = NOTES.indexOf(shape.baseRoot);
  if (baseRootIndex === -1) return [];

  const semitoneOffset = (targetRootIndex - baseRootIndex + 12) % 12;
  const result: FretNote[] = [];

  shape.positions.forEach((pos) => {
    const openStringNoteIndex = tuning[pos.string];
    if (openStringNoteIndex === undefined) return;

    const fret = pos.fret + semitoneOffset;
    if (fret < 0 || fret > 24) return;

    const currentNoteIndex = (openStringNoteIndex + fret) % 12;
    const interval = (currentNoteIndex - targetRootIndex + 12) % 12;

    // Only keep 1–3–5 triad tones for the major chord
    if (![0, 4, 7].includes(interval)) return;

    result.push({
      noteIndex: currentNoteIndex,
      noteName: NOTES[currentNoteIndex],
      interval,
      intervalName: getIntervalName(interval),
      fret,
      string: pos.string,
      isRoot: interval === 0,
    });
  });

  return result;
};

// Generate notes for a specific lick pattern so we can show the *actual phrase*,
// even if it uses notes outside of the strict arpeggio formula.
export const generateLickFretboardMap = (
  rootNote: string,
  positions: { string: number; fret: number }[] = [],
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const rootIndex = NOTES.indexOf(rootNote);
  if (rootIndex === -1 || !positions.length) return [];

  const result: FretNote[] = [];

  positions.forEach((pos) => {
    const openStringNoteIndex = tuning[pos.string];
    if (openStringNoteIndex === undefined) return;

    const currentNoteIndex = (openStringNoteIndex + pos.fret) % 12;
    const interval = (currentNoteIndex - rootIndex + 12) % 12;

    result.push({
      noteIndex: currentNoteIndex,
      noteName: NOTES[currentNoteIndex],
      interval,
      intervalName: getIntervalName(interval),
      fret: pos.fret,
      string: pos.string,
      isRoot: interval === 0,
    });
  });

  return result;
};

export const generateFretboardMap = (rootNote: string, typeId: string, numFrets = 15, tuning: number[] = STRING_TUNING) => {
  const rootIndex = NOTES.indexOf(rootNote);
  const arpeggio = ARPEGGIO_TYPES.find(t => t.id === typeId);
  
  if (!arpeggio || rootIndex === -1) return [];

  const activeIntervals = new Set(arpeggio.intervals);
  const result: FretNote[] = [];

  tuning.forEach((openStringNoteIndex, stringIdx) => {
    for (let fret = 0; fret <= numFrets; fret++) {
      const currentNoteIndex = (openStringNoteIndex + fret) % 12;
      
      // Check if this note is in our arpeggio
      // Calculate interval relative to root
      // To do this correctly: (current - root + 12) % 12
      const interval = (currentNoteIndex - rootIndex + 12) % 12;

      if (activeIntervals.has(interval)) {
        result.push({
          noteIndex: currentNoteIndex,
          noteName: NOTES[currentNoteIndex],
          interval: interval,
          intervalName: getIntervalName(interval),
          fret,
          string: stringIdx,
          isRoot: interval === 0
        });
      }
    }
  });

  return result;
};
