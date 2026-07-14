"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe,
  Smartphone,
  TrendingUp,
  ShoppingBag,
  Calendar,
  Bot,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Tech cell assets
import cellWa from "@/assets/cell-wa.png";
import cellFa from "@/assets/cell-fa.png";
import cellEc from "@/assets/cell-ec.png";
import cellCb from "@/assets/cell-cb.png";
import cellAi from "@/assets/cell-ai.png";
import cellGs from "@/assets/cell-gs.png";
import cellMa from "@/assets/cell-ma.png";

// Team member portraits logos
import logoBlue from "@/assets/logo-blue.png";
// import logoGold from "@/assets/logo-gold.png"; // gold disabled

// Project assets
import projectNimbus from "@/assets/project-nimbus.png";
import projectForge from "@/assets/project-forge.png";
import projectHelix from "@/assets/project-helix.png";
import projectOrbit from "@/assets/project-orbit.png";
import projectAtlas from "@/assets/project-atlas.png";
import projectQuartz from "@/assets/project-quartz.png";

const EASE = [0.16, 1, 0.3, 1] as const;

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE },
};

// Static projects data matching page.tsx
const PROJECTS = [
  {
    title: "Nimbus Analytics",
    tag: "SaaS · Dashboard",
    desc: "Real-time analytics platform for fintech.",
    image: projectNimbus,
    slugs: ["web-development", "lead-generation-funnels", "e-commerce-revenue-setup"],
  },
  {
    title: "Forge Mobile",
    tag: "iOS · Android",
    desc: "Field service app used by 12k technicians daily.",
    image: projectForge,
    slugs: ["mobile-app-development"],
  },
  {
    title: "Helix CMS",
    tag: "WordPress · Headless",
    desc: "Headless WP powering a 200-page magazine.",
    image: projectHelix,
    slugs: ["web-development"],
  },
  {
    title: "Orbit Runner",
    tag: "Unity · Steam",
    desc: "Hyper-arcade title shipped on Steam & Switch.",
    image: projectOrbit,
    slugs: ["mobile-app-development", "web-development"],
  },
  {
    title: "Atlas Agent",
    tag: "AI · Automation",
    desc: "Multi-step LLM agent automating sales ops.",
    image: projectAtlas,
    slugs: ["ai-workflows-automation", "booking-crm-pipelines"],
  },
  {
    title: "Quartz Desktop",
    tag: "Tauri · Cross-platform",
    desc: "Privacy-first note app on Mac, Win & Linux.",
    image: projectQuartz,
    slugs: ["web-development", "mobile-app-development"],
  },
];

interface ServiceData {
  title: string;
  category: string;
  desc: string;
  icon: typeof Globe;
  image: StaticImageData;
  metrics: { label: string; value: string }[];
  capabilities: string[];
  workflow: { title: string; desc: string }[];
}

