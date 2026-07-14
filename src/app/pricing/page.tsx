"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Layers,
  Zap,
  TrendingUp,
  Shield,
  Clock,
  HelpCircle,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import logoBlue from "@/assets/logo-blue.png";
import heroBlueLight from "@/assets/aiventra-logo-blue-light.png";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Tier {
  name: string;
  price: string;
  badge?: string;
  desc: string;
  features: string[];
  gradient?: string;
  popular?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$500",
    desc: "Perfect launchpad for new businesses looking for a strong initial presence.",
    features: [
      "High-Performance Landing Page",
      "Basic Corporate Website",
      "Interactive Contact Forms",
      "Fundamental Google SEO Setup",
      "Fully Responsive Layout",
    ],
  },
  {
    name: "Standard",
    price: "$2,499",
    desc: "Ideal for growing businesses requiring multi-page setups and initial workflows.",
    features: [
      "Complete Multi-Page Website",
      "CRM & Pipeline Integration",
      "Basic Automation Triggers",
      "Google Analytics & Tracking",
      "Transactional Email Setup",
    ],
    popular: true,
  },
  {
    name: "Growth",
    price: "$5,499",
    desc: "Designed for scaling brands focused on high conversion and pipeline operations.",
    features: [
      "Website + Targeted Sales Funnel",
      "Advanced CRM Operations",
      "Multi-Step Workflows",
      "Lead Automation Systems",
      "Conversion Rate Optimization (CRO)",
      "A/B Testing Foundations",
    ],
  },
  {
    name: "Professional",
    price: "$10,000",
    desc: "Complete business systems with intelligent AI modules and custom dashboards.",
    features: [
      "Everything in Growth Tier",
      "Custom API Integrations",
      "Centralized Analytics Dashboards",
      "Automated Booking & Calendars",
      "AI & LLM Chatbot Integration",
      "Advanced Security Safeguards",
    ],
  },
  {
    name: "Enterprise",
    price: "$25,000+",
    desc: "Custom digital platforms, multiple departments, dedicated SLAs, and support.",
    features: [
      "Fully Custom Core Codebase",
      "Multi-Department Database Sync",
      "Dedicated Customer Success Cell",
      "Enterprise SLA Guarantees",
      "Hardened Security & IAM Audits",
      "Dedicated Cloud Infrastructure",
    ],
  },
];

const MOBILE_TIERS: Tier[] = [
  {
    name: "Starter Mobile",
    price: "$3,500",
    desc: "Perfect launching pad for dedicated single-platform mobile apps.",
    features: [
      "Single-Platform (iOS or Android)",
      "React Native or Flutter Framework",
      "Secure Email Authentication",
      "Essential REST API Integration",
      "Standard Push Notifications Setup",
      "App Store & Google Play Shipping Assistance",
    ],
  },
  {
    name: "Standard Mobile",
    price: "$8,500",
    desc: "Robust cross-platform mobile apps with advanced integrations and offline features.",
    features: [
      "Cross-Platform Build (iOS & Android)",
      "Offline Database Caching Layer",
      "Advanced Push Notifications Trigger",
      "Stripe / Payments Gateway Integration",
      "CRM & Database Synchronization (HubSpot/GHL)",
      "Custom Interactive UI/UX Transitions",
    ],
    popular: true,
  },
  {
    name: "Enterprise Mobile",
    price: "$20,000+",
    desc: "Fully bespoke mobile applications with dedicated SLA support and customized infrastructure.",
    features: [
      "Bespoke native or hybrid ecosystem",
      "Real-time bidirectional synchronization",
      "Apple Pay & Google Pay direct engines",
      "Custom layout architectures & animations",
      "Hardened biometrics & secure element authentication",
      "Dedicated SLAs & priority developer support",
    ],
  },
];

