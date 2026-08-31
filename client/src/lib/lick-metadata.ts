export type LickGenre =
  | "neo-classical"
  | "funk"
  | "blues"
  | "rock"
  | "soul"
  | "metal"
  | "pop";

export type LickDifficulty = "beginner" | "intermediate" | "advanced";

export type LickMeta = {
  genre: LickGenre;
  difficulty: LickDifficulty;
};

export const LICK_METADATA: Record<string, LickMeta> = {
  "rhoads-crowley": { genre: "neo-classical", difficulty: "advanced" },
  "rhoads-crazy-train": { genre: "neo-classical", difficulty: "advanced" },
  "rhoads-goodbye": { genre: "neo-classical", difficulty: "intermediate" },
  "rhoads-dee": { genre: "neo-classical", difficulty: "intermediate" },
  "rhoads-revelation": { genre: "neo-classical", difficulty: "intermediate" },
  "rhoads-flying": { genre: "neo-classical", difficulty: "advanced" },
  "rhoads-suicide": { genre: "neo-classical", difficulty: "intermediate" },
  "rhoads-dim": { genre: "neo-classical", difficulty: "advanced" },
  "prince-purple-rain": { genre: "soul", difficulty: "intermediate" },
  "prince-kiss": { genre: "funk", difficulty: "beginner" },
  "prince-go-crazy": { genre: "rock", difficulty: "intermediate" },
  "prince-doves-cry": { genre: "pop", difficulty: "intermediate" },
  "prince-cream": { genre: "funk", difficulty: "intermediate" },
  "prince-raspberry": { genre: "pop", difficulty: "beginner" },
  "prince-beautiful": { genre: "soul", difficulty: "intermediate" },
  "allman-layla": { genre: "blues", difficulty: "intermediate" },
  "allman-blue-sky": { genre: "rock", difficulty: "beginner" },
  "allman-statesboro": { genre: "blues", difficulty: "intermediate" },
  "allman-one-way": { genre: "blues", difficulty: "intermediate" },
  "allman-whipping": { genre: "rock", difficulty: "advanced" },
  "allman-wonderin": { genre: "soul", difficulty: "beginner" },
  "allman-stormy": { genre: "blues", difficulty: "intermediate" },
  "evh-eruption": { genre: "rock", difficulty: "advanced" },
  "yngwie-dim": { genre: "neo-classical", difficulty: "advanced" },
  "slash-sweet": { genre: "rock", difficulty: "intermediate" },
  "gilmour-shine": { genre: "rock", difficulty: "beginner" },
  "beck-sustain": { genre: "rock", difficulty: "intermediate" },
  "page-blackdog": { genre: "rock", difficulty: "intermediate" },
};

export const GENRE_LABELS: Record<LickGenre, string> = {
  "neo-classical": "Neo-Classical",
  funk: "Funk",
  blues: "Blues",
  rock: "Rock",
  soul: "Soul",
  metal: "Metal",
  pop: "Pop",
};