const SERVICES_DETAILS: Record<string, ServiceData> = {
  "web-development": {
    title: "Web Development & Engineering",
    category: "Web & Core Cells",
    desc: "We engineer enterprise-grade React and Next.js applications, building modular design systems and robust state infrastructures. By leveraging headless CMS layouts, serverless architecture, edge analytics, and optimized web rendering (ISR/SSR), we ensure that your platform loads in milliseconds, ranks highly on search engines, and supports millions of concurrent active users without performance degradation.",
    icon: Globe,
    image: cellWa,
    metrics: [
      { label: "PageSpeed Score", value: "99+" },
      { label: "Time to Interactive", value: "<0.8s" },
      { label: "SEO Audit Rating", value: "100%" },
    ],
    capabilities: [
      "Headless CMS Architecture (WordPress, Strapi, Contentful)",
      "Modern Frontends (Next.js, React, Tailwind CSS)",
      "Edge Delivery, Serverless API Routes, & CDN Caching",
      "Dynamic Analytics & Custom Event Tracking Scripts",
    ],
    workflow: [
      { title: "Architecture", desc: "Discovery, Sitemap, & Technology Stack Planning" },
      { title: "Prototyping", desc: "Interactive High-Fidelity Figma Prototypes" },
      { title: "Development", desc: "Production-Ready Next.js & Tailwind Coding" },
      { title: "Edge Deploy", desc: "Global CDN Launch & Performance Auditing" },
    ],
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    category: "Web & Core Cells",
    desc: "We architect cross-platform mobile experiences for iOS and Android using React Native and Flutter. We manage the entire lifecycle from UX flow mapping to App Store and Google Play submissions, ensuring a smooth, secure app launch. We specialize in building secure local cache layers, native SDK bindings, and fluid 60FPS UI transitions.",
    icon: Smartphone,
    image: cellMa,
    metrics: [
      { label: "Average App Score", value: "4.9/5" },
      { label: "Fluid Rendering Rate", value: "60FPS" },
      { label: "Native API Coverage", value: "100%" },
    ],
    capabilities: [
      "Cross-Platform Codebases (React Native, Flutter)",
      "Native Core Integrations & Custom Bridge Modules",
      "Push Notifications & Real-Time Syncing Pipelines",
      "Apple Developer & Google Console Release Pipelines",
    ],
    workflow: [
      { title: "UX Mapping", desc: "User Flow Mapping & Native Prototype Design" },
      { title: "Construction", desc: "Cross-Platform React Native/Flutter Engineering" },
      { title: "Beta Testing", desc: "Closed TestFlight Sandbox & Bug Fixing" },
      { title: "App Launch", desc: "App Store & Google Play Submission Management" },
    ],
  },
  "lead-generation-funnels": {
    title: "Lead Generation Funnels",
    category: "Growth Strategy Cell",
    desc: "High-converting multi-stage funnel pipelines engineered for SaaS platforms, coaches, and creators. We combine strategic copywriting, direct-response design, and target tracking pixels to lower CAC and scale acquisition. We implement high-availability page load optimization, custom intake forms, and automated lead sorting algorithms.",
    icon: TrendingUp,
    image: cellFa,
    metrics: [
      { label: "Average CRO Uplift", value: "+34%" },
      { label: "Lead Ingest Velocity", value: "2.4x" },
      { label: "Pixel Tracking Accuracy", value: "100%" },
    ],
    capabilities: [
      "Direct-Response Copywriting & Consumer Psychology Hooking",
      "High-Conversion Page Layouts & Micro-Engagements",
      "A/B Split Testing & Multi-Armed Bandit Optimizations",
      "Pixel Implementations & Custom Event Tracker Triggers",
    ],
    workflow: [
      { title: "Target Audit", desc: "Customer Messaging Analysis & Direct Copywriting" },
      { title: "UI Engineering", desc: "High-Conversion Wireframing & Page Building" },
      { title: "Analytics Sync", desc: "Pixel Configuration & Target Tracking Setups" },
      { title: "Optimization", desc: "Split-Testing Frameworks & Lead Routing Tuning" },
    ],
  },
  "e-commerce-revenue-setup": {
    title: "E-Commerce Revenue Engines",
    category: "E-Comm Setup Cell",
    desc: "High-conversion storefront design and headless Shopify engineering. Optimized from product search to checkout, integrated with advanced email marketing automation, abandoned cart triggers, and retargeting ads. We structure collection indices to support quick item lookup and implement Klaviyo sequences to recover cart items.",
    icon: ShoppingBag,
    image: cellEc,
    metrics: [
      { label: "Sales Conversion Boost", value: "+45%" },
      { label: "Cart Abandonment Recovery", value: "28%" },
      { label: "Search Index Acceleration", value: "2.0x" },
    ],
    capabilities: [
      "Headless Shopify & Storefront Storefront Engineering",
      "Automated Checkout Flow & Dynamic Cart Optimizations",
      "Klaviyo Flow Automations & Customer Lifecycles",
      "Social Target Retargeting & Custom Catalog Sync",
    ],
    workflow: [
      { title: "Store Prep", desc: "Inventory Architecture & Taxonomy Optimization" },
      { title: "Storefront Build", desc: "High-Speed Front-End Shop Layout Coding" },
      { title: "Retention Flow", desc: "Automated Klaviyo Marketing & Abandon Recovery" },
      { title: "Ads Pixel", desc: "Meta & Google Conversion API Implementation" },
    ],
  },
  "booking-crm-pipelines": {
    title: "Booking Flows & CRM Integration",
    category: "CRM & Booking Cell",
    desc: "Seamless, intuitive booking flows and lead routing systems connected to advanced CRM pipelines like HubSpot or GoHighLevel. We streamline client scheduling, automate lead scoring, and accelerate sales workflows. We program custom routers that allocate leads based on team capacity and schedule automated reminder notifications.",
    icon: Calendar,
    image: cellCb,
    metrics: [
      { label: "Admin Workload Reduction", value: "-75%" },
      { label: "Booking Form Conversions", value: "3.2x" },
      { label: "Database Sync Integrity", value: "100%" },
    ],
    capabilities: [
      "Custom Lead Intake & Dynamic Scheduling Interfaces",
      "HubSpot / GoHighLevel Database Synchronization",
      "Smart Calendar Scheduling & Automated Client Notification",
      "Seamless Client Onboarding Kits & Asset Routing",
    ],
    workflow: [
      { title: "Ops Audit", desc: "Sales Funnel Audit & Route Mapping Setup" },
      { title: "Flow Prototyping", desc: "Custom Booking Form UI/UX Mockups Design" },
      { title: "Integrations", desc: "HubSpot or GoHighLevel API Pipelines Setup" },
      { title: "Onboarding", desc: "Employee Workspace Training & Automation Test" },
    ],
  },
  "ai-workflows-automation": {
    title: "AI Workflows & Automations",
    category: "AI Automation Cell",
    desc: "Transform operations with generative AI pipelines. We build automated client intake bots, multi-agent AI scripts, auto-reply SMS/Email setups, and real-time operations dashboards to maximize efficiency and automate overhead. We engineer systems that interpret unstructured client data, structure it, and route it to matching APIs.",
    icon: Bot,
    image: cellAi,
    metrics: [
      { label: "Auto Customer Queries", value: "85%" },
      { label: "Operations Hours Saved", value: "140h/mo" },
      { label: "AI Output Accuracy", value: "99.2%" },
    ],
    capabilities: [
      "LLM Prompting & Custom Vector Databases (RAG)",
      "Automated SMS/Email Conversational Reply Pipelines",
      "Zapier / Make.com API Integrations",
      "Unified Performance Reporting & Analytics Dashboards",
    ],
    workflow: [
      { title: "Blueprinting", desc: "Automation Pipeline Feasibility & Scope Draft" },
      { title: "Knowledge Ingest", desc: "Fine-Tuning Prompts & RAG Database Setups" },
      { title: "Make API Links", desc: "Zapier / Make.com Automated Trigger Scripts" },
      { title: "Stress Tests", desc: "Fail-Safe Redundancy Checks & Client Intake Trials" },
    ],
  },
};