export default function PricingPage() {
  const { theme } = useTheme();
  const [activePlatform, setActivePlatform] = useState<"web" | "mobile">("web");
  const [activeTab, setActiveTab] = useState<"cross-sell" | "upsell" | "recurring">("cross-sell");

  const logoSrc = logoBlue.src;
  const footerSrc = theme === "light" ? heroBlueLight.src : logoBlue.src;
  const footerLogoClass =
    theme === "light" ? "h-22 md:h-25 w-auto object-contain" : "h-16 md:h-18 w-auto object-contain";

  return (
    <div className="min-h-screen bg-background text-foreground relative pb-12 overflow-x-hidden">
      {/* Background radial highlights */}
      <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none bg-primary" />
      <div className="absolute bottom-1/4 left-0 h-[500px] w-[500px] rounded-full blur-[160px] opacity-10 pointer-events-none bg-primary" />

      {/* Navigation header bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-45 rounded-2xl border border-border/40 bg-card/65 shadow-md backdrop-blur-xl px-4 py-3 flex items-center justify-between"
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
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-32 px-4 max-w-6xl mx-auto relative z-10">
        <section className="text-center py-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Aiventra Studio Pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-medium tracking-tight"
          >
            Simple, transparent{" "}
            <span className="text-gradient font-display italic font-medium">pricing.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Choose a packages tier aligned with your current scope, or customize individual
            components directly in our interactive Build Studio.
          </motion.p>
        </section>

        {/* Web vs Mobile Platforms Toggle */}
        <div className="flex justify-center mt-4 mb-10">
          <div className="flex rounded-full bg-muted/60 p-1 border border-border/40 backdrop-blur-md">
            <button
              onClick={() => setActivePlatform("web")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activePlatform === "web"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setActivePlatform("mobile")}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activePlatform === "mobile"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mobile Apps
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-2">
          {activePlatform === "web" ? (
            <>
              {/* Web Starter, Standard, Growth Tiers */}
              {TIERS.slice(0, 3).map((tier, idx) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all ${
                    tier.popular
                      ? "bg-card border-primary/50 shadow-xl shadow-primary/5 md:scale-[1.03]"
                      : "bg-card/60 border-border/60"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary-foreground/10">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground min-h-[32px]">{tier.desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1 py-2">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-xs text-muted-foreground">one-off</span>
                    </div>
                    <div className="border-t border-border/20 pt-4 space-y-3.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
                        What's Included
                      </span>
                      <ul className="space-y-2.5">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-xs text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link
                      href={`/build?preset=${tier.name.toLowerCase()}`}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all ${
                        tier.popular
                          ? "text-primary-foreground glow-primary"
                          : "border border-border text-foreground hover:bg-surface"
                      }`}
                      style={tier.popular ? { background: "var(--gradient-primary)" } : undefined}
                    >
                      Configure Plan <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}

              {/* Web Professional and Enterprise Tiers */}
              {TIERS.slice(3).map((tier, idx) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx + 3) * 0.1, ease: EASE }}
                  className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border bg-card/60 border-border/60 lg:col-span-1"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground min-h-[32px]">{tier.desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1 py-2">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tier.name === "Enterprise" ? "start" : "one-off"}
                      </span>
                    </div>
                    <div className="border-t border-border/20 pt-4 space-y-3.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
                        What's Included
                      </span>
                      <ul className="space-y-2.5">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-xs text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link
                      href={`/build?preset=${tier.name.toLowerCase()}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border text-foreground hover:bg-surface py-3 text-xs font-semibold transition-all"
                    >
                      Configure Plan <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}

              {/* Tripwire Web Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-primary/20 bg-primary/5"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-primary font-bold block">
                      Entry Offer
                    </span>
                    <h3 className="font-display text-2xl font-medium">Tripwire Audit</h3>
                    <p className="text-xs text-muted-foreground">
                      A comprehensive audit to identify leaks, bottleneck issues, and improvements.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 py-2">
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                      $99
                    </span>
                    <span className="text-xs text-muted-foreground">one-off</span>
                  </div>
                  <div className="border-t border-border/20 pt-4 space-y-3.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
                      Included Audits
                    </span>
                    <ul className="space-y-2.5">
                      {[
                        "Comprehensive Website Audit",
                        "Sales Funnel Leak Analysis",
                        "CRM Operations Checkup",
                        "Figma UX/UI Review",
                        "Complete Sales System Assessment",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-xs text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href="/build?preset=tripwire"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border text-foreground hover:bg-surface py-3 text-xs font-semibold transition-all"
                  >
                    Order Audit <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Mobile Apps Tiers */}
              {MOBILE_TIERS.map((tier, idx) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border transition-all ${
                    tier.popular
                      ? "bg-card border-primary/50 shadow-xl shadow-primary/5 md:scale-[1.03]"
                      : "bg-card/60 border-border/60"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary-foreground/10">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground min-h-[32px]">{tier.desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1 py-2">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tier.name === "Enterprise Mobile" ? "start" : "one-off"}
                      </span>
                    </div>
                    <div className="border-t border-border/20 pt-4 space-y-3.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
                        What's Included
                      </span>
                      <ul className="space-y-2.5">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-xs text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link
                      href={
                        tier.name === "Starter Mobile"
                          ? "/build?preset=starter-mobile"
                          : tier.name === "Standard Mobile"
                            ? "/build?preset=standard-mobile"
                            : "/build"
                      }
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all ${
                        tier.popular
                          ? "text-primary-foreground glow-primary"
                          : "border border-border text-foreground hover:bg-surface"
                      }`}
                      style={tier.popular ? { background: "var(--gradient-primary)" } : undefined}
                    >
                      Configure Plan <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </section>

        {/* Dynamic tabs for Add-ons, Upgrades and Care Plans */}
        <section className="pt-24 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Complementary Services & Care
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Add custom cross-sell upgrades, upsell packages, or post-launch recurring support
              plans to your build.
            </p>
          </div>

          {/* Navigation tab triggers */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-xl border border-border/60 bg-card/60 p-1.5 text-xs">
              <button
                onClick={() => setActiveTab("cross-sell")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "cross-sell"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cross-Sell Add-ons
              </button>
              <button
                onClick={() => setActiveTab("upsell")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "upsell"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upsell Upgrades
              </button>
              <button
                onClick={() => setActiveTab("recurring")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "recurring"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Recurring plans
              </button>
            </div>
          </div>

          {/* Tab content wrapper */}
          <div className="min-h-[220px]">
            {activeTab === "cross-sell" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  {
                    name: "Website & CRM Setup",
                    price: "$500 – $2,000",
                    desc: "Connect lead capture fields directly into your central CRM workflows.",
                  },
                  {
                    name: "Website & Sales Funnel",
                    price: "$800 – $3,000",
                    desc: "Build targeted landing stages designed to convert prospects immediately.",
                  },
                  {
                    name: "CRM & Workflow Automation",
                    price: "$500 – $2,500",
                    desc: "Automate task management pipelines and trigger lead reminders.",
                  },
                  {
                    name: "Funnel & Email Marketing",
                    price: "$400 – $1,500",
                    desc: "Design conversion-focused newsletter sequences and auto-responders.",
                  },
                  {
                    name: "Booking System",
                    price: "$200",
                    desc: "Seamless appointment scheduler integration directly on your page.",
                  },
                  {
                    name: "AI Chatbot",
                    price: "$800 – $2,000",
                    desc: "Intelligent rule-based or LLM widgets to support site visitors.",
                  },
                  {
                    name: "Website Maintenance",
                    price: "$100 – $500/mo",
                    desc: "Monthly server checkups, security reviews, and layout optimization.",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-5 rounded-2xl border border-border/40 bg-card/45 flex justify-between items-start gap-4"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-sm text-foreground">{item.name}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "upsell" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  {
                    name: "Conversion Rate Optimization (CRO)",
                    price: "$1,000 – $5,000",
                    desc: "Perform detailed usability tests and layout updates to maximize sales.",
                  },
                  {
                    name: "SEO Optimization",
                    price: "$250 – $2,000",
                    desc: "Optimize page metadata, speed benchmarks, schema layout, and keyword lists.",
                  },
                  {
                    name: "AI Customer Support System",
                    price: "$1,500 – $3,000",
                    desc: "Train an OpenAI agent with local vector DB knowledge for support tickets.",
                  },
                  {
                    name: "Marketing Automation",
                    price: "$500 – $3,000",
                    desc: "Complete drip workflows, behavioral tagging, and multi-channel triggers.",
                  },
                  {
                    name: "Analytics Dashboard",
                    price: "$400 – $2,000",
                    desc: "Centralize Google, Meta, and CRM logs into a beautiful custom workspace.",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-5 rounded-2xl border border-border/40 bg-card/45 flex justify-between items-start gap-4"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-sm text-foreground">{item.name}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "recurring" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {[
                  {
                    name: "Care Plan",
                    price: "$99 – $299/mo",
                    desc: "Hosting setups support, backups, version updates, and security logs.",
                  },
                  {
                    name: "Performance Plan",
                    price: "$100 – $250/mo",
                    desc: "Includes Care Plan + constant SEO audits, performance checks, and updates.",
                  },
                  {
                    name: "Growth Partner",
                    price: "$300 – $2,500/mo",
                    desc: "Monthly UI changes, funnel optimization, strategy sessions, and automation support.",
                  },
                  {
                    name: "Revenue Partner",
                    price: "$2,500 – $10,000+/mo",
                    desc: "Dedicated growth engineering, CRM updates, AI workflows, and continuous design work.",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-5 rounded-2xl border border-border/40 bg-card/45 flex justify-between items-start gap-4"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-sm text-foreground">{item.name}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Bottom Custom Builder Callout */}
        <section className="pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center border border-primary/20 bg-card shadow-2xl"
          >
            <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full blur-[120px] opacity-20 pointer-events-none bg-primary" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[140px] opacity-20 pointer-events-none bg-primary" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight leading-tight">
                Want a custom configuration?
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Use our interactive Build Studio to choose your base tier, click cross-sell tools,
                add upsell modules, select recurring support plans, and get real-time price sheets
                instantly.
              </p>
              <Link
                href="/build"
                className="inline-flex items-center gap-2 rounded-xl text-primary-foreground px-8 py-3.5 text-xs font-semibold hover:scale-[1.03] transition-all glow-primary whitespace-nowrap"
                style={{ background: "var(--gradient-primary)" }}
              >
                Launch Build Studio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
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
              {[
                { label: "Home", href: "/#home" },
                { label: "About", href: "/#about" },
                { label: "Services", href: "/#services" },
                { label: "Portfolio", href: "/#portfolio" },
                { label: "Pricing", href: "/pricing" },
                { label: "Build Studio", href: "/build" },
                { label: "Contact", href: "/#contact" },
              ].map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {n.label}
                  </Link>
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
    </div>
  );
}
