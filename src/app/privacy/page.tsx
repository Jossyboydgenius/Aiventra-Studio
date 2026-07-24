"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import logoNavbar from "@/assets/logo-navbar.png";
import logoFooter from "@/assets/logo-footer.png";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const logoSrc = logoNavbar.src;
  const footerSrc = logoFooter.src;

  return (
    <div className="min-h-screen bg-background text-foreground relative pb-12 overflow-x-hidden">
      {/* Background radial highlights */}
      <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none bg-primary" />

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
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Page Content */}
      <main className="pt-32 px-4 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Legal & Compliance
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
              Privacy <span className="text-gradient font-display italic font-medium">Policy.</span>
            </h1>
            <p className="text-muted-foreground text-sm">Last updated: July 10, 2026</p>
          </div>

          <div className="card-elevated p-6 sm:p-10 rounded-3xl border border-border/40 space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">1. Introduction</h2>
              <p>
                At Aiventra Studios ("we," "our," or "us"), we value your privacy. This Privacy
                Policy outlines how we collect, use, disclose, and protect your personal information
                when you visit our website, use our build tools, or contract our software
                engineering and design services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">2. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact info: Name, email address, phone number, company name.</li>
                <li>Project details and specifications submitted through our custom builders.</li>
                <li>Communication data sent via contact forms or during introductory calls.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">
                3. How We Use Your Information
              </h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To estimate project scopes, timelines, and budgets dynamically.</li>
                <li>To deliver custom software components, integrations, and branding designs.</li>
                <li>
                  To monitor and maintain system health for clients under Aiventra Care agreements.
                </li>
                <li>To communicate with you regarding updates, invoices, or feedback requests.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">4. Information Sharing</h2>
              <p>
                We do not sell or lease your personal information. We only share details with
                trusted third-party service providers (such as hosting nodes, APIs, payment
                gateways, and scheduler widgets like Cal.com) necessary to execute our deliverables,
                subject to strict confidentiality agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">5. Data Security</h2>
              <p>
                We implement industry-standard administrative, physical, and technical safeguards to
                secure your database schemas, project details, and contact logs against unauthorized
                access or destruction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-medium text-foreground">6. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the right to request access to,
                correction of, or deletion of the personal data we hold. Please contact us using the
                credentials below to initiate a request.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-border/20">
              <h2 className="text-lg font-medium text-foreground">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please reach out to our legal
                support desk:
              </p>
              <div className="space-y-2 mt-2 font-medium text-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="mailto:hello@aiventrastudio.com"
                    className="hover:text-primary transition-colors"
                  >
                    hello@aiventrastudio.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a href="tel:+2348085082246" className="hover:text-primary transition-colors">
                    +234 808 508 2246
                  </a>
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container-page py-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4">
            <img
              src={footerSrc}
              alt="Aiventra Studios"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain -ml-1"
            />
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
