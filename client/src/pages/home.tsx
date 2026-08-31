import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import React from "react";
import {
  generateFretboardMap,
  generateLickFretboardMap,
  generateScaleFretboardMap,
  generateCagedFretboardMap,
  generateCagedScaleFretboardMap,
  generateCagedMinorFretboardMap,
  generateCagedMinorScaleFretboardMap,
  generatePentatonicBoxFretboardMap,
  generateBluesBoxFretboardMap,
  generateHarmonicMinorBoxFretboardMap,
  generateDoubleStopFretboardMap,
  getDoubleStopPairGroups,
  getInversionBassInterval,
  NOTES,
  ARPEGGIO_TYPES,
  SCALE_MODES,
  SCALE_PENTATONICS,
  CAGED_SHAPES,
  CAGED_MINOR_SHAPES,
  DOUBLE_STOP_PATTERNS,
  DoubleStopPattern,
  ALL_SCALES,
  FAMOUS_LICKS,
  Lick,
  TUNINGS,
  getChordIntervalLabel,
  getIntervalName,
  formatNoteNameWithFlat,
  getMaxInversion,
  getRotatedChordIntervals,
  INVERSION_LABELS,
  ChordInversion,
} from "@/lib/music-theory";
import { Fretboard } from "@/components/Fretboard";
import { SettingsBar } from "@/components/arpvision/SettingsBar";
import { PracticePanel } from "@/components/arpvision/PracticePanel";
import { ChordProgressionPanel } from "@/components/arpvision/ChordProgressionPanel";
import { ScaleSuggestions } from "@/components/arpvision/ScaleSuggestions";
import { LickBrowser } from "@/components/arpvision/LickBrowser";
import { CustomPatternsPanel } from "@/components/arpvision/CustomPatternsPanel";
import { loadSettings, saveSettings, AppSettings, loadCustomPatterns } from "@/lib/app-settings";
import { parseUrlState, syncUrl, UrlState } from "@/lib/url-state";
import { playSequence, playNote } from "@/lib/audio-engine";
import { SWEEP_PATTERNS, TAPPING_PATTERNS } from "@/lib/practice-data";
import { ProgressionChord } from "@/lib/chord-progressions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Guitar, Flame } from "lucide-react";