export default function ServiceClient({ slug }: { slug: string }) {
  const data = SERVICES_DETAILS[slug];
  const { theme } = useTheme();

  // Gold disabled — always use blue logo
  const logoSrc = logoBlue.src;

  if (!data) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Service Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = data.icon;
  const matchingProjects = PROJECTS.filter((p) => p.slugs.includes(slug));

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden pb-20">
      {/* Background orbs */}
      <div className="absolute inset-0 bg-hero opacity-80" />
      <div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-primary)" }}
      />

      {/* Floating Header Pill */}
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
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </motion.header>

      {/* Content wrapper */}
      <main className="container-page pt-32 relative z-10">
        {/* Service Hero section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center mb-20">
          <motion.div className="lg:col-span-7 space-y-6" {...FADE_UP}>
            <h1 className="font-display text-4xl md:text-6xl font-medium leading-tight">
              {data.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {data.desc}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 pt-4">
              {data.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground/90">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="relative group max-w-sm w-full aspect-square overflow-hidden rounded-3xl border border-primary/20 bg-card/65 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-xl opacity-50 z-0" />
              <img
                src={data.image.src}
                alt={data.title}
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>

        {/* Metrics Section */}
        <motion.div
          className="grid gap-6 sm:grid-cols-3 border-y border-border/20 py-10 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {data.metrics.map((metric, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-medium text-gradient-primary">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline / Process Section */}
        <div className="space-y-10 mb-20 relative">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium">How We Execute</h2>
          </div>
          <div className="relative">
            {/* Horizontal timeline track line on desktop */}
            <div className="absolute top-[48px] left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-border/60 to-primary/20 hidden md:block z-0" />

            <div className="grid gap-6 md:grid-cols-4 relative z-10">
              {data.workflow.map((step, i) => (
                <motion.div
                  key={i}
                  className="bg-card border border-border/40 p-6 rounded-2xl hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div
                    className="text-4xl md:text-5xl text-primary/80 mb-3 select-none"
                    style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                  >
                    0{i + 1}
                  </div>
                  <h4 className="font-sans font-semibold text-base text-foreground mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {matchingProjects.length > 0 && (
          <div className="space-y-10 mb-20">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-3xl md:text-4xl font-medium">Similar Projects</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingProjects.map((proj) => (
                <div
                  key={proj.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 flex flex-col justify-between aspect-[4/3] cursor-default"
                >
                  <img
                    src={proj.image.src}
                    alt={proj.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                  <div className="relative z-20 flex flex-col justify-end h-full text-white">
                    <span className="text-xs uppercase tracking-wider text-primary font-bold mb-1">
                      {proj.tag}
                    </span>
                    <h3 className="font-display text-xl font-medium mb-1 drop-shadow">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner Section */}
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
              Ready to automate, build, or scale?
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Connect with our partner teams today to engineer high-velocity software assets.
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
