//
//  MusicTheory.swift
//  ArpVision
//
//  Music theory models and utilities for ArpVision
//

import Foundation

// MARK: - Note
enum Note: String, CaseIterable, Identifiable {
    case c = "C"
    case cSharp = "C#"
    case d = "D"
    case dSharp = "D#"
    case e = "E"
    case f = "F"
    case fSharp = "F#"
    case g = "G"
    case gSharp = "G#"
    case a = "A"
    case aSharp = "A#"
    case b = "B"
    
    var id: String { rawValue }
    
    var index: Int {
        switch self {
        case .c: return 0
        case .cSharp: return 1
        case .d: return 2
        case .dSharp: return 3
        case .e: return 4
        case .f: return 5
        case .fSharp: return 6
        case .g: return 7
        case .gSharp: return 8
        case .a: return 9
        case .aSharp: return 10
        case .b: return 11
        }
    }
    
    static func fromIndex(_ index: Int) -> Note {
        let normalizedIndex = (index % 12 + 12) % 12
        return Note.allCases[normalizedIndex]
    }
    
    func formattedWithFlat() -> String {
        let sharpToFlat: [String: String] = [
            "C#": "D♭",
            "D#": "E♭",
            "F#": "G♭",
            "G#": "A♭",
            "A#": "B♭"
        ]
        return sharpToFlat[rawValue] ?? rawValue
    }
}

// MARK: - Interval
enum Interval: Int, CaseIterable {
    case root = 0
    case flatSecond = 1
    case second = 2
    case flatThird = 3
    case third = 4
    case fourth = 5
    case flatFifth = 6
    case fifth = 7
    case sharpFifth = 8
    case sixth = 9
    case flatSeventh = 10
    case seventh = 11
    
    var name: String {
        switch self {
        case .root: return "R"
        case .flatSecond: return "b2"
        case .second: return "2"
        case .flatThird: return "b3"
        case .third: return "3"
        case .fourth: return "4"
        case .flatFifth: return "b5"
        case .fifth: return "5"
        case .sharpFifth: return "#5"
        case .sixth: return "6"
        case .flatSeventh: return "b7"
        case .seventh: return "7"
        }
    }
    
    static func fromSemitones(_ semitones: Int) -> Interval {
        let normalized = (semitones % 12 + 12) % 12
        return Interval.allCases.first { $0.rawValue == normalized } ?? .root
    }
}

// MARK: - Arpeggio Type
struct ArpeggioType: Identifiable {
    let id: String
    let name: String
    let intervals: [Int]
    
    static let all: [ArpeggioType] = [
        ArpeggioType(id: "maj", name: "Major Triad", intervals: [0, 4, 7]),
        ArpeggioType(id: "min", name: "Minor Triad", intervals: [0, 3, 7]),
        ArpeggioType(id: "dim", name: "Diminished Triad", intervals: [0, 3, 6]),
        ArpeggioType(id: "maj7", name: "Major 7", intervals: [0, 4, 7, 11]),
        ArpeggioType(id: "min7", name: "Minor 7", intervals: [0, 3, 7, 10]),
        ArpeggioType(id: "dom7", name: "Dominant 7", intervals: [0, 4, 7, 10]),
        ArpeggioType(id: "maj6", name: "Major 6", intervals: [0, 4, 7, 9]),
        ArpeggioType(id: "min6", name: "Minor 6", intervals: [0, 3, 7, 9]),
        ArpeggioType(id: "m7b5", name: "m7b5 (Half Dim)", intervals: [0, 3, 6, 10]),
        ArpeggioType(id: "dim7", name: "Diminished 7", intervals: [0, 3, 6, 9]),
        ArpeggioType(id: "maj9", name: "Major 9", intervals: [0, 4, 7, 11, 2]),
        ArpeggioType(id: "min9", name: "Minor 9", intervals: [0, 3, 7, 10, 2]),
        ArpeggioType(id: "min11", name: "Minor 11", intervals: [0, 3, 7, 10, 2, 5]),
        ArpeggioType(id: "min13", name: "Minor 13", intervals: [0, 3, 7, 10, 2, 5, 9]),
        ArpeggioType(id: "minMaj7", name: "Minor Major 7", intervals: [0, 3, 7, 11]),
        ArpeggioType(id: "minAdd9", name: "Minor Add 9", intervals: [0, 3, 7, 2]),
        ArpeggioType(id: "dom9", name: "Dominant 9", intervals: [0, 4, 7, 10, 2]),
        ArpeggioType(id: "majAdd9", name: "Major Add 9", intervals: [0, 4, 7, 2]),
        ArpeggioType(id: "majAdd11", name: "Major Add 11", intervals: [0, 4, 7, 5]),
        ArpeggioType(id: "maj69", name: "Major 6/9", intervals: [0, 4, 7, 9, 2]),
        ArpeggioType(id: "dom7b9", name: "Dom7♭9", intervals: [0, 4, 7, 10, 1]),
        ArpeggioType(id: "dom7#9", name: "Dom7#9", intervals: [0, 4, 7, 10, 3]),
        ArpeggioType(id: "dom7b5", name: "Dom7♭5", intervals: [0, 4, 6, 10]),
        ArpeggioType(id: "dom7#5", name: "Dom7#5", intervals: [0, 4, 8, 10]),
        ArpeggioType(id: "dom7b9b13", name: "Dom7♭9♭13", intervals: [0, 4, 7, 10, 1, 9]),
        ArpeggioType(id: "m7b9", name: "Min7♭9", intervals: [0, 3, 7, 10, 1]),
        ArpeggioType(id: "aug", name: "Augmented", intervals: [0, 4, 8]),
        ArpeggioType(id: "sus4", name: "Sus4", intervals: [0, 5, 7]),
        ArpeggioType(id: "sus2", name: "Sus2", intervals: [0, 2, 7])
    ]
}

