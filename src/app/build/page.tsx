"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  X,
  Layers,
  Search,
  RotateCcw,
  Database,
  TrendingUp,
  Bot,
  Activity,
  Globe,
  Zap,
  Smartphone,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import logoBlue from "@/assets/logo-blue.png";
import confetti from "canvas-confetti";
import { toast } from "sonner";

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

// 7 Categories Mapping the entire pricing document
const COMPONENTS: ComponentCategory[] = [
  {
    id: "tier",
    name: "Core Package Tier",
    icon: "layers",
    options: [
      {
        id: "starter",
        name: "Starter Package",
        desc: "For new businesses: Landing page, basic website, contact forms, basic SEO.",
        price: 500,
        tags: ["Entry"],
      },
      {
        id: "standard",
        name: "Standard Package",
        desc: "For growing businesses: Multi-page website, CRM setup, automations, analytics, email integration.",
        price: 2499,
        tags: ["Growing"],
      },
      {
        id: "growth",
        name: "Growth Package",
        desc: "For scaling: Website + Funnel + CRM + Workflows + Lead Automation + Conversion Optimization.",
        price: 5499,
        tags: ["Scaling", "Popular"],
      },
      {
        id: "professional",
        name: "Professional Package",
        desc: "Advanced systems: Everything in Growth plus custom integrations, dashboards, booking systems, AI automations.",
        price: 10000,
        tags: ["Systems", "Flagship"],
      },
      {
        id: "enterprise",
        name: "Enterprise Package",
        desc: "Large organizations: Fully custom digital systems, multiple departments, dedicated support, SLAs, advanced security.",
        price: 25000,
        tags: ["Enterprise"],
      },
      {
        id: "tripwire",
        name: "Tripwire Audit Offer",
        desc: "Entry offer: Website Audit, Funnel Audit, CRM Audit, UX Audit, Sales System Audit.",
        price: 99,
        tags: ["Audit Offer"],
      },
    ],
  },
  {
    id: "crm-setup",
    name: "CRM & Workflow Setup",
    icon: "database",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "web-crm",
        name: "Website & CRM Setup",
        desc: "Integrated lead routing, contact organization, & pipeline setup ($500 – $2,000 range).",
        price: 1250,
        tags: ["Cross-Sell"],
      },
      {
        id: "crm-workflow",
        name: "CRM & Workflow Automation",
        desc: "Advanced auto-assigns, workflow setups, & pipeline notification triggers ($500 – $2,500 range).",
        price: 1500,
        tags: ["Cross-Sell"],
      },
    ],
  },
  {
    id: "funnels-marketing",
    name: "Sales Funnel & Email Marketing",
    icon: "trending-up",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "web-funnel",
        name: "Website & Sales Funnel",
        desc: "Interactive landing stages built to capture traffic and convert ($800 – $3,000 range).",
        price: 1900,
        tags: ["Cross-Sell"],
      },
      {
        id: "funnel-email",
        name: "Funnel & Email Marketing",
        desc: "Drip campaigns, custom newsletter integration, and lead tags ($400 – $1,500 range).",
        price: 950,
        tags: ["Cross-Sell"],
      },
    ],
  },
  {
    id: "chatbot-booking",
    name: "Booking Systems & AI Chatbots",
    icon: "bot",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "booking",
        name: "Booking System Setup",
        desc: "Calendar integration, booking page, and automatic invitation triggers.",
        price: 200,
        tags: ["Cross-Sell"],
      },
      {
        id: "chatbot",
        name: "AI Chatbot Widget",
        desc: "Rule-based chatbot widget custom-configured on pages ($800 – $2,000 range).",
        price: 1400,
        tags: ["Cross-Sell"],
      },
    ],
  },
  {
    id: "conversion-cro",
    name: "Conversion Optimization & Analytics",
    icon: "activity",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "cro",
        name: "Conversion Rate Optimization (CRO)",
        desc: "Detailed page usability tracking, heatmap logging, & updates ($1,000 – $5,000 range).",
        price: 3000,
        tags: ["Upsell"],
      },
      {
        id: "analytics",
        name: "Analytics Dashboard",
        desc: "Centralized analytics reporting dashboard custom-integrated ($400 – $2,000 range).",
        price: 1200,
        tags: ["Upsell"],
      },
    ],
  },
  {
    id: "seo-search",
    name: "SEO Optimization Services",
    icon: "globe",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "seo",
        name: "SEO Optimization Package",
        desc: "In-depth keyword analysis, metadata structuring, Schema markups, & logs ($250 – $2,000 range).",
        price: 1125,
        tags: ["Upsell"],
      },
    ],
  },
  {
    id: "advanced-automation",
    name: "AI & Marketing Automation",
    icon: "zap",
    options: [
      {
        id: "none",
        name: "No Add-on Selection",
        desc: "Skip this add-on or use base package capabilities.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "ai-support",
        name: "AI Customer Support System",
        desc: "Intelligent OpenAI customer support system with document search ($1,500 – $3,000 range).",
        price: 2250,
        tags: ["Upsell"],
      },
      {
        id: "marketing-auto",
        name: "Marketing Automation Systems",
        desc: "Drip triggers, complex behavioral tracking workflows ($500 – $3,000 range).",
        price: 1750,
        tags: ["Upsell"],
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App Companion",
    icon: "smartphone",
    options: [
      {
        id: "none",
        name: "No Mobile App Extension",
        desc: "Skip mobile app or use web platform capabilities only.",
        price: 0,
        tags: ["Excluded"],
      },
      {
        id: "starter-mobile",
        name: "Starter Companion App",
        desc: "Single-platform (iOS or Android) simple React Native application ($3,000 – $6,000 range).",
        price: 3500,
        tags: ["Mobile"],
      },
      {
        id: "cross-platform",
        name: "Cross-Platform Mobile App",
        desc: "Bespoke iOS & Android application with push alerts and local sync ($8,000 – $15,000 range).",
        price: 8500,
        tags: ["Mobile"],
      },
    ],
  },
];

// Presets based on the new tiers
const PRESETS = [
  {
    name: "Starter Pack",
    desc: "Perfect start for new businesses looking for a simple, professional corporate layout.",
    cost: "$500",
    selections: {
      tier: "starter",
      "crm-setup": "none",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "none",
    },
  },
  {
    name: "Standard Package",
    desc: "Complete Standard plan including integrated CRM Setup and basic automations.",
    cost: "$3,749",
    selections: {
      tier: "standard",
      "crm-setup": "web-crm",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "none",
    },
  },
  {
    name: "Growth Scale Pack",
    desc: "Growth tier package with Sales Funnel, CRM workflows, and Conversion Optimization.",
    cost: "$5,499",
    selections: {
      tier: "growth",
      "crm-setup": "none",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "none",
    },
  },
  {
    name: "Professional Suite",
    desc: "Professional tier pack with AI Chatbot and custom Analytics Dashboard.",
    cost: "$12,600",
    selections: {
      tier: "professional",
      "crm-setup": "none",
      "funnels-marketing": "none",
      "chatbot-booking": "chatbot",
      "conversion-cro": "analytics",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "none",
    },
  },
  {
    name: "Starter Mobile App",
    desc: "Dedicated single-platform mobile app package with auth and app store submission.",
    cost: "$3,500",
    selections: {
      tier: "starter",
      "crm-setup": "none",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "starter-mobile",
    },
  },
  {
    name: "Standard Mobile Suite",
    desc: "Full cross-platform (iOS + Android) application with payments & CRM synchronization.",
    cost: "$11,000",
    selections: {
      tier: "standard",
      "crm-setup": "web-crm",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "cross-platform",
    },
  },
];

// Odometer counter hook — animates a number change like the landing page stats counters
function useOdometer(value: number, duration = 600) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  return display;
}

