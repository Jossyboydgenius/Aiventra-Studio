"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
// ThemeToggle hidden — theme follows OS system preference automatically
// import { ThemeToggle } from "@/components/theme-toggle";
import logoBlue from "@/assets/logo-blue.png";
// import logoGold from "@/assets/logo-gold.png"; // gold disabled
import heroBlueLight from "@/assets/aiventra-logo-blue-light.png";

const EASE = [0.16, 1, 0.3, 1] as const;

function NotFoundIcon({ theme }: { theme: string }) {
  // Default to blue (gold disabled — change back to let if re-enabling gold)
  const fillBg = "#DBEAFE"; // blue-100
  const fillMask = "#EFF6FF"; // blue-50
  const fillAccent = "#93C5FD"; // blue-300
  const fillHighlight = "#F0F9FF";
  const gradStart = "#60A5FA"; // blue-400
  const gradEnd = "#2563EB"; // blue-600

  // Gold theme disabled — only light/dark in use
  // if (theme === "gold") {
  //   fillBg = "#FEF3C7";
  //   fillMask = "#FFFBEB";
  //   fillAccent = "#FCD34D";
  //   fillHighlight = "#FFFDF5";
  //   gradStart = "#F59E0B";
  //   gradEnd = "#D97706";
  // }

  return (
    <svg
      width="108"
      height="108"
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-28 mx-auto"
    >
      <g clipPath="url(#clip0_notfound)">
        <rect width="108" height="108" rx="30" fill={fillBg} />
        <mask
          id="mask0_notfound"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="108"
          height="108"
        >
          <rect width="108" height="108" rx="30" fill={fillMask} />
        </mask>
        <g mask="url(#mask0_notfound)">
          <path
            d="M69.3024 81.4188C67.8283 79.5429 68.2038 76.8185 70.1305 75.4113C71.9635 74.0725 74.5276 74.4259 75.9301 76.2107L96.6569 102.587C98.131 104.463 97.7555 107.187 95.8289 108.595C93.9958 109.933 91.4317 109.58 90.0292 107.795L69.3024 81.4188Z"
            fill={fillAccent}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.2379 95.0355C71.332 91.2558 72.0136 85.801 75.7604 82.8507C79.507 79.9022 84.9025 80.5764 87.8084 84.3561L111.783 115.54C112.428 116.379 109.912 119.454 106.167 122.401C102.423 125.347 98.8578 127.058 98.2127 126.219L74.2379 95.0355Z"
            fill={fillAccent}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.2379 95.0355C71.332 91.2558 72.0136 85.801 75.7604 82.8507C79.507 79.9022 84.9025 80.5764 87.8084 84.3561L109.507 112.58C110.152 113.419 107.636 116.494 103.892 119.441C100.147 122.387 96.582 124.098 95.937 123.259L74.2379 95.0355Z"
            fill="white"
          />
          <path
            d="M81.4941 90.1557C80.4185 88.8141 80.6601 86.8498 82.0287 85.8088C83.3488 84.8048 85.2286 85.0359 86.266 86.3299L108.691 114.3C109.766 115.642 109.525 117.606 108.156 118.647C106.836 119.651 104.956 119.42 103.919 118.126L81.4941 90.1557Z"
            fill={fillHighlight}
          />
          <path
            d="M34.1847 19.8546C50.4677 8.96074 72.3813 13.435 83.0909 29.8397C83.9912 31.2189 84.7821 32.6404 85.4692 34.0909C90.1787 43.7198 90.0737 54.7166 85.8083 64.0295C83.1532 70.0453 78.8281 75.3981 72.992 79.3027C56.709 90.1965 34.7954 85.7225 24.0859 69.3176C13.3764 52.9123 17.9016 30.7487 34.1847 19.8546Z"
            fill="url(#paint0_linear_notfound)"
          />
          <ellipse
            cx="53.3571"
            cy="49.5305"
            rx="27.3931"
            ry="27.3492"
            transform="rotate(11.5394 53.3571 49.5305)"
            fill={fillBg}
          />
          <mask
            id="mask1_notfound"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="25"
            y="22"
            width="56"
            height="55"
          >
            <ellipse
              cx="53.3573"
              cy="49.5309"
              rx="27.3931"
              ry="27.3492"
              transform="rotate(11.5394 53.3573 49.5309)"
              fill={fillAccent}
            />
          </mask>
          <g mask="url(#mask1_notfound)">
            <ellipse
              cx="49.2784"
              cy="48.6981"
              rx="27.3931"
              ry="27.3492"
              transform="rotate(11.5394 49.2784 48.6981)"
              fill={fillHighlight}
            />
          </g>
          <ellipse opacity="0.8" cx="54.2268" cy="38.4204" rx="10.6443" ry="9.25049" fill="white" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_notfound"
          x1="88.5421"
          y1="96.7048"
          x2="-7.34449"
          y2="41.287"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradStart} />
          <stop offset="1" stopColor={gradEnd} />
        </linearGradient>
        <clipPath id="clip0_notfound">
          <rect width="108" height="108" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function NotFound() {
  const { theme } = useTheme();
  const logoSrc = logoBlue.src; // gold disabled
  const footerSrc = theme === "light" ? heroBlueLight.src : logoBlue.src;

  const footerLogoClass =
    theme === "light" ? "h-22 md:h-25 w-auto object-contain" : "h-16 md:h-18 w-auto object-contain";

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col justify-between overflow-x-hidden">
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

      {/* Page Content */}
      <main className="pt-44 pb-20 px-4 max-w-xl mx-auto relative z-10 flex-grow flex flex-col justify-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="space-y-6"
        >
          {/* Animated Themed SVG Icon */}
          <div className="hover:scale-105 transition-transform duration-500">
            <NotFoundIcon theme={theme} />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Error 404
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
              Page <span className="text-gradient font-display italic font-medium">not found.</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              The page you are looking for doesn't exist, has been moved, or is temporarily
              unavailable.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg text-primary-foreground px-8 py-4 text-sm font-semibold hover:scale-[1.03] transition-all glow-primary whitespace-nowrap"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ArrowLeft className="h-4 w-4" /> Return to Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
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
              <li>
                <a href="tel:+2348085082246" className="hover:text-primary transition-colors">
                  +234 808 508 2246
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
