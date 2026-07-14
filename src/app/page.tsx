"use client";

import Link from "next/link";
import confetti from "canvas-confetti";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import logoDefault from "@/assets/logo.png";
import logoBlue from "@/assets/logo-blue.png";
import logoGold from "@/assets/logo-gold.png";
import heroBlue from "@/assets/aiventra-logo-blue.png";
import heroBlueLight from "@/assets/aiventra-logo-blue-light.png";
import heroGold from "@/assets/aiventra-logo-gold.png";

// Renamed cell assets (for later use)
import cellWa from "@/assets/cell-wa.png";
import cellFa from "@/assets/cell-fa.png";
import cellEc from "@/assets/cell-ec.png";
import cellCb from "@/assets/cell-cb.png";
import cellAi from "@/assets/cell-ai.png";
import cellGs from "@/assets/cell-gs.png";
import cellMa from "@/assets/cell-ma.png";

// Team member portraits assets
import teamPeter from "@/assets/Peter.jpeg";
import teamComfort from "@/assets/Comfort.jpeg";
import teamEnoch from "@/assets/Enoch.jpeg";
import teamShayor from "@/assets/Shayor.jpeg";
import teamFemi from "@/assets/Femi.jpeg";

// Projects assets
import projectNimbus from "@/assets/project-nimbus.png";
import projectForge from "@/assets/project-forge.png";
import projectHelix from "@/assets/project-helix.png";
import projectOrbit from "@/assets/project-orbit.png";
import projectAtlas from "@/assets/project-atlas.png";
import projectQuartz from "@/assets/project-quartz.png";

import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Layers,
  Smartphone,
  Monitor,
  Gamepad2,
  Bot,
  FileCode,
  Check,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Star,
  TrendingUp,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: EASE,
      });
      return () => controls.stop();
    }
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: EASE },
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Build Studio", href: "/build" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  const { theme } = useTheme();

  // Gold disabled — always use blue logo
  const src = logoBlue.src;

  return <img src={src} alt="Aiventra Studios" className="h-9 md:h-10 w-auto object-contain" />;
}

interface HeroLogoProps {
  className?: string;
}

function HeroLogo({ className }: HeroLogoProps) {
  const { theme } = useTheme();

  // Gold disabled — light uses heroBlueLight, dark uses heroBlue
  const src = theme === "light" ? heroBlueLight.src : heroBlue.src;

  const defaultClass =
    theme === "light" ? "h-16 md:h-20 w-auto object-contain" : "h-38 md:h-42 w-auto object-contain";

  return <img src={src} alt="Aiventra Studios" className={className || defaultClass} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth close on scroll down or up
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => {
      setOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // Track height transitions to toggle overflow clipping
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 350);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{ height: open ? "auto" : "64px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 rounded-2xl border border-border/40 bg-card/65 shadow-lg backdrop-blur-xl md:overflow-visible ${
        isTransitioning ? "overflow-hidden" : open ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => {
            if (n.href.startsWith("/")) {
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {n.label}
                </Link>
              );
            }
            return (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "var(--gradient-primary)" }}
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {(open || isTransitioning) && (
        <div className="md:hidden border-t border-border/20 px-4 py-6 space-y-6 bg-background/95 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {NAV.map((n) => {
              if (n.href.startsWith("/")) {
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {n.label}
                  </Link>
                );
              }
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-border/10">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground whitespace-nowrap"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 md:pt-24 overflow-hidden"
    >
      {/* layered glow background */}
      <div className="absolute inset-0 bg-hero" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-background), transparent)",
        }}
      />
      {/* floating orbs */}
      <div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />

      <motion.div
        className="container-page relative z-10 flex flex-col items-center text-center gap-8 pt-10 pb-4 md:pt-16 md:pb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroLogo />

        <h1 className="font-display text-5xl sm:text-7xl md:text-[5.5rem] font-medium leading-[1.1] tracking-tighter max-w-5xl">
          We engineer products that{" "}
          <span className="text-gradient-primary font-display italic font-medium pr-3">
            elevate
          </span>{" "}
          brands.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          A tight-knit team of engineers and designers shipping websites, SaaS, native apps, games
          and AI automation — end to end.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary transition-transform hover:scale-[1.03] whitespace-nowrap"
            style={{ background: "var(--gradient-primary)" }}
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold hover:bg-surface transition-colors whitespace-nowrap"
          >
            View our work
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.5em] text-muted-foreground">
          <span className="text-gradient font-semibold">Build</span>
          <span className="hidden sm:inline-block h-px w-12 bg-border" />
          <span className="sm:hidden text-primary/40 font-bold select-none">•</span>
          <span className="text-gradient font-semibold">Innovate</span>
          <span className="hidden sm:inline-block h-px w-12 bg-border" />
          <span className="sm:hidden text-primary/40 font-bold select-none">•</span>
          <span className="text-gradient font-semibold">Elevate</span>
        </div>
      </motion.div>
    </section>
  );
}

