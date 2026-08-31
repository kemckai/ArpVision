import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHORD_PROGRESSIONS, ProgressionChord } from "@/lib/chord-progressions";
import { ARPEGGIO_TYPES } from "@/lib/music-theory";
import { cn } from "@/lib/utils";

type Props = {
  activeChordIndex: number | null;
  onSelectChord: (chord: ProgressionChord, index: number) => void;
  progressionId: string | null;
  onSelectProgression: (id: string | null) => void;
};

export function ChordProgressionPanel({
  activeChordIndex,
  onSelectChord,
  progressionId,
  onSelectProgression,
}: Props) {
  const progression = CHORD_PROGRESSIONS.find((p) => p.id === progressionId);

  return (
    <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
          Chord Progressions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        <div className="space-y-2">
          {CHORD_PROGRESSIONS.map((p) => (
            <Button
              key={p.id}
              variant={progressionId === p.id ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start text-xs h-auto py-2.5"
              onClick={() => onSelectProgression(progressionId === p.id ? null : p.id)}
            >
              <span className="font-bold">{p.name}</span>
            </Button>
          ))}
        </div>

        {progression && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <p className="text-[10px] text-muted-foreground leading-relaxed">{progression.description}</p>
            <div className="flex flex-wrap gap-2.5">
              {progression.chords.map((chord, i) => {
                const arp = ARPEGGIO_TYPES.find((a) => a.id === chord.type);
                return (
                  <Button
                    key={i}
                    size="sm"
                    variant={activeChordIndex === i ? "default" : "outline"}
                    className={cn("text-xs", activeChordIndex === i && "ring-2 ring-primary")}
                    onClick={() => onSelectChord(chord, i)}
                  >
                    {chord.label && <span className="opacity-60 mr-1">{chord.label}</span>}
                    {chord.root} {arp?.name.split(" ")[0] ?? chord.type}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