// Grand total display with odometer animation
function GrandTotalDisplay({ grandTotal }: { grandTotal: number }) {
  const animatedTotal = useOdometer(grandTotal);
  return (
    <div className="border-t border-border/30 pt-4 flex flex-col gap-1">
      <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">
        Estimated Upfront Cost
      </span>
      <span className="text-3xl font-bold tracking-tight text-gradient-primary">
        ${animatedTotal.toLocaleString()}
      </span>
    </div>
  );
}

// 6 Recurring / Care Plans with per-plan dynamic coverage info
const CARE_PLANS = [
  {
    id: "none",
    name: "No Retainer Plan",
    desc: "Launch your system with standard 3-month bug monitoring included.",
    priceDisplay: "Free",
    price: 0,
    recommended: false,
    covered: [
      "Launch bug fixes & monitoring",
      "3-month post-launch support window",
      "Initial deployment assistance",
    ],
    notCovered: [
      "Ongoing maintenance after 3 months",
      "Hosting & server support",
      "SEO monitoring or analytics",
      "Feature additions or updates",
    ],
  },
  {
    id: "care",
    name: "Care Plan",
    desc: "Hosting support, maintenance, backups, security, updates.",
    priceDisplay: "$199/mo",
    range: "($99\u2013$299/mo)",
    price: 199,
    recommended: false,
    covered: [
      "Hosting setups & server support",
      "Safety backups & restores",
      "Version & security updates",
      "Security log monitoring",
    ],
    notCovered: [
      "Complete layout design revamps",
      "New feature development",
      "Third-party license & database bills",
      "SEO or analytics monitoring",
    ],
  },
  {
    id: "performance",
    name: "Performance Plan",
    desc: "Care Plan + SEO monitoring, analytics, minor updates.",
    priceDisplay: "$175/mo",
    range: "($100\u2013$250/mo)",
    price: 175,
    recommended: false,
    covered: [
      "All Care Plan features",
      "SEO monitoring & checks",
      "Analytics dashboard checkups",
      "Minor layout adjustments",
    ],
    notCovered: [
      "Major feature additions",
      "Custom API integrations",
      "Complete design overhauls",
      "Extensive automation builds",
    ],
  },
  {
    id: "growth",
    name: "Growth Partner",
    desc: "Performance Plan + monthly optimization, new pages, automations, strategy calls.",
    priceDisplay: "$1,400/mo",
    range: "($300\u2013$2,500/mo)",
    price: 1400,
    recommended: true,
    covered: [
      "All Performance Plan features",
      "Monthly UI optimizations",
      "Additional pages & templates",
      "Automation & workflow updates",
      "Monthly strategy calls",
    ],
    notCovered: [
      "Enterprise-level custom systems",
      "Third-party tool license costs",
      "Complete platform rebuilds",
    ],
  },
  {
    id: "revenue",
    name: "Revenue Partner",
    desc: "Complete premium management, funnel optimization, CRM improvements, AI enhancements.",
    priceDisplay: "$6,250/mo",
    range: "($2,500\u2013$10,000+/mo)",
    price: 6250,
    recommended: false,
    covered: [
      "All Growth Partner features",
      "Complete premium management",
      "Funnel & CRM optimization",
      "AI enhancement updates",
      "Conversion rate optimization",
    ],
    notCovered: ["Hard infrastructure costs", "Third-party tool license fees"],
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    desc: "Regular updates, theme/plugin checks, speed optimizations.",
    priceDisplay: "$300/mo",
    range: "($100\u2013$500/mo)",
    price: 300,
    recommended: false,
    covered: [
      "Theme & plugin updates",
      "Speed & performance optimization",
      "Regular content updates",
      "Basic security monitoring",
    ],
    notCovered: [
      "New feature development",
      "CRM or funnel work",
      "Design overhauls",
      "SEO strategy or analytics",
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const BASE_TIERS_IDS = ["starter", "standard", "growth", "professional", "enterprise", "tripwire"];

function BuildStudioContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  // Core Configurator Selections State
  const [selections, setSelections] = useState<Record<string, string>>({
    tier: "standard",
    "crm-setup": "none",
    "funnels-marketing": "none",
    "chatbot-booking": "none",
    "conversion-cro": "none",
    "seo-search": "none",
    "advanced-automation": "none",
    "mobile-app": "none",
  });

  // Protection (Care) Plan — uses CARE_PLANS ids
  const [carePlan, setCarePlan] = useState<string>("none");

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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Read URL query params on mount
  useEffect(() => {
    const preset = searchParams.get("preset");
    if (preset) {
      if (BASE_TIERS_IDS.includes(preset)) {
        setSelections((prev) => ({ ...prev, tier: preset }));
      } else if (preset === "starter-mobile") {
        setSelections({
          tier: "starter",
          "crm-setup": "none",
          "funnels-marketing": "none",
          "chatbot-booking": "none",
          "conversion-cro": "none",
          "seo-search": "none",
          "advanced-automation": "none",
          "mobile-app": "starter-mobile",
        });
      } else if (preset === "standard-mobile") {
        setSelections({
          tier: "standard",
          "crm-setup": "web-crm",
          "funnels-marketing": "none",
          "chatbot-booking": "none",
          "conversion-cro": "none",
          "seo-search": "none",
          "advanced-automation": "none",
          "mobile-app": "cross-platform",
        });
      }
    }
  }, [searchParams]);

  // Reset helper
  const handleReset = () => {
    setSelections({
      tier: "standard",
      "crm-setup": "none",
      "funnels-marketing": "none",
      "chatbot-booking": "none",
      "conversion-cro": "none",
      "seo-search": "none",
      "advanced-automation": "none",
      "mobile-app": "none",
    });
    setCarePlan("none");
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
    const plan = CARE_PLANS.find((p) => p.id === carePlan);
    return plan ? plan.price : 0;
  };

  const subtotal = getSubtotal();
  const careCost = getCarePrice();

  // Calculate discount (10% off upfront subtotal if pay in full)
  const isPayInFull = paymentMethod === "full";
  const discountRate = isPayInFull ? 0.1 : 0.0;
  const discount = Math.round(subtotal * discountRate);

  // VAT (7.5%) calculated on the discounted subtotal
  const taxableAmount = subtotal - discount;
  const vat = Math.round(taxableAmount * 0.075);
  const grandTotal = taxableAmount + vat + careCost;

  // Confetti trigger
  const triggerConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      colors: ["#0ea5e9", "#2563eb", "#3b82f6", "#06b6d4", "#e0f2fe"],
      zIndex: 10000,
    });
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name,
          email,
          selections,
          carePlan,
          paymentMethod,
          subtotal,
          discount,
          vat,
          grandTotal,
          notes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
        triggerConfetti();
        toast.success("Quote specifications submitted successfully!");
      } else {
        console.error("API quote form delivery failed:", data.error);
        toast.error(data.error || "Failed to submit quote specs. Please try again.");
      }
    } catch (err: any) {
      console.error("Failed to submit quote request:", err);
      toast.error("Network error: Failed to connect to server.");
    } finally {
      setSubmitting(false);
    }
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

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "layers":
        return <Layers className="h-4 w-4 text-primary" />;
      case "database":
        return <Database className="h-4 w-4 text-primary" />;
      case "trending-up":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "bot":
        return <Bot className="h-4 w-4 text-primary" />;
      case "activity":
        return <Activity className="h-4 w-4 text-primary" />;
      case "globe":
        return <Globe className="h-4 w-4 text-primary" />;
      case "zap":
        return <Zap className="h-4 w-4 text-primary" />;
      case "smartphone":
        return <Smartphone className="h-4 w-4 text-primary" />;
      default:
        return <Layers className="h-4 w-4 text-primary" />;
    }
  };

  const logoSrc = logoBlue.src;

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
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Main Grid Workspace */}
      <div className="pt-28 px-4 max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1fr_340px] items-start relative z-10 overflow-visible">
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
                              {getCategoryIcon(cat.icon)}
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
                      {configuredCount}/8 components configured
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
                <div className="card-elevated p-6 rounded-2xl space-y-5">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Protect Your Build • Aiventra Care
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      We build systems that last. Choose a support coverage option for post-launch
                      safety.
                    </p>
                  </div>

                  {/* 6-Plan Grid */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {CARE_PLANS.map((plan) => {
                      const isActive = carePlan === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setCarePlan(plan.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                            isActive
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "border-border hover:border-primary/20"
                          }`}
                        >
                          {plan.recommended && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-bl-lg">
                              Recommended
                            </div>
                          )}
                          <div className="space-y-1">
                            <span className="font-bold text-xs uppercase tracking-wider block pr-16">
                              {plan.name}
                            </span>
                            <p className="text-[10px] text-muted-foreground leading-normal">
                              {plan.desc}
                            </p>
                          </div>
                          <div className="mt-4">
                            <span className="font-bold text-sm text-primary block">
                              {plan.priceDisplay}
                            </span>
                            {"range" in plan && (
                              <span className="text-[9px] text-muted-foreground/70">
                                {plan.range}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Covered / Not Covered for selected plan */}
                  {(() => {
                    const selected = CARE_PLANS.find((p) => p.id === carePlan);
                    if (!selected) return null;
                    return (
                      <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-border/20 text-xs">
                        <div className="space-y-2">
                          <span className="font-bold text-green-500 uppercase tracking-widest text-[9px] block">
                            Covered
                          </span>
                          <ul className="space-y-1.5 text-muted-foreground text-[10px]">
                            {selected.covered.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <Check className="h-3 w-3 text-green-500 shrink-0" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="font-bold text-red-500 uppercase tracking-widest text-[9px] block">
                            Not Covered
                          </span>
                          <ul className="space-y-1.5 text-muted-foreground text-[10px]">
                            {selected.notCovered.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <X className="h-3 w-3 text-red-500 shrink-0" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
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
                          Receive a 10% discount on final upfront subtotal.
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
        <aside className="lg:sticky lg:top-24 self-start space-y-6 w-full">
          <div className="relative overflow-hidden rounded-2xl p-5 border border-primary/20 bg-card shadow-lg flex flex-col justify-between">
            <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none bg-primary" />

            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Your Build
                </span>
                <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full text-primary">
                  {configuredCount}/8 Selected
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
                  <span>Upfront Build Cost</span>
                  <span className="font-semibold text-foreground">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {carePlan !== "none" && (
                  <div className="flex justify-between">
                    <span>Care Plan /mo</span>
                    <span className="font-semibold text-foreground">
                      {CARE_PLANS.find((p) => p.id === carePlan)?.priceDisplay}
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
                  <span>VAT (7.5%)</span>
                  <span className="font-semibold text-foreground">${vat.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total — odometer animation */}
              <GrandTotalDisplay grandTotal={grandTotal} />

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
                      <label
                        htmlFor="name-input"
                        className="block text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-input border border-border/85 px-4 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email-input"
                        className="block text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-input border border-border/85 px-4 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="notes-input"
                        className="block text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1"
                      >
                        Additional Notes / Request Details
                      </label>
                      <textarea
                        id="notes-input"
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about custom integrations or specific project details..."
                        className="w-full bg-input border border-border/85 px-4 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-primary-foreground py-3 text-xs font-semibold hover:scale-[1.01] transition-all glow-primary disabled:opacity-75 disabled:pointer-events-none"
                      style={{ background: "var(--gradient-primary)" }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin h-3.5 w-3.5 text-primary-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting Specs...
                        </>
                      ) : (
                        <>
                          Submit Configuration Specs <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-background text-foreground font-mono text-xs">
          Loading Build Studio...
        </div>
      }
    >
      <BuildStudioContent />
    </Suspense>
  );
}
