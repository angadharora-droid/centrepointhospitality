import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal server (`npm start` runs .next/standalone/server.js): it loads only
  // the traced files, which roughly halves the memory Railway bills for.
  output: "standalone",
  images: {
    // WebP only: AVIF encoding is the main memory spike on the server.
    formats: ["image/webp"],
  },
  redirects() {
    return [
      // The approved route is /our-story; keep the conventional address working.
      { source: "/about", destination: "/our-story", permanent: false },
    ];
  },
};

export default nextConfig;
