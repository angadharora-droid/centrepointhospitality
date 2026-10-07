import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { site } from "@/content/site";
import { homeTitle, sharedSocial } from "@/lib/metadata";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Site-wide defaults. Each page sets its own canonical and share fields via
// pageMetadata (lib/metadata.ts); pages without one (e.g. the 404) get none.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: `%s | ${site.name}` },
  description: site.description,
  ...sharedSocial,
};

export const viewport: Viewport = {
  themeColor: "#f6f2ec",
};

/** Shift+G column grid in development only — the import never reaches a production bundle. */
async function DevGridOverlay() {
  if (process.env.NODE_ENV !== "development") return null;
  const { GridOverlay } = await import("@/components/dev/GridOverlay");
  return <GridOverlay />;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <OrganizationSchema />
        <MotionProvider>
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <DevGridOverlay />
        </MotionProvider>
      </body>
    </html>
  );
}
