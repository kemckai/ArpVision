import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FretNote, NOTES, formatNoteNameWithFlat, getIntervalName } from "../lib/music-theory";
import { cn } from "@/lib/utils";

export type ChordToneDisplay = {
  noteName: string;
  interval: number;
  isBass?: boolean;
};

interface FretboardProps {
  activeNotes: FretNote[];
  rootNote: string;
  highlightPositions?: { string: number; fret: number }[];
  pairGroups?: { string: number; fret: number }[][];
  tuning: number[];
  showNoteNames?: boolean;
  leftHanded?: boolean;
  showOpenStrings?: boolean;
  fretMin?: number;
  fretMax?: number;
  activeStep?: number;
  bassInterval?: number | null;
  compact?: boolean;
  onNoteClick?: (stringIdx: number, fret: number) => void;
  chordTones?: ChordToneDisplay[];
  inversionActive?: boolean;
  hotLickMode?: boolean;
}

const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

// High E (0) thinnest → low E (5) thickest
const STRING_THICKNESS: Record<number, string> = {
  0: "h-px",
  1: "h-px",
  2: "h-[1.5px]",
  3: "h-[2px]",
  4: "h-[2.5px]",
  5: "h-[3px]",
};

export const Fretboard: React.FC<FretboardProps> = ({
  activeNotes,
  highlightPositions,
  pairGroups,
  tuning,
  showNoteNames = false,
  leftHanded = false,
  showOpenStrings = true,
  fretMin = 0,
  fretMax = 19,
  activeStep,
  bassInterval = null,
  compact = false,
  onNoteClick,
  chordTones,
  inversionActive = false,
  hotLickMode = false,
}) => {
  const displayFrets = useMemo(() => {
    const frets: number[] = [];
    if (showOpenStrings && fretMin <= 0) frets.push(0);
    for (let f = Math.max(1, fretMin); f <= fretMax; f++) frets.push(f);
    return frets;
  }, [showOpenStrings, fretMin, fretMax]);

  const strings = leftHanded ? [5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5];
  const numFretCols = displayFrets.length;

  const notesMap = useMemo(() => {
    const map = new Map<string, FretNote>();
    activeNotes.forEach((note) => map.set(`${note.string}-${note.fret}`, note));
    return map;
  }, [activeNotes]);

  const getNoteAtPos = useCallback(
    (stringIdx: number, fret: number) => notesMap.get(`${stringIdx}-${fret}`),
    [notesMap]
  );

  const highlightSet = useMemo(() => {
    if (!highlightPositions) return null;
    return new Set(highlightPositions.map((p) => `${p.string}-${p.fret}`));
  }, [highlightPositions]);

  const stepPosition =
    activeStep != null && activeStep >= 0 && highlightPositions?.[activeStep]
      ? highlightPositions[activeStep]
      : null;

  const isHighlighted = useCallback(
    (stringIdx: number, fret: number) => {
      if (!highlightSet) return true;
      return highlightSet.has(`${stringIdx}-${fret}`);
    },
    [highlightSet]
  );

  const isStepActive = (stringIdx: number, fret: number) =>
    stepPosition?.string === stringIdx && stepPosition?.fret === fret;

  const fretXPercent = useCallback(
    (colIdx: number, fret: number) => {
      if (fret === 0) return ((colIdx + 0.5) / numFretCols) * 100;
      return (colIdx / numFretCols) * 100;
    },
    [numFretCols]
  );

  const noteLeftStyle = (fret: number) =>
    fret === 0 ? "50%" : "0%";

  return (
    <div className={cn("w-full overflow-x-auto", compact ? "pb-4" : "pb-10")}>
      <div
        className={cn("select-none p-5 pl-10", compact ? "min-w-[700px]" : "min-w-[1000px]")}
      >
        <div className="flex mb-4 px-12">
          {displayFrets.map((fret) => (
            <div
              key={fret}
              className="flex-1 text-center text-muted-foreground text-xs font-mono font-semibold"
            >
              {fret === 0 ? "O" : fret}
            </div>
          ))}
        </div>

        <div
          className={cn(
            "relative bg-[#2a2218] rounded-r-lg shadow-2xl border-y border-r border-[#1a1510] overflow-hidden",
            compact ? "py-4" : "py-6"
          )}
        >
          {/* Nut */}
          <div className="absolute left-12 top-0 bottom-0 w-1.5 bg-gradient-to-r from-[#f0e6d3] via-[#fff8ee] to-[#c9b896] z-20 shadow-[2px_0_6px_rgba(0,0,0,0.5)]" />

          {/* Fret spaces + metal fret wires */}
          <div className="absolute inset-0 left-12 flex pointer-events-none z-0">
            {displayFrets.map((fret, colIdx) => (
              <div
                key={`fret-space-${fret}`}
                className={cn(
                  "flex-1 h-full",
                  colIdx % 2 === 0 ? "bg-[#3d2e1f]" : "bg-[#342818]"
                )}
              >
                {colIdx > 0 && (
                  <div className="h-full w-[3px] -ml-[1.5px] bg-gradient-to-r from-[#6b6b6b] via-[#e2e2e2] to-[#6b6b6b] shadow-[0_0_4px_rgba(255,255,255,0.15)]" />
                )}
              </div>
            ))}
          </div>

          <div
            className={cn(
              "relative z-10 px-12 grid grid-rows-6",
              compact ? "h-[168px]" : "h-[228px]"
            )}
          >
            {pairGroups && pairGroups.length > 0 && (
              <svg
                className="absolute inset-0 pointer-events-none z-25"
                style={{ left: "3rem", right: "3rem", top: 0, bottom: 0 }}
                preserveAspectRatio="none"
              >
                {pairGroups.map((pair, i) => {
                  if (pair.length !== 2) return null;
                  const [a, b] = pair;
                  const idxA = displayFrets.indexOf(a.fret);
                  const idxB = displayFrets.indexOf(b.fret);
                  if (idxA < 0 || idxB < 0) return null;
                  const strA = strings.indexOf(a.string);
                  const strB = strings.indexOf(b.string);
                  const x1 = fretXPercent(idxA, a.fret);
                  const x2 = fretXPercent(idxB, b.fret);
                  const y1 = ((strA + 0.5) / 6) * 100;
                  const y2 = ((strB + 0.5) / 6) * 100;
                  return (
                    <line
                      key={i}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="rgba(168, 85, 247, 0.7)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            )}

            {strings.map((stringIdx) => {
              const openNoteName = NOTES[tuning[stringIdx]];

              return (
                <div key={stringIdx} className="relative w-full flex items-center">
                  <div className="absolute -left-10 w-8 text-right text-sm font-bold text-muted-foreground font-mono">
                    {formatNoteNameWithFlat(openNoteName)}
                  </div>

                  <div
                    className={cn(
                      "absolute left-0 right-0 rounded-full bg-gradient-to-b from-[#e8e8e8] via-[#b8b8b8] to-[#888888] shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-20",
                      STRING_THICKNESS[stringIdx] ?? "h-px"
                    )}
                  />

                  <div className="flex w-full h-full relative z-30">
                    {displayFrets.map((displayFret, colIdx) => {
                      const note = getNoteAtPos(stringIdx, displayFret);
                      const highlighted = isHighlighted(stringIdx, displayFret);
                      const isGhost = highlightPositions && !highlighted;
                      const isStep = isStepActive(stringIdx, displayFret);
                      const isBass = bassInterval != null && note?.interval === bassInterval;

                      return (
                        <div
                          key={displayFret}
                          className="flex-1 relative h-full"
                        >
                          {stringIdx === 2 && FRET_MARKERS.includes(displayFret) && (
                            <div
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 z-0"
                            >
                              {displayFret === 12 ? (
                                <>
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1410]/70 border border-white/10 shadow-inner" />
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1410]/70 border border-white/10 shadow-inner" />
                                </>
                              ) : (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1410]/70 border border-white/10 shadow-inner" />
                              )}
                            </div>
                          )}

                          {note && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: isGhost ? 0.7 : isStep ? 1.2 : 1,
                                opacity: isGhost ? 0.25 : 1,
                              }}
                              onClick={() => onNoteClick?.(stringIdx, displayFret)}
                              style={{ left: noteLeftStyle(displayFret) }}
                              className={cn(
                                "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold shadow-lg z-30 cursor-pointer transition-all",
                                compact ? "w-7 h-7 text-xs" : "w-9 h-9 md:w-10 md:h-10 text-sm md:text-base",
                                isGhost ? "ring-0 bg-black/60 text-white/40" : "ring-2 hover:scale-110",
                                isStep && "ring-4 ring-orange-400 bg-orange-500 text-white",
                                !isGhost &&
                                  !isStep &&
                                  note.interval === 0 &&
                                  "bg-primary text-primary-foreground ring-primary/40",
                                !isGhost &&
                                  !isStep &&
                                  isBass &&
                                  "bg-primary/80 text-white ring-primary ring-4",
                                !isGhost &&
                                  !isStep &&
                                  !isBass &&
                                  (note.interval === 3 || note.interval === 4) &&
                                  "bg-white text-black ring-white/40",
                                !isGhost &&
                                  !isStep &&
                                  !isBass &&
                                  note.interval === 7 &&
                                  "bg-black text-white ring-primary/40",
                                !isGhost &&
                                  !isStep &&
                                  !isBass &&
                                  (note.interval === 2 || note.interval === 9) &&
                                  "bg-black text-white ring-white/30",
                                !isGhost &&
                                  !isStep &&
                                  !isBass &&
                                  note.interval !== 0 &&
                                  note.interval !== 3 &&
                                  note.interval !== 4 &&
                                  note.interval !== 7 &&
                                  note.interval !== 2 &&
                                  note.interval !== 9 &&
                                  "bg-primary/15 text-white ring-primary/60 border border-primary/60"
                              )}
                              title={`${formatNoteNameWithFlat(note.noteName)} (${note.intervalName})`}
                            >
                              {showNoteNames
                                ? formatNoteNameWithFlat(note.noteName).replace("♭", "b")
                                : note.intervalName}
                            </motion.div>
                          )}

                          {note && highlighted && highlightPositions && !isStep && (
                            <motion.div
                              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white/50 animate-pulse z-40 pointer-events-none"
                              style={{ left: noteLeftStyle(displayFret) }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!compact && chordTones && chordTones.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10 px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {chordTones.map((tone) => {
                const isRoot = tone.interval === 0;
                const isBass = inversionActive && tone.isBass;
                return (
                  <div
                    key={`${tone.noteName}-${tone.interval}`}
                    className={cn(
                      "flex flex-col items-center justify-center w-14 h-16 rounded-lg border transition-all",
                      isBass
                        ? "bg-primary/30 border-primary shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                        : isRoot
                        ? hotLickMode
                          ? "bg-orange-500/20 border-orange-500/50"
                          : "bg-primary/20 border-primary/50"
                        : "bg-[#333] border-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "text-lg font-bold font-display",
                        isBass
                          ? "text-primary"
                          : isRoot
                          ? hotLickMode
                            ? "text-orange-100"
                            : "text-white"
                          : "text-white/90"
                      )}
                    >
                      {formatNoteNameWithFlat(tone.noteName)}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-mono uppercase mt-0.5 font-bold">
                      {isBass ? "Bass" : isRoot ? "Root" : getIntervalName(tone.interval)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!compact && (
          <div className="mt-8 flex flex-wrap gap-8 justify-center text-sm text-muted-foreground/80 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary shadow-sm border border-primary/60" />
              <span>Root (R)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white shadow-sm border border-white/40" />
              <span>3rd</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-black shadow-sm border border-primary/50" />
              <span>5th</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/20 shadow-sm border border-primary/70" />
              <span>7th</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