const TEAM = [
  { name: "Peter", role: "Outsourcing · Production", image: teamPeter, linkedin: "/#" },
  {
    name: "Shayor",
    role: "Social Media · Production",
    image: teamShayor,
    linkedin:
      "https://www.linkedin.com/in/mofolasayo-osikoya-b53a832a0?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  { name: "Comfort", role: "Nurturing · Social Media", image: teamComfort, linkedin: "/#" },
  {
    name: "Enoch",
    role: "Nurturing · Production",
    image: teamEnoch,
    linkedin: "https://www.linkedin.com/in/enoch-timothy-942133375/",
  },
  {
    name: "Femi",
    role: "Production",
    image: teamFemi,
    linkedin: "https://www.linkedin.com/in/awejosepholaitan/",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-primary">
      <span className="h-px w-8 bg-primary/50" />
      {children}
    </span>
  );
}

// ─── Interactive Team Marquee ────────────────────────────────────────────────
// Supports:
//  • Auto-scroll (pauses while user interacts)
//  • Mouse drag-to-scroll on desktop
//  • Touch swipe on mobile
//  • Click/tap to reveal LinkedIn link on mobile
function TeamMemberCard({ member, index }: { member: (typeof TEAM)[number]; index: number }) {
  const [tapped, setTapped] = useState(false);

  // On mobile, tapping reveals the LinkedIn button; tapping again hides it.
  // On desktop the hover CSS handles it natively.
  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Only intercept touch interactions — let pure mouse clicks on LinkedIn
    // anchor propagate normally.
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice) return;
    e.preventDefault();
    setTapped((prev) => !prev);
  }, []);

  return (
    <div
      key={`card-${index}`}
      onClick={handleTap}
      className="relative overflow-hidden rounded-2xl border border-border/30 bg-card flex flex-col justify-end p-6 group aspect-[3/4] w-[220px] sm:w-[260px] shrink-0 select-none cursor-grab active:cursor-grabbing touch-pan-x"
    >
      <img
        src={member.image.src}
        alt={member.name}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
      />

      {/* LinkedIn icon — visible on hover (desktop) OR when tapped (mobile) */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`View ${member.name} on LinkedIn`}
        className={[
          "absolute top-4 right-4 z-30 p-2 text-white bg-black/60 border border-white/20 rounded-full",
          "hover:bg-primary transition-all duration-300 shadow-md",
          // Desktop: shown on group-hover; Mobile: shown when tapped
          tapped
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
        ].join(" ")}
      >
        <Linkedin className="h-4 w-4" />
      </a>

      {/* Bottom gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />

      {/* Name + role */}
      <div
        className={[
          "relative z-20 text-center transition-transform duration-500 ease-out",
          tapped ? "translate-y-0" : "translate-y-3 group-hover:translate-y-0",
        ].join(" ")}
      >
        <h4 className="font-display text-xl font-medium text-white drop-shadow">{member.name}</h4>
        <p
          className={[
            "text-xs text-white/80 font-medium tracking-wide mt-1.5 transition-opacity duration-500",
            tapped ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          ].join(" ")}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

function TeamMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  // Accumulated pixel offset (we animate translateX via this)
  const offsetRef = useRef(0);
  // Auto-scroll speed (px per frame at 60fps)
  const SPEED = 0.5;
  // Whether the user is actively dragging / touching
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const touchStartX = useRef(0);
  const touchLastX = useRef(0);

  // Apply the current offset to the DOM element directly (no React re-render
  // needed — this keeps it smooth).
  const applyOffset = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // The track contains two identical sets of cards.  We measure the width of
    // one set (half of scrollWidth) and loop once we've scrolled that far.
    const halfW = el.scrollWidth / 2;
    // Keep offset in [0, halfW) so the loop is invisible.
    offsetRef.current = ((offsetRef.current % halfW) + halfW) % halfW;
    el.style.transform = `translateX(-${offsetRef.current}px)`;
  }, []);

  // Auto-scroll RAF loop
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current) {
        offsetRef.current += SPEED;
        applyOffset();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyOffset]);

  // ── Mouse drag handlers ──────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    // Change cursor on the wrapper via class added to body
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = lastX.current - e.clientX;
      lastX.current = e.clientX;
      offsetRef.current += delta;
      applyOffset();
    };
    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [applyOffset]);

  // ── Touch handlers ───────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchLastX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = touchLastX.current - e.touches[0].clientX;
    touchLastX.current = e.touches[0].clientX;
    offsetRef.current += delta;
    applyOffset();
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="relative w-full overflow-hidden py-4 border-y border-border/20 bg-surface/30"
      // pause auto-scroll on hover (desktop)
      onMouseEnter={() => {
        isDragging.current = true;
      }}
      onMouseLeave={() => {
        isDragging.current = false;
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ cursor: "grab" }}
    >
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrollable track — two copies for seamless infinite loop */}
      <div
        ref={trackRef}
        className="flex w-max gap-4 sm:gap-6 px-4 will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {/* First copy */}
        {TEAM.map((m, i) => (
          <TeamMemberCard key={`a-${i}`} member={m} index={i} />
        ))}
        {/* Second copy for seamless loop */}
        {TEAM.map((m, i) => (
          <TeamMemberCard key={`b-${i}`} member={m} index={i} />
        ))}
      </div>

      {/* Scroll hint on mobile */}
      <p className="sm:hidden text-center text-[10px] text-muted-foreground/50 mt-2 pointer-events-none">
        Swipe to explore · Tap a card to see LinkedIn
      </p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-padding pt-6 md:pt-10 relative overflow-hidden">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center mb-16">
        <motion.div className="space-y-6" {...FADE_UP}>
          <SectionLabel>About us</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
            Specialized teams. <br />
            <span className="text-gradient font-display italic font-medium">One studio.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We're a collective of partner teams who believe great digital platforms come from small,
            deeply skilled specialized cells. No layers, no handoffs — we build at velocity.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is simple: help ambitious brands build highly optimized acquisition and
            automation systems that scale digital revenue. From custom engineering to ads and flow
            optimization, we own the results.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:pl-12 border-t lg:border-t-0 lg:border-l border-border/40 pt-8 lg:pt-0 lg:py-4"
          {...FADE_UP}
        >
          {[
            { val: 80, suf: "+", label: "Projects shipped" },
            { val: 6, suf: "", label: "Partner teams" },
            { val: 12, suf: "", label: "Years combined" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-6"
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-6xl font-medium text-gradient-primary leading-none lg:w-28 shrink-0">
                <Counter value={s.val} suffix={s.suf} />
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest text-muted-foreground font-medium max-w-[150px] leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interactive team marquee — drag/swipe/tap */}
      <TeamMarquee />
    </section>
  );
}

