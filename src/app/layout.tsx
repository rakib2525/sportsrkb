import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics/Analytics";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InstallHint } from "@/components/pwa/InstallHint";
import { OfflineStatusBanner } from "@/components/pwa/OfflineStatusBanner";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RKBSports.app | Cricket Tools & Calculators",
    template: "%s | RKBSports.app",
  },
  description:
    "RKBSports.app offers fast, mobile-friendly cricket tools, calculators, and informational resources for cricket fans and organizers.",
  applicationName: "RKBSports.app",
  manifest: "/manifest.webmanifest",
  keywords: [
    "cricket tools",
    "cricket calculators",
    "NRR calculator",
    "run rate calculator",
    "cricket statistics",
  ],
  authors: [{ name: "RKBSports.app" }],
  creator: "RKBSports.app",
  publisher: "RKBSports.app",
  appleWebApp: {
    capable: true,
    title: "RKBSports",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RKBSports.app",
    title: "RKBSports.app | Cricket Tools & Calculators",
    description:
      "Fast, mobile-friendly cricket tools and calculators for fans, players, coaches, and tournament organizers.",
  },
  twitter: {
    card: "summary",
    title: "RKBSports.app | Cricket Tools & Calculators",
    description:
      "Fast, mobile-friendly cricket tools and calculators for cricket planning and statistics.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "RKBSports",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (function() {
      try {
        var storedTheme = localStorage.getItem('theme');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = storedTheme === 'light' || storedTheme === 'dark'
          ? storedTheme
          : systemDark ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme;
      } catch (_) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <JsonLd data={websiteSchema()} />
          <JsonLd data={organizationSchema()} />
          <Header />
          <AnnouncementBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <OfflineStatusBanner />
          <InstallHint />
        </div>
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
