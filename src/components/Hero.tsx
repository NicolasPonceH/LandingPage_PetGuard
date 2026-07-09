"use client";

import { motion } from "framer-motion";

import {
  ChevronDown,
  Play,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import RadioactiveButton from "@/components/ui/RadioactiveButton";
import PetTrackDashboard from "@/components/PetTrackDashboard";

function ECGLine() {
  return (
    <svg
      viewBox="0 0 400 60"
      className="w-full h-12 md:h-16"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 30 L80 30 L100 30 L115 10 L125 50 L135 20 L145 35 L155 30 L200 30 L220 30 L235 10 L245 50 L255 20 L265 35 L275 30 L320 30 L340 30 L355 10 L365 50 L375 20 L385 35 L400 30"
        fill="none"
        stroke="url(#ecg-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 3, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.5 },
        }}
      />
      <defs>
        <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(164, 214, 94, 0.1)" />
          <stop offset="50%" stopColor="rgba(164, 214, 94, 0.6)" />
          <stop offset="100%" stopColor="rgba(164, 214, 94, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LiveStat({
  label,
  value,
  unit,
  color,
  delay,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  delay: number;
}) {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const variation = (Math.random() - 0.5) * 4;
        return Math.round((prev + variation) * 10) / 10;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-3 md:p-4 flex flex-col items-center gap-1 min-w-[80px]"
    >
      <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
        {label}
      </span>
      <span className={`text-lg md:text-2xl font-bold ${color}`}>
        {current}
      </span>
      <span className="text-[10px] md:text-xs text-gray-500">{unit}</span>
    </motion.div>
  );
}

/* ── Floating bokeh particles for cinematic depth ── */
function BokehParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 12,
    opacity: Math.random() * 0.25 + 0.05,
  }));

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, rgba(164, 214, 94, ${p.opacity + 0.15}) 0%, rgba(164, 214, 94, 0) 70%)`,
            filter: `blur(${p.size > 5 ? 1 : 0}px)`,
          }}
          animate={{
            y: [0, -40, -20, -60, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [p.opacity, p.opacity + 0.1, p.opacity, p.opacity + 0.15, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden"
      style={{ height: '100vh', minHeight: '100vh', paddingTop: 'clamp(3.5rem, 6vh, 5rem)', paddingBottom: 'clamp(1rem, 2vh, 3rem)' }}
    >
      {/* ── Hero background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/HeroPerro.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>

        {/* ── Cinematic overlays ── */}
        {/* Base dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.55)" }}
        />

        {/* Vignette effect — darkens edges for cinematic depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Top gradient — helps navbar text readability */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
          }}
        />

        {/* Bottom gradient — smooth transition to collar section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(4,13,2,0.3) 30%, rgba(4,13,2,0.65) 60%, rgba(4,13,2,0.95) 85%, #040d02 100%)",
          }}
        />

        {/* Brand color tint — subtle green/gold cinematic feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(67,105,0,0.12) 0%, transparent 50%, rgba(253,224,25,0.06) 100%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* ── Bokeh floating particles ── */}
      <BokehParticles />

      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient z-[1] opacity-40" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] z-[1]"
        style={{ background: "rgba(164, 214, 94, 0.08)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] z-[1]"
        style={{ background: "rgba(253, 224, 25, 0.08)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(164, 214, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(164, 214, 94, 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                IA Integrada
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 backdrop-blur-sm">
                <Zap className="w-3 h-3" />
                Tiempo Real
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-sm">
                <Lock className="w-3 h-3" />
                Encriptado
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="text-white drop-shadow-lg">Protege a tu</span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #a4d65e 0%, #d4e157 50%, #ffe329 100%)",
                  filter: "drop-shadow(0 0 20px rgba(164, 214, 94, 0.3))",
                }}
              >
                mascota
              </span>
              <br />
              <span className="text-white drop-shadow-lg">en tiempo real</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed drop-shadow-md"
            >
              PetGuard combina GPS inteligente, monitoreo biométrico e historial
              clínico digital en una sola plataforma.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <RadioactiveButton href="#precios" className="px-8 py-4 text-base">
                Comenzar ahora
                <Sparkles className="w-4 h-4" />
              </RadioactiveButton>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white/90 border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Ver demo
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-brand-500", "bg-brand-400", "bg-yellow-400", "bg-brand-300"].map(
                    (bg, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full ${bg} border-2 border-gray-800/50 flex items-center justify-center text-[10px] font-bold text-white shadow-lg`}
                      >
                        {["K", "M", "R", "J"][i]}
                      </div>
                    )
                  )}
                </div>
                <span className="text-sm text-gray-200">+10K usuarios</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-current drop-shadow-sm"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm ml-1 text-gray-200">4.9/5</span>
              </div>
            </motion.div>

            {/* ECG Line decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 opacity-40"
            >
              <ECGLine />
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <PetTrackDashboard />
          </div>
        </div>
      </div>

      {/* ── Animated gradient divider line at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px]">
        <motion.div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(164,214,94,0.5) 20%, rgba(253,224,25,0.4) 50%, rgba(164,214,94,0.5) 80%, transparent 100%)",
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-gray-300 font-medium drop-shadow-sm">Scroll</span>
        <ChevronDown className="w-5 h-5 text-brand-400 drop-shadow-sm" />
      </motion.div>
    </section>
  );
}
