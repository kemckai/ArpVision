import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getScaleSuggestions } from "@/lib/chord-progressions";

type Props = {
  chordType: string;
  onSelectScale: (scaleId: string) => void;
};

export function ScaleSuggestions({ chordType, onSelectScale }: Props) {
  const suggestions = getScaleSuggestions(chordType);
  if (!suggestions.length) return null;

  return (
    <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
          Scales Over Chord
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-2">
        {suggestions.map((s) => (
          <Button
            key={s.id + s.name}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left h-auto py-3 flex flex-col items-start gap-0.5"
            onClick={() => onSelectScale(s.id)}
          >
            <span className="font-bold text-xs">{s.name}</span>
            <span className="text-[10px] text-muted-foreground">{s.reason}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
