"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  Plus,
  Minus,
  Info,
  Upload,
  Download,
  Share2,
  FileCode,
  DollarSign,
  Zap,
  Calendar,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import confetti from "canvas-confetti";

// Dynamic palettes hex colors
const PALETTES = [
  { name: "Electric Blue", hex: "#0284c7" },
  { name: "Luxury Gold", hex: "#d6a63c" },
  { name: "Emerald Mint", hex: "#10b981" },
  { name: "Crimson Ruby", hex: "#ef4444" },
  { name: "Indigo Velvet", hex: "#6366f1" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Base values
const BASE_PRICES = {
  website: 3500,
  app: 5500,
};

// Features checklist
const FEATURES = {
  website: [
    {
      id: "auth",
      name: "User Auth & Profiles",
      price: 800,
      desc: "Secure sign-up, JWT credentials, OAuth Google login.",
    },
    {
      id: "stripe",
      name: "Stripe Checkout & Billing",
      price: 1200,
      desc: "SaaS subscriptions, invoice generation, checkout modals.",
    },
    {
      id: "chatbot",
      name: "AI Chatbot Support Agent",
      price: 1500,
      desc: "Custom fine-tuned GPT support widget feeding off your docs.",
    },
    {
      id: "cms",
      name: "Headless WordPress & Blog",
      price: 1000,
      desc: "Next.js Static ISR routes connected to headless WP core.",
    },
    {
      id: "analytics",
      name: "Advanced SEO & Pixel Logs",
      price: 600,
      desc: "Metadata headers, schema tags, FB/Google logs dashboard.",
    },
  ],
  app: [
    {
      id: "auth",
      name: "Secure Mobile Login",
      price: 800,
      desc: "Biometric ID support, secure keychains, Google/Apple sign-in.",
    },
    {
      id: "stripe",
      name: "Stripe Subscriptions API",
      price: 1200,
      desc: "In-app checkouts and license key unlocks.",
    },
    {
      id: "maps",
      name: "Google Maps SDK",
      price: 1400,
      desc: "Real-time location markers, geolocation paths, geofencing.",
    },
    {
      id: "push",
      name: "Expo Push Notification",
      price: 700,
      desc: "Trigger background alerts, campaign flows, badge counts.",
    },
    {
      id: "chat",
      name: "Direct Message Chat API",
      price: 1100,
      desc: "Websocket multi-user live messaging with text/photo attachment.",
    },
  ],
};

const TEMPLATES = {
  website: [
    {
      id: "dashboard",
      name: "SaaS Dashboard",
      desc: "Complex analytics widget layouts, charts, and table listings.",
    },
    {
      id: "landing",
      name: "Revenue Funnel Landing",
      desc: "A/B testing sections, pricing matrices, reviews and bold Hero grids.",
    },
    {
      id: "ecommerce",
      name: "Retail Storefront",
      desc: "Modern search queries, filter tabs, shopping cards, checkouts.",
    },
  ],
  app: [
    {
      id: "wallet",
      name: "FinTech Hub",
      desc: "Crypto transfer charts, transaction cards, virtual credit viewports.",
    },
    {
      id: "feed",
      name: "Social Content Feed",
      desc: "Double-tap like events, profile grid portfolios, scrollable story bubbles.",
    },
    {
      id: "tracker",
      name: "Fitness Activity",
      desc: "Dynamic target ring charts, workout trackers, active timers.",
    },
  ],
};

export default function ConfiguratorPage() {
  const { theme } = useTheme();

  // Studio Core States
  const [mode, setMode] = useState<"website" | "app">("website");
  const [brandName, setBrandName] = useState("Aiventra");
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState("#0284c7");
  const [selectedTemplate, setSelectedTemplate] = useState("dashboard");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth"]);
  const [typography, setTypography] = useState<"sans" | "serif" | "mono">("sans");
  const [borderRadius, setBorderRadius] = useState<"sharp" | "rounded" | "extra" | "pill">(
    "rounded",
  );
  const [timelineWeeks, setTimelineWeeks] = useState(4);
  const [darkMockupMode, setDarkMockupMode] = useState(true);

  // Custom logo handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
    }
  };

  // Switch template automatically on mode toggle
  useEffect(() => {
    setSelectedTemplate(mode === "website" ? "dashboard" : "wallet");
    setSelectedFeatures(["auth"]);
  }, [mode]);

  // Pricing calculations
  const basePrice = BASE_PRICES[mode];
  const featuresSum = FEATURES[mode]
    .filter((f) => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.price, 0);

  // Timeline factor: Accelerated (2w) = 1.3x cost, Standard (4w) = 1.0x, Discounted (8w) = 0.8x
  const timelineMultiplier = timelineWeeks === 2 ? 1.3 : timelineWeeks === 8 ? 0.8 : 1.0;
  const rawTotal = (basePrice + featuresSum) * timelineMultiplier;
  const totalCost = Math.round(rawTotal);

  // Quote Submission States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const triggerConfetti = () => {
    // Gold disabled — always use blue confetti
    const activeColors = ["#0ea5e9", "#2563eb", "#3b82f6", "#06b6d4", "#e0f2fe"];
    // gold: ["#f59e0b", "#d97706", "#fbbf24", "#fef3c7", "#f97316"]

    confetti({
      particleCount: 150,
      spread: 80,
      colors: activeColors,
      zIndex: 10000,
    });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
  };

  const resetModal = () => {
    setQuoteName("");
    setQuoteEmail("");
    setQuoteNotes("");
    setSubmitted(false);
    setIsModalOpen(false);
  };

  // Convert border radius state to actual style values
  const getRadiusStyle = () => {
    if (borderRadius === "sharp") return "0px";
    if (borderRadius === "extra") return "16px";
    if (borderRadius === "pill") return "9999px";
    return "8px"; // default rounded
  };

  // Convert typography state to font families
  const getFontFamily = () => {
    if (typography === "serif") return "Georgia, Cambria, serif";
    if (typography === "mono") return "Courier, monospace";
    return "var(--font-sans), Inter, sans-serif";
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden pb-12">
      {/* Background glow orbs */}
      <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />
      <div
        className="absolute top-10 right-10 h-[300px] w-[300px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Floating Pill Nav Bar Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-40 rounded-2xl border border-border/40 bg-card/65 shadow-lg backdrop-blur-xl px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-base shadow"
            style={{ backgroundColor: accentColor }}
          >
            {brandName.substring(0, 1).toUpperCase()}
          </div>
          <span className="font-display font-medium text-lg hidden sm:inline">
            {brandName} Studio
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </motion.header>

      {/* Layout Configurator Container */}
      <div className="pt-28 px-4 max-w-7xl mx-auto grid gap-6 lg:grid-cols-[340px_1fr_300px] items-start relative z-10">
        {/* LEFT COLUMN: Setup Configuration */}
        <aside className="space-y-6">
          <div className="card-elevated p-6 space-y-6">
            <h2 className="text-lg font-medium tracking-tight border-b border-border/40 pb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Core Configurator</span>
            </h2>

            {/* Mode Switcher */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Project Mode
              </label>
              <div className="grid grid-cols-2 p-1 bg-input rounded-xl border border-border/40">
                <button
                  onClick={() => setMode("website")}
                  className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                    mode === "website"
                      ? "bg-card text-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" /> Website
                </button>
                <button
                  onClick={() => setMode("app")}
                  className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
                    mode === "app"
                      ? "bg-card text-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" /> Mobile App
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Template Layout
              </label>
              <div className="space-y-2.5">
                {TEMPLATES[mode].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${
                      selectedTemplate === t.id
                        ? "bg-primary/5 border-primary/45 shadow-sm"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            selectedTemplate === t.id ? accentColor : "var(--color-border)",
                        }}
                      />
                      {t.name}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Settings */}
            <div className="space-y-3.5 border-t border-border/30 pt-4">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Brand Settings
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                  placeholder="Enter brand name"
                />

                {/* Logo Uploader */}
                <div className="relative">
                  <label className="flex items-center justify-center gap-2 border border-dashed border-border/60 rounded-xl py-3 cursor-pointer hover:border-primary/40 hover:bg-muted/30 transition-all text-xs font-medium">
                    <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{customLogoUrl ? "Change Mock Logo" : "Upload Brand Logo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {customLogoUrl && (
                    <button
                      onClick={() => setCustomLogoUrl(null)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Remove Logo"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Accent Palette Swatches */}
            <div className="space-y-3 border-t border-border/30 pt-4">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Accent Palette
              </label>
              <div className="flex flex-wrap gap-2.5">
                {PALETTES.map((p) => (
                  <button
                    key={p.hex}
                    onClick={() => setAccentColor(p.hex)}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center relative cursor-pointer hover:scale-105 transition-all"
                    style={{ backgroundColor: p.hex }}
                    title={p.name}
                  >
                    {accentColor === p.hex && (
                      <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />
                    )}
                  </button>
                ))}

                {/* Custom Color Input Wrapper */}
                <div className="w-7 h-7 rounded-full border border-border overflow-hidden relative cursor-pointer bg-muted flex items-center justify-center">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-border"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Viewports previews */}
        <section className="space-y-6">
          {/* Header toolbar */}
          <div className="card-elevated px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Real-time Preview Canvas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={darkMockupMode}
                  onChange={(e) => setDarkMockupMode(e.target.checked)}
                  className="rounded border-border bg-input text-primary focus:ring-primary/20"
                />
                Dark Mockup Mode
              </label>
            </div>
          </div>

          {/* Viewports Grid */}
          <div className="grid gap-6 items-start lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_270px]">
            {/* Viewport 1: Simulated Desktop browser frame */}
            <div className="space-y-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium px-1">
                <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Simulated Desktop Viewport</span>
              </div>
              <div
                className={`w-full aspect-[16/10] border border-border/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all ${
                  darkMockupMode ? "bg-black text-white" : "bg-white text-black"
                }`}
                style={{ fontFamily: getFontFamily() }}
              >
                {/* Browser Address Bar Header */}
                <div className="bg-muted px-4 py-2 border-b border-border/40 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="bg-input/60 border border-border/20 text-[10px] text-muted-foreground/80 px-10 py-0.5 rounded-md w-72 text-center truncate">
                    https://{brandName.toLowerCase().replace(/\s+/g, "")}.com
                  </div>
                  <div className="w-8" />
                </div>

                {/* Simulated Webpage Contents */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Navbar mockup */}
                  <div className="flex items-center justify-between border-b border-border/20 pb-4 shrink-0">
                    <div className="flex items-center gap-2.5">
                      {customLogoUrl ? (
                        <img src={customLogoUrl} alt="Logo" className="h-6 w-auto object-contain" />
                      ) : (
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-white text-[10px]"
                          style={{ backgroundColor: accentColor }}
                        >
                          {brandName.substring(0, 1).toUpperCase()}
                        </div>
                      )}
                      <span className="font-semibold text-xs tracking-tight">{brandName}</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-medium text-muted-foreground">
                      <span>Features</span>
                      <span>Product</span>
                      <span>Pricing</span>
                    </div>
                    <div
                      className="text-[10px] font-medium text-white px-3 py-1"
                      style={{ backgroundColor: accentColor, borderRadius: getRadiusStyle() }}
                    >
                      Sign In
                    </div>
                  </div>

                  {/* Template Render Dynamic Content */}
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    {selectedTemplate === "dashboard" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Analytics Overview</h4>
                          <span className="text-[10px] text-muted-foreground">
                            Last updated: Just now
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-muted/40 p-3 rounded-xl border border-border/10 space-y-1">
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                              Total Revenue
                            </span>
                            <div className="text-base font-semibold">$42,912</div>
                            <span className="text-[8px] text-green-500">+12% vs last month</span>
                          </div>
                          <div className="bg-muted/40 p-3 rounded-xl border border-border/10 space-y-1">
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                              Active Users
                            </span>
                            <div className="text-base font-semibold">8,212</div>
                            <span className="text-[8px] text-green-500">+24% vs last week</span>
                          </div>
                          <div className="bg-muted/40 p-3 rounded-xl border border-border/10 space-y-1">
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                              Goal Status
                            </span>
                            <div className="text-base font-semibold">92%</div>
                            <div className="h-1 w-full bg-border rounded-full overflow-hidden mt-1.5">
                              <div
                                className="h-full"
                                style={{ width: "92%", backgroundColor: accentColor }}
                              />
                            </div>
                          </div>
                        </div>
                        {selectedFeatures.includes("stripe") && (
                          <div className="border border-border/20 p-3 rounded-xl bg-primary/5 flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-xs font-semibold flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-primary animate-pulse" />{" "}
                                Subscriptions enabled
                              </div>
                              <p className="text-[9px] text-muted-foreground">
                                Integrated secure Stripe API billing models.
                              </p>
                            </div>
                            <div
                              className="text-[9px] font-medium text-white px-3 py-1"
                              style={{
                                backgroundColor: accentColor,
                                borderRadius: getRadiusStyle(),
                              }}
                            >
                              Manage Billing
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedTemplate === "landing" && (
                      <div className="text-center space-y-4 max-w-xl mx-auto py-4">
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-semibold bg-primary/10 border"
                          style={{ borderColor: `${accentColor}30`, color: accentColor }}
                        >
                          Now Shipped
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold leading-tight">
                          Transform your client growth systems in one clean click
                        </h3>
                        <p className="text-muted-foreground text-[10px] leading-relaxed max-w-md mx-auto">
                          Our flagship tech assets configure high-performance conversion tools,
                          direct checkout funnels, and automated CRM triggers.
                        </p>
                        <div className="flex justify-center gap-3">
                          <div
                            className="text-[10px] font-medium text-white px-5 py-2 hover:scale-[1.02] transition-transform cursor-pointer"
                            style={{ backgroundColor: accentColor, borderRadius: getRadiusStyle() }}
                          >
                            Get Started
                          </div>
                          <div
                            className="text-[10px] font-medium border border-border px-5 py-2 hover:bg-muted/40 transition-colors cursor-pointer"
                            style={{ borderRadius: getRadiusStyle() }}
                          >
                            Learn More
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTemplate === "ecommerce" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border/10 pb-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Trending Products
                          </h4>
                          <span className="text-[9px] text-primary font-medium">View All</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3.5">
                          {[
                            { name: "Executive Pack", price: "$89" },
                            { name: "Luxe Capsule", price: "$149" },
                            { name: "Minimal Wallet", price: "$49" },
                          ].map((p, i) => (
                            <div
                              key={i}
                              className="bg-muted/20 border border-border/10 rounded-xl overflow-hidden flex flex-col justify-between"
                            >
                              <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center text-[10px] text-muted-foreground">
                                Asset Frame
                              </div>
                              <div className="p-2.5 space-y-1">
                                <div className="text-[10px] font-semibold truncate">{p.name}</div>
                                <div className="text-[9px] text-muted-foreground">{p.price}</div>
                                <button
                                  className="w-full text-center text-[8px] font-medium text-white py-1 mt-1.5 transition-opacity"
                                  style={{
                                    backgroundColor: accentColor,
                                    borderRadius: getRadiusStyle(),
                                  }}
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Viewport 2: Tablet Viewport */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium px-1">
                <Tablet className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Simulated Tablet</span>
              </div>
              <div
                className={`w-full aspect-[3/4] border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all ${
                  darkMockupMode ? "bg-black text-white" : "bg-white text-black"
                }`}
                style={{ fontFamily: getFontFamily() }}
              >
                {/* Camera lens and border indicator */}
                <div className="bg-muted h-3 border-b border-border/40 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/20 pb-2">
                    <span className="font-semibold text-[10px] tracking-tight">{brandName}</span>
                    <div className="w-5 h-4 flex flex-col justify-between items-end">
                      <div className="w-full h-0.5 bg-muted-foreground" />
                      <div className="w-[80%] h-0.5 bg-muted-foreground" />
                    </div>
                  </div>

                  {/* Simplifed view content */}
                  <div className="space-y-3.5">
                    <div className="h-2 w-14 bg-primary/20 rounded" />
                    <div className="h-3.5 w-[75%] bg-muted rounded" />
                    <div className="space-y-2 pt-2">
                      <div className="h-10 bg-muted/40 rounded-xl border border-border/10 p-2 flex items-center justify-between">
                        <span className="text-[8px] font-medium text-muted-foreground">
                          Volume status
                        </span>
                        <span className="text-[10px] font-bold" style={{ color: accentColor }}>
                          82%
                        </span>
                      </div>
                      <div className="h-10 bg-muted/40 rounded-xl border border-border/10 p-2 flex items-center justify-between">
                        <span className="text-[8px] font-semibold text-muted-foreground">
                          Security log
                        </span>
                        <span className="text-[10px] font-bold text-green-500">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Viewport 3: Mobile Viewport */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium px-1">
                <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Simulated Mobile</span>
              </div>
              <div
                className={`w-full aspect-[9/19] border-4 border-foreground/90 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative transition-all ${
                  darkMockupMode ? "bg-black text-white" : "bg-white text-black"
                }`}
                style={{ fontFamily: getFontFamily() }}
              >
                {/* Phone Top Notch bar */}
                <div className="bg-foreground h-4.5 w-24 mx-auto rounded-b-xl shrink-0 flex items-center justify-center select-none z-20 relative">
                  <div className="w-2 h-2 rounded-full bg-muted/20 absolute left-6" />
                  <div className="w-10 h-1 rounded-full bg-muted/30" />
                </div>

                {/* Screen elements */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between text-xs space-y-4">
                  {/* Top status header */}
                  <div className="flex items-center justify-between shrink-0">
                    <span className="text-[8px] font-bold">9:41</span>
                    <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
                      <span>LTE</span>
                      <div className="w-3.5 h-2 border border-muted-foreground/45 rounded-sm p-0.5">
                        <div
                          className="h-full bg-muted-foreground rounded-xs"
                          style={{ width: "80%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Template Render Content */}
                  <div className="flex-grow flex flex-col justify-center py-2">
                    {mode === "website" ? (
                      <div className="space-y-3">
                        <div className="h-2 w-8 bg-primary/20 rounded" />
                        <h5 className="text-[11px] font-semibold leading-tight">
                          Price prototypes in real-time.
                        </h5>
                        <p className="text-muted-foreground text-[8px] leading-relaxed">
                          We configure clean layouts, Stripe pipelines, and push integrations.
                        </p>
                        <div
                          className="w-full text-center text-[9px] font-medium text-white py-1.5"
                          style={{ backgroundColor: accentColor, borderRadius: getRadiusStyle() }}
                        >
                          Book intro call
                        </div>
                      </div>
                    ) : (
                      // Mobile App View templates
                      <div className="space-y-3.5">
                        {selectedTemplate === "wallet" && (
                          <div className="space-y-3">
                            <span className="text-[8px] text-muted-foreground">Mobile Balance</span>
                            <div className="text-lg font-semibold text-gradient-primary leading-none">
                              $14,912
                            </div>

                            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/10 space-y-2">
                              <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-medium">
                                Active Transactions
                              </span>
                              <div className="flex justify-between items-center text-[9px]">
                                <span>Aiventra Dev Setup</span>
                                <span className="font-semibold text-red-500">-$2,500</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px]">
                                <span>Stripe Transfer</span>
                                <span className="font-semibold text-green-500">+$14,200</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "feed" && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold"
                                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                              >
                                AV
                              </div>
                              <span className="text-[9px] font-semibold">aiventra.studios</span>
                            </div>
                            <div className="aspect-[4/3] bg-muted/40 rounded-lg flex items-center justify-center text-[8px] text-muted-foreground">
                              Mock Post frame
                            </div>
                            <div className="text-[8px] text-muted-foreground leading-relaxed">
                              Prototyping premium responsive mobile layouts using custom React
                              Native components.
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "tracker" && (
                          <div className="space-y-3 text-center">
                            <span className="text-[8px] text-muted-foreground font-medium">
                              Daily Calories Goal
                            </span>
                            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90">
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  stroke="var(--color-border)"
                                  strokeWidth="4"
                                  fill="transparent"
                                />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  stroke={accentColor}
                                  strokeWidth="4"
                                  fill="transparent"
                                  strokeDasharray="200"
                                  strokeDashoffset="60"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[9px] font-bold">1,820</span>
                                <span className="text-[6px] text-muted-foreground">
                                  / 2,400 kcal
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom indicator bar */}
                  <div className="bg-foreground h-1 w-16 mx-auto rounded-full shrink-0 select-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Advanced styling & Cost panel */}
        <aside className="space-y-6">
          {/* Advanced Styling card */}
          <div className="card-elevated p-6 space-y-6">
            <h2 className="text-lg font-medium tracking-tight border-b border-border/40 pb-3 flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Advanced Styling</span>
            </h2>

            {/* Typography Selector */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Typography
              </label>
              <select
                value={typography}
                onChange={(e) => setTypography(e.target.value as "sans" | "serif" | "mono")}
                className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
              >
                <option value="sans">Geometric Sans (Outfit/Inter)</option>
                <option value="serif">Georgia Serif</option>
                <option value="mono">Console Monospace</option>
              </select>
            </div>

            {/* Border Radius Sizing */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Border Radius style
              </label>
              <select
                value={borderRadius}
                onChange={(e) =>
                  setBorderRadius(e.target.value as "sharp" | "rounded" | "extra" | "pill")
                }
                className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
              >
                <option value="sharp">Sharp (0px)</option>
                <option value="rounded">Rounded Standard (8px)</option>
                <option value="extra">Rounded Elegant (16px)</option>
                <option value="pill">Pill (9999px)</option>
              </select>
            </div>

            {/* Timeline slider */}
            <div className="space-y-3.5 border-t border-border/30 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider text-muted-foreground font-medium">
                  Timeline Speed
                </span>
                <span className="font-semibold text-primary">
                  {timelineWeeks === 2
                    ? "Accelerated (2 wks)"
                    : timelineWeeks === 8
                      ? "Extended (8 wks)"
                      : "Standard (4 wks)"}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="3" // Stepping 2 -> 5 -> 8 (we map it to 2w, 4w, 8w by conditional ticks or rounding)
                value={timelineWeeks === 2 ? 2 : timelineWeeks === 8 ? 8 : 5}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val === 2) setTimelineWeeks(2);
                  else if (val === 8) setTimelineWeeks(8);
                  else setTimelineWeeks(4);
                }}
                className="w-full accent-primary bg-input"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
                <span>Fast (1.3x)</span>
                <span>Std (1.0x)</span>
                <span>Flex (0.8x)</span>
              </div>
            </div>
          </div>

          {/* Granular Add-on Checklist card */}
          <div className="card-elevated p-6 space-y-5">
            <h2 className="text-lg font-medium tracking-tight border-b border-border/40 pb-3 flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              <span>Features Checklist</span>
            </h2>
            <div className="space-y-3.5">
              {FEATURES[mode].map((f) => {
                const checked = selectedFeatures.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      if (checked) {
                        setSelectedFeatures(selectedFeatures.filter((id) => id !== f.id));
                      } else {
                        setSelectedFeatures([...selectedFeatures, f.id]);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-start gap-4 ${
                      checked
                        ? "bg-primary/5 border-primary/45 shadow-xs"
                        : "border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                            checked
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {checked && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                        </div>
                        {f.name}
                      </div>
                      <p className="text-muted-foreground text-[10px] leading-normal pl-5">
                        {f.desc}
                      </p>
                    </div>
                    <span className="font-semibold shrink-0 text-primary">+${f.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Panel Estimate Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 border border-primary/20 bg-card shadow-lg">
            <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none bg-primary" />
            <div className="relative z-10 space-y-4">
              <span className="text-[9px] uppercase tracking-wider font-medium text-muted-foreground block">
                Estimated Project Cost
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-semibold tracking-tight">
                  ${totalCost.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">one-time setup</span>
              </div>

              <div className="border-t border-border/20 pt-3.5 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Base Build Code</span>
                  <span className="font-medium text-foreground">${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-on Features</span>
                  <span className="font-medium text-foreground">
                    ${featuresSum.toLocaleString()}
                  </span>
                </div>
                {timelineWeeks !== 4 && (
                  <div className="flex justify-between">
                    <span>Timeline Factor</span>
                    <span className="font-medium text-primary">
                      {timelineWeeks === 2 ? "x1.3 (Fast)" : "x0.8 (Flex)"}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-primary-foreground py-3 text-xs font-semibold hover:scale-[1.01] transition-all glow-primary"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Get Quote Details <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Download & Exports config tools */}
          <div className="card-elevated p-5 flex flex-wrap gap-2.5 justify-center">
            <button
              onClick={() => triggerConfetti()}
              className="inline-flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 text-xs font-medium hover:bg-surface transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-muted-foreground" />
              <span>PDF Spec Sheet</span>
            </button>
            <button
              onClick={() => triggerConfetti()}
              className="inline-flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 text-xs font-medium hover:bg-surface transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Export Figma</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Quote request contact form modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
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
                    <h3 className="font-display text-2xl font-medium">Quote Received!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for building Aiventra! We've saved your template configurations,
                      custom features list, and color palette. Our dev cell will contact you within
                      one business day.
                    </p>
                  </div>
                  <button
                    onClick={resetModal}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-xs font-semibold hover:bg-surface transition-all"
                  >
                    Close Configurator
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-5">
                  <div className="space-y-2 text-center max-w-md mx-auto">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                      Get your estimate details
                    </span>
                    <h3 className="font-display text-2xl font-medium">Request custom spec sheet</h3>
                    <p className="text-xs text-muted-foreground">
                      We'll attach your custom configured layout templates, timeline multipliers,
                      and brand configurations to the quote spec sheets.
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
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
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
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
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
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        className="w-full bg-input border border-border px-3.5 py-2.5 rounded-xl text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
                        placeholder="Specify special integration details or target timeline preferences..."
                      />
                    </div>
                  </div>

                  {/* Summary spec recap inside form */}
                  <div className="bg-muted/40 p-4 border border-border/10 rounded-2xl space-y-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground block">
                      Configuration Summary:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        Mode: <span className="font-medium text-foreground uppercase">{mode}</span>
                      </div>
                      <div>
                        Template:{" "}
                        <span className="font-medium text-foreground uppercase">
                          {selectedTemplate}
                        </span>
                      </div>
                      <div>
                        Accent Palette:{" "}
                        <span
                          className="font-medium text-foreground uppercase"
                          style={{ color: accentColor }}
                        >
                          {accentColor}
                        </span>
                      </div>
                      <div>
                        Timeline Speed:{" "}
                        <span className="font-medium text-foreground uppercase">
                          {timelineWeeks} Weeks
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] pt-1.5 border-t border-border/20 flex justify-between items-baseline">
                      <span>Dynamic Estimated Total:</span>
                      <span className="font-semibold text-foreground text-sm">
                        ${totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-primary-foreground py-3.5 text-xs font-semibold hover:scale-[1.01] transition-all glow-primary"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Submit Quote Request <ArrowRight className="h-3.5 w-3.5" />
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
