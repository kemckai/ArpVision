import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lick } from "@/lib/music-theory";
import { GENRE_LABELS, LICK_METADATA, LickDifficulty, LickGenre } from "@/lib/lick-metadata";
import { cn } from "@/lib/utils";
import { Flame, Play, Square } from "lucide-react";

type Props = {
  licks: Lick[];
  activeLickId: string | null;
  onSelect: (lick: Lick) => void;
  onPlay: (lick: Lick) => void;
  isPlaying: boolean;
};

export function LickBrowser({ licks, activeLickId, onSelect, onPlay, isPlaying }: Props) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<LickGenre | "all">("all");
  const [difficulty, setDifficulty] = useState<LickDifficulty | "all">("all");

  const filtered = useMemo(() => {
    return licks.filter((l) => {
      const meta = LICK_METADATA[l.id];
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.artist.toLowerCase().includes(q) ||
        l.root.toLowerCase().includes(q);
      const matchGenre = genre === "all" || meta?.genre === genre;
      const matchDiff = difficulty === "all" || meta?.difficulty === difficulty;
      return matchSearch && matchGenre && matchDiff;
    });
  }, [licks, search, genre, difficulty]);

  const artists = useMemo(
    () => Array.from(new Set(licks.map((l) => l.artist))).sort(),
    [licks]
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search licks, artists, keys..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-xs h-9"
      />

      <div className="flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={genre === "all" ? "default" : "outline"}
          className="text-[10px] h-6 px-2"
          onClick={() => setGenre("all")}
        >
          All
        </Button>
        {(Object.keys(GENRE_LABELS) as LickGenre[]).map((g) => (
          <Button
            key={g}
            size="sm"
            variant={genre === g ? "default" : "outline"}
            className="text-[10px] h-6 px-2"
            onClick={() => setGenre(g)}
          >
            {GENRE_LABELS[g]}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
          <Button
            key={d}
            size="sm"
            variant={difficulty === d ? "default" : "outline"}
            className="text-[10px] h-6 px-2 flex-1"
            onClick={() => setDifficulty(d)}
          >
            {d === "all" ? "All levels" : d}
          </Button>
        ))}
      </div>

      <div className="text-[10px] text-muted-foreground pt-1 pb-2">
        {filtered.length} licks · {artists.length} artists
      </div>

      <div className="space-y-3">
      {filtered.map((lick) => {
        const meta = LICK_METADATA[lick.id];
        const active = activeLickId === lick.id;
        return (
          <div
            key={lick.id}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] space-y-2",
              active
                ? "bg-orange-950/40 border-orange-500/50"
                : "bg-secondary/30 border-white/5 hover:bg-secondary/50"
            )}
            onClick={() => onSelect(lick)}
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h4 className={cn("font-bold text-sm", active && "text-orange-400")}>
                  {lick.artist}
                </h4>
                <div className="text-xs text-muted-foreground">{lick.name}</div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay(lick);
                  }}
                >
                  {isPlaying && active ? (
                    <Square className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3" />
                  )}
                </Button>
                {active && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <Badge variant="outline" className="text-[10px]">
                {lick.root} {lick.type}
              </Badge>
              {meta && (
                <>
                  <Badge variant="outline" className="text-[10px]">
                    {GENRE_LABELS[meta.genre]}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {meta.difficulty}
                  </Badge>
                </>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground/70 italic line-clamp-2">
              {lick.description}
            </p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
