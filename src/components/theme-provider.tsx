"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "gold";
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
  return choice;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>("dark");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemeChoice | null) ?? "system";
    setChoiceState(stored);
  }, []);

  useEffect(() => {
    const t = resolveTheme(choice);
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(STORAGE_KEY, choice);

    // Dynamic favicon updates based on resolved theme
    const faviconUrl = t === "gold" ? "/favicon-gold.ico" : "/favicon-blue.ico";
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

    if (choice === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const handler = () => {
        const nt = mq.matches ? "light" : "dark";
        setTheme(nt);
        document.documentElement.setAttribute("data-theme", nt);

        // Update favicon for system resolution change
        const systemLinks = document.querySelectorAll("link[rel*='icon']");
        systemLinks.forEach((link) => {
          const linkEl = link as HTMLLinkElement;
          linkEl.href = "/favicon-blue.ico";
          linkEl.setAttribute("sizes", "256x256");
          linkEl.setAttribute("type", "image/x-icon");
        });
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
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
