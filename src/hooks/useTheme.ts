import { useThemeStore } from "../stores/themeStore";

export const useTheme = () => {
  const { theme, effectiveTheme, setTheme, toggleTheme } = useThemeStore();

  return {
    theme,
    effectiveTheme,
    isDark: effectiveTheme === "dark",
    isLight: effectiveTheme === "light",
    isSystem: theme === "system",
    setTheme,
    toggleTheme,
  };
};
