import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";

const initTheme = () => {
  try {
    const stored = localStorage.getItem("theme-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      const theme = parsed.state?.theme || "system";

      let effectiveTheme: "light" | "dark";
      if (theme === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        effectiveTheme = theme;
      }

      document.documentElement.setAttribute("data-theme", effectiveTheme);
    } else {
      const effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", effectiveTheme);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
};

initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
