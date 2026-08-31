import { ARPEGGIO_TYPES, NOTES } from "./music-theory";

export interface AppSettings {
  showNoteNames: boolean;
  leftHanded: boolean;
  showOpenStrings: boolean;
  fretMin: number;
  fretMax: number;
  audioEnabled: boolean;
  compareMode: boolean;
  compareRoot: string;
  compareType: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  showNoteNames: false,
  leftHanded: false,
  showOpenStrings: true,
  fretMin: 0,
  fretMax: 19,
  audioEnabled: true,
  compareMode: false,
  compareRoot: "A",
  compareType: "min",
};

const STORAGE_KEY = "arpvision-settings";

function sanitizeSettings(raw: Partial<AppSettings>): AppSettings {
  const merged: AppSettings = { ...DEFAULT_SETTINGS, ...raw };

  merged.showNoteNames = Boolean(merged.showNoteNames);
  merged.leftHanded = Boolean(merged.leftHanded);
  merged.showOpenStrings = Boolean(merged.showOpenStrings);
  merged.audioEnabled = Boolean(merged.audioEnabled);
  merged.compareMode = Boolean(merged.compareMode);

  merged.fretMin = Math.max(0, Math.min(24, Math.round(Number(merged.fretMin) || 0)));
  merged.fretMax = Math.max(0, Math.min(24, Math.round(Number(merged.fretMax) || 19)));
  if (merged.fretMin > merged.fretMax) {
    merged.fretMin = DEFAULT_SETTINGS.fretMin;
    merged.fretMax = DEFAULT_SETTINGS.fretMax;
  }

  if (!NOTES.includes(merged.compareRoot)) {
    merged.compareRoot = DEFAULT_SETTINGS.compareRoot;
  }
  if (!ARPEGGIO_TYPES.some((a) => a.id === merged.compareType)) {
    merged.compareType = DEFAULT_SETTINGS.compareType;
  }

  return merged;
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return sanitizeSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeSettings(settings)));
}

export type CustomPattern = {
  id: string;
  name: string;
  root: string;
  type: string;
  positions: { string: number; fret: number }[];
};

const CUSTOM_KEY = "arpvision-custom-patterns";

function isValidPosition(p: unknown): p is { string: number; fret: number } {
  if (!p || typeof p !== "object") return false;
  const pos = p as { string?: unknown; fret?: unknown };
  return (
    typeof pos.string === "number" &&
    pos.string >= 0 &&
    pos.string <= 5 &&
    typeof pos.fret === "number" &&
    pos.fret >= 0 &&
    pos.fret <= 24
  );
}

function isValidCustomPattern(p: unknown): p is CustomPattern {
  if (!p || typeof p !== "object") return false;
  const pattern = p as Partial<CustomPattern>;
  return (
    typeof pattern.id === "string" &&
    typeof pattern.name === "string" &&
    typeof pattern.root === "string" &&
    NOTES.includes(pattern.root) &&
    typeof pattern.type === "string" &&
    Array.isArray(pattern.positions) &&
    pattern.positions.length > 0 &&
    pattern.positions.every(isValidPosition)
  );
}

export function loadCustomPatterns(): CustomPattern[] {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidCustomPattern);
  } catch {
    return [];
  }
}

export function saveCustomPatterns(patterns: CustomPattern[]): void {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(patterns.filter(isValidCustomPattern)));
}
