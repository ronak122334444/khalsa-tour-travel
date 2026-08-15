import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================================================
   WEBSITE URL
========================================================= */

const siteUrl = "https://khalsa-tour-travel-hzkx.vercel.app";

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  /* =========================================================
     GOOGLE SEARCH CONSOLE VERIFICATION
  ========================================================= */

  verification: {
    google: "_79nYx5E96pvambAJd4UO8OFkid9X2zgxJ_6CHx8HcQ",
  },

  title: {
    default: "Khalsa Tour & Travel | Cab Service in Amritsar",
    template: "%s | Khalsa Tour & Travel",
  },

  description:
    "Khalsa Tour & Travel provides reliable cab services in Amritsar and across India. Book premium cabs, Ertiga 7-seater and Tempo Traveller services for local, airport and outstation travel.",

  keywords: [
    "Khalsa Tour & Travel",
    "cab service in Amritsar",
    "Amritsar cab service",
    "taxi service in Amritsar",
    "Amritsar taxi service",
    "Amritsar to Delhi cab",
    "Amritsar to Ludhiana cab",
    "Amritsar to Chandigarh cab",
    "Amritsar to Jalandhar cab",
    "Amritsar to Pathankot cab",
    "Amritsar airport cab",
    "airport taxi Amritsar",
    "outstation cab service Amritsar",
    "outstation taxi Amritsar",
    "Tempo Traveller Amritsar",
    "Tempo Traveller Punjab",
    "Ertiga cab Amritsar",
    "7 seater cab Amritsar",
    "Punjab cab service",
    "All India cab service",
    "cab booking Amritsar",
    "taxi booking Amritsar",
  ],

  authors: [
    {
      name: "Khalsa Tour & Travel",
    },
  ],

  creator: "Khalsa Tour & Travel",
  publisher: "Khalsa Tour & Travel",

  applicationName: "Khalsa Tour & Travel",

  category: "travel",

  alternates: {
    canonical: "/",
  },

  /* =========================================================
     OPEN GRAPH
  ========================================================= */

  openGraph: {
    title: "Khalsa Tour & Travel | Cab Service in Amritsar",

    description:
      "Book reliable cabs, Ertiga 7-seater and Tempo Traveller services from Amritsar to destinations across India.",

    url: siteUrl,

    siteName: "Khalsa Tour & Travel",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Khalsa Tour & Travel - Cab Service in Amritsar",
      },
    ],
  },

  /* =========================================================
     TWITTER
  ========================================================= */

  twitter: {
    card: "summary_large_image",

    title: "Khalsa Tour & Travel | Cab Service in Amritsar",

    description:
      "Reliable cab and travel services from Amritsar to destinations across India.",

    images: ["/images/logo.png"],
  },

  /* =========================================================
     ROBOTS
  ========================================================= */

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* =========================================================
     ICONS
  ========================================================= */

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}