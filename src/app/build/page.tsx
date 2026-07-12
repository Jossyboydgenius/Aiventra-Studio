"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Plus, X, Layers, Search, RotateCcw } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
// ThemeToggle hidden — theme follows OS system preference automatically
// import { ThemeToggle } from "@/components/theme-toggle";
import logoBlue from "@/assets/logo-blue.png";
// import logoGold from "@/assets/logo-gold.png"; // gold disabled
import confetti from "canvas-confetti";

// Define project components (like PC components)
interface ComponentOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  tags?: string[];
}

interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  options: ComponentOption[];
}

const COMPONENTS: ComponentCategory[] = [
  {
    id: "platform",
    name: "Base Platform",
    icon: "layers",
    options: [
      {
        id: "website",
        name: "Corporate Website",
        desc: "High-performance marketing & branding site with animations.",
        price: 3000,
        tags: ["Entry", "Best Value"],
      },
      {
        id: "saas",
        name: "SaaS Platform",
        desc: "Complex dashboard workspace, analytics pipelines, & multi-tenant setups.",
        price: 6000,
        tags: ["Midrange", "Popular"],
      },
      {
        id: "app",
        name: "Mobile Application",
        desc: "React Native iOS & Android application, optimized for store deployment.",
        price: 8000,
        tags: ["High Performance"],
      },
      {
        id: "workflow",
        name: "AI & Automation Workflow",
        desc: "Intelligent background data pipelines, webhook setups, & chatbot integrations.",
        price: 5000,
        tags: ["Creator"],
      },
    ],
  },
  {
    id: "design",
    name: "Design Scope",
    icon: "brush",
    options: [
      {
        id: "none",
        name: "No Design Needed",
        desc: "We build directly from your existing Figma assets or wireframes.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "standard-design",
        name: "Standard Figma Design",
        desc: "Custom wireframing, component libraries, & modern grid designs.",
        price: 1200,
        tags: ["Midrange", "Best Value"],
      },
      {
        id: "complex-design",
        name: "Premium Figma UX Architecture",
        desc: "Full interactive layouts, advanced micro-interaction models, & style system files.",
        price: 2500,
        tags: ["Flagship"],
      },
      {
        id: "branding",
        name: "Custom Brand & Identity Assets",
        desc: "Logo variations, vector shapes, type scale templates, & style guidelines.",
        price: 800,
        tags: ["Creator"],
      },
    ],
  },
  {
    id: "pages",
    name: "Pages / Screens Count",
    icon: "file-text",
    options: [
      {
        id: "none",
        name: "Template Layout Only",
        desc: "Single custom page frame or standard screen layout base.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "pages-5",
        name: "Up to 5 Custom Pages/Screens",
        desc: "Custom crafted template routes and responsive media adapters.",
        price: 1000,
        tags: ["Entry"],
      },
      {
        id: "pages-10",
        name: "Up to 10 Custom Pages/Screens",
        desc: "Complete site structure, secondary sub-pages, and user flows.",
        price: 1800,
        tags: ["Midrange", "Best Value"],
      },
      {
        id: "pages-25",
        name: "Up to 25 Custom Pages/Screens",
        desc: "Broad information hub, multi-stage forms, or extensive mobile screens.",
        price: 3500,
        tags: ["High Performance", "Popular"],
      },
    ],
  },
  {
    id: "database",
    name: "Database & Auth Setup",
    icon: "database",
    options: [
      {
        id: "none",
        name: "No Database Setup",
        desc: "Static content build or third-party hosted content APIs.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "auth",
        name: "User Auth & Profiles",
        desc: "Secure credentials credentials, JWT tokens, Google/Apple OAuth login.",
        price: 800,
        tags: ["Midrange"],
      },
      {
        id: "cloud-db",
        name: "Supabase / PostgreSQL database",
        desc: "Relational tables database design, real-time sync listeners, and security rules.",
        price: 1500,
        tags: ["High Performance", "Popular"],
      },
    ],
  },
  {
    id: "payments",
    name: "Payments Integration",
    icon: "credit-card",
    options: [
      {
        id: "none",
        name: "No Checkout Integration",
        desc: "Static pricing links or offline invoices.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "stripe",
        name: "Stripe Checkout Setup",
        desc: "Stripe Checkout form, billing portals, and basic billing logs.",
        price: 1200,
        tags: ["Midrange", "Best Value"],
      },
      {
        id: "subscription",
        name: "Advanced Subscription Engine",
        desc: "Stripe Webhooks, customer portal tier controls, discounts, & metered billing.",
        price: 2200,
        tags: ["Flagship"],
      },
    ],
  },
  {
    id: "chatbot",
    name: "AI & Chatbot Setup",
    icon: "bot",
    options: [
      {
        id: "none",
        name: "No AI Integrations",
        desc: "Standard contact forms and static layouts.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "basic-bot",
        name: "Simple Rule-Based Widget",
        desc: "Configured helpdesk floating widget with pre-defined Q&A paths.",
        price: 800,
        tags: ["Entry"],
      },
      {
        id: "ai-agent",
        name: "Advanced OpenAI/LLM Agent",
        desc: "Intelligent agent trained on your docs with vector memory search.",
        price: 2000,
        tags: ["Flagship", "Popular"],
      },
    ],
  },
  {
    id: "crm",
    name: "CRM & Analytics",
    icon: "activity",
    options: [
      {
        id: "none",
        name: "Basic Analytics Only",
        desc: "Standard Google Analytics configuration.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "pixels",
        name: "Advanced SEO & Meta Pixels",
        desc: "Complete metadata grids, Schema tags, FB Pixel logging, and SEO checks.",
        price: 600,
        tags: ["Entry", "Best Value"],
      },
      {
        id: "crm-pipeline",
        name: "HubSpot / GHL CRM Automation",
        desc: "Active API connection sync, contact forms logs, & automated email notification triggers.",
        price: 1800,
        tags: ["Midrange", "Popular"],
      },
    ],
  },
];