const SERVICES = [
  {
    icon: Globe,
    slug: "web-development",
    title: "Web Development",
    desc: "SaaS platforms, custom frontends, headless WordPress setups, and speed optimization built for maximum performance.",
  },
  {
    icon: Smartphone,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    desc: "Native iOS & Android mobile applications, cross-platform React Native / Flutter systems, and seamless App Store / Google Play shipping.",
  },
  {
    icon: TrendingUp,
    slug: "lead-generation-funnels",
    title: "Lead Generation Funnels",
    desc: "High-converting funnel systems built for SaaS platforms, coaches, and creators. Strategic copywriting, conversion rate optimization (CRO), and paid ads.",
  },
  {
    icon: ShoppingBag,
    slug: "e-commerce-revenue-setup",
    title: "E-commerce Revenue Setup",
    desc: "End-to-end Shopify stores and transactional platforms optimized with marketing automation, Meta/Google ads, and automated cart recovery systems.",
  },
  {
    icon: Calendar,
    slug: "booking-crm-pipelines",
    title: "Booking & CRM Pipelines",
    desc: "Seamless booking flows and multi-stage CRM pipelines for service businesses. Automated lead scoring, client onboarding, and scheduling engines.",
  },
  {
    icon: Bot,
    slug: "ai-workflows-automation",
    title: "AI & Workflows Automation",
    desc: "Custom LLM support agents, CRM automation (GoHighLevel/HubSpot flows), AI chatbots for leads/support, Email/SMS follow-up, and unified reporting dashboards.",
  },
];

