import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "../styles.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aiventra Studio — Build • Innovate • Elevate",
  description:
    "Aiventra Studio is a tech development team building websites, SaaS, mobile & desktop apps, Unity games and AI automation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Aiventra Studio — Build • Innovate • Elevate",
    description:
      "Aiventra Studio is a tech development team building websites, SaaS, mobile & desktop apps, Unity games and AI automation.",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/gpt-engineer-file-uploads/axZApRAefKbZeMrAxcU6rksiYuG2/social-images/social-1782588791396-WhatsApp_Image_2026-06-27_at_2.57.47_PM.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiventra Studio — Build • Innovate • Elevate",
    description:
      "Aiventra Studio is a tech development team building websites, SaaS, mobile & desktop apps, Unity games and AI automation.",
    images: [
      "https://storage.googleapis.com/gpt-engineer-file-uploads/axZApRAefKbZeMrAxcU6rksiYuG2/social-images/social-1782588791396-WhatsApp_Image_2026-06-27_at_2.57.47_PM.webp",
    ],
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var c=localStorage.getItem('aiventra-theme')||'system';var t=c;if(c==='system'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
