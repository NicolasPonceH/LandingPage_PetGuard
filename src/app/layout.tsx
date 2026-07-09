import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "PetGuard — Monitoreo Inteligente para Mascotas",
  description:
    "PetGuard combina GPS inteligente, monitoreo biométrico e historial clínico digital en una sola plataforma. Protege a tu mascota en tiempo real.",
  keywords: [
    "mascotas",
    "GPS mascotas",
    "monitoreo mascotas",
    "collar inteligente",
    "salud mascotas",
    "veterinario",
    "PetGuard",
  ],
  openGraph: {
    title: "PetGuard — Monitoreo Inteligente para Mascotas",
    description:
      "Protege a tu mascota en tiempo real con GPS, monitoreo biométrico e historial clínico digital.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise-bg">
        {/* Fixed background orbs — animated floating layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          {/* Large slow orb top-left */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#a4d65e]/10 blur-[60px] animate-[float_18s_ease-in-out_infinite]" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
          {/* Medium orb top-right */}
          <div className="absolute -top-16 right-0 w-[400px] h-[400px] rounded-full bg-[#fde019]/10 blur-[60px] animate-[float_14s_ease-in-out_3s_infinite]" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
          {/* Small orb bottom-center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#bff377]/[0.08] blur-[60px] animate-[float_20s_ease-in-out_6s_infinite]" style={{ willChange: 'transform', transform: 'translateZ(0)' }} />
        </div>
        {children}
      </body>
    </html>
  );
}
