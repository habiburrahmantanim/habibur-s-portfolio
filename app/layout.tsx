import type { Metadata, Viewport } from "next";
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

const BASE_URL = "https://habiburrahmantanim.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176b4c",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Habibur Rahman — Web Developer & Data Builder",
    template: "%s | Habibur Rahman",
  },
  description:
    "Portfolio of Habibur Rahman — a CSE graduate from Dhaka specialising in React, Next.js, Python, and applied machine learning. Available for freelance & full-time roles.",
  keywords: [
    "Habibur Rahman",
    "web developer",
    "Next.js developer",
    "React developer",
    "data scientist",
    "machine learning",
    "Bangladesh",
    "Dhaka",
    "portfolio",
    "frontend developer",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Habibur Rahman", url: "https://github.com/habiburrahmantanim" }],
  creator: "Habibur Rahman",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Habibur Rahman",
    title: "Habibur Rahman — Web Developer & Data Builder",
    description:
      "Explore the portfolio of Habibur Rahman — responsive interfaces, machine learning pipelines, and published research from Dhaka, Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habibur Rahman — Web Developer & Data Builder",
    description:
      "Portfolio: React, Next.js, Python, ML, and data-led products built with care.",
    creator: "@habiburrahmantanim",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
