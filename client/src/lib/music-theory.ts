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
  description?: string; // Historical context and usage information
};

export const ALL_SCALES: ScaleType[] = [
  // Modes (7-note)
  { 
    id: "ionian", 
    name: "Ionian (Major)", 
    intervals: [0, 2, 4, 5, 7, 9, 11], 
    category: "mode",
    description: "The first mode of the major scale, dating back to ancient Greece. The foundation of Western music, used in countless classical, pop, and jazz compositions. Bright and stable."
  },
  { 
    id: "dorian", 
    name: "Dorian", 
    intervals: [0, 2, 3, 5, 7, 9, 10], 
    category: "mode",
    description: "The second mode, with a minor third but major sixth. Popular in jazz (Miles Davis' 'So What'), rock, and folk music. Has a smooth, sophisticated minor quality."
  },
  { 
    id: "phrygian", 
    name: "Phrygian", 
    intervals: [0, 1, 3, 5, 7, 8, 10], 
    category: "mode",
    description: "The third mode, characterized by a flattened second. Common in flamenco, metal, and film scores. Dark, exotic, and mysterious with Spanish/Middle Eastern flavor."
  },
  { 
    id: "lydian", 
    name: "Lydian", 
    intervals: [0, 2, 4, 6, 7, 9, 11], 
    category: "mode",
    description: "The fourth mode with a raised fourth. Favored by composers like Debussy and modern film composers. Dreamy, floating, and ethereal—the 'dream sequence' scale."
  },
  { 
    id: "mixolydian", 
    name: "Mixolydian", 
    intervals: [0, 2, 4, 5, 7, 9, 10], 
    category: "mode",
    description: "The fifth mode, major with a flattened seventh. Essential in blues, rock, country, and Celtic music. The 'rock and roll' scale—powerful yet approachable."
  },
  { 
    id: "aeolian", 
    name: "Aeolian (Natural Minor)", 
    intervals: [0, 2, 3, 5, 7, 8, 10], 
    category: "mode",
    description: "The sixth mode, the natural minor scale. Used extensively in classical music, metal, and emotional ballads. Melancholic, introspective, and deeply expressive."
  },
  { 
    id: "locrian", 
    name: "Locrian", 
    intervals: [0, 1, 3, 5, 6, 8, 10], 
    category: "mode",
    description: "The seventh mode, with a diminished fifth. Rarely used due to its unstable nature, but found in modern jazz and experimental music. Unsettling and dissonant."
  },
  
  // Pentatonics
  { 
    id: "majPent", 
    name: "Major Pentatonic", 
    intervals: [0, 2, 4, 7, 9], 
    category: "pentatonic",
    description: "Ancient five-note scale found worldwide—China, Scotland, Native America. Used in folk, country, and rock. Bright, open, and universally pleasing. No half-steps create a smooth, flowing sound."
  },
  { 
    id: "minPent", 
    name: "Minor Pentatonic", 
    intervals: [0, 3, 5, 7, 10], 
    category: "pentatonic",
    description: "The most important scale in blues, rock, and metal. Used by guitar legends from B.B. King to Slash. Five notes that define rock guitar solos. Expressive and powerful."
  },
  { 
    id: "blues", 
    name: "Blues Scale", 
    intervals: [0, 3, 5, 6, 7, 10], 
    category: "pentatonic",
    description: "Minor pentatonic with added 'blue note' (flattened fifth). The soul of blues music, creating that characteristic tension and release. Essential for blues, jazz, and rock improvisation."
  },
  
  // Minor scales
  { 
    id: "harmonicMinor", 
    name: "Harmonic Minor", 
    intervals: [0, 2, 3, 5, 7, 8, 11], 
    category: "minor",
    description: "Natural minor with raised seventh. Creates a strong leading tone, essential for V-i cadences in minor keys. Used in classical music, metal, and Middle Eastern music. Dramatic and intense."
  },
  { 
    id: "melodicMinor", 
    name: "Melodic Minor (Ascending)", 
    intervals: [0, 2, 3, 5, 7, 9, 11], 
    category: "minor",
    description: "Natural minor with raised 6th and 7th ascending. Developed in classical music to avoid the awkward augmented second. Used extensively in jazz as a melodic minor mode. Smooth and elegant."
  },
  { 
    id: "dorianb2", 
    name: "Dorian b2", 
    intervals: [0, 1, 3, 5, 7, 9, 10], 
    category: "minor",
    description: "Dorian mode with flattened second. Second mode of melodic minor. Used in modern jazz and fusion. Combines minor quality with exotic Phrygian-like flavor."
  },
  { 
    id: "lydianAug", 
    name: "Lydian Augmented", 
    intervals: [0, 2, 4, 6, 8, 9, 11], 
    category: "minor",
    description: "Third mode of melodic minor. Lydian with raised fifth. Used in modern jazz (McCoy Tyner, Herbie Hancock). Creates floating, suspended, otherworldly sounds."
  },
  { 
    id: "lydianDom", 
    name: "Lydian Dominant", 
    intervals: [0, 2, 4, 6, 7, 9, 10], 
    category: "minor",
    description: "Fourth mode of melodic minor. Mixolydian with raised fourth. The 'Lydian b7' scale, essential for dominant 7#11 chords in jazz. Bright yet bluesy."
  },
  { 
    id: "mixolydianb6", 
    name: "Mixolydian b6", 
    intervals: [0, 2, 4, 5, 7, 8, 10], 
    category: "minor",
    description: "Fifth mode of melodic minor. Mixolydian with flattened sixth. Used over dominant chords in jazz. Creates a darker, more complex dominant sound."
  },
  { 
    id: "locrian2", 
    name: "Locrian #2", 
    intervals: [0, 2, 3, 5, 6, 8, 10], 
    category: "minor",
    description: "Sixth mode of melodic minor. Locrian with natural second. Used over half-diminished chords in jazz. More usable than pure Locrian due to the natural second."
  },
  { 
    id: "altered", 
    name: "Altered (Super Locrian)", 
    intervals: [0, 1, 3, 4, 6, 8, 10], 
    category: "minor",
    description: "Seventh mode of melodic minor. The 'altered dominant' scale, used over altered dominant chords in jazz. Contains all possible alterations (b9, #9, #11, b13). Intense and dissonant."
  },
  
  // Symmetric scales
  { 
    id: "wholeTone", 
    name: "Whole Tone", 
    intervals: [0, 2, 4, 6, 8, 10], 
    category: "symmetric",
    description: "All whole steps, no half steps. Used by Debussy ('Voiles'), jazz musicians, and film composers for dream sequences. Ambiguous, floating, and mysterious. Only two distinct whole-tone scales exist."
  },
  { 
    id: "dimHalfWhole", 
    name: "Diminished (Half-Whole)", 
    intervals: [0, 1, 3, 4, 6, 7, 9, 10], 
    category: "symmetric",
    description: "Symmetric eight-note scale alternating half and whole steps. Used over diminished chords and in jazz. Creates tension and movement. Used by bebop musicians and modern composers."
  },
  { 
    id: "dimWholeHalf", 
    name: "Diminished (Whole-Half)", 
    intervals: [0, 2, 3, 5, 6, 8, 9, 11], 
    category: "symmetric",
    description: "Symmetric eight-note scale alternating whole and half steps. Another diminished scale variant. Used in jazz and classical music for its symmetrical properties and tension-building qualities."
  },
  
  // Exotic/World scales
  { 
    id: "hungarianMinor", 
    name: "Hungarian Minor", 
    intervals: [0, 2, 3, 6, 7, 8, 11], 
    category: "exotic",
    description: "Also called 'Gypsy Minor' or 'Double Harmonic Minor'. Features augmented second intervals. Used in Hungarian folk music, Middle Eastern music, and film scores. Exotic and dramatic."
  },
  { 
    id: "neapolitanMinor", 
    name: "Neapolitan Minor", 
    intervals: [0, 1, 3, 5, 7, 8, 11], 
    category: "exotic",
    description: "Natural minor with flattened second. Named after the Neapolitan school of composition. Used in classical music and film scores. Dark and mysterious with Italian operatic character."
  },
  { 
    id: "neapolitanMajor", 
    name: "Neapolitan Major", 
    intervals: [0, 1, 3, 5, 7, 9, 11], 
    category: "exotic",
    description: "Major scale with flattened second. Another scale from the Neapolitan school. Used in classical and film music. Creates a unique, slightly exotic major sound."
  },
  { 
    id: "doubleHarmonic", 
    name: "Double Harmonic", 
    intervals: [0, 1, 4, 5, 7, 8, 11], 
    category: "exotic",
    description: "Also called 'Byzantine' or 'Arabic' scale. Features two augmented seconds. Found in Middle Eastern, Eastern European, and flamenco music. Highly exotic and expressive."
  },
  { 
    id: "persian", 
    name: "Persian", 
    intervals: [0, 1, 4, 5, 6, 8, 11], 
    category: "exotic",
    description: "Traditional Persian scale with unique interval structure. Used in Persian classical music and Middle Eastern compositions. Mysterious and culturally rich."
  },
  { 
    id: "enigmatic", 
    name: "Enigmatic", 
    intervals: [0, 1, 4, 6, 8, 10, 11], 
    category: "exotic",
    description: "Created by Italian composer Giuseppe Verdi for his 'Ave Maria'. Features unusual intervals. Rarely used but creates a truly enigmatic, otherworldly sound."
  },
  { 
    id: "hirajoshi", 
    name: "Hirajoshi", 
    intervals: [0, 2, 3, 7, 8], 
    category: "exotic",
    description: "Japanese pentatonic scale used in traditional Japanese music. One of the most important scales in Japanese music theory. Peaceful, meditative, and culturally significant."
  },
  { 
    id: "inSen", 
    name: "In Sen", 
    intervals: [0, 1, 5, 7, 10], 
    category: "exotic",
    description: "Another Japanese pentatonic scale, used in traditional music and modern compositions. Different character from Hirajoshi—more angular and distinctive."
  },
  { 
    id: "iwato", 
    name: "Iwato", 
    intervals: [0, 1, 5, 6, 10], 
    category: "exotic",
    description: "Japanese pentatonic scale with unique interval pattern. Used in traditional Japanese music. Creates a distinctive, contemplative sound."
  },
  { 
    id: "yo", 
    name: "Yo", 
    intervals: [0, 2, 5, 7, 9], 
    category: "exotic",
    description: "Japanese pentatonic scale, one of the primary scales in Japanese music. Used extensively in traditional and modern Japanese compositions. Bright and open."
  },
  { 
    id: "scottish", 
    name: "Scottish Pentatonic", 
    intervals: [0, 2, 4, 5, 9], 
    category: "exotic",
    description: "Also called Scottish Gaelic scale. Found in traditional Scottish and Irish music, especially pipe tunes. Like major scale without 5th and 7th. Haunting, yearning quality—used in 'Loch Lomond' and 'Skye Boat Song'."
  },
  
  // Other common scales
  { 
    id: "chromatic", 
    name: "Chromatic", 
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
    category: "other",
    description: "All twelve semitones. The complete set of Western pitches. Used for passing tones, chromaticism, and in serialist music. Creates maximum tension and color."
  },
  { 
    id: "majorBebop", 
    name: "Major Bebop", 
    intervals: [0, 2, 4, 5, 7, 8, 9, 11], 
    category: "other",
    description: "Major scale with added passing tone (major 6th). Developed by bebop musicians in the 1940s to create smoother lines. Used extensively in jazz improvisation."
  },
  { 
    id: "dominantBebop", 
    name: "Dominant Bebop", 
    intervals: [0, 2, 4, 5, 7, 9, 10, 11], 
    category: "other",
    description: "Mixolydian with added passing tone (major 7th). Essential bebop scale for dominant chords. Used by Charlie Parker, Dizzy Gillespie, and all bebop musicians."
  },
  { 
    id: "minorBebop", 
    name: "Minor Bebop", 
    intervals: [0, 2, 3, 4, 5, 7, 9, 10], 
    category: "other",
    description: "Natural minor with added passing tone (major 3rd). Another bebop innovation for smoother minor key lines. Used in jazz over minor chords and progressions."
  },
  { 
    id: "augmented", 
    name: "Augmented", 
    intervals: [0, 3, 4, 7, 8, 11], 
    category: "other",
    description: "Symmetric scale built on augmented triads. Used in classical music (Liszt, Scriabin) and jazz. Creates a floating, ambiguous, dreamlike quality."
  },
  { 
    id: "prometheus", 
    name: "Prometheus", 
    intervals: [0, 2, 4, 6, 9, 10], 
    category: "other",
    description: "Also called 'Mystic' scale. Created by Russian composer Alexander Scriabin. Used in his late works. Mysterious and mystical, associated with theosophy."
  },
  { 
    id: "tritone", 
    name: "Tritone", 
    intervals: [0, 1, 4, 6, 7, 10], 
    category: "other",
    description: "Scale built around the tritone interval. Used in modern jazz and experimental music. Creates maximum dissonance and tension. The 'devil's interval' scale."
  },
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

// CAGED minor triad chord shapes (R-b3-5)
export const CAGED_MINOR_SHAPES: CagedShapeTemplate[] = [
  {
    id: "C",
    name: "C shape (minor)",
    baseRoot: "C",
    // C minor: x 3 5 5 4 3
    positions: [
      { string: 4, fret: 3 }, // A string, C (R)
      { string: 3, fret: 5 }, // D string, G (5)
      { string: 2, fret: 5 }, // G string, C (R)
      { string: 1, fret: 4 }, // B string, Eb (b3)
      { string: 0, fret: 3 }, // high E, G (5)
    ],
  },
  {
    id: "A",
    name: "A shape (minor)",
    baseRoot: "A",
    // A minor: x 0 2 2 1 0
    positions: [
      { string: 4, fret: 0 }, // A string, A (R)
      { string: 3, fret: 2 }, // D string, E (5)
      { string: 2, fret: 2 }, // G string, A (R)
      { string: 1, fret: 1 }, // B string, C (b3)
      { string: 0, fret: 0 }, // high E, E (5)
    ],
  },
  {
    id: "G",
    name: "G shape (minor)",
    baseRoot: "G",
    // G minor: 3 5 5 3 3 3
    positions: [
      { string: 5, fret: 3 }, // low E, G (R)
      { string: 4, fret: 5 }, // A, C (b3)
      { string: 3, fret: 5 }, // D, G (R)
      { string: 2, fret: 3 }, // G, Bb (b3)
      { string: 1, fret: 3 }, // B, D (5)
      { string: 0, fret: 3 }, // high E, G (R)
    ],
  },
  {
    id: "E",
    name: "E shape (minor)",
    baseRoot: "E",
    // E minor: 0 2 2 0 0 0
    positions: [
      { string: 5, fret: 0 }, // low E, E (R)
      { string: 4, fret: 2 }, // A, B (5)
      { string: 3, fret: 2 }, // D, E (R)
      { string: 2, fret: 0 }, // G, G (b3)
      { string: 1, fret: 0 }, // B, B (5)
      { string: 0, fret: 0 }, // high E, E (R)
    ],
  },
  {
    id: "D",
    name: "D shape (minor)",
    baseRoot: "D",
    // D minor: x x 0 2 3 1
    positions: [
      { string: 3, fret: 0 }, // D, D (R)
      { string: 2, fret: 2 }, // G, A (5)
      { string: 1, fret: 3 }, // B, D (R)
      { string: 0, fret: 1 }, // high E, F (b3)
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

// Convert sharp note names to flat note names using flat symbol (♭)
export const formatNoteNameWithFlat = (noteName: string): string => {
  const sharpToFlat: Record<string, string> = {
    "C#": "D♭",
    "D#": "E♭",
    "F#": "G♭",
    "G#": "A♭",
    "A#": "B♭",
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
  // Validate inputs
  if (!rootNote || typeof rootNote !== 'string') return [];
  if (!scaleId || typeof scaleId !== 'string') return [];
  if (!Array.isArray(tuning) || tuning.length !== 6) return [];
  if (typeof numFrets !== 'number' || numFrets < 0 || numFrets > 24) return [];

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
  // Validate inputs
  if (!rootNote || typeof rootNote !== 'string') return [];
  if (!box || ![1, 2, 3, 4, 5].includes(box)) return [];
  if (!Array.isArray(tuning) || tuning.length !== 6) return [];
  if (typeof numFrets !== 'number' || numFrets < 0 || numFrets > 24) return [];

  // Only defined for minor pentatonic
  const allNotes = generateScaleFretboardMap(rootNote, "minPent", numFrets, tuning);
  if (!allNotes.length) return [];

  // Low E string in our tuning array is index 5 (notes defined High E -> Low E)
  const lowEIndex = tuning[5];
  if (lowEIndex === undefined) return [];
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
  // Validate inputs
  if (!rootNote || typeof rootNote !== 'string') return [];
  if (!shapeId) return [];
  if (!Array.isArray(tuning) || tuning.length !== 6) return [];

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

// CAGED scale patterns - full major scale positions for each CAGED shape
// These define the "box" patterns for major scales based on each CAGED chord shape
const CAGED_SCALE_PATTERNS: Record<CagedShapeTemplate["id"], { string: number; fret: number; interval: number }[]> = {
  C: [
    // C shape major scale pattern (around open C position)
    { string: 5, fret: 3, interval: 5 }, // E string, G (5)
    { string: 4, fret: 0, interval: 0 }, // A string, C (R)
    { string: 4, fret: 2, interval: 2 }, // A string, D (2)
    { string: 4, fret: 3, interval: 3 }, // A string, E (3)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (7)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 1, fret: 0, interval: 3 }, // B string, B (3)
    { string: 1, fret: 1, interval: 4 }, // B string, C (4)
    { string: 1, fret: 3, interval: 7 }, // B string, D (7)
    { string: 0, fret: 0, interval: 7 }, // high E, E (7)
    { string: 0, fret: 1, interval: 0 }, // high E, F (R)
    { string: 0, fret: 3, interval: 2 }, // high E, G (2)
  ],
  A: [
    // A shape major scale pattern (around open A position)
    { string: 5, fret: 0, interval: 5 }, // E string, A (5)
    { string: 4, fret: 0, interval: 0 }, // A string, A (R)
    { string: 4, fret: 2, interval: 2 }, // A string, B (2)
    { string: 4, fret: 4, interval: 4 }, // A string, C# (3)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (7)
    { string: 2, fret: 1, interval: 0 }, // G string, G# (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 2, fret: 4, interval: 4 }, // G string, B (3)
    { string: 1, fret: 0, interval: 7 }, // B string, B (7)
    { string: 1, fret: 2, interval: 0 }, // B string, C# (R)
    { string: 0, fret: 0, interval: 7 }, // high E, E (7)
    { string: 0, fret: 2, interval: 0 }, // high E, F# (R)
  ],
  G: [
    // G shape major scale pattern (around open G position)
    { string: 5, fret: 3, interval: 0 }, // E string, G (R)
    { string: 5, fret: 5, interval: 2 }, // E string, A (2)
    { string: 4, fret: 2, interval: 4 }, // A string, B (3)
    { string: 4, fret: 3, interval: 5 }, // A string, C (4)
    { string: 4, fret: 5, interval: 7 }, // A string, D (5)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (7)
    { string: 3, fret: 4, interval: 0 }, // D string, G (R)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 1, fret: 0, interval: 4 }, // B string, B (3)
    { string: 1, fret: 1, interval: 5 }, // B string, C (4)
    { string: 0, fret: 3, interval: 0 }, // high E, G (R)
    { string: 0, fret: 5, interval: 2 }, // high E, A (2)
  ],
  E: [
    // E shape major scale pattern (around open E position)
    { string: 5, fret: 0, interval: 0 }, // E string, E (R)
    { string: 5, fret: 2, interval: 2 }, // E string, F# (2)
    { string: 5, fret: 4, interval: 4 }, // E string, G# (3)
    { string: 4, fret: 0, interval: 5 }, // A string, A (5)
    { string: 4, fret: 2, interval: 7 }, // A string, B (7)
    { string: 4, fret: 4, interval: 0 }, // A string, C# (R)
    { string: 3, fret: 1, interval: 2 }, // D string, D# (2)
    { string: 3, fret: 2, interval: 4 }, // D string, E (3)
    { string: 3, fret: 4, interval: 5 }, // D string, F# (4)
    { string: 2, fret: 1, interval: 0 }, // G string, G# (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 2, fret: 4, interval: 4 }, // G string, B (3)
    { string: 1, fret: 0, interval: 7 }, // B string, B (7)
    { string: 1, fret: 2, interval: 0 }, // B string, C# (R)
    { string: 0, fret: 0, interval: 0 }, // high E, E (R)
    { string: 0, fret: 2, interval: 2 }, // high E, F# (2)
  ],
  D: [
    // D shape major scale pattern (around open D position)
    { string: 4, fret: 0, interval: 5 }, // A string, A (5)
    { string: 4, fret: 2, interval: 7 }, // A string, B (7)
    { string: 3, fret: 0, interval: 0 }, // D string, D (R)
    { string: 3, fret: 2, interval: 2 }, // D string, E (2)
    { string: 3, fret: 4, interval: 4 }, // D string, F# (3)
    { string: 2, fret: 0, interval: 5 }, // G string, G (5)
    { string: 2, fret: 2, interval: 7 }, // G string, A (7)
    { string: 2, fret: 4, interval: 0 }, // G string, B (R)
    { string: 1, fret: 0, interval: 2 }, // B string, B (2)
    { string: 1, fret: 2, interval: 4 }, // B string, C# (3)
    { string: 1, fret: 3, interval: 5 }, // B string, D (4)
    { string: 0, fret: 0, interval: 7 }, // high E, E (7)
    { string: 0, fret: 2, interval: 0 }, // high E, F# (R)
  ],
};

// Generate CAGED major scale pattern for a given root and shape
export const generateCagedScaleFretboardMap = (
  rootNote: string,
  shapeId: CagedShapeTemplate["id"],
  numFrets = 19,
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const targetRootIndex = NOTES.indexOf(rootNote);
  if (targetRootIndex === -1) return [];

  const pattern = CAGED_SCALE_PATTERNS[shapeId];
  if (!pattern) return [];

  const baseRootIndex = NOTES.indexOf(CAGED_SHAPES.find((s) => s.id === shapeId)?.baseRoot || "C");
  if (baseRootIndex === -1) return [];

  const semitoneOffset = (targetRootIndex - baseRootIndex + 12) % 12;
  const result: FretNote[] = [];
  const majorScaleIntervals = new Set([0, 2, 4, 5, 7, 9, 11]); // Major scale intervals

  pattern.forEach((pos) => {
    const openStringNoteIndex = tuning[pos.string];
    if (openStringNoteIndex === undefined) return;

    const fret = pos.fret + semitoneOffset;
    if (fret < 0 || fret > numFrets) return;

    const currentNoteIndex = (openStringNoteIndex + fret) % 12;
    const interval = (currentNoteIndex - targetRootIndex + 12) % 12;

    // Only include notes that are in the major scale
    if (!majorScaleIntervals.has(interval)) return;

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

// CAGED minor scale patterns - full natural minor scale positions for each CAGED shape
const CAGED_MINOR_SCALE_PATTERNS: Record<CagedShapeTemplate["id"], { string: number; fret: number; interval: number }[]> = {
  C: [
    // C shape minor scale pattern (around C minor position)
    { string: 5, fret: 3, interval: 5 }, // E string, G (5)
    { string: 4, fret: 0, interval: 0 }, // A string, C (R)
    { string: 4, fret: 1, interval: 1 }, // A string, C# (b2)
    { string: 4, fret: 3, interval: 3 }, // A string, D# (b3)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (b7)
    { string: 3, fret: 5, interval: 0 }, // D string, G (R)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 2, fret: 3, interval: 3 }, // G string, Bb (b3)
    { string: 2, fret: 5, interval: 5 }, // G string, C (4)
    { string: 1, fret: 0, interval: 3 }, // B string, B (b3)
    { string: 1, fret: 1, interval: 4 }, // B string, C (4)
    { string: 1, fret: 3, interval: 7 }, // B string, D (b7)
    { string: 0, fret: 0, interval: 7 }, // high E, E (b7)
    { string: 0, fret: 1, interval: 0 }, // high E, F (R)
    { string: 0, fret: 3, interval: 2 }, // high E, G (2)
  ],
  A: [
    // A shape minor scale pattern (around A minor position)
    { string: 5, fret: 0, interval: 5 }, // E string, A (5)
    { string: 4, fret: 0, interval: 0 }, // A string, A (R)
    { string: 4, fret: 1, interval: 1 }, // A string, Bb (b2)
    { string: 4, fret: 3, interval: 3 }, // A string, C (b3)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (b7)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 2, fret: 3, interval: 3 }, // G string, Bb (b3)
    { string: 1, fret: 0, interval: 7 }, // B string, B (b7)
    { string: 1, fret: 1, interval: 0 }, // B string, C (R)
    { string: 1, fret: 3, interval: 2 }, // B string, D (2)
    { string: 0, fret: 0, interval: 7 }, // high E, E (b7)
    { string: 0, fret: 1, interval: 0 }, // high E, F (R)
  ],
  G: [
    // G shape minor scale pattern (around G minor position)
    { string: 5, fret: 3, interval: 0 }, // E string, G (R)
    { string: 5, fret: 4, interval: 1 }, // E string, G# (b2)
    { string: 5, fret: 6, interval: 3 }, // E string, Bb (b3)
    { string: 4, fret: 2, interval: 3 }, // A string, B (b3)
    { string: 4, fret: 3, interval: 4 }, // A string, C (4)
    { string: 4, fret: 5, interval: 7 }, // A string, D (b7)
    { string: 3, fret: 0, interval: 5 }, // D string, D (5)
    { string: 3, fret: 2, interval: 7 }, // D string, E (b7)
    { string: 3, fret: 5, interval: 0 }, // D string, G (R)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 1, interval: 1 }, // G string, G# (b2)
    { string: 2, fret: 3, interval: 3 }, // G string, Bb (b3)
    { string: 1, fret: 0, interval: 3 }, // B string, B (b3)
    { string: 1, fret: 1, interval: 4 }, // B string, C (4)
    { string: 0, fret: 3, interval: 0 }, // high E, G (R)
    { string: 0, fret: 4, interval: 1 }, // high E, G# (b2)
  ],
  E: [
    // E shape minor scale pattern (around E minor position)
    { string: 5, fret: 0, interval: 0 }, // E string, E (R)
    { string: 5, fret: 1, interval: 1 }, // E string, F (b2)
    { string: 5, fret: 3, interval: 3 }, // E string, G (b3)
    { string: 4, fret: 0, interval: 5 }, // A string, A (5)
    { string: 4, fret: 2, interval: 7 }, // A string, B (b7)
    { string: 4, fret: 3, interval: 0 }, // A string, C (R)
    { string: 3, fret: 0, interval: 2 }, // D string, D (2)
    { string: 3, fret: 2, interval: 4 }, // D string, E (b3)
    { string: 3, fret: 3, interval: 5 }, // D string, F (4)
    { string: 2, fret: 0, interval: 0 }, // G string, G (R)
    { string: 2, fret: 2, interval: 2 }, // G string, A (2)
    { string: 2, fret: 3, interval: 3 }, // G string, Bb (b3)
    { string: 1, fret: 0, interval: 7 }, // B string, B (b7)
    { string: 1, fret: 1, interval: 0 }, // B string, C (R)
    { string: 0, fret: 0, interval: 0 }, // high E, E (R)
    { string: 0, fret: 1, interval: 1 }, // high E, F (b2)
  ],
  D: [
    // D shape minor scale pattern (around D minor position)
    { string: 4, fret: 0, interval: 5 }, // A string, A (5)
    { string: 4, fret: 1, interval: 6 }, // A string, Bb (b6)
    { string: 4, fret: 3, interval: 0 }, // A string, C (R)
    { string: 3, fret: 0, interval: 0 }, // D string, D (R)
    { string: 3, fret: 1, interval: 1 }, // D string, D# (b2)
    { string: 3, fret: 3, interval: 3 }, // D string, F (b3)
    { string: 2, fret: 0, interval: 5 }, // G string, G (5)
    { string: 2, fret: 2, interval: 7 }, // G string, A (b7)
    { string: 2, fret: 3, interval: 0 }, // G string, Bb (R)
    { string: 1, fret: 0, interval: 2 }, // B string, B (2)
    { string: 1, fret: 1, interval: 3 }, // B string, C (b3)
    { string: 1, fret: 3, interval: 5 }, // B string, D (4)
    { string: 0, fret: 0, interval: 7 }, // high E, E (b7)
    { string: 0, fret: 1, interval: 0 }, // high E, F (R)
    { string: 0, fret: 3, interval: 2 }, // high E, G (2)
  ],
};

// Generate CAGED minor triad chord tones for a given root and shape
export const generateCagedMinorFretboardMap = (
  rootNote: string,
  shapeId: CagedShapeTemplate["id"],
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const targetRootIndex = NOTES.indexOf(rootNote);
  if (targetRootIndex === -1) return [];

  const shape = CAGED_MINOR_SHAPES.find((s) => s.id === shapeId);
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

    // Only keep 1–b3–5 triad tones for the minor chord
    if (![0, 3, 7].includes(interval)) return;

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

// Generate CAGED minor scale pattern for a given root and shape
export const generateCagedMinorScaleFretboardMap = (
  rootNote: string,
  shapeId: CagedShapeTemplate["id"],
  numFrets = 19,
  tuning: number[] = STRING_TUNING
): FretNote[] => {
  const targetRootIndex = NOTES.indexOf(rootNote);
  if (targetRootIndex === -1) return [];

  const pattern = CAGED_MINOR_SCALE_PATTERNS[shapeId];
  if (!pattern) return [];

  const baseRootIndex = NOTES.indexOf(CAGED_MINOR_SHAPES.find((s) => s.id === shapeId)?.baseRoot || "C");
  if (baseRootIndex === -1) return [];

  const semitoneOffset = (targetRootIndex - baseRootIndex + 12) % 12;
  const result: FretNote[] = [];
  const minorScaleIntervals = new Set([0, 2, 3, 5, 7, 8, 10]); // Natural minor scale intervals

  pattern.forEach((pos) => {
    const openStringNoteIndex = tuning[pos.string];
    if (openStringNoteIndex === undefined) return;

    const fret = pos.fret + semitoneOffset;
    if (fret < 0 || fret > numFrets) return;

    const currentNoteIndex = (openStringNoteIndex + fret) % 12;
    const interval = (currentNoteIndex - targetRootIndex + 12) % 12;

    // Only include notes that are in the natural minor scale
    if (!minorScaleIntervals.has(interval)) return;

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
  // Validate inputs
  if (!rootNote || typeof rootNote !== 'string') return [];
  if (!typeId || typeof typeId !== 'string') return [];
  if (!Array.isArray(tuning) || tuning.length !== 6) return [];
  if (typeof numFrets !== 'number' || numFrets < 0 || numFrets > 24) return [];

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