export default function Home() {
  const [root, setRoot] = useState("C");
  const [type, setType] = useState("maj");
  const [activeLick, setActiveLick] = useState<Lick | null>(null);
  const [activeModeId, setActiveModeId] = useState<string | null>(null);
  const [activePentatonicId, setActivePentatonicId] = useState<string | null>(null);
  const [activeCagedId, setActiveCagedId] = useState<string | null>(null);
  const [activeDoubleStopId, setActiveDoubleStopId] = useState<string | null>(null);
  const [cagedMode, setCagedMode] = useState<"triad" | "scale">("triad"); // CAGED triad or scale
  const [cagedQuality, setCagedQuality] = useState<"major" | "minor">("major"); // CAGED major or minor
  const [activePentBox, setActivePentBox] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [selectedScaleId, setSelectedScaleId] = useState<string | null>(null);
  const [inversion, setInversion] = useState<ChordInversion>(0);
  const [currentTuning, setCurrentTuning] = useState(TUNINGS[0]);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [progressionId, setProgressionId] = useState<string | null>(null);
  const [progressionChordIndex, setProgressionChordIndex] = useState<number | null>(null);
  const [activeTechniqueId, setActiveTechniqueId] = useState<string | null>(null);
  const [activeBluesBox, setActiveBluesBox] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [activeHarmBox, setActiveHarmBox] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [lickStep, setLickStep] = useState(-1);
  const [isPlayingLick, setIsPlayingLick] = useState(false);
  const stopPlayRef = useRef<(() => void) | null>(null);

  const isArpeggioMode =
    !activeLick &&
    !activeCagedId &&
    !activeDoubleStopId &&
    !activeTechniqueId &&
    !selectedScaleId &&
    !activeModeId &&
    !activePentatonicId &&
    !activeBluesBox &&
    !activeHarmBox;

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const url = parseUrlState(window.location.search);
    if (url.root && NOTES.includes(url.root)) setRoot(url.root);
    if (url.type && ARPEGGIO_TYPES.some((a) => a.id === url.type)) setType(url.type);
    if (url.scale && ALL_SCALES.some((s) => s.id === url.scale)) setSelectedScaleId(url.scale);
    if (url.mode && SCALE_MODES.some((m) => m.id === url.mode)) setActiveModeId(url.mode);
    if (url.pent && SCALE_PENTATONICS.some((p) => p.id === url.pent)) setActivePentatonicId(url.pent);
    if (url.caged && ["C", "A", "G", "E", "D"].includes(url.caged)) setActiveCagedId(url.caged);
    if (url.cagedQuality === "minor") setCagedQuality("minor");
    if (url.cagedMode === "scale") setCagedMode("scale");
    if (url.diad && DOUBLE_STOP_PATTERNS.some((p) => p.id === url.diad)) setActiveDoubleStopId(url.diad);
    if (url.inversion) {
      const inv = Number(url.inversion);
      if (inv === 1 || inv === 2) setInversion(inv);
    }
    if (url.lick) {
      const lick =
        FAMOUS_LICKS.find((l) => l.id === url.lick) ??
        loadCustomPatterns()
          .filter((p) => p.id === url.lick)
          .map((p) => ({
            id: p.id,
            artist: "Custom",
            name: p.name,
            description: "User-saved pattern",
            root: p.root,
            type: p.type,
            positions: p.positions,
          }))[0];
      if (lick) setActiveLick(lick);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopPlayRef.current?.();
    };
  }, []);

  useEffect(() => {
    syncUrl({
      root,
      type: isArpeggioMode ? type : undefined,
      scale: selectedScaleId ?? undefined,
      mode: activeModeId ?? undefined,
      pent: activePentatonicId ?? undefined,
      caged: activeCagedId ?? undefined,
      cagedQuality: activeCagedId ? cagedQuality : undefined,
      cagedMode: activeCagedId ? cagedMode : undefined,
      diad: activeDoubleStopId ?? undefined,
      inversion: isArpeggioMode && inversion > 0 ? String(inversion) : undefined,
      lick: activeLick?.id,
    });
  }, [root, type, selectedScaleId, activeModeId, activePentatonicId, activeCagedId, cagedQuality, cagedMode, activeDoubleStopId, inversion, activeLick, isArpeggioMode]);

  const currentArpeggio = ARPEGGIO_TYPES.find((t) => t.id === type);
  const maxInversion = currentArpeggio
    ? getMaxInversion(currentArpeggio.intervals)
    : 0;
  const effectiveInversion = Math.min(inversion, maxInversion) as ChordInversion;

  useEffect(() => {
    if (inversion > maxInversion) {
      setInversion(maxInversion as ChordInversion);
    }
  }, [inversion, maxInversion]);

  // Generate active notes based on priority: Hot Lick > CAGED > Pentatonic Box > Scale > Mode > Pentatonic > Arpeggio
  // Memoized to prevent unnecessary recalculations
  const activeNotes = useMemo(() => {
    if (activeLick) {
      return generateLickFretboardMap(
        activeLick.root,
        activeLick.positions || [],
        currentTuning.notes
      );
    }
    if (activeCagedId) {
      if (cagedQuality === "minor") {
        return cagedMode === "scale"
          ? generateCagedMinorScaleFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", 19, currentTuning.notes)
          : generateCagedMinorFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", currentTuning.notes);
      }
      return cagedMode === "scale"
        ? generateCagedScaleFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", 19, currentTuning.notes)
        : generateCagedFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", currentTuning.notes);
    }
    if (activeDoubleStopId) {
      return generateDoubleStopFretboardMap(root, activeDoubleStopId, currentTuning.notes);
    }
    if (activeTechniqueId) {
      const pattern =
        SWEEP_PATTERNS.find((p) => p.id === activeTechniqueId) ??
        TAPPING_PATTERNS.find((p) => p.id === activeTechniqueId);
      if (pattern) {
        return generateLickFretboardMap(pattern.root, pattern.positions, currentTuning.notes);
      }
    }
    if (activeBluesBox) {
      return generateBluesBoxFretboardMap(root, activeBluesBox, 24, currentTuning.notes);
    }
    if (activeHarmBox) {
      return generateHarmonicMinorBoxFretboardMap(root, activeHarmBox, 24, currentTuning.notes);
    }
    if (activePentatonicId === "minPent" && activePentBox) {
      return generatePentatonicBoxFretboardMap(
        root,
        activePentBox,
        19,
        currentTuning.notes
      );
    }
    if (selectedScaleId) {
      return generateScaleFretboardMap(root, selectedScaleId, 19, currentTuning.notes);
    }
    if (activePentatonicId) {
      return generateScaleFretboardMap(root, activePentatonicId, 19, currentTuning.notes);
    }
    if (activeModeId) {
      return generateScaleFretboardMap(root, activeModeId, 19, currentTuning.notes);
    }
    return generateFretboardMap(
      root,
      type,
      19,
      currentTuning.notes,
      isArpeggioMode ? effectiveInversion : 0
    );
  }, [
    activeLick,
    activeCagedId,
    activeDoubleStopId,
    activeTechniqueId,
    activeBluesBox,
    activeHarmBox,
    cagedQuality,
    cagedMode,
    root,
    activePentatonicId,
    activePentBox,
    selectedScaleId,
    activeModeId,
    type,
    effectiveInversion,
    isArpeggioMode,
    currentTuning.notes,
  ]);

  const filteredActiveNotes = useMemo(
    () =>
      activeNotes.filter(
        (n) => n.fret >= settings.fretMin && n.fret <= settings.fretMax
      ),
    [activeNotes, settings.fretMin, settings.fretMax]
  );

  const compareNotes = useMemo(() => {
    if (!settings.compareMode) return [];
    return generateFretboardMap(
      settings.compareRoot,
      settings.compareType,
      settings.fretMax,
      currentTuning.notes
    ).filter((n) => n.fret >= settings.fretMin && n.fret <= settings.fretMax);
  }, [settings, currentTuning.notes]);

  const bassInterval =
    isArpeggioMode && effectiveInversion > 0 && currentArpeggio
      ? getInversionBassInterval(currentArpeggio.intervals, effectiveInversion)
      : null;

  const shareUrlState = useMemo<UrlState>(
    () => ({
      root,
      type: isArpeggioMode ? type : undefined,
      scale: selectedScaleId ?? undefined,
      mode: activeModeId ?? undefined,
      pent: activePentatonicId ?? undefined,
      caged: activeCagedId ?? undefined,
      cagedQuality: activeCagedId ? cagedQuality : undefined,
      cagedMode: activeCagedId ? cagedMode : undefined,
      diad: activeDoubleStopId ?? undefined,
      inversion: isArpeggioMode && inversion > 0 ? String(inversion) : undefined,
      lick: activeLick?.id,
    }),
    [
      root,
      type,
      selectedScaleId,
      activeModeId,
      activePentatonicId,
      activeCagedId,
      cagedQuality,
      cagedMode,
      activeDoubleStopId,
      inversion,
      activeLick,
      isArpeggioMode,
    ]
  );

  const clearSecondaryModes = useCallback(() => {
    setActiveTechniqueId(null);
    setActiveBluesBox(null);
    setActiveHarmBox(null);
    setProgressionId(null);
    setProgressionChordIndex(null);
  }, []);

  const playLick = useCallback(
    (lick: Lick) => {
      if (isPlayingLick && activeLick?.id === lick.id) {
        stopPlayRef.current?.();
        stopPlayRef.current = null;
        setIsPlayingLick(false);
        setLickStep(-1);
        return;
      }

      if (!settings.audioEnabled || !lick.positions?.length) return;
      stopPlayRef.current?.();
      setRoot(lick.root);
      setType(lick.type);
      setActiveLick(lick);
      setActiveModeId(null);
      setActivePentatonicId(null);
      setActiveCagedId(null);
      setActiveDoubleStopId(null);
      setActivePentBox(null);
      setSelectedScaleId(null);
      clearSecondaryModes();
      setIsPlayingLick(true);
      stopPlayRef.current = playSequence(
        lick.positions,
        currentTuning.notes,
        350,
        (step) => {
          setLickStep(step);
          if (step < 0) setIsPlayingLick(false);
        }
      );
    },
    [settings.audioEnabled, currentTuning.notes, clearSecondaryModes, isPlayingLick, activeLick?.id]
  );

  const handleNoteClick = useCallback(
    (stringIdx: number, fret: number) => {
      if (!settings.audioEnabled) return;
      playNote(currentTuning.notes[stringIdx], fret, currentTuning.notes, stringIdx);
    },
    [settings.audioEnabled, currentTuning.notes]
  );

  // Get current scale for display - MUST be defined before fretboardTitleLabel
  const currentScale = selectedScaleId
    ? ALL_SCALES.find((s) => s.id === selectedScaleId)
    : activeModeId
    ? SCALE_MODES.find((m) => m.id === activeModeId)
    : activePentatonicId
    ? SCALE_PENTATONICS.find((p) => p.id === activePentatonicId)
    : null;

  const currentMode = activeModeId
    ? SCALE_MODES.find((m) => m.id === activeModeId)
    : null;
  const currentPent = activePentatonicId
    ? SCALE_PENTATONICS.find((p) => p.id === activePentatonicId)
    : null;
  const currentCagedShape = activeCagedId
    ? (cagedQuality === "minor"
        ? CAGED_MINOR_SHAPES.find((s) => s.id === activeCagedId)
        : CAGED_SHAPES.find((s) => s.id === activeCagedId))
    : null;
  const currentDoubleStop = activeDoubleStopId
    ? DOUBLE_STOP_PATTERNS.find((p) => p.id === activeDoubleStopId)
    : null;

  const doubleStopPairGroups = useMemo(() => {
    if (!activeDoubleStopId) return undefined;
    return getDoubleStopPairGroups(root, activeDoubleStopId);
  }, [activeDoubleStopId, root]);

  // Human-readable label for what's on the fretboard
  const fretboardTitleLabel = (() => {
    if (activeLick) {
      return `${activeLick.artist} – ${activeLick.name}`;
    }
    if (currentCagedShape) {
      const quality = cagedQuality === "minor" ? "Minor" : "Major";
      const type = cagedMode === "scale" ? " Scale" : "";
      return `${root} ${quality}${type}  –  ${currentCagedShape.name}`;
    }
    if (currentDoubleStop) {
      return `${root} ${currentDoubleStop.name}  –  ${currentDoubleStop.stringSet}`;
    }
    if (activeTechniqueId) {
      const p =
        SWEEP_PATTERNS.find((x) => x.id === activeTechniqueId) ??
        TAPPING_PATTERNS.find((x) => x.id === activeTechniqueId);
      if (p) return `${p.root} ${p.name}`;
    }
    if (activeBluesBox) return `${root} Blues Scale – Box ${activeBluesBox}`;
    if (activeHarmBox) return `${root} Harmonic Minor – Box ${activeHarmBox}`;
    if (currentScale) {
      return `${root} ${currentScale.name}`;
    }
    if (currentPent) {
      return `${root} ${currentPent.name}`;
    }
    if (currentMode) {
      return `${root} ${currentMode.name}`;
    }
    if (currentArpeggio) {
      const invLabel =
        effectiveInversion > 0
          ? ` – ${INVERSION_LABELS[effectiveInversion]}`
          : "";
      return `${root} ${currentArpeggio.name}${invLabel}`;
    }
    return root;
  })();

  // Theory panel data - optimized to use activeNotes instead of recalculating
  const chordTones = useMemo(() => {
    // For arpeggios, calculate from intervals directly (most efficient)
    if (currentArpeggio && isArpeggioMode) {
      const rotated = getRotatedChordIntervals(
        currentArpeggio.intervals,
        effectiveInversion
      );
      const bassInterval = rotated[0];
      return rotated.map((interval) => {
        const noteName = NOTES[(NOTES.indexOf(root) + interval) % 12];
        return { noteName, interval, isBass: interval === bassInterval };
      });
    }
    // For arpeggios outside inversion mode, calculate from intervals directly
    if (
      currentArpeggio &&
      !isArpeggioMode &&
      !activeLick &&
      !currentCagedShape &&
      !currentDoubleStop &&
      !currentScale &&
      !currentPent &&
      !currentMode
    ) {
      return currentArpeggio.intervals.map((interval) => {
        const noteName = NOTES[(NOTES.indexOf(root) + interval) % 12];
        return { noteName, interval, isBass: false };
      });
    }
    // For everything else, use activeNotes (already calculated and memoized)
    return Array.from(
      new Map(
        activeNotes.map((n) => [
          n.noteIndex,
          { noteName: n.noteName, interval: n.interval },
        ])
      ).values()
    ).sort((a, b) => a.interval - b.interval);
  }, [activeNotes, currentArpeggio, root, activeLick, currentCagedShape, currentDoubleStop, currentScale, currentPent, currentMode, isArpeggioMode, effectiveInversion]);

  const selectLick = useCallback((lick: Lick) => {
    stopPlayRef.current?.();
    setIsPlayingLick(false);
    setLickStep(-1);
    setRoot(lick.root);
    setType(lick.type);
    setActiveLick(lick);
    setActiveModeId(null);
    setActivePentatonicId(null);
    setActiveCagedId(null);
    setActiveDoubleStopId(null);
    setActivePentBox(null);
    setSelectedScaleId(null);
    clearSecondaryModes();
    setLickStep(-1);
  }, [clearSecondaryModes]);

  const handleManualChange = useCallback((action: () => void) => {
    setActiveLick(null);
    setActiveModeId(null);
    setActivePentatonicId(null);
    setActiveCagedId(null);
    setActiveDoubleStopId(null);
    setActivePentBox(null);
    setSelectedScaleId(null);
    clearSecondaryModes();
    setLickStep(-1);
    action();
  }, [clearSecondaryModes]);

  const handleProgressionChord = useCallback((chord: ProgressionChord, index: number) => {
    setProgressionChordIndex(index);
    setRoot(chord.root);
    setType(chord.type);
    setActiveLick(null);
    setActiveModeId(null);
    setActivePentatonicId(null);
    setActiveCagedId(null);
    setActiveDoubleStopId(null);
    setSelectedScaleId(null);
    setActiveTechniqueId(null);
    setActiveBluesBox(null);
    setActiveHarmBox(null);
  }, []);

  const handleRootChange = useCallback((newRoot: string) => {
    // Validate root note - silently ignore invalid inputs
    if (!NOTES.includes(newRoot)) {
      return;
    }
    setRoot(newRoot);
    // Preserve scale selection when changing root
  }, []);

  // Organize scales by category for the dropdown - memoized to prevent recalculation
  const scalesByCategory = useMemo(() => ({
    mode: ALL_SCALES.filter((s) => s.category === "mode"),
    pentatonic: ALL_SCALES.filter((s) => s.category === "pentatonic"),
    minor: ALL_SCALES.filter((s) => s.category === "minor"),
    symmetric: ALL_SCALES.filter((s) => s.category === "symmetric"),
    exotic: ALL_SCALES.filter((s) => s.category === "exotic"),
    other: ALL_SCALES.filter((s) => s.category === "other"),
  }), []);

  const renderArpButton = (arpId: string) => {
    const arp = ARPEGGIO_TYPES.find((a) => a.id === arpId);
    if (!arp) return null;

    return (
      <Button
        key={arp.id}
        variant={type === arp.id && !activeLick ? "secondary" : "ghost"}
        onClick={() => handleManualChange(() => setType(arp.id))}
        className={cn(
          "justify-start text-left h-auto py-3.5 px-4 transition-all w-full mb-3 group",
          type === arp.id && !activeLick
            ? "bg-accent text-accent-foreground border-l-4 border-primary"
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span
              className={cn(
                "font-bold group-hover:text-foreground whitespace-nowrap",
                type === arp.id && !activeLick ? "text-primary" : ""
              )}
            >
              {arp.name}
            </span>
            <span className="text-xs opacity-70 font-mono text-muted-foreground/80 group-hover:text-muted-foreground whitespace-nowrap">
              {arp.intervals
                .map((i) => getChordIntervalLabel(i, arp.intervals))
                .join(" - ")}
            </span>
          </div>
          {type === arp.id && !activeLick && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          )}
        </div>
      </Button>
    );
  };

  const renderModeButton = (modeId: string) => {
    const mode = SCALE_MODES.find((m) => m.id === modeId);
    if (!mode) return null;

    return (
      <Button
        key={mode.id}
        variant={
          activeModeId === mode.id && !activeLick ? "secondary" : "ghost"
        }
        onClick={() => {
          setActiveLick(null);
          setActiveModeId(mode.id);
          setActivePentatonicId(null);
          setActiveCagedId(null);
          setActiveDoubleStopId(null);
          setActivePentBox(null);
          setSelectedScaleId(null);
        }}
        className={cn(
          "justify-start text-left h-auto py-3.5 px-4 transition-all w-full mb-3 group",
          activeModeId === mode.id && !activeLick
            ? "bg-accent text-accent-foreground border-l-4 border-primary"
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span
              className={cn(
                "font-bold group-hover:text-foreground whitespace-nowrap",
                activeModeId === mode.id && !activeLick ? "text-primary" : ""
              )}
            >
              {mode.name}
            </span>
            <span className="text-xs opacity-70 font-mono text-muted-foreground/80 group-hover:text-muted-foreground whitespace-nowrap">
              {mode.intervals
                .map((i) => (i === 0 ? "R" : getIntervalName(i)))
                .join(" - ")}
            </span>
          </div>
          {activeModeId === mode.id && !activeLick && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          )}
        </div>
      </Button>
    );
  };

  const renderPentButton = (pentId: string) => {
    const pent = SCALE_PENTATONICS.find((p) => p.id === pentId);
    if (!pent) return null;

    return (
      <Button
        key={pent.id}
        variant={
          activePentatonicId === pent.id && !activeLick ? "secondary" : "ghost"
        }
        onClick={() => {
          setActiveLick(null);
          setActiveModeId(null);
          setActivePentatonicId(pent.id);
          setActivePentBox(null);
          setActiveDoubleStopId(null);
          setSelectedScaleId(null);
        }}
        className={cn(
          "justify-start text-left h-auto py-3.5 px-4 transition-all w-full mb-3 group",
          activePentatonicId === pent.id && !activeLick
            ? "bg-accent text-accent-foreground border-l-4 border-primary"
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span
              className={cn(
                "font-bold group-hover:text-foreground whitespace-nowrap",
                activePentatonicId === pent.id && !activeLick
                  ? "text-primary"
                  : ""
              )}
            >
              {pent.name}
            </span>
            <span className="text-xs opacity-70 font-mono text-muted-foreground/80 group-hover:text-muted-foreground whitespace-nowrap">
              {pent.intervals
                .map((i) => (i === 0 ? "R" : getIntervalName(i)))
                .join(" - ")}
            </span>
          </div>
          {activePentatonicId === pent.id && !activeLick && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          )}
        </div>
      </Button>
    );
  };

  const renderCagedButton = (shapeId: string) => {
    const shape = cagedQuality === "minor"
      ? CAGED_MINOR_SHAPES.find((s) => s.id === shapeId)
      : CAGED_SHAPES.find((s) => s.id === shapeId);
    if (!shape) return null;

    return (
      <Button
        key={shape.id}
        variant={
          activeCagedId === shape.id && !activeLick ? "secondary" : "ghost"
        }
        onClick={() => {
          setActiveLick(null);
          setActiveCagedId(shape.id);
          setActiveDoubleStopId(null);
          setActiveModeId(null);
          setActivePentatonicId(null);
          setActivePentBox(null);
          setSelectedScaleId(null);
        }}
        className={cn(
          "justify-start text-left h-auto py-3.5 px-4 transition-all w-full mb-3 group",
          activeCagedId === shape.id && !activeLick
            ? "bg-accent text-accent-foreground border-l-4 border-primary"
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span
              className={cn(
                "font-bold group-hover:text-foreground whitespace-nowrap",
                activeCagedId === shape.id && !activeLick ? "text-primary" : ""
              )}
            >
              {shape.name}
            </span>
            <span className="text-xs opacity-70 font-mono text-muted-foreground/80 group-hover:text-muted-foreground whitespace-nowrap">
              {cagedMode === "scale"
                ? cagedQuality === "minor"
                  ? "R - 2 - b3 - 4 - 5 - b6 - b7"
                  : "R - 2 - 3 - 4 - 5 - 6 - 7"
                : cagedQuality === "minor"
                ? "R - b3 - 5"
                : "R - 3 - 5"}
            </span>
          </div>
          {activeCagedId === shape.id && !activeLick && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          )}
        </div>
      </Button>
    );
  };

  const doubleStopCategories: { key: DoubleStopPattern["category"]; label: string }[] = [
    { key: "thirds", label: "3rds" },
    { key: "sixths", label: "6ths" },
    { key: "fourths", label: "4ths" },
    { key: "fifths", label: "5ths" },
    { key: "octaves", label: "Octaves" },
  ];

  const renderDoubleStopButton = (patternId: string) => {
    const pattern = DOUBLE_STOP_PATTERNS.find((p) => p.id === patternId);
    if (!pattern) return null;

    const intervalLabel = pattern.intervalPair
      .map((i) => (i === 0 ? "R" : getIntervalName(i)))
      .join(" + ");

    return (
      <Button
        key={pattern.id}
        variant={
          activeDoubleStopId === pattern.id && !activeLick ? "secondary" : "ghost"
        }
        onClick={() => {
          setActiveLick(null);
          setActiveDoubleStopId(pattern.id);
          setActiveModeId(null);
          setActivePentatonicId(null);
          setActiveCagedId(null);
          setActivePentBox(null);
          setSelectedScaleId(null);
        }}
        className={cn(
          "justify-start text-left h-auto py-3.5 px-4 transition-all w-full mb-3 group",
          activeDoubleStopId === pattern.id && !activeLick
            ? "bg-accent text-accent-foreground border-l-4 border-primary"
            : "hover:bg-accent/50 text-muted-foreground"
        )}
      >
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-bold group-hover:text-foreground whitespace-nowrap",
                  activeDoubleStopId === pattern.id && !activeLick ? "text-primary" : ""
                )}
              >
                {pattern.name}
              </span>
              <span className="text-xs opacity-70 font-mono text-muted-foreground/80">
                {pattern.stringSet}
              </span>
            </div>
            <span className="text-xs opacity-70 font-mono text-muted-foreground/80">
              {intervalLabel}
            </span>
          </div>
          {activeDoubleStopId === pattern.id && !activeLick && (
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          )}
        </div>
      </Button>
    );
  };

  const triads = ["maj", "min", "dim", "sus2", "sus4", "aug"];
  const sevenths = [
    "maj7",
    "min7",
    "dom7",
    "m7b5",
    "dim7",
    "minMaj7",
  ];
  const ninths = [
    "maj9",
    "min9",
    "dom9",
    "majAdd9",
    "minAdd9",
    "maj69",
    "dom7b9",
    "dom7#9",
    "m7b9",
  ];
  const thirteenths = [
    "maj13",
    "dom13",
    "min13",
    "dom13b9",
    "dom7b9b13",
  ];
  const extended = [
    "maj6",
    "min6",
    "min11",
    "majAdd11",
    "dom7b5",
    "dom7#5",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-10 font-sans selection:bg-primary/30">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 mb-2">
          <div>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              ArpVision
            </h1>
            <p className="text-muted-foreground mt-1 text-lg font-light tracking-wide">
              Guitar Fretboard Visualizer
            </p>
          </div>

          <div className="flex items-center gap-3 bg-secondary/30 p-1.5 pr-4 rounded-full border border-white/5 backdrop-blur-sm">
            <div className="bg-secondary rounded-full p-2">
              <Guitar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wider leading-tight">
                Tuning
              </span>
              <Select
                value={currentTuning.id}
                onValueChange={(val) =>
                  setCurrentTuning(
                    TUNINGS.find((t) => t.id === val) || TUNINGS[0]
                  )
                }
              >
                <SelectTrigger className="h-6 border-none bg-transparent p-0 text-sm font-medium text-foreground focus:ring-0 gap-2 shadow-none hover:bg-transparent w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TUNINGS.map((t) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="font-mono text-xs"
                    >
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Key & scale selection */}
            <div className="space-y-5">
            <Card className="border-white/10 bg-card/40 backdrop-blur-xl shadow-xl">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Root Note
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-4 gap-2.5">
                  {NOTES.map((note) => (
                    <Button
                      key={note}
                      variant={root === note ? "default" : "outline"}
                      onClick={() => handleRootChange(note)}
                      className={cn(
                        "w-full font-bold transition-all h-12 text-lg",
                        root === note
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                          : "hover:bg-secondary border-white/5 hover:border-white/10"
                      )}
                    >
                      {note}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scale Selector */}
            <Card className="border-white/10 bg-card/40 backdrop-blur-xl shadow-xl">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <Select
                  value={selectedScaleId || "none"}
                  onValueChange={(val) => {
                    if (val === "none") {
                      setSelectedScaleId(null);
                      setActiveModeId(null);
                      setActivePentatonicId(null);
                      setActivePentBox(null);
                      return;
                    }

                    const scale = ALL_SCALES.find((s) => s.id === val);
                    if (!scale) return;

                    setActiveLick(null);
                    setActiveCagedId(null);
                    setActiveDoubleStopId(null);
                    setActivePentBox(null);
                    setActiveModeId(null);
                    setActivePentatonicId(null);
                    setSelectedScaleId(scale.id);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose scale">
                      {selectedScaleId && ALL_SCALES.find((s) => s.id === selectedScaleId)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-72 overflow-y-auto">
                    <SelectItem value="none">None</SelectItem>
                    {Object.entries(scalesByCategory).map(([category, scales]) => {
                      if (scales.length === 0) return null;
                      const categoryLabels: Record<string, string> = {
                        mode: "Modes",
                        pentatonic: "Pentatonics & Blues",
                        minor: "Minor Scales",
                        symmetric: "Symmetric Scales",
                        exotic: "Exotic & World",
                        other: "Other Scales",
                      };
                      return (
                        <React.Fragment key={category}>
                          <div className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                            {categoryLabels[category]}
                          </div>
                          {scales.map((s) => (
                            <SelectItem 
                              key={s.id} 
                              value={s.id}
                              className="py-3 h-auto min-h-[60px]"
                              textValue={s.name}
                            >
                              <div className="flex flex-col items-start w-full pr-6 pointer-events-none">
                                <span className="font-medium text-sm">{s.name}</span>
                                {s.description && (
                                  <span className="text-[10px] text-muted-foreground/70 mt-1 leading-tight line-clamp-2">
                                    {s.description}
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            </div>

            {/* Display & practice tools */}
            <div className="space-y-5 border-t border-white/5 pt-10">
            <SettingsBar
              settings={settings}
              onChange={updateSettings}
              urlState={shareUrlState}
            />

            <PracticePanel
              audioEnabled={settings.audioEnabled}
              onSelectBackingKey={(key, chordType) => {
                setRoot(key);
                setType(chordType);
                setActiveLick(null);
                setSelectedScaleId(null);
                setActiveModeId(null);
              }}
            />
            </div>

            {/* Theory & progressions */}
            <div className="space-y-5 border-t border-white/5 pt-10">
            <ChordProgressionPanel
              progressionId={progressionId}
              onSelectProgression={setProgressionId}
              activeChordIndex={progressionChordIndex}
              onSelectChord={handleProgressionChord}
            />

            {isArpeggioMode && (
              <ScaleSuggestions
                chordType={type}
                onSelectScale={(id) => {
                  setSelectedScaleId(id);
                  setActiveModeId(null);
                  setActivePentatonicId(null);
                }}
              />
            )}
            </div>

            <div className="border-t border-white/5 pt-10">
            <CustomPatternsPanel onSelect={selectLick} />
            </div>

            {/* Chord Type Selector with Tabs */}
            <div className="border-t border-white/5 pt-10">
            <Card className="border-white/10 bg-card/40 backdrop-blur-xl shadow-xl flex flex-col min-h-[560px]">
              <CardHeader className="pb-3 pt-5 px-5">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Arpeggio Type
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0 px-5 pb-5">
                <Tabs defaultValue="triads" className="h-full flex flex-col gap-4">
                  <TabsList className="flex h-auto w-full flex-wrap gap-1.5 bg-secondary/50 p-2">
                    <TabsTrigger value="triads" className="text-xs px-2.5 py-1.5">Triads</TabsTrigger>
                    <TabsTrigger value="7ths" className="text-xs px-2.5 py-1.5">7ths</TabsTrigger>
                    <TabsTrigger value="9ths" className="text-xs px-2.5 py-1.5">9ths</TabsTrigger>
                    <TabsTrigger value="13ths" className="text-xs px-2.5 py-1.5">13ths</TabsTrigger>
                    <TabsTrigger value="extended" className="text-xs px-2.5 py-1.5">Ext.</TabsTrigger>
                    <TabsTrigger value="modes" className="text-xs px-2.5 py-1.5">Modes</TabsTrigger>
                    <TabsTrigger value="pents" className="text-xs px-2.5 py-1.5">Pents</TabsTrigger>
                    <TabsTrigger value="caged" className="text-xs px-2.5 py-1.5">CAGED</TabsTrigger>
                    <TabsTrigger value="diads" className="text-xs px-2.5 py-1.5">Diads</TabsTrigger>
                    <TabsTrigger value="sweep" className="text-xs px-2.5 py-1.5">Sweep</TabsTrigger>
                    <TabsTrigger value="tap" className="text-xs px-2.5 py-1.5">Tap</TabsTrigger>
                    <TabsTrigger value="boxes" className="text-xs px-2.5 py-1.5">Boxes</TabsTrigger>
                    <TabsTrigger
                      value="licks"
                      className="text-xs px-2.5 py-1.5 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      <Flame className="w-3.5 h-3.5 mr-1" /> Licks
                    </TabsTrigger>
                  </TabsList>

                  {isArpeggioMode && (
                    <div className="pb-4 border-b border-white/10">
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                        Inversion
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {([0, 1, 2] as ChordInversion[]).map((inv) => (
                          <Button
                            key={inv}
                            variant={
                              effectiveInversion === inv ? "default" : "outline"
                            }
                            disabled={inv > maxInversion}
                            onClick={() => setInversion(inv)}
                            className="text-xs h-8"
                          >
                            {inv === 0 ? "Root" : `${inv}${inv === 1 ? "st" : "nd"}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex-1 overflow-hidden relative rounded-md border border-white/5 bg-black/20 min-h-[280px]">
                    <ScrollArea className="h-full w-full p-3">
                      <TabsContent
                        value="triads"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {triads.map(renderArpButton)}
                      </TabsContent>
                      <TabsContent
                        value="7ths"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {sevenths.map(renderArpButton)}
                      </TabsContent>
                      <TabsContent
                        value="9ths"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {ninths.map(renderArpButton)}
                      </TabsContent>
                      <TabsContent
                        value="13ths"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {thirteenths.map(renderArpButton)}
                      </TabsContent>
                      <TabsContent
                        value="extended"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {extended.map(renderArpButton)}
                      </TabsContent>
                      <TabsContent
                        value="modes"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {SCALE_MODES.map((m) => renderModeButton(m.id))}
                      </TabsContent>
                      <TabsContent
                        value="pents"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {SCALE_PENTATONICS.map((p) => renderPentButton(p.id))}
                        {activePentatonicId === "minPent" && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                              Boxes
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3, 4, 5].map((box) => (
                                <Button
                                  key={box}
                                  variant={
                                    activePentBox === box ? "default" : "outline"
                                  }
                                  onClick={() => {
                                    setActivePentBox(
                                      activePentBox === box ? null : (box as 1 | 2 | 3 | 4 | 5)
                                    );
                                  }}
                                  className="text-xs"
                                >
                                  {box === 1 ? "All" : `Box ${box}`}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent
                        value="caged"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        <div className="mb-3 pb-3 border-b border-white/10 space-y-3">
                          <div>
                            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                              Quality
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant={cagedQuality === "major" ? "default" : "outline"}
                                onClick={() => setCagedQuality("major")}
                                className="text-xs h-8"
                              >
                                Major
                              </Button>
                              <Button
                                variant={cagedQuality === "minor" ? "default" : "outline"}
                                onClick={() => setCagedQuality("minor")}
                                className="text-xs h-8"
                              >
                                Minor
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                              Type
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant={cagedMode === "triad" ? "default" : "outline"}
                                onClick={() => setCagedMode("triad")}
                                className="text-xs h-8"
                              >
                                Triads
                              </Button>
                              <Button
                                variant={cagedMode === "scale" ? "default" : "outline"}
                                onClick={() => setCagedMode("scale")}
                                className="text-xs h-8"
                              >
                                Scales
                              </Button>
                            </div>
                          </div>
                        </div>
                        {CAGED_SHAPES.map((s) => renderCagedButton(s.id))}
                      </TabsContent>
                      <TabsContent
                        value="diads"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {doubleStopCategories.map(({ key, label }) => {
                          const patterns = DOUBLE_STOP_PATTERNS.filter(
                            (p) => p.category === key
                          );
                          if (patterns.length === 0) return null;
                          return (
                            <div key={key} className="mb-4">
                              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 px-1">
                                {label}
                              </div>
                              {patterns.map((p) => renderDoubleStopButton(p.id))}
                            </div>
                          );
                        })}
                      </TabsContent>
                      <TabsContent
                        value="sweep"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {SWEEP_PATTERNS.map((p) => (
                          <Button
                            key={p.id}
                            variant={activeTechniqueId === p.id ? "secondary" : "ghost"}
                            className="w-full justify-start text-left h-auto py-3 mb-2"
                            onClick={() => {
                              setActiveLick(null);
                              setActiveTechniqueId(p.id);
                              setRoot(p.root);
                              setType(p.type);
                              setActiveDoubleStopId(null);
                              setActiveCagedId(null);
                              setSelectedScaleId(null);
                              setActiveBluesBox(null);
                              setActiveHarmBox(null);
                            }}
                          >
                            <div className="flex flex-col items-start">
                              <span className="font-bold">{p.name}</span>
                              <span className="text-[10px] text-muted-foreground">{p.description}</span>
                            </div>
                          </Button>
                        ))}
                      </TabsContent>
                      <TabsContent
                        value="tap"
                        className="mt-0 space-y-2 border-none focus-visible:ring-0"
                      >
                        {TAPPING_PATTERNS.map((p) => (
                          <Button
                            key={p.id}
                            variant={activeTechniqueId === p.id ? "secondary" : "ghost"}
                            className="w-full justify-start text-left h-auto py-3 mb-2"
                            onClick={() => {
                              setActiveLick(null);
                              setActiveTechniqueId(p.id);
                              setRoot(p.root);
                              setType(p.type);
                              setActiveDoubleStopId(null);
                              setActiveCagedId(null);
                              setSelectedScaleId(null);
                              setActiveBluesBox(null);
                              setActiveHarmBox(null);
                            }}
                          >
                            <div className="flex flex-col items-start">
                              <span className="font-bold">{p.name}</span>
                              <span className="text-[10px] text-muted-foreground">{p.description}</span>
                            </div>
                          </Button>
                        ))}
                      </TabsContent>
                      <TabsContent
                        value="boxes"
                        className="mt-0 space-y-4 border-none focus-visible:ring-0"
                      >
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                            Blues Scale Boxes
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {([1, 2, 3, 4, 5] as const).map((box) => (
                              <Button
                                key={`blues-${box}`}
                                variant={activeBluesBox === box ? "default" : "outline"}
                                className="text-xs"
                                onClick={() => {
                                  setActiveBluesBox(activeBluesBox === box ? null : box);
                                  setActiveHarmBox(null);
                                  setActiveLick(null);
                                  setActiveTechniqueId(null);
                                  setSelectedScaleId(null);
                                }}
                              >
                                Box {box}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                            Harmonic Minor Boxes
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {([1, 2, 3, 4, 5] as const).map((box) => (
                              <Button
                                key={`harm-${box}`}
                                variant={activeHarmBox === box ? "default" : "outline"}
                                className="text-xs"
                                onClick={() => {
                                  setActiveHarmBox(activeHarmBox === box ? null : box);
                                  setActiveBluesBox(null);
                                  setActiveLick(null);
                                  setActiveTechniqueId(null);
                                  setSelectedScaleId(null);
                                }}
                              >
                                Box {box}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="licks"
                        className="mt-0 space-y-3 border-none focus-visible:ring-0 p-2"
                      >
                        <LickBrowser
                          licks={FAMOUS_LICKS}
                          activeLickId={activeLick?.id ?? null}
                          onSelect={selectLick}
                          onPlay={playLick}
                          isPlaying={isPlayingLick}
                        />
                      </TabsContent>
                    </ScrollArea>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <Card
              className={cn(
                "border-white/10 bg-card shadow-2xl overflow-hidden ring-1 transition-all duration-500",
                "lg:sticky lg:top-6 lg:self-start lg:z-10 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto",
                activeLick
                  ? "ring-orange-500/30 shadow-orange-900/10"
                  : "ring-white/5"
              )}
            >
              <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-1 border-b border-white/5 flex justify-between items-center pr-4">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">
                  {activeLick
                    ? "ARTIST PRESET MODE"
                    : "Fretboard Visualizer v1.0"}
                </div>
              </div>

              <CardContent className="p-0 py-12 px-4 md:px-8 bg-[#1a1a1a] relative">
                {/* Background texture/glow */}
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] blur-[120px] pointer-events-none transition-colors duration-700",
                    activeLick ? "bg-orange-500/10" : "bg-primary/5"
                  )}
                />

                <div className="flex flex-col items-center mb-10 relative z-10">
                  {activeLick ? (
                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                      <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white border-none px-3 py-1">
                        <Flame className="w-3 h-3 mr-1 fill-white" /> HOT LICK
                      </Badge>
                      <div className="text-center">
                        <h2 className="text-5xl font-display font-bold text-white tracking-tighter mb-2">
                          {activeLick.artist}
                        </h2>
                        <p className="text-xl text-orange-400 font-light tracking-wide">
                          {activeLick.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-baseline gap-3 border-b border-white/10 pb-2 px-8">
                      <span className="text-6xl font-display font-bold text-white tracking-tighter">
                        {fretboardTitleLabel}
                      </span>
                    </div>
                  )}
                </div>

                <Fretboard
                  activeNotes={filteredActiveNotes}
                  rootNote={root}
                  highlightPositions={activeLick?.positions}
                  pairGroups={doubleStopPairGroups}
                  tuning={currentTuning.notes}
                  showNoteNames={settings.showNoteNames}
                  leftHanded={settings.leftHanded}
                  showOpenStrings={settings.showOpenStrings}
                  fretMin={settings.fretMin}
                  fretMax={settings.fretMax}
                  activeStep={lickStep}
                  bassInterval={bassInterval}
                  onNoteClick={handleNoteClick}
                />

                {settings.compareMode && (
                  <div className="mt-10 pt-8 border-t border-white/10 px-2">
                    <div className="text-center text-sm text-muted-foreground mb-6 font-mono uppercase tracking-widest">
                      Compare: {settings.compareRoot}{" "}
                      {ARPEGGIO_TYPES.find((a) => a.id === settings.compareType)?.name}
                    </div>
                    <Fretboard
                      activeNotes={compareNotes}
                      rootNote={settings.compareRoot}
                      tuning={currentTuning.notes}
                      showNoteNames={settings.showNoteNames}
                      leftHanded={settings.leftHanded}
                      showOpenStrings={settings.showOpenStrings}
                      fretMin={settings.fretMin}
                      fretMax={settings.fretMax}
                      compact
                      onNoteClick={handleNoteClick}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Theory Breakdown & Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-white/10 bg-card/40">
                <CardHeader className="pb-3 pt-5 px-5">
                  <CardTitle className="font-display uppercase tracking-wider text-sm text-muted-foreground">
                    {activeLick
                      ? "Notes in Hot Lick"
                      : currentDoubleStop
                      ? "Notes in Diad"
                      : currentCagedShape
                      ? "Notes in CAGED Shape"
                      : currentScale || currentPent || currentMode
                      ? "Notes in Scale"
                      : "Notes in Chord"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="flex flex-wrap gap-4">
                    {chordTones.map((tone) => {
                      const isRoot = tone.interval === 0;
                      const isBass = "isBass" in tone && tone.isBass;
                      return (
                        <div
                          key={`${tone.noteName}-${tone.interval}`}
                          className={cn(
                            "flex flex-col items-center justify-center w-16 h-20 rounded-lg border transition-all hover:scale-105 cursor-default",
                            isBass && effectiveInversion > 0
                              ? "bg-primary/30 border-primary shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                              : isRoot
                              ? "bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                              : "bg-secondary/50 border-white/5",
                            activeLick && isRoot
                              ? "bg-orange-500/20 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                              : ""
                          )}
                        >
                          <span
                            className={cn(
                              "text-2xl font-bold font-display",
                              isBass && effectiveInversion > 0
                                ? "text-primary"
                                : isRoot
                                ? activeLick
                                  ? "text-orange-100"
                                  : "text-white"
                                : "text-foreground"
                            )}
                          >
                            {formatNoteNameWithFlat(tone.noteName)}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase mt-1 font-bold">
                            {isBass && effectiveInversion > 0
                              ? "Bass"
                              : isRoot
                              ? "Root"
                              : getIntervalName(tone.interval)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

