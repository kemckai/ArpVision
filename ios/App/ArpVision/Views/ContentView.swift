//
//  ContentView.swift
//  ArpVision
//
//  Main SwiftUI view for ArpVision
//

import SwiftUI

struct ContentView: View {
    @State private var rootNote: Note = .c
    @State private var selectedArpeggioType: ArpeggioType = ArpeggioType.all[0]
    @State private var selectedScaleType: ScaleType? = nil
    @State private var currentTuning: Tuning = .standard
    @State private var showScales = false
    
    private var activeNotes: [FretNote] {
        if let scaleType = selectedScaleType {
            return MusicTheory.generateScaleFretboardMap(
                root: rootNote,
                scaleType: scaleType,
                tuning: currentTuning
            )
        } else {
            return MusicTheory.generateFretboardMap(
                root: rootNote,
                arpeggioType: selectedArpeggioType,
                tuning: currentTuning
            )
        }
    }
    
    private var title: String {
        if let scaleType = selectedScaleType {
            return "\(rootNote.rawValue) \(scaleType.name)"
        } else {
            return "\(rootNote.rawValue) \(selectedArpeggioType.name)"
        }
    }
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Header
                VStack(spacing: 8) {
                    Text("ArpVision")
                        .font(.system(size: 48, weight: .bold, design: .rounded))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.purple, .blue],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                    
                    Text(title)
                        .font(.system(size: 24, weight: .semibold))
                        .foregroundColor(.primary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(uiColor: .systemBackground))
                
                // Controls
                ScrollView {
                    VStack(spacing: 16) {
                        // Root Note Selector
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Root Note")
                                .font(.headline)
                                .foregroundColor(.secondary)
                            
                            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 8) {
                                ForEach(Note.allCases) { note in
                                    Button(action: {
                                        rootNote = note
                                    }) {
                                        Text(note.rawValue)
                                            .font(.system(size: 18, weight: .bold))
                                            .foregroundColor(rootNote == note ? .white : .primary)
                                            .frame(maxWidth: .infinity)
                                            .frame(height: 48)
                                            .background(
                                                rootNote == note
                                                    ? Color.purple
                                                    : Color(uiColor: .secondarySystemBackground)
                                            )
                                            .cornerRadius(8)
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(uiColor: .secondarySystemBackground))
                        .cornerRadius(12)
                        
                        // Arpeggio Type Selector
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Arpeggio Type")
                                .font(.headline)
                                .foregroundColor(.secondary)
                            
                            Picker("Arpeggio Type", selection: $selectedArpeggioType) {
                                ForEach(ArpeggioType.all) { type in
                                    Text(type.name).tag(type)
                                }
                            }
                            .pickerStyle(.menu)
                            .onChange(of: selectedArpeggioType) { _ in
                                selectedScaleType = nil
                            }
                        }
                        .padding()
                        .background(Color(uiColor: .secondarySystemBackground))
                        .cornerRadius(12)
                        
                        // Scale Type Selector
                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text("Scale Type")
                                    .font(.headline)
                                    .foregroundColor(.secondary)
                                
                                Spacer()
                                
                                Toggle("Show Scales", isOn: $showScales)
                                    .labelsHidden()
                            }
                            
                            if showScales {
                                Picker("Scale Type", selection: $selectedScaleType) {
                                    Text("None").tag(nil as ScaleType?)
                                    ForEach(ScaleType.modes) { scale in
                                        Text(scale.name).tag(scale as ScaleType?)
                                    }
                                    ForEach(ScaleType.pentatonics) { scale in
                                        Text(scale.name).tag(scale as ScaleType?)
                                    }
                                }
                                .pickerStyle(.menu)
                                .onChange(of: selectedScaleType) { newValue in
                                    if newValue != nil {
                                        // Keep arpeggio selected but show scale
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(uiColor: .secondarySystemBackground))
                        .cornerRadius(12)
                        
                        // Tuning Selector
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Tuning")
                                .font(.headline)
                                .foregroundColor(.secondary)
                            
                            Picker("Tuning", selection: $currentTuning) {
                                ForEach(Tuning.all) { tuning in
                                    Text(tuning.name).tag(tuning)
                                }
                            }
                            .pickerStyle(.menu)
                        }
                        .padding()
                        .background(Color(uiColor: .secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding()
                }
                
                // Fretboard
                FretboardView(
                    activeNotes: activeNotes,
                    rootNote: rootNote,
                    tuning: currentTuning
                )
                .frame(maxHeight: 300)
                .background(Color.black)
            }
            .navigationBarHidden(true)
        }
    }
}

#Preview {
    ContentView()
}


