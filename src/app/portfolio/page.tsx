"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Team member portraits logos
import logoBlue from "@/assets/logo-blue.png";
// import logoGold from "@/assets/logo-gold.png"; // gold disabled

// Project assets
import projectPrimaPlug from "@/assets/projects/prima-plug.jpeg";
import projectEasyLiveTech from "@/assets/projects/easylivetech.jpeg";
import projectRiskPay from "@/assets/projects/riskpay.jpeg";
import projectGlobalRelocate from "@/assets/projects/global-relocate.jpeg";
import projectTeknotePro from "@/assets/projects/teknote-pro.jpeg";
import projectLiteFi from "@/assets/projects/litefi.jpeg";
import projectCostShrink from "@/assets/projects/cost-shrink.jpeg";

const EASE = [0.16, 1, 0.3, 1] as const;

// Categories for filter
const CATEGORIES = ["All", "SaaS & Web", "AI & Automation"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  {
    title: "PrimaPlug",
    tag: "SaaS · Marketplace",
    desc: "A digital marketplace that connects businesses with trusted service providers across the world to seamlessly manage projects.",
    image: projectPrimaPlug,
    categories: ["SaaS & Web"] as Category[],
    link: "https://primaplug.com/",
  },
  {
    title: "EasyLiveTech",
    tag: "Web · Growth Agency",
    desc: "Designing high-converting websites, sales funnels, CRM systems, automations, mobile apps, and AI-powered workflows.",
    image: projectEasyLiveTech,
    categories: ["SaaS & Web"] as Category[],
    link: "https://www.easylivetech.com/",
  },
  {
    title: "Risk Pay",
    tag: "Web · FinTech",
    desc: "A secure payment gateway for high-risk businesses featuring instant USDC payouts and WooCommerce plugin integration.",
    image: projectRiskPay,
    categories: ["SaaS & Web"] as Category[],
    link: "https://riskpay.biz/",
  },
  {
    title: "Global Relocate",
    tag: "SaaS · AI Platform",
    desc: "AI-powered international relocation assistant comparing cost of living, tax structures, and quality of life.",
    image: projectGlobalRelocate,
    categories: ["SaaS & Web", "AI & Automation"] as Category[],
    link: "https://globalrelocate.com/",
  },
  {
    title: "Teknotes Pro",
    tag: "Web · HealthTech",
    desc: "HIPAA-compliant clinical note-taking and consent form platform built for secure staff messaging and healthcare coordination.",
    image: projectTeknotePro,
    categories: ["SaaS & Web"] as Category[],
    link: "https://teknotespro.com/",
  },
  {
    title: "LiteFi",
    tag: "SaaS · FinTech",
    desc: "Personal finance ecosystem with integrated savings, investments, loans, and auto-financing modules.",
    image: projectLiteFi,
    categories: ["SaaS & Web"] as Category[],
    link: "https://litefi.ng/",
  },
  {
    title: "Cost Shrink Inc",
    tag: "Web · Corporate",
    desc: "A fully responsive business consulting site optimized for SEO and performance, utilizing ZeptoMail API and Nodemailer for automated email flows.",
    image: projectCostShrink,
    categories: ["SaaS & Web"] as Category[],
    link: "https://www.costshrinkinc.com/",
  },
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState<Category>("All");
  const { theme } = useTheme();

  // Gold disabled — always use blue logo
  const logoSrc = logoBlue.src;

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
          <h1 className="font-display text-4xl md:text-6xl font-medium leading-tight">
            Selected{" "}
            <span className="text-gradient font-display italic font-medium">Projects & Works</span>
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
                className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold rounded-full border transition-all ${active
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
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                key={p.title}
                className="block h-full"
              >
                <motion.article
                  layout
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
              </a>
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