// MARK: - Scale Type
struct ScaleType: Identifiable {
    let id: String
    let name: String
    let intervals: [Int]
    let category: ScaleCategory
    let description: String?
    
    enum ScaleCategory: String {
        case mode
        case pentatonic
        case minor
        case symmetric
        case exotic
        case other
    }
    
    static let modes: [ScaleType] = [
        ScaleType(id: "ionian", name: "Ionian (Major)", intervals: [0, 2, 4, 5, 7, 9, 11], category: .mode, description: "The first mode of the major scale, dating back to ancient Greece."),
        ScaleType(id: "dorian", name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10], category: .mode, description: "The second mode, with a minor third but major sixth."),
        ScaleType(id: "phrygian", name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10], category: .mode, description: "The third mode, characterized by a flattened second."),
        ScaleType(id: "lydian", name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11], category: .mode, description: "The fourth mode with a raised fourth."),
        ScaleType(id: "mixolydian", name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10], category: .mode, description: "The fifth mode, major with a flattened seventh."),
        ScaleType(id: "aeolian", name: "Aeolian (Natural Minor)", intervals: [0, 2, 3, 5, 7, 8, 10], category: .mode, description: "The sixth mode, the natural minor scale."),
        ScaleType(id: "locrian", name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10], category: .mode, description: "The seventh mode, with a diminished fifth.")
    ]
    
    static let pentatonics: [ScaleType] = [
        ScaleType(id: "majPent", name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9], category: .pentatonic, description: "Ancient five-note scale found worldwide."),
        ScaleType(id: "minPent", name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10], category: .pentatonic, description: "The most important scale in blues, rock, and metal."),
        ScaleType(id: "blues", name: "Blues Scale", intervals: [0, 3, 5, 6, 7, 10], category: .pentatonic, description: "Minor pentatonic with added 'blue note'.")
    ]
}

// MARK: - Fret Note
struct FretNote: Identifiable {
    let id = UUID()
    let note: Note
    let interval: Interval
    let fret: Int
    let string: Int // 0-5 (High E to Low E)
    let isRoot: Bool
    
    var noteName: String { note.rawValue }
    var intervalName: String { interval.name }
}

// MARK: - Tuning
struct Tuning: Identifiable {
    let id: String
    let name: String
    let notes: [Int] // High E to Low E (0-5)
    
    static let standard = Tuning(
        id: "standard",
        name: "Standard (E A D G B E)",
        notes: [4, 11, 7, 2, 9, 4] // E, B, G, D, A, E
    )
    
    static let all: [Tuning] = [
        standard,
        Tuning(id: "drop-d", name: "Drop D (E B G D A D)", notes: [4, 11, 7, 2, 9, 2]),
        Tuning(id: "half-step", name: "Eb Standard (Eb Bb Gb Db Ab Eb)", notes: [3, 10, 6, 1, 8, 3]),
        Tuning(id: "whole-step", name: "D Standard (D A F C G D)", notes: [2, 9, 5, 0, 7, 2])
    ]
}

// MARK: - Music Theory Utilities
class MusicTheory {
    static func getNoteFromInterval(root: Note, interval: Int) -> Note {
        let noteIndex = (root.index + interval) % 12
        return Note.fromIndex(noteIndex)
    }
    
    static func generateFretboardMap(
        root: Note,
        arpeggioType: ArpeggioType,
        numFrets: Int = 19,
        tuning: Tuning = .standard
    ) -> [FretNote] {
        let rootIndex = root.index
        let activeIntervals = Set(arpeggioType.intervals)
        var result: [FretNote] = []
        
        for (stringIdx, openStringNoteIndex) in tuning.notes.enumerated() {
            for fret in 0...numFrets {
                let currentNoteIndex = (openStringNoteIndex + fret) % 12
                let interval = (currentNoteIndex - rootIndex + 12) % 12
                
                if activeIntervals.contains(interval) {
                    let note = Note.fromIndex(currentNoteIndex)
                    let intervalType = Interval.fromSemitones(interval)
                    
                    result.append(FretNote(
                        note: note,
                        interval: intervalType,
                        fret: fret,
                        string: stringIdx,
                        isRoot: interval == 0
                    ))
                }
            }
        }
        
        return result
    }
    
    static func generateScaleFretboardMap(
        root: Note,
        scaleType: ScaleType,
        numFrets: Int = 19,
        tuning: Tuning = .standard
    ) -> [FretNote] {
        let rootIndex = root.index
        let activeIntervals = Set(scaleType.intervals)
        var result: [FretNote] = []
        
        for (stringIdx, openStringNoteIndex) in tuning.notes.enumerated() {
            for fret in 0...numFrets {
                let currentNoteIndex = (openStringNoteIndex + fret) % 12
                let interval = (currentNoteIndex - rootIndex + 12) % 12
                
                if activeIntervals.contains(interval) {
                    let note = Note.fromIndex(currentNoteIndex)
                    let intervalType = Interval.fromSemitones(interval)
                    
                    result.append(FretNote(
                        note: note,
                        interval: intervalType,
                        fret: fret,
                        string: stringIdx,
                        isRoot: interval == 0
                    ))
                }
            }
        }
        
        return result
    }
}


