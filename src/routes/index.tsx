import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logoBlueAsset from "@/assets/aiventra-logo-blue.asset.json";
import logoGoldAsset from "@/assets/aiventra-logo-gold.asset.json";
import markAsset from "@/assets/aiventra-mark.asset.json";
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
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aiventra Studios — Build • Innovate • Elevate" },
      {
        name: "description",
        content:
          "Aiventra Studios is a 6-person tech collective crafting websites, SaaS, mobile & desktop apps, Unity games and AI automation.",
      },
      { property: "og:title", content: "Aiventra Studios — Build • Innovate • Elevate" },
      { property: "og:description", content: "Six senior builders, end-to-end product engineering." },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme();
  const src = theme === "gold" ? logoGoldAsset.url : logoBlueAsset.url;
  const heights = { sm: "h-9", md: "h-12", lg: "h-20 md:h-28" } as const;
  return (
    <span className={`inline-flex items-center logo-pill rounded-2xl px-3 py-1.5 ${size === "lg" ? "px-5 py-3" : ""}`}>
      <img src={src} alt="Aiventra Studios" className={`${heights[size]} w-auto object-contain`} />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-page flex h-18 py-3 items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <Logo size="sm" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
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
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container-page flex flex-col py-4 gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      {/* layered glow background */}
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg opacity-[0.25]" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, var(--color-background))" }}
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

      <div className="container-page relative z-10 flex flex-col items-center text-center gap-8 py-20">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Six senior builders · one studio
        </div>

        <Logo size="lg" />

        <h1 className="font-display text-5xl sm:text-7xl md:text-[5.5rem] font-bold leading-[0.95] tracking-tighter max-w-5xl">
          We engineer products that{" "}
          <span className="text-gradient-primary">elevate</span> brands.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          A tight-knit team of engineers and designers shipping websites, SaaS, native apps, games and AI
          automation — end to end.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold hover:bg-surface transition-colors"
          >
            View our work
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs uppercase tracking-[0.5em] text-muted-foreground">
          <span className="text-gradient font-semibold">Build</span>
          <span className="h-px w-12 bg-border" />
          <span className="text-gradient font-semibold">Innovate</span>
          <span className="h-px w-12 bg-border" />
          <span className="text-gradient font-semibold">Elevate</span>
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Alex Reyes", role: "Founder · Full-stack", initials: "AR" },
  { name: "Maya Chen", role: "Lead Designer", initials: "MC" },
  { name: "Daniel Park", role: "Mobile Engineer", initials: "DP" },
  { name: "Sara Okafor", role: "AI/ML Engineer", initials: "SO" },
  { name: "Luca Romano", role: "Game Developer", initials: "LR" },
  { name: "Iris Wang", role: "Backend Architect", initials: "IW" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-primary">
      <span className="h-px w-8 bg-primary/50" />
      {children}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <SectionLabel>About us</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Six experts. <br />
            <span className="text-gradient">One studio.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We're a senior collective who believes great software comes from small, deeply skilled teams.
            No layers, no handoffs — every project is built by the people you talk to.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is simple: help ambitious teams ship beautiful, performant products faster than
            they thought possible. From first sketch to live deployment, we own the craft.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            {[
              { k: "80+", v: "Projects shipped" },
              { k: "6", v: "Senior experts" },
              { k: "12", v: "Years combined" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold text-gradient-primary">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEAM.map((m) => (
            <div key={m.name} className="card-elevated card-elevated-hover p-5">
              <div
                className="aspect-square rounded-xl mb-4 grid place-items-center font-display text-2xl font-bold text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                {m.initials}
              </div>
              <div className="font-medium text-sm">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Globe, title: "Websites", desc: "Marketing sites, e-commerce and brand experiences built for speed and conversion." },
  { icon: Layers, title: "SaaS Platforms", desc: "End-to-end product engineering — from MVP to scale. Stripe, auth, dashboards." },
  { icon: FileCode, title: "WordPress", desc: "Custom themes, headless setups and lightning-fast managed migrations." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS & Android and cross-platform React Native apps users love." },
  { icon: Monitor, title: "Desktop Apps", desc: "Electron and Tauri apps for Mac, Windows and Linux — production-grade." },
  { icon: Gamepad2, title: "Unity Games", desc: "2D & 3D Unity titles, shaders, multiplayer systems and Steam shipping." },
  { icon: Bot, title: "AI Automation", desc: "LLM agents, RAG pipelines and workflow automation that actually ships value." },
];

function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center top, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="max-w-2xl mb-16 space-y-4">
          <SectionLabel>Services</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Everything you need, <span className="text-gradient">under one roof.</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="card-elevated card-elevated-hover p-7 group relative overflow-hidden">
              <div
                className="grid h-12 w-12 place-items-center rounded-xl mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ background: "var(--gradient-primary)" }}
              >
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { title: "Nimbus Analytics", tag: "SaaS · Dashboard", desc: "Real-time analytics platform for fintech." },
  { title: "Forge Mobile", tag: "iOS · Android", desc: "Field service app used by 12k technicians daily." },
  { title: "Helix CMS", tag: "WordPress · Headless", desc: "Headless WP powering a 200-page magazine." },
  { title: "Orbit Runner", tag: "Unity · Steam", desc: "Hyper-arcade title shipped on Steam & Switch." },
  { title: "Atlas Agent", tag: "AI · Automation", desc: "Multi-step LLM agent automating sales ops." },
  { title: "Quartz Desktop", tag: "Tauri · Cross-platform", desc: "Privacy-first note app on Mac, Win & Linux." },
];

function Portfolio() {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <SectionLabel>Portfolio</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Selected <span className="text-gradient">work.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            A glimpse of recent projects across SaaS, mobile, games and AI.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className="card-elevated card-elevated-hover overflow-hidden group">
              <div
                className="aspect-[4/3] relative overflow-hidden"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-glow))"
                      : "linear-gradient(135deg, var(--color-primary-glow), var(--color-accent))",
                }}
              >
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, white, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="font-display text-2xl font-bold text-primary-foreground drop-shadow">
                    {p.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-primary-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary mb-2">{p.tag}</div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRICING = [
  {
    name: "Launch",
    price: "$3.5k",
    desc: "For startups and small businesses needing a polished web presence.",
    features: ["Up to 5-page website", "Custom design system", "CMS integration", "SEO foundations", "2 weeks delivery"],
    featured: false,
  },
  {
    name: "Scale",
    price: "$12k",
    desc: "For teams shipping a product MVP or full SaaS module.",
    features: ["Full-stack web app", "Auth, payments & DB", "Admin dashboard", "API & integrations", "6 weeks delivery", "30 days support"],
    featured: true,
  },
  {
    name: "Bespoke",
    price: "Custom",
    desc: "For complex products — mobile, desktop, games or AI agents.",
    features: ["Discovery workshop", "Dedicated team of 3-6", "Mobile / desktop / Unity", "AI & automation", "Long-term partnership"],
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="section-padding relative">
      <div className="container-page">
        <div className="max-w-2xl mb-16 space-y-4">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Transparent <span className="text-gradient">packages.</span>
          </h2>
          <p className="text-muted-foreground">Fixed-scope or rolling engagements. Pick what fits.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 transition-all ${
                p.featured ? "glow-primary" : "card-elevated card-elevated-hover"
              }`}
              style={
                p.featured
                  ? { background: "var(--gradient-primary)", color: "var(--color-primary-foreground)" }
                  : undefined
              }
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-[10px] uppercase tracking-widest text-primary border border-border">
                  Most popular
                </div>
              )}
              <div className="font-display text-sm uppercase tracking-widest opacity-80">{p.name}</div>
              <div className="font-display text-5xl font-bold mt-3">{p.price}</div>
              <p className={`mt-4 text-sm ${p.featured ? "opacity-90" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "" : "text-primary"}`} />
                    <span className={p.featured ? "" : "text-foreground/90"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  p.featured
                    ? "bg-background text-foreground hover:bg-surface"
                    : "border border-border hover:bg-surface"
                }`}
              >
                Get started <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { quote: "Aiventra rebuilt our SaaS in 8 weeks. Page loads dropped from 4s to 600ms.", name: "Elena Marquez", role: "CTO, Nimbus" },
  { quote: "The team is shockingly senior. Felt like hiring an entire product org for a quarter.", name: "James Liu", role: "Founder, Forge" },
  { quote: "Best design + engineering studio we've worked with. Every detail was considered.", name: "Priya Sharma", role: "Head of Product, Helix" },
];

