import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomPattern, loadCustomPatterns, saveCustomPatterns } from "@/lib/app-settings";
import { Lick, NOTES } from "@/lib/music-theory";
import { Trash2 } from "lucide-react";

type Props = {
  onSelect: (lick: Lick) => void;
};

export function CustomPatternsPanel({ onSelect }: Props) {
  const [patterns, setPatterns] = useState<CustomPattern[]>(loadCustomPatterns);
  const [name, setName] = useState("My Pattern");

  const persist = (next: CustomPattern[]) => {
    setPatterns(next);
    saveCustomPatterns(next);
  };

  const addBlank = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const p: CustomPattern = {
      id: `custom-${Date.now()}`,
      name: trimmed,
      root: "A",
      type: "min",
      positions: [
        { string: 0, fret: 5 },
        { string: 1, fret: 5 },
        { string: 2, fret: 4 },
      ],
    };
    persist([...patterns, p]);
  };

  const remove = (id: string) => persist(patterns.filter((p) => p.id !== id));

  return (
    <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
          Custom Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        <div className="flex gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pattern name"
            className="text-xs h-8"
          />
          <Button size="sm" onClick={addBlank}>
            Add
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Saved locally in your browser. Default positions can be edited in code for now.
        </p>
        {patterns.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No custom patterns yet.</p>
        )}
        {patterns.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-secondary/20"
          >
            <button
              className="text-left text-xs flex-1"
              onClick={() =>
                onSelect({
                  id: p.id,
                  artist: "Custom",
                  name: p.name,
                  description: "User-saved pattern",
                  root: p.root,
                  type: p.type,
                  positions: p.positions,
                })
              }
            >
              <span className="font-bold">{p.name}</span>
              <span className="text-muted-foreground ml-2">
                {p.root} · {p.positions.length} notes
              </span>
            </button>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => remove(p.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
