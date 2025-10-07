export const LIGHT_THEME = {
  background: {
    primary: "#ffffff",
    secondary: "#f5f5f5",
    tertiary: "#e8e8e8",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    tertiary: "#6b6b6b",
  },
  accent: {
    primary: "#d67a1a",
    hover: "#b68145ff",
  },
  border: {
    default: "#d0d0d0",
    focus: "#d67a1a",
  },
  semantic: {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
    info: "#255bcfff",
  },
} as const;

export const DARK_THEME = {
  background: {
    primary: "#1a1a1a",
    secondary: "#2a2a2a",
    tertiary: "#3a3a3a",
  },
  text: {
    primary: "#f0f0f0",
    secondary: "#d0d0d0",
    tertiary: "#a0a0a0",
  },
  accent: {
    primary: "#f8c581",
    hover: "#fcd6a5",
  },
  border: {
    default: "#404040",
    focus: "#f8ce81",
  },
  semantic: {
    success: "#4ade80",
    error: "#f87171",
    warning: "#fbbf24",
    info: "#60a5fa",
  },
} as const;

export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
} as const;

export type ThemeColors = typeof LIGHT_THEME;
export type ThemeName = keyof typeof THEMES;