const PRESETS = [
  {
    name: "SaaS Launchpad",
    desc: "Perfect start for modern software startups looking to build a high-converting web app.",
    cost: "$12,100",
    selections: {
      platform: "saas",
      design: "standard-design",
      pages: "pages-10",
      database: "cloud-db",
      payments: "stripe",
      chatbot: "none",
      crm: "pixels",
    },
  },
  {
    name: "Enterprise SaaS & AI",
    desc: "Complete corporate layout with database backend, Stripe subscriptions, and AI agent automation.",
    cost: "$18,300",
    selections: {
      platform: "saas",
      design: "complex-design",
      pages: "pages-25",
      database: "cloud-db",
      payments: "subscription",
      chatbot: "ai-agent",
      crm: "crm-pipeline",
    },
  },
  {
    name: "Marketing Corporate",
    desc: "Clean website with standard figma styles, CMS backend, and Facebook/Google logging.",
    cost: "$5,600",
    selections: {
      platform: "website",
      design: "standard-design",
      pages: "pages-10",
      database: "none",
      payments: "none",
      chatbot: "none",
      crm: "pixels",
    },
  },
  {
    name: "Mobile App Hub",
    desc: "iOS & Android build with security auth, standard figma design, and custom support widget.",
    cost: "$11,800",
    selections: {
      platform: "app",
      design: "standard-design",
      pages: "pages-5",
      database: "auth",
      payments: "none",
      chatbot: "basic-bot",
      crm: "none",
    },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BuildPage() {
  const { theme } = useTheme();

  // Core Configurator Selections State
  const [selections, setSelections] = useState<Record<string, string>>({
    platform: "website",
    design: "none",
    pages: "none",
    database: "none",
    payments: "none",
    chatbot: "none",
    crm: "none",
  });

  // Protection (Care) Plan: "included" | "care" | "pro"
  const [carePlan, setCarePlan] = useState<"included" | "care" | "pro">("included");

  // Payment Method: "full" | "milestone"
  const [paymentMethod, setPaymentMethod] = useState<"full" | "milestone">("full");

  // Sub-view Choosing States
  const [activeChoosingCategory, setActiveChoosingCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"none" | "asc" | "desc">("none");

  // Quote Request States
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Reset helper
  const handleReset = () => {
    setSelections({
      platform: "website",
      design: "none",
      pages: "none",
      database: "none",
      payments: "none",
      chatbot: "none",
      crm: "none",
    });
    setCarePlan("included");
    setPaymentMethod("full");
  };

  // Find selection details
  const getSelectedOptionFor = (catId: string) => {
    const cat = COMPONENTS.find((c) => c.id === catId);
    const selectedId = selections[catId];
    return cat?.options.find((o) => o.id === selectedId) || null;
  };

  // Preset Selection Handler
  const applyPreset = (presetSelections: Record<string, string>) => {
    setSelections({ ...presetSelections });
  };

  // Price calculations
  const getSubtotal = () => {
    return COMPONENTS.reduce((sum, cat) => {
      const selected = getSelectedOptionFor(cat.id);
      return sum + (selected ? selected.price : 0);
    }, 0);
  };

  const getCarePrice = () => {
    if (carePlan === "care") return 1500;
    if (carePlan === "pro") return 4000;
    return 0;
  };

  const subtotal = getSubtotal();
  const careCost = getCarePrice();

  // Calculate discount (10% off subtotal + care if pay in full)
  const isPayInFull = paymentMethod === "full";
  const discountRate = isPayInFull ? 0.1 : 0.0;
  const rawSubtotalPlusCare = subtotal + careCost;
  const discount = Math.round(rawSubtotalPlusCare * discountRate);

  // VAT (7.5%) calculated on the discounted subtotal
  const taxableAmount = rawSubtotalPlusCare - discount;
  const vat = Math.round(taxableAmount * 0.075);
  const grandTotal = taxableAmount + vat;

  // Confetti trigger
  const triggerConfetti = () => {
    // Gold disabled — always use blue confetti
    const activeColors = ["#0ea5e9", "#2563eb", "#3b82f6", "#06b6d4", "#e0f2fe"];
    // gold: ["#f59e0b", "#d97706", "#fbbf24", "#fef3c7", "#f97316"]

    confetti({
      particleCount: 160,
      spread: 90,
      colors: activeColors,
      zIndex: 10000,
    });
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const resetModal = () => {
    setName("");
    setEmail("");
    setNotes("");
    setSubmitted(false);
    setIsQuoteModalOpen(false);
  };

  // Category in active selection details
  const activeCategory = COMPONENTS.find((c) => c.id === activeChoosingCategory);

  // Filters option items based on query & sorts them
  const getFilteredOptions = () => {
    if (!activeCategory) return [];
    let items = [...activeCategory.options];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (o) => o.name.toLowerCase().includes(q) || o.desc.toLowerCase().includes(q),
      );
    }

    // Sort order
    if (sortBy === "asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  };

  // Active configuration count (items not "none")
  const configuredCount = Object.keys(selections).filter(
    (key) => selections[key] !== "none",
  ).length;

  const logoSrc = logoBlue.src; // gold disabled: theme === "gold" ? logoGold.src : logoBlue.src

  return (
    <div className="min-h-screen bg-background text-foreground relative pb-12 overflow-visible">
      {/* Background radial highlights */}
      <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none bg-primary" />

      {/* Navigation header bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-40 rounded-2xl border border-border/40 bg-card/65 shadow-md backdrop-blur-xl px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <img src={logoSrc} alt="Aiventra Studio" className="h-8 md:h-9 w-auto object-contain" />
          <span className="font-display font-medium text-lg hidden sm:inline">Aiventra Studio</span>
        </Link>
        <div className="flex items-center gap-3">
          {/* ThemeToggle hidden — theme follows OS system preference automatically */}
          {/* <ThemeToggle /> */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Main Grid Workspace */}
      <div className="pt-28 px-4 max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1fr_320px] items-start relative z-10 overflow-visible">
        {/* LEFT COLUMN: Configurator workspace / selection views */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!activeChoosingCategory ? (
              // MAIN CONFIGURATION VIEW
              <motion.div
                key="main-configurator"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="space-y-6"
              >
                {/* Heading details */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    Aiventra Studio Build
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                    Build your{" "}
                    <span className="text-gradient font-display italic font-medium">system.</span>
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                    Choose every component for your software system. Dynamic real-time build
                    estimates shown automatically based on your selections.
                  </p>
                </div>

                {/* Preset presets row */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Start from a preset
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {PRESETS.map((p) => {
                      const isMatching = Object.keys(p.selections).every(
                        (k) => selections[k] === (p.selections as Record<string, string>)[k],
                      );
                      return (
                        <button
                          key={p.name}
                          onClick={() => applyPreset(p.selections)}
                          className={`text-left p-4 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 ${
                            isMatching
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "card-elevated hover:border-primary/30"
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-semibold text-foreground text-sm">{p.name}</span>
                            <span className="text-primary font-bold">{p.cost}</span>
                          </div>
                          <span className="text-muted-foreground leading-normal">{p.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sephora-style component list table */}
                <div className="card-elevated overflow-hidden rounded-2xl border border-border/40 mt-4">
                  <div className="bg-muted/40 px-4 sm:px-5 py-3 border-b border-border/30 grid grid-cols-[1fr_75px_85px] sm:grid-cols-[1fr_100px_100px] text-xs font-semibold text-muted-foreground uppercase tracking-wider gap-x-2 sm:gap-x-4">
                    <span>Component</span>
                    <span className="text-right min-w-[50px]">Price</span>
                    <span className="text-right min-w-[70px]">Action</span>
                  </div>

                  <div className="divide-y divide-border/20">
                    {COMPONENTS.map((cat) => {
                      const selected = getSelectedOptionFor(cat.id);
                      return (
                        <div
                          key={cat.id}
                          className="px-4 sm:px-5 py-4 grid grid-cols-[1fr_75px_85px] sm:grid-cols-[1fr_100px_100px] items-center gap-x-2 sm:gap-x-4 gap-y-2 text-xs"
                        >
                          {/* Component column */}
                          <div className="space-y-1">
                            <div className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1.5">
                              <Layers className="h-3 w-3 text-primary" />
                              {cat.name}
                            </div>
                            {selected && selected.id !== "none" ? (
                              <div>
                                <span className="font-semibold text-foreground text-sm">
                                  {selected.name}
                                </span>
                                <p className="text-muted-foreground text-[10px] mt-0.5 leading-normal max-w-xl">
                                  {selected.desc}
                                </p>
                              </div>
                            ) : (
                              <span className="text-muted-foreground/60 italic">No selection</span>
                            )}
                          </div>

                          {/* Price column */}
                          <div className="text-right font-semibold text-foreground">
                            {selected && selected.price > 0 ? (
                              <span>${selected.price.toLocaleString()}</span>
                            ) : (
                              <span className="text-muted-foreground/40">--</span>
                            )}
                          </div>

                          {/* Action button column */}
                          <div className="flex justify-end items-center gap-2">
                            {selected && selected.id !== "none" ? (
                              <>
                                <button
                                  onClick={() => setActiveChoosingCategory(cat.id)}
                                  className="border border-border text-foreground hover:bg-surface px-3 py-1.5 rounded-lg font-medium transition-colors"
                                >
                                  Change
                                </button>
                                <button
                                  onClick={() => {
                                    setSelections({ ...selections, [cat.id]: "none" });
                                  }}
                                  className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                                  title="Clear selection"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setActiveChoosingCategory(cat.id)}
                                className="bg-primary text-primary-foreground hover:opacity-90 px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1"
                              >
                                <Plus className="h-3.5 w-3.5" /> Choose
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Project subtotal bar */}
                <div className="card-elevated p-4 px-5 flex items-center justify-between rounded-xl">
                  <div className="text-xs">
                    <span className="font-semibold uppercase tracking-wider text-muted-foreground block text-[10px]">
                      Project Subtotal
                    </span>
                    <span className="text-muted-foreground mt-0.5 block">
                      {configuredCount}/7 components configured
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleReset}
                      className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset configurator
                    </button>
                    <span className="text-xl font-bold text-gradient-primary">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Support & Maintenance (Aiventra Care) */}
                <div className="card-elevated p-6 rounded-2xl space-y-4">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Protect Your Build • Aiventra Care
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      We build systems that last. Choose a support coverage option for post-launch
                      safety.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {/* Standard included */}
                    <div
                      onClick={() => setCarePlan("included")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        carePlan === "included"
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Standard
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          3 months bugs & launch monitoring.
                        </p>
                      </div>
                      <span className="font-bold text-sm text-foreground mt-4 block">Free</span>
                    </div>

                    {/* Care 1 year */}
                    <div
                      onClick={() => setCarePlan("care")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        carePlan === "care"
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Aiventra Care
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          12 months system monitoring & minor adjustments.
                        </p>
                      </div>
                      <span className="font-bold text-sm text-primary mt-4 block">+$1,500</span>
                    </div>

                    {/* Care Pro 3 year */}
                    <div
                      onClick={() => setCarePlan("pro")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                        carePlan === "pro"
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-bl-lg">
                        Recommended
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Aiventra Care Pro
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          36 months priority bug fixes, SLA guarantee, and updates.
                        </p>
                      </div>
                      <span className="font-bold text-sm text-primary mt-4 block">+$4,000</span>
                    </div>
                  </div>

                  {/* Coverage details grid */}
                  <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-border/20 text-xs">
                    <div className="space-y-2">
                      <span className="font-bold text-green-500 uppercase tracking-widest text-[9px] block">
                        Covered
                      </span>
                      <ul className="space-y-1.5 text-muted-foreground text-[10px]">
                        <li className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500 shrink-0" /> Launch defects and
                          component bugs
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500 shrink-0" /> API integration
                          breaks and auth fixes
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500 shrink-0" /> Hosting server
                          tuning (under SLA)
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="font-bold text-red-500 uppercase tracking-widest text-[9px] block">
                        Not Covered
                      </span>
                      <ul className="space-y-1.5 text-muted-foreground text-[10px]">
                        <li className="flex items-center gap-2">
                          <X className="h-3 w-3 text-red-500 shrink-0" /> Complete layout design
                          revamps
                        </li>
                        <li className="flex items-center gap-2">
                          <X className="h-3 w-3 text-red-500 shrink-0" /> Third-party license and
                          database bills
                        </li>
                        <li className="flex items-center gap-2">
                          <X className="h-3 w-3 text-red-500 shrink-0" /> Extensive feature
                          additions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How would you like to pay */}
                <div className="card-elevated p-6 rounded-2xl space-y-4">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      How would you like to pay?
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Select your payment preference. Save with full upfront commitment.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div
                      onClick={() => setPaymentMethod("full")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        paymentMethod === "full"
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Pay in full
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          Receive a 10% discount on final subtotal & support.
                        </p>
                      </div>
                      <span className="font-semibold text-xs text-primary mt-4 block">
                        10% discount applied
                      </span>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("milestone")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        paymentMethod === "milestone"
                          ? "bg-primary/5 border-primary shadow-sm"
                          : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs uppercase tracking-wider block">
                          Milestone payments
                        </span>
                        <p className="text-[10px] text-muted-foreground">
                          Split across milestones (50% upfront, 25% design, 25% launch).
                        </p>
                      </div>
                      <span className="font-semibold text-xs text-muted-foreground mt-4 block">
                        Standard project terms
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // COMPONENT CHOOSING SUB-VIEW (Sephora Style Drawer)
              <motion.div
                key="choosing-drawer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="space-y-6"
              >
                {/* Back title row */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                  <button
                    onClick={() => {
                      setActiveChoosingCategory(null);
                      setSearchQuery("");
                      setSortBy("none");
                    }}
                    className="hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1"
                  >
                    Your Build
                  </button>
                  <span>/</span>
                  <span className="uppercase text-foreground tracking-widest">
                    Choose {activeCategory?.name}
                  </span>
                </div>

                {/* Sub-view search & filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={`Search ${activeCategory?.name.toLowerCase()}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-input border border-border/80 pl-9 pr-4 py-2 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                      Sort Price
                    </span>
                    <div className="flex rounded-lg border border-border overflow-hidden text-[10px]">
                      <button
                        onClick={() => setSortBy(sortBy === "asc" ? "none" : "asc")}
                        className={`px-3 py-1.5 transition-colors font-medium border-r border-border ${
                          sortBy === "asc"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-surface"
                        }`}
                      >
                        Lowest
                      </button>
                      <button
                        onClick={() => setSortBy(sortBy === "desc" ? "none" : "desc")}
                        className={`px-3 py-1.5 transition-colors font-medium ${
                          sortBy === "desc"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-surface"
                        }`}
                      >
                        Highest
                      </button>
                    </div>
                  </div>
                </div>

                {/* Options Table Row List */}
                <div className="card-elevated overflow-hidden rounded-2xl border border-border/40">
                  <div className="bg-muted/40 px-4 sm:px-5 py-3 border-b border-border/30 hidden sm:grid sm:grid-cols-[100px_1fr_100px] text-xs font-semibold text-muted-foreground uppercase tracking-wider gap-x-3">
                    <span>Action</span>
                    <span>Name - Specs</span>
                    <span className="text-right">Price</span>
                  </div>

                  <div className="divide-y divide-border/20">
                    {getFilteredOptions().map((opt) => {
                      const isSelected = selections[activeCategory?.id || ""] === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className="px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:grid sm:grid-cols-[100px_1fr_100px] items-start sm:items-center gap-3.5 sm:gap-3 text-xs"
                        >
                          {/* Action Button */}
                          <div className="order-3 sm:order-1 mt-1 sm:mt-0">
                            {isSelected ? (
                              <div className="bg-green-500/10 border border-green-500/35 text-green-500 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-lg inline-flex items-center gap-1.5">
                                <Check className="h-3 w-3 stroke-[3px]" /> Added
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelections({ ...selections, [activeCategory!.id]: opt.id });
                                  setActiveChoosingCategory(null);
                                  setSearchQuery("");
                                  setSortBy("none");
                                }}
                                className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-1.5 rounded-lg font-semibold transition-all inline-flex items-center gap-1"
                              >
                                <Plus className="h-3.5 w-3.5" /> Add
                              </button>
                            )}
                          </div>

                          {/* Specification Name & Info */}
                          <div className="order-1 sm:order-2 space-y-1 flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-foreground text-sm">
                                {opt.name}
                              </span>
                              {opt.tags?.map((t) => (
                                <span
                                  key={t}
                                  className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <p className="text-muted-foreground text-[10px] leading-relaxed max-w-xl">
                              {opt.desc}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="order-2 sm:order-3 text-left sm:text-right font-semibold text-foreground text-sm sm:w-full">
                            {opt.price > 0 ? (
                              <span>${opt.price.toLocaleString()}</span>
                            ) : (
                              <span className="text-muted-foreground/50">Free</span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {getFilteredOptions().length === 0 && (
                      <div className="p-8 text-center text-muted-foreground text-xs">
                        No matches found. Clear search or check filters.
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-view Footer */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveChoosingCategory(null);
                      setSearchQuery("");
                      setSortBy("none");
                    }}
                    className="border border-border text-foreground hover:bg-surface px-5 py-2.5 rounded-xl font-semibold transition-colors text-xs"
                  >
                    Return to Build
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Sticky Floating Sidebar Quote Panel */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6 w-full">
          <div className="relative overflow-hidden rounded-2xl p-5 border border-primary/20 bg-card shadow-lg flex flex-col justify-between">
            <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none bg-primary" />

            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Your Build
                </span>
                <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full text-primary">
                  {configuredCount}/7 Selected
                </span>
              </div>

              {/* Selection Summary Rows */}
              <div className="space-y-2 border-b border-border/20 pb-4 max-h-[220px] overflow-y-auto divide-y divide-border/10">
                {COMPONENTS.map((cat) => {
                  const selected = getSelectedOptionFor(cat.id);
                  if (!selected || selected.id === "none") return null;
                  return (
                    <div
                      key={cat.id}
                      className="flex justify-between items-start text-[10px] pt-2 first:pt-0 gap-2"
                    >
                      <div className="space-y-0.5 max-w-[200px]">
                        <span className="uppercase text-muted-foreground tracking-wider block text-[8px] font-medium">
                          {cat.name}
                        </span>
                        <span className="font-semibold text-foreground truncate block">
                          {selected.name}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground shrink-0 mt-2">
                        ${selected.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
                {configuredCount === 0 && (
                  <p className="text-muted-foreground text-[10px] italic text-center py-6">
                    Configure components to see options.
                  </p>
                )}
              </div>

              {/* Estimate Cost List */}
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Components Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {careCost > 0 && (
                  <div className="flex justify-between">
                    <span>Aiventra Care Plan</span>
                    <span className="font-semibold text-foreground">
                      ${careCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Pay in Full Discount (10%)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/10 pt-2.5">
                  <span>Tax / VAT (7.5%)</span>
                  <span className="font-semibold text-foreground">${vat.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-border/30 pt-4 flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">
                  Estimated Build Cost
                </span>
                <span className="text-3xl font-bold tracking-tight text-gradient-primary">
                  ${grandTotal.toLocaleString()}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  {isPayInFull ? "Paid in full upfront contract" : "Milestone layout splits"}
                </span>
              </div>

              {/* CTA button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-primary-foreground py-3 text-xs font-semibold hover:scale-[1.01] transition-all glow-primary"
                  style={{ background: "var(--gradient-primary)" }}
                  disabled={configuredCount === 0}
                >
                  Request Quote Specs <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Quote request contact form modal overlay */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="bg-card border border-border/40 w-full max-w-lg rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] space-y-6"
            >
              <button
                onClick={resetModal}
                className="absolute right-4 top-4 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-xl transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-6 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-medium">Build specs submitted!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for designing your software system with Aiventra! We've saved your
                      configurator component list, support care tier, and billing specifications.
                      Our engineering cell will contact you within one business day.
                    </p>
                  </div>
                  <button
                    onClick={resetModal}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-xs font-semibold hover:bg-surface transition-all"
                  >
                    Return to builder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-5">
                  <div className="space-y-2 text-center max-w-md mx-auto">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                      Get project estimation sheet
                    </span>
                    <h3 className="font-display text-2xl font-medium">
                      Submit build specifications
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      We'll compile your selected components, pages count, support plans, and
                      milestone terms into a formal proposal spec sheet.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                        placeholder="Enter email"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">
                        Project Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                        placeholder="Enter any additional requirements, target launch deadline, or custom integration details..."
                      />
                    </div>
                  </div>

                  {/* Summary recap specs */}
                  <div className="bg-muted/40 p-4 border border-border/10 rounded-2xl space-y-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground block">
                      Build Summary Specs:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        Build Components:{" "}
                        <span className="font-medium text-foreground uppercase">
                          {configuredCount}
                        </span>
                      </div>
                      <div>
                        Support Tier:{" "}
                        <span className="font-medium text-foreground uppercase">
                          {carePlan === "pro"
                            ? "Care Pro (3Y)"
                            : carePlan === "care"
                              ? "Care (1Y)"
                              : "Included (3M)"}
                        </span>
                      </div>
                      <div>
                        Payment terms:{" "}
                        <span className="font-medium text-foreground uppercase">
                          {isPayInFull ? "Pay in Full (-10%)" : "Milestone Term"}
                        </span>
                      </div>
                      <div>
                        Tax / VAT (7.5%):{" "}
                        <span className="font-medium text-foreground">${vat.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-[10px] pt-1.5 border-t border-border/20 flex justify-between items-baseline">
                      <span>Total Estimated Cost:</span>
                      <span className="font-semibold text-foreground text-sm">
                        ${grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-primary-foreground py-3.5 text-xs font-semibold hover:scale-[1.01] transition-all glow-primary"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Submit Specifications <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
