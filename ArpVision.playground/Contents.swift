//: ArpVision Swift Playground
//: A simplified version of ArpVision for Swift Playgrounds

import SwiftUI
import PlaygroundSupport

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
        ArpeggioType(id: "dom7", name: "Dominant 7", intervals: [0, 4, 7, 10])
    ]
}

// MARK: - Fret Note
struct FretNote: Identifiable {
    let id = UUID()
    let note: Note
    let interval: Interval
    let fret: Int
    let string: Int
    let isRoot: Bool
    
    var noteName: String { note.rawValue }
    var intervalName: String { interval.name }
}

// MARK: - Tuning
struct Tuning: Identifiable {
    let id: String
    let name: String
    let notes: [Int]
    
    static let standard = Tuning(
        id: "standard",
        name: "Standard (E A D G B E)",
        notes: [4, 11, 7, 2, 9, 4]
    )
}

// MARK: - Music Theory
class MusicTheory {
    static func generateFretboardMap(
        root: Note,
        arpeggioType: ArpeggioType,
        numFrets: Int = 12,
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
}

// MARK: - Fretboard View
struct FretboardView: View {
    let activeNotes: [FretNote]
    let rootNote: Note
    let tuning: Tuning
    let numFrets: Int = 12
    
    private let strings = [0, 1, 2, 3, 4, 5]
    
    private func getNoteAtPos(stringIdx: Int, fretIdx: Int) -> FretNote? {
        return activeNotes.first { $0.string == stringIdx && $0.fret == fretIdx }
    }
    
    private func getOpenStringNote(stringIdx: Int) -> Note {
        let noteIndex = tuning.notes[stringIdx]
        return Note.fromIndex(noteIndex)
    }
    
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            VStack(spacing: 0) {
                // Fret numbers
                HStack(spacing: 0) {
                    ForEach(0...numFrets, id: \.self) { fretNum in
                        Text("\(fretNum)")
                            .font(.system(size: 10, design: .monospaced))
                            .foregroundColor(.secondary)
                            .frame(width: 30)
                    }
                }
                .padding(.leading, 40)
                .padding(.bottom, 8)
                
                // Strings
                ForEach(strings, id: \.self) { stringIdx in
                    HStack(spacing: 0) {
                        // String label
                        Text(getOpenStringNote(stringIdx: stringIdx).formattedWithFlat())
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(.secondary)
                            .frame(width: 30)
                        
                        // String line
                        Rectangle()
                            .fill(Color.gray)
                            .frame(height: 1)
                        
                        // Frets and notes
                        HStack(spacing: 0) {
                            ForEach(0...numFrets, id: \.self) { fretNum in
                                ZStack {
                                    // Fret divider
                                    Rectangle()
                                        .fill(Color.gray.opacity(0.3))
                                        .frame(width: 1)
                                    
                                    // Note marker
                                    if let note = getNoteAtPos(stringIdx: stringIdx, fretIdx: fretNum) {
                                        Circle()
                                            .fill(note.isRoot ? Color.purple : Color.blue)
                                            .frame(width: 24, height: 24)
                                            .overlay(
                                                Text(note.intervalName)
                                                    .font(.system(size: 10, weight: .bold))
                                                    .foregroundColor(.white)
                                            )
                                    }
                                }
                                .frame(width: 30)
                            }
                        }
                    }
                    .frame(height: 30)
                }
            }
            .padding()
        }
    }
}

// MARK: - Main Content View
struct ContentView: View {
    @State private var rootNote: Note = .c
    @State private var selectedArpeggioType: ArpeggioType = ArpeggioType.all[0]
    
    private var activeNotes: [FretNote] {
        MusicTheory.generateFretboardMap(
            root: rootNote,
            arpeggioType: selectedArpeggioType,
            numFrets: 12
        )
    }
    
    var body: some View {
        VStack(spacing: 20) {
            Text("ArpVision")
                .font(.system(size: 36, weight: .bold))
                .foregroundColor(.purple)
            
            Text("\(rootNote.rawValue) \(selectedArpeggioType.name)")
                .font(.title2)
                .fontWeight(.semibold)
            
            // Root Note Selector
            VStack(alignment: .leading, spacing: 8) {
                Text("Root Note")
                    .font(.headline)
                
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 8) {
                    ForEach(Note.allCases) { note in
                        Button(action: {
                            rootNote = note
                        }) {
                            Text(note.rawValue)
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(rootNote == note ? .white : .primary)
                                .frame(maxWidth: .infinity)
                                .frame(height: 40)
                                .background(
                                    rootNote == note
                                        ? Color.purple
                                        : Color.gray.opacity(0.2)
                                )
                                .cornerRadius(8)
                        }
                    }
                }
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(12)
            
            // Arpeggio Type Picker
            VStack(alignment: .leading, spacing: 8) {
                Text("Arpeggio Type")
                    .font(.headline)
                
                Picker("Arpeggio Type", selection: $selectedArpeggioType) {
                    ForEach(ArpeggioType.all) { type in
                        Text(type.name).tag(type)
                    }
                }
                .pickerStyle(.menu)
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(12)
            
            // Fretboard
            FretboardView(
                activeNotes: activeNotes,
                rootNote: rootNote,
                tuning: .standard,
                numFrets: 12
            )
            .frame(height: 250)
        }
        .padding()
    }
}

// MARK: - Playground Setup
let contentView = ContentView()
PlaygroundPage.current.setLiveView(contentView)
