import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSettings } from "@/lib/app-settings";
import { copyShareUrl, UrlState } from "@/lib/url-state";
import { Link2, Volume2 } from "lucide-react";
import { useState } from "react";

type Props = {
  settings: AppSettings;
  onChange: (patch: Partial<AppSettings>) => void;
  urlState: UrlState;
};

export function SettingsBar({ settings, onChange, urlState }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = copyShareUrl(urlState);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-display uppercase tracking-widest text-muted-foreground">
          Display &amp; Practice
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="note-names" className="text-xs">Note names</Label>
            <Switch
              id="note-names"
              checked={settings.showNoteNames}
              onCheckedChange={(v) => onChange({ showNoteNames: v })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="left-handed" className="text-xs">Left-handed</Label>
            <Switch
              id="left-handed"
              checked={settings.leftHanded}
              onCheckedChange={(v) => onChange({ leftHanded: v })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="open-strings" className="text-xs">Open strings</Label>
            <Switch
              id="open-strings"
              checked={settings.showOpenStrings}
              onCheckedChange={(v) => onChange({ showOpenStrings: v })}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="audio" className="text-xs flex items-center gap-1">
              <Volume2 className="w-3 h-3" /> Audio
            </Label>
            <Switch
              id="audio"
              checked={settings.audioEnabled}
              onCheckedChange={(v) => onChange({ audioEnabled: v })}
            />
          </div>
          <div className="flex items-center justify-between gap-2 col-span-2">
            <Label htmlFor="compare" className="text-xs">Compare mode</Label>
            <Switch
              id="compare"
              checked={settings.compareMode}
              onCheckedChange={(v) => onChange({ compareMode: v })}
            />
          </div>
        </div>

        {settings.compareMode && (
          <div className="grid grid-cols-2 gap-2">
            <select
              className="text-xs bg-secondary rounded px-2 py-1 border border-white/10"
              value={settings.compareRoot}
              onChange={(e) => onChange({ compareRoot: e.target.value })}
            >
              {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <select
              className="text-xs bg-secondary rounded px-2 py-1 border border-white/10"
              value={settings.compareType}
              onChange={(e) => onChange({ compareType: e.target.value })}
            >
              <option value="maj">Major</option>
              <option value="min">Minor</option>
              <option value="maj7">Maj7</option>
              <option value="min7">Min7</option>
              <option value="dom7">Dom7</option>
            </select>
          </div>
        )}

        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            Fret range: {settings.fretMin} – {settings.fretMax}
          </Label>
          <Slider
            min={0}
            max={19}
            step={1}
            value={[settings.fretMin, settings.fretMax]}
            onValueChange={([min, max]) => onChange({ fretMin: min, fretMax: max })}
          />
        </div>

        <Button variant="outline" size="sm" className="w-full text-xs" onClick={share}>
          <Link2 className="w-3 h-3 mr-2" />
          {copied ? "Link copied!" : "Copy shareable link"}
        </Button>
      </CardContent>
    </Card>
  );
}
