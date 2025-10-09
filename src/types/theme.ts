export type Theme = "light" | "dark" | "system";

export type EffectiveTheme = "light" | "dark";

export interface ThemeStore {
  theme: Theme;
  effectiveTheme: EffectiveTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export type Color = string;
