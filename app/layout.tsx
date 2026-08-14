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

export const metadata: Metadata = {
  title: "Khalsa Tour & Travel | Cab Service in Amritsar",
  description:
    "Khalsa Tour & Travel provides reliable cab services from Amritsar to destinations across India. Book premium cabs, Ertiga 7-seater and Tempo Traveller services.",
  keywords: [
    "Khalsa Tour & Travel",
    "cab service in Amritsar",
    "Amritsar cab service",
    "Amritsar to Delhi cab",
    "Amritsar to Ludhiana cab",
    "outstation cab service",
    "airport cab service Amritsar",
    "Ertiga cab service",
    "Tempo Traveller Amritsar",
    "Punjab cab service",
  ],
  authors: [
    {
      name: "Khalsa Tour & Travel",
    },
  ],
  creator: "Khalsa Tour & Travel",

  openGraph: {
    title: "Khalsa Tour & Travel | Cab Service in Amritsar",
    description:
      "Reliable cab and travel services from Amritsar to destinations across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Khalsa Tour & Travel",
  },

  twitter: {
    card: "summary_large_image",
    title: "Khalsa Tour & Travel | Cab Service in Amritsar",
    description:
      "Book reliable cabs, Ertiga and Tempo Traveller services from Amritsar to destinations across India.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}