"use client";

// ThemeToggle is currently commented out from the navbar.
// The site now follows the system (OS) dark/light preference automatically.
// Re-enable this component + its usage in the Navbar when you want to give
// users a manual override again.

import { useEffect, useRef, useState } from "react";
import { Sun, Moon, /* Crown, */ Monitor, Check } from "lucide-react";
import { useTheme, type ThemeChoice } from "./theme-provider";

const OPTIONS: { value: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  // { value: "gold", label: "Gold", icon: Crown },  // Gold theme disabled for now
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, choice, setChoice } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Gold icon removed from active icon list
  const ActiveIcon = theme === "light" ? Sun : Moon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
      >
        <ActiveIcon className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-popover shadow-xl overflow-hidden z-50">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = choice === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setChoice(opt.value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-popover-foreground hover:bg-surface transition-colors"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="flex-1 text-left">{opt.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