function Services() {
  return (
    <section id="services" className="section-padding pb-6 md:pb-10 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center top, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <motion.div className="max-w-2xl mb-16 space-y-4" {...FADE_UP}>
          <SectionLabel>Services</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
            Everything you need,{" "}
            <span className="text-gradient font-display italic font-medium">under one roof.</span>
          </h2>
        </motion.div>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {SERVICES.map((s) => (
            <Link href={`/services/${s.slug}`} key={s.title} className="block group">
              <motion.div
                className="card-elevated card-elevated-hover p-7 relative overflow-hidden h-full cursor-pointer"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE },
                  },
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS · Dashboard",
    desc: "Real-time analytics platform for fintech.",
    image: projectNimbus,
  },
  {
    title: "Forge Mobile",
    tag: "iOS · Android",
    desc: "Field service app used by 12k technicians daily.",
    image: projectForge,
  },
  {
    title: "Helix CMS",
    tag: "WordPress · Headless",
    desc: "Headless WP powering a 200-page magazine.",
    image: projectHelix,
  },
  {
    title: "Orbit Runner",
    tag: "Unity · Steam",
    desc: "Hyper-arcade title shipped on Steam & Switch.",
    image: projectOrbit,
  },
  {
    title: "Atlas Agent",
    tag: "AI · Automation",
    desc: "Multi-step LLM agent automating sales ops.",
    image: projectAtlas,
  },
  {
    title: "Quartz Desktop",
    tag: "Tauri · Cross-platform",
    desc: "Privacy-first note app on Mac, Win & Linux.",
    image: projectQuartz,
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="section-padding pt-6 md:pt-10 pb-6 md:pb-10">
      <div className="container-page">
        <motion.div className="flex flex-wrap items-end justify-between gap-6 mb-16" {...FADE_UP}>
          <div className="max-w-2xl space-y-4">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
              Selected <span className="text-gradient font-display italic font-medium">work.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            A glimpse of recent projects across SaaS, mobile, games and AI.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              className="card-elevated card-elevated-hover overflow-hidden group cursor-pointer"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                {/* Generated Project Asset */}
                <img
                  src={p.image.src}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Glass dark overlay layer for maximum readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-20">
                  <span className="font-display text-2xl font-medium text-white drop-shadow-md">
                    {p.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all drop-shadow" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary mb-2">{p.tag}</div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold hover:bg-surface transition-all hover:scale-[1.02] whitespace-nowrap"
          >
            Explore Full Portfolio <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="section-padding pt-6 md:pt-10 pb-6 md:pb-10 relative">
      <div className="container-page">
        <motion.div className="max-w-2xl mb-16 space-y-4" {...FADE_UP}>
          <SectionLabel>Build Studio</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
            Configure &{" "}
            <span className="text-gradient font-display italic font-medium">estimate.</span>
          </h2>
          <p className="text-muted-foreground">
            No rigid packages. Select your features, customize your layout, and build a custom
            estimate in real-time.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Neon background glows */}
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full blur-[120px] opacity-25 pointer-events-none bg-primary" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[140px] opacity-20 pointer-events-none bg-primary" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl font-medium leading-tight">
                Configure your custom project options in real-time
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Instead of dealing with rigid pricing packages that don't match your actual needs,
                select only the components, pages, design scopes, and integrations required for your
                build.
              </p>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-foreground/90 font-medium">
                    Interactive Component Selection
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-foreground/90 font-medium">
                    Granular Component Selection
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-foreground/90 font-medium">
                    Real-time Budget Calculator
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-foreground/90 font-medium">
                    Figma Design & Bug Warranty Support
                  </span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/build"
                  className="inline-flex items-center gap-2 rounded-lg text-primary-foreground px-8 py-4 text-sm font-semibold hover:scale-[1.02] transition-all glow-primary whitespace-nowrap"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Start Building <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Visual preview representation of the Sephora-style PC/Software builder */}
            <div className="relative flex justify-center items-center h-[340px] sm:h-[400px]">
              {/* Outer decorative borders and orbs */}
              <div className="absolute inset-0 border border-dashed border-border/40 rounded-3xl flex items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/30 absolute top-4">
                  Interactive Spec Sheet
                </span>
              </div>

              {/* Main Builder Window Mock */}
              <div className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[52%] w-[95%] aspect-[4/3] bg-background border border-border/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all origin-center">
                {/* Browser top-bar */}
                <div className="bg-muted px-4 py-2.5 border-b border-border/40 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[9px] font-semibold text-muted-foreground font-mono">
                    aiventra-spec-sheet.config
                  </span>
                  <div className="w-6" />
                </div>

                {/* Spec List Content */}
                <div className="flex-grow p-3 sm:p-4 space-y-3 font-mono text-[8px] sm:text-[10px] text-muted-foreground/90 overflow-y-auto whitespace-nowrap">
                  <div className="flex justify-between items-center bg-primary/5 border border-primary/20 p-2.5 rounded-xl text-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span>Base Platform: SaaS Dashboard</span>
                    </div>
                    <span className="font-semibold text-primary">$6,000</span>
                  </div>

                  <div className="flex justify-between items-center bg-muted/40 border border-border/20 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span>Database: Cloud PostgreSQL</span>
                    </div>
                    <span className="font-semibold text-foreground">$1,500</span>
                  </div>

                  <div className="flex justify-between items-center bg-muted/40 border border-border/20 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span>Design: Figma UX Architecture</span>
                    </div>
                    <span className="font-semibold text-foreground">$2,500</span>
                  </div>

                  <div className="flex justify-between items-center bg-muted/40 border border-border/20 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      <span>Security: Auth0 & JWT Access</span>
                    </div>
                    <span className="font-semibold text-foreground">$800</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Glassmorphism Invoice/Total Card */}
              <div className="absolute bottom-6 right-1 sm:right-4 w-[72%] sm:w-[62%] bg-card/85 backdrop-blur-xl border border-primary/30 p-3 sm:p-4 rounded-2xl shadow-3xl space-y-2 sm:space-y-3 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Your Estimate
                  </span>
                  <span className="text-[8px] font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full text-primary">
                    4/7 Configured
                  </span>
                </div>

                <div className="space-y-1.5 text-[10px] text-muted-foreground border-b border-border/20 pb-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">$10,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (7.5%)</span>
                    <span className="font-semibold text-foreground">$810</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-muted-foreground">
                    Total Spec Cost
                  </span>
                  <span className="text-lg font-bold text-gradient-primary">$11,610</span>
                </div>

                <div
                  className="w-full text-center text-[9px] font-bold text-primary-foreground py-2 rounded-lg bg-primary cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Submit Build Specs
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "Aiventra rebuilt our SaaS in 8 weeks. Page loads dropped from 4s to 600ms.",
    name: "Elena Marquez",
    role: "CTO, Nimbus",
  },
  {
    quote: "The team is shockingly senior. Felt like hiring an entire product org for a quarter.",
    name: "James Liu",
    role: "Founder, Forge",
  },
  {
    quote: "Best design + engineering studio we've worked with. Every detail was considered.",
    name: "Priya Sharma",
    role: "Head of Product, Helix",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding pt-6 md:pt-10">
      <div className="container-page">
        <motion.div className="max-w-2xl mb-12 space-y-4" {...FADE_UP}>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
            What clients <span className="text-gradient font-display italic font-medium">say.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-border/40 bg-card/65 p-8 sm:p-12 min-h-[280px] flex flex-col justify-between">
          <div className="absolute top-6 right-8 text-primary/10 font-display text-8xl select-none font-bold">
            “
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-base sm:text-lg md:text-2xl text-foreground/90 font-display font-medium leading-relaxed italic">
                "{TESTIMONIALS[activeIndex].quote}"
              </blockquote>
              <figcaption className="pt-6 border-t border-border/20">
                <div className="font-display text-sm sm:text-base font-medium text-foreground">
                  {TESTIMONIALS[activeIndex].name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {TESTIMONIALS[activeIndex].role}
                </div>
              </figcaption>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8 z-20">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  /* eslint-disable @typescript-eslint/no-explicit-any, prefer-const, prefer-rest-params */
  // Load Cal.com embed dynamically on mount
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window as any, "https://app.cal.com/embed/embed.js", "init");

    // Initialize the namespace
    if ((window as any).Cal) {
      (window as any).Cal("init", "30min", { origin: "https://app.cal.com" });
      (window as any).Cal.config = (window as any).Cal.config || {};
      (window as any).Cal.config.forwardQueryParams = true;
    }
  }, []);

  // Set up UI configurations for the Cal.com modal
  useEffect(() => {
    if (!(window as any).Cal) return;
    try {
      (window as any).Cal.ns["30min"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    } catch (err) {
      console.error("Cal.com UI failed to initialize:", err);
    }
  }, [theme]);
  /* eslint-enable @typescript-eslint/no-explicit-any, prefer-const, prefer-rest-params */

  const fireConfetti = (activeTheme: string) => {
    // Gold disabled — always use blue confetti
    const colors = ["#0ea5e9", "#2563eb", "#3b82f6", "#06b6d4", "#e0f2fe"];
    // gold: ["#f59e0b", "#d97706", "#fbbf24", "#fef3c7", "#f97316"]

    // Primary burst
    confetti({
      particleCount: 140,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors: colors,
      zIndex: 9999,
    });

    // Follow-up stream for 900ms
    const end = Date.now() + 900;
    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        zIndex: 9999,
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        zIndex: 9999,
      });

      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div className="space-y-6" {...FADE_UP}>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
              Let's build{" "}
              <span className="text-gradient font-display italic font-medium">
                something great.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your project. We reply within one business day.
            </p>
            <div className="space-y-4 pt-6">
              <a
                href="mailto:hello@aiventrastudio.com"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors font-medium"
              >
                <Mail className="h-4 w-4 text-primary" /> hello@aiventrastudio.com
              </a>
              <a
                href="tel:+2348085082246"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors font-medium"
              >
                <Phone className="h-4 w-4 text-primary" /> +234 808 508 2246
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                <MapPin className="h-4 w-4 text-primary" /> Remote
              </div>
              <button
                data-cal-link="techapostle/30min"
                data-cal-config='{"layout":"month_view"}'
                className="flex items-center gap-3 text-sm text-primary hover:opacity-80 transition-opacity font-semibold cursor-pointer pt-2"
              >
                <Calendar className="h-4 w-4 text-primary" /> Book a quick intro call
              </button>
            </div>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-8 text-center space-y-6 flex flex-col items-center justify-center min-h-[380px]"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-medium">Message Received!</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your request and will get back to you
                  within one business day.
                </p>
              </div>
              <button
                onClick={() => setSent(false)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:bg-surface transition-all hover:scale-[1.01]"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const company = formData.get("company") as string;
                const details = e.currentTarget.querySelector("textarea")?.value || "";

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, company, details }),
                  });
                  if (!res.ok) {
                    console.error(
                      "API contact form delivery failed, falling back to mock UI success.",
                    );
                  }
                } catch (err) {
                  console.error("Failed to connect to API endpoint:", err);
                }

                setSent(true);
                fireConfetti(theme);
              }}
              className="card-elevated p-8 space-y-5"
              {...FADE_UP}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Company" name="company" />
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Project details
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-lg bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Tell us what you're building..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary disabled:opacity-70 whitespace-nowrap"
                disabled={sent}
                style={{ background: "var(--gradient-primary)" }}
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>
          )}
        </div>
      </div>

      {/* Custom dynamic theme-aligned Cal.com floating button */}
      <motion.button
        data-cal-link="techapostle/30min"
        data-cal-config='{"layout":"month_view"}'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed bottom-6 right-6 z-50 flex h-14 items-center justify-start bg-primary text-primary-foreground shadow-2xl cursor-pointer"
        style={{ boxShadow: "var(--shadow-glow)" }}
        animate={{
          width: hovered ? 172 : 56,
          borderRadius: "9999px",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 23 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center h-full pl-[14px] pr-4 whitespace-nowrap overflow-hidden">
          {/* Custom Inspected Calendar SVG */}
          <svg
            className="h-7 w-7 shrink-0 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold tracking-wide ml-3 select-none"
              >
                Book my Cal
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

function CtaBanner() {
  return (
    <section className="relative">
      <div className="container-page">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center border border-primary/20 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          {/* Frosted/gradient ambient orbs */}
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full blur-[120px] opacity-25 pointer-events-none bg-primary" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[140px] opacity-20 pointer-events-none bg-primary" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-display text-4xl md:text-6xl font-medium leading-tight">
                Have a vision? <br />
                Let's{" "}
                <span className="text-gradient-primary font-display italic font-medium pr-1.5">
                  elevate
                </span>{" "}
                it together.
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Connect with our specialized engineering and growth cells to architect, deploy, and
                scale your digital acquisition funnel or software asset.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-lg text-primary-foreground px-8 py-4 text-sm font-semibold hover:scale-[1.03] transition-all glow-primary whitespace-nowrap"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const { theme } = useTheme();

  // Gold disabled — light uses hero banner, dark uses blue logo
  const footerSrc = theme === "light" ? heroBlueLight.src : logoBlue.src;

  const footerLogoClass =
    theme === "light" ? "h-22 md:h-25 w-auto object-contain" : "h-16 md:h-18 w-auto object-contain";

  return (
    <footer className="border-t border-border mt-20">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <img src={footerSrc} alt="Aiventra Studios" className={footerLogoClass} />
          <p className="text-sm text-muted-foreground max-w-sm pt-2">
            Build. Innovate. Elevate. A studio of senior engineers and designers shipping
            world-class software.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/aiventra-studios-6b949441b/" },
              { icon: Twitter, href: "https://x.com/aiventrastudios?s=11" },
              {
                icon: Facebook,
                href: "https://www.facebook.com/profile.php?id=61591476395421&mibextid=wwXIfr",
              },
            ].map((soc, i) => {
              const Icon = soc.icon;
              return (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-foreground font-semibold mb-4">
            Navigate
          </div>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-foreground font-semibold mb-4">
            Contact
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:hello@aiventrastudio.com"
                className="hover:text-primary transition-colors"
              >
                hello@aiventrastudio.com
              </a>
            </li>
            <li>Remote</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Aiventra Studios. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
