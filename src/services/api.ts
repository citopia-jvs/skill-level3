import { LIGHT_THEME, DARK_THEME } from "../constants/colors";
import { getContrastRatio, meetsWCAG } from "../utils/colorContrast";

type ThemeName = "light" | "dark";
type ColorHex = string;

interface GetUserImageOptions {
  accentOverride?: string;
  forceTheme?: ThemeName;
}

function detectTheme(forceTheme?: ThemeName): ThemeName {
  if (forceTheme) return forceTheme;
  const attr =
    document.documentElement.getAttribute("data-theme") ||
    document.body.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function pickTextColor(
  bg: ColorHex,
  preferred: ColorHex,
  alternate: ColorHex
): ColorHex {
  if (meetsWCAG(bg, preferred, "AA", false)) return preferred;
  if (meetsWCAG(bg, alternate, "AA", false)) return alternate;
  return getContrastRatio(bg, preferred) >= getContrastRatio(bg, alternate)
    ? preferred
    : alternate;
}

export function getUserImageUrl(
  firstName: string,
  lastName: string,
  options: GetUserImageOptions = {}
): string {
  const full = [firstName, lastName].filter(Boolean).join(" ") || "Utilisateur";
  const encoded = encodeURIComponent(full);

  const theme = detectTheme(options.forceTheme);

  const accentBg = options.accentOverride
    ? options.accentOverride
    : theme === "dark"
      ? DARK_THEME.accent.primary
      : LIGHT_THEME.accent.primary;

  const darkTextRef =
    theme === "dark" ? DARK_THEME.text.primary : LIGHT_THEME.text.primary;
  const white = "#ffffff";

  const finalText = pickTextColor(accentBg, white, darkTextRef);

  const bgHex = accentBg.replace("#", "");
  const fgHex = finalText.replace("#", "");

  return `https://dummyjson.com/image/128x128/${bgHex}/${fgHex}?text=${encoded}&fontFamily=ubuntu&fontSize=24&type=png`;
}
