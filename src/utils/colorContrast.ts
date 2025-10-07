import type { Color } from "../types/theme";

const parseColor = (color: string): [number, number, number] => {
  const hex = color.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
};

export const getRelativeLuminance = (color: Color): number => {
  const [r, g, b] = parseColor(color).map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getContrastRatio = (color1: Color, color2: Color): number => {
  const L1 = getRelativeLuminance(color1);
  const L2 = getRelativeLuminance(color2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

export const meetsWCAG = (
  color1: Color,
  color2: Color,
  level: "AA" | "AAA" = "AA",
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  if (level === "AA") {
    return isLargeText ? ratio >= 3.0 : ratio >= 4.5;
  }
  return isLargeText ? ratio >= 4.5 : ratio >= 7.0;
};
