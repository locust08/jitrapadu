import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/components/sites/figma-jitrapadu/site.css";
import "@/components/sites/figma-jitrapadu/mobile.css";
import "@/components/sites/figma-jitrapadu/fluid.css";
import "@/components/sites/figma-jitrapadu/home-fluid.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jitrapadu Engineering | Engineering Excellence, Powering Innovation",
  description: "Turnkey telecommunication infrastructure, steel towers, monopoles and in-house steel fabrication in Malaysia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
