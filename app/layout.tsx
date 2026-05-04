import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sojori — L'Orchestrateur Intelligent des Locations Courte Durée",
  description:
    "PMS complet + Channel Manager + Orchestration AI. Automatisez 23 tâches de la réservation au checkout. WhatsApp AI 24/7, Staff Management, Analytics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Aurora Soft — light theme. NE PAS mettre bg-bg-0 ni text-white ici. */}
      <body className="antialiased">{children}</body>
    </html>
  );
}