function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="max-w-2xl mb-16 space-y-4">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            What clients <span className="text-gradient">say.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card-elevated p-8 flex flex-col gap-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-foreground/90 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section-padding relative">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Let's build <span className="text-gradient">something great.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your project. We reply within one business day.
            </p>
            <div className="space-y-4 pt-6">
              <a
                href="mailto:hello@aiventra.studio"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" /> hello@aiventra.studio
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" /> +1 (415) 555-0142
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Remote · HQ San Francisco, CA
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="card-elevated p-8 space-y-5"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary disabled:opacity-70"
              disabled={sent}
              style={{ background: "var(--gradient-primary)" }}
            >
              {sent ? "Thanks — we'll be in touch" : <>Send message <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
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
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
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
    <section className="px-6">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl">
              Have a vision? Let's elevate it together.
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-transform"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground max-w-sm pt-2">
            Build. Innovate. Elevate. A studio of senior engineers and designers shipping world-class
            software.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
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
            <li>hello@aiventra.studio</li>
            <li>+1 (415) 555-0142</li>
            <li>San Francisco · Remote</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Aiventra Studios. All rights reserved.</span>
          <span>Build • Innovate • Elevate</span>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  // mark asset is preloaded for future use; reference to keep bundler happy
  void markAsset;
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
