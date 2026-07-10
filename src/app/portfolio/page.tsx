"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Team member portraits logos
import logoBlue from "@/assets/logo-blue.png";
import logoGold from "@/assets/logo-gold.png";

// Project assets
import projectNimbus from "@/assets/project-nimbus.png";
import projectForge from "@/assets/project-forge.png";
import projectHelix from "@/assets/project-helix.png";
import projectOrbit from "@/assets/project-orbit.png";
import projectAtlas from "@/assets/project-atlas.png";
import projectQuartz from "@/assets/project-quartz.png";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = ["All", "SaaS & Web", "Mobile", "AI & Automation", "Games"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS · Dashboard",
    desc: "Real-time analytics platform for fintech, providing robust charting widgets, sub-second aggregation, and cross-account data ingestion.",
    image: projectNimbus,
    categories: ["SaaS & Web"] as Category[],
  },
  {
    title: "Forge Mobile",
    tag: "iOS · Android",
    desc: "Field service app used by 12k technicians daily. Engineered offline synchronization databases, push alert systems, and native device location tracking.",
    image: projectForge,
    categories: ["Mobile"] as Category[],
  },
  {
    title: "Helix CMS",
    tag: "WordPress · Headless",
    desc: "Headless WP powering a 200-page magazine. Front-end is written in static-compiled Next.js, scaling up delivery times and caching via edge networks.",
    image: projectHelix,
    categories: ["SaaS & Web"] as Category[],
  },
  {
    title: "Orbit Runner",
    tag: "Unity · Steam",
    desc: "Hyper-arcade titles shipped on Steam & Switch. Implemented 60FPS fluid physics triggers, particle controllers, and global leaderboards integration.",
    image: projectOrbit,
    categories: ["Games"] as Category[],
  },
  {
    title: "Atlas Agent",
    tag: "AI · Automation",
    desc: "Multi-step LLM agent automating sales operations. Features custom semantic matching routers, calendar APIs, and automated response drafts.",
    image: projectAtlas,
    categories: ["AI & Automation"] as Category[],
  },
  {
    title: "Quartz Desktop",
    tag: "Tauri · Cross-platform",
    desc: "Privacy-first note taking app on Mac, Win & Linux. Combines local database encryption and high-performance Markdown editing tools.",
    image: projectQuartz,
    categories: ["SaaS & Web", "Mobile"] as Category[],
  },
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState<Category>("All");
  const { theme } = useTheme();

  // Choose logo asset based on theme Selection
  const logoSrc = theme === "gold" ? logoGold.src : logoBlue.src;

  const filteredProjects =
    selected === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(selected));

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden pb-20">
      {/* Glow ambient background orbs */}
      <div className="absolute inset-0 bg-hero opacity-80" />
      <div
        className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />

      {/* Floating Pill Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-2xl border border-border/40 bg-card/65 shadow-lg backdrop-blur-xl px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-3">
          <img src={logoSrc} alt="Aiventra" className="h-9 md:h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-surface transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </motion.header>

      {/* Main Content Container */}
      <main className="container-page pt-36 relative z-10 space-y-12">
        {/* Title area */}
        <div className="max-w-3xl space-y-4 text-center mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary justify-center">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>Case Studies</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-medium leading-tight">
            Selected Projects & Works
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Explore recent software assets, direct-response acquisition funnels, and dynamic AI
            automations designed to scale businesses.
          </p>
        </div>

        {/* Filter bar selector capsules */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-4 border-b border-border/20">
          {CATEGORIES.map((cat) => {
            const active = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all ${
                  active
                    ? "bg-primary border-primary text-primary-foreground shadow-md"
                    : "border-border/60 hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Animated Projects Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="card-elevated card-elevated-hover overflow-hidden group cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <img
                    src={p.image.src}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-20">
                    <span className="font-display text-2xl font-medium text-white drop-shadow-md">
                      {p.title}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all drop-shadow" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary mb-2">
                      {p.tag}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Card Section */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-primary/20 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full blur-[120px] opacity-25 pointer-events-none bg-primary" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[140px] opacity-20 pointer-events-none bg-primary" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h3 className="font-display text-3xl md:text-5xl font-medium leading-tight">
              Let's engineer your software asset
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Partner with our specialised engineering and user-acquisition cells today to build,
              deploy, and scale.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg text-primary-foreground px-8 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-all glow-primary whitespace-nowrap"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
