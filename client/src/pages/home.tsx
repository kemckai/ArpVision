import { useState } from "react";
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
  NOTES,
  ARPEGGIO_TYPES,
  SCALE_MODES,
  SCALE_PENTATONICS,
  CAGED_SHAPES,
  CAGED_MINOR_SHAPES,
  ALL_SCALES,
  FAMOUS_LICKS,
  Lick,
  TUNINGS,
  getIntervalName,
  formatNoteNameWithFlat,
} from "@/lib/music-theory";
import { Fretboard } from "@/components/Fretboard";
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
  const [cagedMode, setCagedMode] = useState<"triad" | "scale">("triad"); // CAGED triad or scale
  const [cagedQuality, setCagedQuality] = useState<"major" | "minor">("major"); // CAGED major or minor
  const [activePentBox, setActivePentBox] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [selectedScaleId, setSelectedScaleId] = useState<string | null>(null);
  const [currentTuning, setCurrentTuning] = useState(TUNINGS[0]);

  // Generate active notes based on priority: Hot Lick > CAGED > Pentatonic Box > Scale > Mode > Pentatonic > Arpeggio
  const activeNotes = activeLick
    ? generateLickFretboardMap(
        activeLick.root,
        activeLick.positions || [],
        currentTuning.notes
      )
    : activeCagedId
    ? cagedQuality === "minor"
      ? cagedMode === "scale"
        ? generateCagedMinorScaleFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", 19, currentTuning.notes)
        : generateCagedMinorFretboardMap(root, activeCagedId, currentTuning.notes)
      : cagedMode === "scale"
      ? generateCagedScaleFretboardMap(root, activeCagedId as "C" | "A" | "G" | "E" | "D", 19, currentTuning.notes)
      : generateCagedFretboardMap(root, activeCagedId, currentTuning.notes)
    : activePentatonicId === "minPent" && activePentBox
    ? generatePentatonicBoxFretboardMap(
        root,
        activePentBox,
        19,
        currentTuning.notes
      )
    : selectedScaleId
    ? generateScaleFretboardMap(root, selectedScaleId, 19, currentTuning.notes)
    : activePentatonicId
    ? generateScaleFretboardMap(root, activePentatonicId, 19, currentTuning.notes)
    : activeModeId
    ? generateScaleFretboardMap(root, activeModeId, 19, currentTuning.notes)
    : generateFretboardMap(root, type, 19, currentTuning.notes);

  // Get current scale for display - MUST be defined before fretboardTitleLabel
  const currentScale = selectedScaleId
    ? ALL_SCALES.find((s) => s.id === selectedScaleId)
    : activeModeId
    ? SCALE_MODES.find((m) => m.id === activeModeId)
    : activePentatonicId
    ? SCALE_PENTATONICS.find((p) => p.id === activePentatonicId)
    : null;

  const currentArpeggio = ARPEGGIO_TYPES.find((t) => t.id === type);
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
      return `${root} ${currentArpeggio.name}`;
    }
    return root;
  })();

  // Theory panel data
  const chordTones =
    activeLick
      ? Array.from(
          new Map(
            activeNotes.map((n) => [
              n.noteIndex,
              { noteName: n.noteName, interval: n.interval },
            ])
          ).values()
        ).sort((a, b) => a.interval - b.interval)
      : currentCagedShape
      ? Array.from(
          new Map(
            (cagedQuality === "minor"
              ? cagedMode === "scale"
                ? generateCagedMinorScaleFretboardMap(
                    root,
                    currentCagedShape.id,
                    19,
                    currentTuning.notes
                  )
                : generateCagedMinorFretboardMap(
                    root,
                    currentCagedShape.id,
                    currentTuning.notes
                  )
              : cagedMode === "scale"
              ? generateCagedScaleFretboardMap(
                  root,
                  currentCagedShape.id,
                  19,
                  currentTuning.notes
                )
              : generateCagedFretboardMap(
                  root,
                  currentCagedShape.id,
                  currentTuning.notes
                )
            ).map((n) => [
              n.noteIndex,
              { noteName: n.noteName, interval: n.interval },
            ])
          ).values()
        ).sort((a, b) => a.interval - b.interval)
      : currentScale
      ? Array.from(
          new Map(
            generateScaleFretboardMap(
              root,
              currentScale.id,
              19,
              currentTuning.notes
            ).map((n) => [
              n.noteIndex,
              { noteName: n.noteName, interval: n.interval },
            ])
          ).values()
        ).sort((a, b) => a.interval - b.interval)
      : currentPent
      ? Array.from(
          new Map(
            generateScaleFretboardMap(
              root,
              currentPent.id,
              19,
              currentTuning.notes
            ).map((n) => [
              n.noteIndex,
              { noteName: n.noteName, interval: n.interval },
            ])
          ).values()
        ).sort((a, b) => a.interval - b.interval)
      : currentMode
      ? Array.from(
          new Map(
            generateScaleFretboardMap(
              root,
              currentMode.id,
              19,
              currentTuning.notes
            ).map((n) => [
              n.noteIndex,
              { noteName: n.noteName, interval: n.interval },
            ])
          ).values()
        ).sort((a, b) => a.interval - b.interval)
      : currentArpeggio
      ? currentArpeggio.intervals.map((interval) => {
          const noteName = NOTES[(NOTES.indexOf(root) + interval) % 12];
          return { noteName, interval };
        })
      : [];

  const selectLick = (lick: Lick) => {
    setRoot(lick.root);
    setType(lick.type);
    setActiveLick(lick);
    setActiveModeId(null);
    setActivePentatonicId(null);
    setActiveCagedId(null);
    setActivePentBox(null);
    setSelectedScaleId(null);
  };

  const handleManualChange = (action: () => void) => {
    setActiveLick(null);
    setActiveModeId(null);
    setActivePentatonicId(null);
    setActiveCagedId(null);
    setActivePentBox(null);
    setSelectedScaleId(null);
    action();
  };

  const handleRootChange = (newRoot: string) => {
    setRoot(newRoot);
    // Preserve scale selection when changing root
  };

  // Organize scales by category for the dropdown
  const scalesByCategory = {
    mode: ALL_SCALES.filter((s) => s.category === "mode"),
    pentatonic: ALL_SCALES.filter((s) => s.category === "pentatonic"),
    minor: ALL_SCALES.filter((s) => s.category === "minor"),
    symmetric: ALL_SCALES.filter((s) => s.category === "symmetric"),
    exotic: ALL_SCALES.filter((s) => s.category === "exotic"),
    other: ALL_SCALES.filter((s) => s.category === "other"),
  };

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
                .map((i) => (i === 0 ? "R" : getIntervalName(i)))
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

  const triads = ["maj", "min", "dim", "sus2", "sus4", "aug"];
  const sevenths = [
    "maj7",
    "min7",
    "dom7",
    "m7b5",
    "dim7",
    "minMaj7",
  ];
  const extended = [
    "maj6",
    "min6",
    "maj9",
    "min9",
    "dom9",
    "minAdd9",
    "min11",
    "min13",
    "majAdd9",
    "majAdd11",
    "maj69",
    "dom7b9",
    "dom7#9",
    "dom7b5",
    "dom7#5",
    "dom7b9b13",
    "m7b9",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans selection:bg-primary/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* Root Note Selector */}
            <Card className="border-white/10 bg-card/40 backdrop-blur-xl shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Root Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
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
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
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

            {/* Chord Type Selector with Tabs */}
            <Card className="border-white/10 bg-card/40 backdrop-blur-xl shadow-xl flex flex-col h-[450px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
                  Arpeggio Type
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <Tabs defaultValue="triads" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-5 bg-secondary/50 mb-4">
                    <TabsTrigger value="triads">Triads</TabsTrigger>
                    <TabsTrigger value="7ths">7ths</TabsTrigger>
                    <TabsTrigger value="extended">Ext.</TabsTrigger>
                    <TabsTrigger value="modes">Modes</TabsTrigger>
                    <TabsTrigger value="pents">Pents</TabsTrigger>
                    <TabsTrigger value="caged">CAGED</TabsTrigger>
                    <TabsTrigger
                      value="licks"
                      className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                    >
                      <Flame className="w-4 h-4 mr-1" /> Licks
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex-1 overflow-hidden relative rounded-md border border-white/5 bg-black/20">
                    <ScrollArea className="h-full w-full p-2">
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
                        value="licks"
                        className="mt-0 space-y-3 border-none focus-visible:ring-0 p-2"
                      >
                        {FAMOUS_LICKS.map((lick) => (
                          <div
                            key={lick.id}
                            onClick={() => selectLick(lick)}
                            className={cn(
                              "p-5 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] group relative overflow-hidden",
                              activeLick?.id === lick.id
                                ? "bg-orange-950/40 border-orange-500/50 shadow-lg shadow-orange-900/20"
                                : "bg-secondary/30 border-white/5 hover:bg-secondary/60 hover:border-white/10"
                            )}
                          >
                            {activeLick?.id === lick.id && (
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent pointer-events-none" />
                            )}

                            <div className="flex justify-between items-start mb-3 gap-3">
                              <h4
                                className={cn(
                                  "font-bold font-display uppercase tracking-wide flex-1 min-w-0 pr-2 break-words",
                                  activeLick?.id === lick.id
                                    ? "text-orange-400"
                                    : "text-foreground"
                                )}
                              >
                                {lick.artist}
                              </h4>
                              {activeLick?.id === lick.id && (
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse flex-shrink-0 mt-0.5" />
                              )}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground mb-3 break-words">
                              {lick.name}
                            </div>
                            <div className="flex gap-2 mb-3">
                              <Badge
                                variant="outline"
                                className="bg-black/40 text-[10px] border-white/10"
                              >
                                {lick.root} {lick.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground/70 italic leading-relaxed break-words">
                              "{lick.description}"
                            </p>
                          </div>
                        ))}
                      </TabsContent>
                    </ScrollArea>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 space-y-6">
            <Card
              className={cn(
                "border-white/10 bg-card shadow-2xl overflow-hidden ring-1 transition-all duration-500",
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

              <CardContent className="p-0 py-10 bg-[#1a1a1a] relative">
                {/* Background texture/glow */}
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] blur-[120px] pointer-events-none transition-colors duration-700",
                    activeLick ? "bg-orange-500/10" : "bg-primary/5"
                  )}
                />

                <div className="flex flex-col items-center mb-8 relative z-10">
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
                  activeNotes={activeNotes}
                  rootNote={root}
                  highlightPositions={activeLick?.positions}
                  tuning={currentTuning.notes}
                />
              </CardContent>
            </Card>

            {/* Theory Breakdown & Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-white/10 bg-card/40">
                <CardHeader className="pb-2">
                  <CardTitle className="font-display uppercase tracking-wider text-sm text-muted-foreground">
                    {activeLick
                      ? "Notes in Hot Lick"
                      : currentCagedShape
                      ? "Notes in CAGED Shape"
                      : currentScale || currentPent || currentMode
                      ? "Notes in Scale"
                      : "Notes in Chord"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {chordTones.map((tone) => {
                      const isRoot = tone.interval === 0;
                      return (
                        <div
                          key={`${tone.noteName}-${tone.interval}`}
                          className={cn(
                            "flex flex-col items-center justify-center w-16 h-20 rounded-lg border transition-all hover:scale-105 cursor-default",
                            isRoot
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
                              isRoot
                                ? activeLick
                                  ? "text-orange-100"
                                  : "text-white"
                                : "text-foreground"
                            )}
                          >
                            {formatNoteNameWithFlat(tone.noteName)}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase mt-1 font-bold">
                            {isRoot
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

