export const LIGHT_THEME = {
  background: {
    primary: "#ffffff",
    secondary: "#f5f7fa",
    tertiary: "#eef1f5",
  },
  text: {
    primary: "#1c1f23",
    secondary: "#4b5561",
    tertiary: "#6b7480",
  },
  accent: {
    primary: "#c3762b",
    hover: "#a9641f",
  },
  border: {
    default: "#d9dde3",
    focus: "#c3762b",
  },
  semantic: {
    success: "#157347",
    error: "#b42318",
    warning: "#b58105",
    info: "#0660c3",
  },
} as const;

export const DARK_THEME = {
  background: {
    primary: "#111827",
    secondary: "#1a2332",
    tertiary: "#222d3c",
  },
  text: {
    primary: "#f1f5f9",
    secondary: "#c7d0da",
    tertiary: "#9aa6b5",
  },
  accent: {
    primary: "#d8934b",
    hover: "#c27d34",
  },
  border: {
    default: "#2f3a4a",
    focus: "#d8934b",
  },
  semantic: {
    success: "#31a375",
    error: "#f87171",
    warning: "#e0b652",
    info: "#60a5fa",
  },
} as const;

export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
} as const;

export type ThemeColors = typeof LIGHT_THEME;
export type ThemeName = keyof typeof THEMES;
