export type ProgressionChord = { root: string; type: string; label?: string };

export type ChordProgression = {
  id: string;
  name: string;
  description: string;
  chords: ProgressionChord[];
};

export const CHORD_PROGRESSIONS: ChordProgression[] = [
  {
    id: "ii-v-i-maj",
    name: "ii – V – I (Major)",
    description: "The cornerstone jazz cadence in a major key.",
    chords: [
      { root: "D", type: "min7", label: "ii" },
      { root: "G", type: "dom7", label: "V" },
      { root: "C", type: "maj7", label: "I" },
    ],
  },
  {
    id: "i-iv-v-blues",
    name: "I – IV – V (Blues)",
    description: "Classic 12-bar blues backbone in A.",
    chords: [
      { root: "A", type: "dom7", label: "I" },
      { root: "D", type: "dom7", label: "IV" },
      { root: "E", type: "dom7", label: "V" },
    ],
  },
  {
    id: "vi-iv-i-v",
    name: "vi – IV – I – V (Pop)",
    description: "The most common pop progression. Shown in C.",
    chords: [
      { root: "A", type: "min", label: "vi" },
      { root: "F", type: "maj", label: "IV" },
      { root: "C", type: "maj", label: "I" },
      { root: "G", type: "maj", label: "V" },
    ],
  },
  {
    id: "i-bvii-iv",
    name: "i – ♭VII – IV (Rock)",
    description: "Aeolian rock progression in E minor.",
    chords: [
      { root: "E", type: "min", label: "i" },
      { root: "D", type: "maj", label: "♭VII" },
      { root: "A", type: "maj", label: "IV" },
    ],
  },
  {
    id: "ii-v-i-min",
    name: "ii – V – i (Minor)",
    description: "Minor key jazz cadence in A minor.",
    chords: [
      { root: "B", type: "m7b5", label: "ii°" },
      { root: "E", type: "dom7", label: "V" },
      { root: "A", type: "min7", label: "i" },
    ],
  },
];

export const SCALE_SUGGESTIONS: Record<string, { id: string; name: string; reason: string }[]> = {
  maj: [
    { id: "ionian", name: "Ionian (Major)", reason: "Tonic major scale" },
    { id: "majPent", name: "Major Pentatonic", reason: "Safe, melodic choice" },
    { id: "lydian", name: "Lydian", reason: "Bright #4 color" },
  ],
  min: [
    { id: "aeolian", name: "Aeolian (Natural Minor)", reason: "Natural minor scale" },
    { id: "minPent", name: "Minor Pentatonic", reason: "Blues & rock staple" },
    { id: "dorian", name: "Dorian", reason: "Jazzier minor with major 6th" },
  ],
  maj7: [
    { id: "ionian", name: "Ionian", reason: "Chord-scale unity" },
    { id: "lydian", name: "Lydian", reason: "Lydian over maj7" },
    { id: "majPent", name: "Major Pentatonic", reason: "Avoid avoid notes" },
  ],
  min7: [
    { id: "dorian", name: "Dorian", reason: "Primary minor 7 scale" },
    { id: "minPent", name: "Minor Pentatonic", reason: "Universal minor sound" },
    { id: "blues", name: "Blues Scale", reason: "Gritty minor 7 color" },
  ],
  dom7: [
    { id: "mixolydian", name: "Mixolydian", reason: "Dominant 7 scale" },
    { id: "blues", name: "Blues Scale", reason: "Blues over dom7" },
    { id: "minPent", name: "Minor Pentatonic", reason: "Minor pent over dom7" },
  ],
  m7b5: [
    { id: "locrian", name: "Locrian", reason: "Half-diminished scale" },
    { id: "locrian2", name: "Locrian #2", reason: "Jazz half-dim" },
    { id: "phrygian", name: "Phrygian", reason: "Dark minor flavor" },
  ],
  dim7: [
    { id: "dim7", name: "Diminished (WH)", reason: "Symmetric diminished" },
    { id: "blues", name: "Blues Scale", reason: "Passing diminished" },
  ],
};

export function getScaleSuggestions(chordType: string) {
  return SCALE_SUGGESTIONS[chordType] ?? SCALE_SUGGESTIONS.maj;
}
