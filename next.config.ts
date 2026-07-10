import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  // Suppress unhandled HMR websocket ping rejections from other local dev servers (e.g. Vite) on Windows
  process.on("unhandledRejection", (reason: any) => {
    if (
      reason instanceof Error &&
      reason.message &&
      reason.message.includes("unrecognized HMR message")
    ) {
      return;
    }
    // Let other unhandled rejections log normally
    console.error("Unhandled Rejection:", reason);
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use a separate output directory for dev to prevent conflicts with production build caches on Windows
  distDir: isDev ? ".next-dev" : ".next",
};

export default nextConfig;
