import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme, ThemeStore, EffectiveTheme } from "../types/theme";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      effectiveTheme: "light",
      setTheme: (theme: Theme) => {
        let effectiveTheme: EffectiveTheme;
        if (theme === "system") {
          const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          effectiveTheme = isDarkMode ? "dark" : "light";
        } else {
          effectiveTheme = theme;
        }
        document.documentElement.setAttribute("data-theme", effectiveTheme);

        set({ theme, effectiveTheme });
      },
      toggleTheme: () => {
        const currentEffective = get().effectiveTheme;
        const newTheme = currentEffective === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },
    }),
    { name: "theme-storage" }
  )
);
