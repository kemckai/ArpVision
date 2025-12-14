//
//  FretboardView.swift
//  ArpVision
//
//  SwiftUI view for displaying the guitar fretboard
//

import SwiftUI

struct FretboardView: View {
    let activeNotes: [FretNote]
    let rootNote: Note
    let tuning: Tuning
    let numFrets: Int = 19
    
    private let fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
    private let strings = [0, 1, 2, 3, 4, 5] // High E to Low E
    
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
                    ForEach(1...numFrets, id: \.self) { fretNum in
                        Text("\(fretNum)")
                            .font(.system(size: 10, design: .monospaced))
                            .foregroundColor(.secondary)
                            .frame(maxWidth: .infinity)
                    }
                }
                .padding(.horizontal, 48)
                .padding(.bottom, 8)
                
                // Fretboard
                ZStack {
                    // Background
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(red: 0.16, green: 0.16, blue: 0.16))
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color.white.opacity(0.1), lineWidth: 1)
                        )
                    
                    VStack(spacing: 0) {
                        // Nut
                        Rectangle()
                            .fill(Color(white: 0.96))
                            .frame(width: 3)
                            .shadow(radius: 2)
                            .padding(.leading, 48)
                        
                        // Strings
                        ForEach(strings, id: \.self) { stringIdx in
                            HStack(spacing: 0) {
                                // String label
                                Text(getOpenStringNote(stringIdx: stringIdx).formattedWithFlat())
                                    .font(.system(size: 14, weight: .bold, design: .monospaced))
                                    .foregroundColor(.secondary)
                                    .frame(width: 40)
                                    .multilineTextAlignment(.trailing)
                                
                                // String line
                                Rectangle()
                                    .fill(Color(white: 0.53))
                                    .frame(height: stringIdx > 2 ? 2 : 1)
                                
                                // Frets and notes
                                HStack(spacing: 0) {
                                    ForEach(1...numFrets, id: \.self) { fretNum in
                                        ZStack {
                                            // Fret divider
                                            Rectangle()
                                                .fill(Color.white.opacity(0.05))
                                                .frame(width: 1)
                                            
                                            // Inlay dots
                                            if stringIdx == 2 && fretMarkers.contains(fretNum) {
                                                HStack(spacing: 4) {
                                                    Circle()
                                                        .fill(Color(white: 0.27))
                                                        .frame(width: 12, height: 12)
                                                    if fretNum == 12 {
                                                        Circle()
                                                            .fill(Color(white: 0.27))
                                                            .frame(width: 12, height: 12)
                                                    }
                                                }
                                            }
                                            
                                            // Note marker
                                            if let note = getNoteAtPos(stringIdx: stringIdx, fretIdx: fretNum) {
                                                NoteMarker(note: note)
                                            }
                                        }
                                        .frame(maxWidth: .infinity)
                                    }
                                }
                            }
                            .frame(height: 33)
                        }
                    }
                    .padding(.horizontal, 48)
                    .padding(.vertical, 24)
                }
                
                // Legend
                HStack(spacing: 24) {
                    LegendItem(color: .purple, label: "Root (R)")
                    LegendItem(color: .white, label: "3rd (3/b3)")
                    LegendItem(color: .black, label: "5th (5/b5)")
                    LegendItem(color: .purple.opacity(0.3), label: "7th (7/b7)")
                    LegendItem(color: .black, label: "Ext (2/4/6)")
                }
                .padding(.top, 24)
            }
        }
    }
}

struct NoteMarker: View {
    let note: FretNote
    
    var body: some View {
        let (backgroundColor, foregroundColor, ringColor) = getColors()
        
        Circle()
            .fill(backgroundColor)
            .frame(width: 36, height: 36)
            .overlay(
                Circle()
                    .stroke(ringColor, lineWidth: 2)
            )
            .overlay(
                Text(note.intervalName)
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(foregroundColor)
            )
            .shadow(color: backgroundColor.opacity(0.3), radius: 4)
    }
    
    private func getColors() -> (Color, Color, Color) {
        if note.isRoot {
            return (.purple, .white, .purple.opacity(0.4))
        } else if note.interval == .flatThird || note.interval == .third {
            return (.white, .black, .white.opacity(0.4))
        } else if note.interval == .fifth || note.interval == .flatFifth {
            return (.black, .white, .purple.opacity(0.4))
        } else if note.interval == .second || note.interval == .sixth {
            return (.black, .white, .white.opacity(0.3))
        } else {
            return (.purple.opacity(0.15), .white, .purple.opacity(0.6))
        }
    }
}

struct LegendItem: View {
    let color: Color
    let label: String
    
    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .fill(color)
                .frame(width: 12, height: 12)
                .overlay(
                    Circle()
                        .stroke(color.opacity(0.5), lineWidth: 1)
                )
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(.secondary)
        }
    }
}

#Preview {
    FretboardView(
        activeNotes: MusicTheory.generateFretboardMap(
            root: .c,
            arpeggioType: ArpeggioType.all[0]
        ),
        rootNote: .c,
        tuning: .standard
    )
    .padding()
    .background(Color.black)
}


