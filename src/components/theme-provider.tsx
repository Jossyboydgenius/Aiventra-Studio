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

    if (choice === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const handler = () => {
        const nt = mq.matches ? "light" : "dark";
        setTheme(nt);
        document.documentElement.setAttribute("data-theme", nt);
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
