import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BACKING_TRACKS } from "@/lib/practice-data";
import { playClick, startBackingLoop } from "@/lib/audio-engine";
import { Play, Square } from "lucide-react";

type Props = {
  audioEnabled: boolean;
  onSelectBackingKey?: (root: string, type: string) => void;
};

export function PracticePanel({ audioEnabled, onSelectBackingKey }: Props) {
  const [bpm, setBpm] = useState(100);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const backingStopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!audioEnabled) {
      setRunning(false);
      backingStopRef.current?.();
      backingStopRef.current = null;
      setActiveTrack(null);
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (!running || !audioEnabled) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const ms = (60 / bpm) * 1000;
    intervalRef.current = setInterval(() => {
      setBeat((b) => {
        const next = (b + 1) % 4;
        playClick(next === 0);
        return next;
      });
    }, ms);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, bpm, audioEnabled]);

  const playBacking = (id: string) => {
    const track = BACKING_TRACKS.find((t) => t.id === id);
    if (!track || !audioEnabled) return;

    if (activeTrack === id) {
      backingStopRef.current?.();
      backingStopRef.current = null;
      setActiveTrack(null);
      return;
    }

    backingStopRef.current?.();
    setActiveTrack(id);
    setBpm(track.bpm);
    onSelectBackingKey?.(track.key, track.type);
    backingStopRef.current = startBackingLoop(track.key, track.type, track.bpm);
  };

  useEffect(() => {
    return () => {
      backingStopRef.current?.();
    };
  }, []);

  return (
    <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
          Practice Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Metronome — {bpm} BPM</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${running && beat === i ? "bg-primary" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
          <Slider min={40} max={220} step={5} value={[bpm]} onValueChange={([v]) => setBpm(v)} />
          <Button
            size="sm"
            className="w-full mt-2"
            variant={running ? "destructive" : "default"}
            onClick={() => setRunning(!running)}
          >
            {running ? <><Square className="w-3 h-3 mr-2" /> Stop</> : <><Play className="w-3 h-3 mr-2" /> Start</>}
          </Button>
        </div>

        <div>
          <span className="text-xs text-muted-foreground block mb-3">Backing tracks</span>
          <div className="space-y-2">
            {BACKING_TRACKS.map((t) => (
              <Button
                key={t.id}
                variant={activeTrack === t.id ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs h-auto py-2.5"
                onClick={() => playBacking(t.id)}
              >
                <span className="font-bold mr-2">{t.key}</span>
                <span className="text-muted-foreground">{t.name} · {t.bpm} BPM</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
