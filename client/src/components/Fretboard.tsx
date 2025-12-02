import React from "react";
import { motion } from "framer-motion";
import { FretNote, NOTES, STRING_TUNING, formatNoteNameWithFlat } from "../lib/music-theory";
import { cn } from "@/lib/utils";

interface FretboardProps {
  activeNotes: FretNote[];
  rootNote: string;
  highlightPositions?: { string: number; fret: number }[];
  tuning: number[];
}

const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

export const Fretboard: React.FC<FretboardProps> = ({ activeNotes, rootNote, highlightPositions, tuning }) => {
  const numFrets = 19; // Number of visible frets (starting at fret 1)
  const strings = [0, 1, 2, 3, 4, 5]; // High E to Low E (visual top to bottom)
  
  // Helper to find if a note exists at specific string/fret
  const getNoteAtPos = (stringIdx: number, fretIdx: number) => {
    return activeNotes.find(n => n.string === stringIdx && n.fret === fretIdx);
  };

  // Helper to check if a position is highlighted
  const isHighlighted = (stringIdx: number, fretIdx: number) => {
    if (!highlightPositions) return true; // If no specific highlights, show all active notes
    return highlightPositions.some(p => p.string === stringIdx && p.fret === fretIdx);
  };

  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="min-w-[1000px] select-none p-4 pl-8"> {/* Increased width for 19 frets */}
        {/* Fret Numbers (1..numFrets), aligned visually with fret spaces */}
        <div className="flex mb-3 px-12">
          {Array.from({ length: numFrets }).map((_, i) => (
            <div key={i + 1} className="flex-1 text-center text-muted-foreground text-xs font-mono opacity-50">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="relative bg-[#2a2a2a] rounded-r-lg shadow-2xl border-y border-r border-white/10 py-6">
            {/* Nut (at the start of fret 1) — made thinner so fret 1 width matches other frets */}
            <div className="absolute left-12 top-0 bottom-0 w-[3px] bg-[#f5f5f5] z-10 shadow-md border-r border-black/40"></div>

            {/* Strings */}
            <div className="flex flex-col justify-between h-[200px] relative z-20 px-12">
                {strings.map((stringIdx) => {
                    // Get open string note name
                    const openNoteIndex = tuning[stringIdx];
                    const openNoteName = NOTES[openNoteIndex];

                    return (
                      <div key={stringIdx} className="relative w-full h-full flex items-center group">
                          {/* String Label (Left of Nut) */}
                          <div className="absolute -left-10 w-8 text-right text-sm font-bold text-muted-foreground font-mono">
                            {formatNoteNameWithFlat(openNoteName)}
                          </div>

                          {/* The String Line */}
                          <div 
                            className={cn(
                              "absolute w-full bg-[#888] shadow-sm group-hover:bg-[#bbb] transition-colors",
                              stringIdx > 2 ? "h-[2px]" : "h-[1px]" // Thicker strings for low E, A, D
                            )} 
                          />
                          
                          {/* Frets & Notes (visual frets start at 1, we skip open-string fret 0) */}
                          <div className="flex w-full h-full relative">
                              {Array.from({ length: numFrets }).map((_, fretIdx) => {
                                  const displayFret = fretIdx + 1; // actual fret number on the guitar
                                  const note = getNoteAtPos(stringIdx, displayFret);
                                  const highlighted = isHighlighted(stringIdx, displayFret);
                                  
                                  // If we have specific highlights, we ghost the other notes in the key/arpeggio
                                  const isGhost = highlightPositions && !highlighted;
                                  
                                  return (
                                      <div key={displayFret} className="flex-1 relative flex items-center justify-center border-r border-white/5 h-full">
                                          {/* Inlay Dots (positioned in the center of each fret space) */}
                                          {stringIdx === 2 && FRET_MARKERS.includes(displayFret) && (
                                            <div
                                              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
                                            >
                                              {displayFret === 12 ? (
                                                <>
                                                  <div className="w-3 h-3 rounded-full bg-[#444] shadow-inner" />
                                                  <div className="w-3 h-3 rounded-full bg-[#444] shadow-inner" />
                                                </>
                                              ) : (
                                                <div className="w-3 h-3 rounded-full bg-[#444] shadow-inner" />
                                              )}
                                            </div>
                                          )}

                                          {/* Note Marker */}
                                          {note && (
                                              <motion.div
                                                  initial={{ scale: 0, opacity: 0 }}
                                                  animate={{ 
                                                    scale: isGhost ? 0.7 : 1, 
                                                    opacity: isGhost ? 0.25 : 1 
                                                  }}
                                                  exit={{ scale: 0, opacity: 0 }}
                                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                  className={cn(
                                                      // Bigger, higher-contrast note pills for better readability
                                                      "rounded-full flex items-center justify-center font-bold shadow-lg z-30 cursor-pointer transition-all",
                                                      "w-9 h-9 md:w-10 md:h-10 text-sm md:text-base",
                                                      isGhost 
                                                        ? "ring-0 bg-black/60 text-white/40" 
                                                        : "ring-2 hover:scale-110",
                                                      // Color scheme locked to black / hot pink / white
                                                      !isGhost && note.interval === 0
                                                        ? "bg-primary text-primary-foreground ring-primary/40" // Root (R)
                                                        : !isGhost && (note.interval === 3 || note.interval === 4)
                                                        ? "bg-white text-black ring-white/40" // 3rd (3/b3)
                                                        : !isGhost && note.interval === 7
                                                        ? "bg-black text-white ring-primary/40" // 5th (5/b5)
                                                        : !isGhost && (note.interval === 2 || note.interval === 9)
                                                        ? "bg-black text-white ring-white/30" // Extensions (2/4/6/9)
                                                        : !isGhost
                                                        ? "bg-primary/15 text-white ring-primary/60 border border-primary/60" // 7ths
                                                        : ""
                                                  )}
                                                  title={`${formatNoteNameWithFlat(note.noteName)} (${note.intervalName})`}
                                                  data-testid={`note-${note.string}-${note.fret}`}
                                              >
                                                  {note.intervalName}
                                              </motion.div>
                                          )}
                                          
                                          {/* Highlight ring for specific lick notes */}
                                          {note && highlighted && highlightPositions && (
                                            <motion.div 
                                              className="absolute w-10 h-10 rounded-full border-2 border-white/50 animate-pulse z-40 pointer-events-none"
                                              initial={{ scale: 1.2, opacity: 0 }}
                                              animate={{ scale: 1, opacity: 1 }}
                                            />
                                          )}
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                    )
                })}
            </div>
        </div>
        
        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground/80 font-medium">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-sm border border-primary/60"></div>
                <span>Root (R)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white shadow-sm border border-white/40"></div>
                <span>3rd (3/b3)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-black shadow-sm border border-primary/50"></div>
                <span>5th (5/b5)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/20 shadow-sm border border-primary/70"></div>
                <span>7th (7/b7)</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-black shadow-sm border border-white/30"></div>
                <span>Ext (2/4/6)</span>
            </div>
        </div>
      </div>
    </div>
  );
};
