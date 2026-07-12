"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// "gold" is commented out — only light/dark/system in use for now
// export type Theme = "light" | "dark" | "gold";
export type Theme = "light" | "dark";
export type ThemeChoice = Theme | "system";

type Ctx = {
  theme: Theme;
  choice: ThemeChoice;
  setChoice: (c: ThemeChoice) => void;
};

const ThemeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "aiventra-theme";

function resolveTheme(choice: ThemeChoice): Theme {
  if (choice === "system") {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  // Gold is commented out — fall back to dark if somehow stored
  // if (choice === "gold") return "gold";
  return choice;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to "system" so the site always follows the OS preference on first visit
  const [choice, setChoiceState] = useState<ThemeChoice>("system");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Read as raw string so we can safely filter out legacy values (e.g. "gold")
    const stored = localStorage.getItem(STORAGE_KEY);
    const VALID: ThemeChoice[] = ["light", "dark", "system"];
    const safe: ThemeChoice =
      stored && (VALID as string[]).includes(stored) ? (stored as ThemeChoice) : "system";
    setChoiceState(safe);
  }, []);

  useEffect(() => {
    const t = resolveTheme(choice);
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(STORAGE_KEY, choice);

    // Favicon always uses blue icon (gold is disabled)
    const faviconUrl = "/favicon-blue.ico";
    const faviconLinks = document.querySelectorAll("link[rel*='icon']");
    if (faviconLinks.length > 0) {
      faviconLinks.forEach((link) => {
        const linkEl = link as HTMLLinkElement;
        linkEl.href = faviconUrl;
        linkEl.setAttribute("sizes", "256x256");
        linkEl.setAttribute("type", "image/x-icon");
      });
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      link.setAttribute("sizes", "256x256");
      link.setAttribute("type", "image/x-icon");
      document.head.appendChild(link);
    }

    // Always subscribe to system preference changes so dark/light tracks the OS
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => {
      if (choice !== "system") return; // only react when in system mode
      const nt: Theme = mq.matches ? "light" : "dark";
      setTheme(nt);
      document.documentElement.setAttribute("data-theme", nt);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [choice]);

  return (
    <ThemeContext.Provider value={{ theme, choice, setChoice: setChoiceState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
