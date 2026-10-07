import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects() {
    return [
      // The approved route is /our-story; keep the conventional address working.
      { source: "/about", destination: "/our-story", permanent: false },
    ];
  },
};

export default nextConfig;
