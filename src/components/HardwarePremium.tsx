"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger } from "animejs";
import { Cpu, Wifi, Heart, MapPin, Battery, ShieldCheck } from "lucide-react";
import RadioactiveButton from "@/components/ui/RadioactiveButton";

const specsLeft = [
  { icon: Cpu, label: "Procesador", value: "ARM Cortex-M4" },
  { icon: Wifi, label: "Conectividad", value: "4G LTE + BLE 5.0" },
  { icon: Heart, label: "Sensores", value: "ECG + SpO2 + Temp" },
];

const specsRight = [
  { icon: MapPin, label: "GPS", value: "Multi-GNSS L1/L5" },
  { icon: Battery, label: "Batería", value: "7 días de uso" },
  { icon: ShieldCheck, label: "Resistencia", value: "IP68 Waterproof" },
];

export default function HardwarePremium() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const collarRef = useRef<HTMLDivElement>(null);
  const specsLeftRef = useRef<HTMLDivElement>(null);
  const specsRightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [bpm, setBpm] = useState(92);

  // BPM live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(88 + Math.floor(Math.random() * 10));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const runAnimations = useCallback(() => {
    // Title area
    if (titleRef.current) {
      animate(titleRef.current.children, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: "easeOutExpo",
        delay: stagger(120),
      });
    }

    // Collar SVG
    if (collarRef.current) {
      animate(collarRef.current, {
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 1100,
        easing: "easeOutExpo",
        delay: 350,
      });
    }

    // Left specs
    if (specsLeftRef.current) {
      animate(specsLeftRef.current.children, {
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 700,
        easing: "easeOutExpo",
        delay: stagger(100, { start: 500 }),
      });
    }

    // Right specs
    if (specsRightRef.current) {
      animate(specsRightRef.current.children, {
        opacity: [0, 1],
        translateX: [50, 0],
        duration: 700,
        easing: "easeOutExpo",
        delay: stagger(100, { start: 500 }),
      });
    }

    // CTA buttons
    if (ctaRef.current) {
      animate(ctaRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: "easeOutExpo",
        delay: stagger(100, { start: 900 }),
      });
    }

    // Continuous floating for collar
    setTimeout(() => {
      if (collarRef.current) {
        animate(collarRef.current, {
          translateY: [-8, 8, -8],
          rotate: [-1.2, 1, -1.2],
          duration: 4000,
          easing: "easeInOutSine",
          loop: true,
        });
      }
    }, 1400);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            runAnimations();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [runAnimations]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-400/5 rounded-full blur-[180px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-[120px]" />

      <div className="container-custom mx-auto relative z-10">
        {/* ─── White premium card ─── */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 lg:p-14 relative overflow-hidden shadow-sm border border-gray-100">
          {/* Card inner background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 65% 50% at 50% -10%, rgba(164,214,94,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 95% 90%, rgba(242,214,0,0.10) 0%, transparent 60%)",
              }}
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(164,214,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(164,214,94,0.08) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>

          {/* ─── Title area ─── */}
          <div ref={titleRef} className="relative z-10 mb-6 lg:mb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-brand-400/30 bg-brand-400/10 rounded-sm px-3.5 py-1.5 mb-5 opacity-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_6px_#a4d65e] animate-pulse" />
              <span className="text-[10px] font-display font-bold tracking-[0.16em] uppercase gradient-text">
                Hardware Premium
              </span>
            </div>

            {/* Title — well organized hierarchy */}
            <h2 className="mb-4 opacity-0">
              <span className="block text-xs sm:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-gray-900/40 mb-2.5">
                Collar Inteligente
              </span>
              <span className="block font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[0.95]">
                <span className="text-gray-900">Pet</span>
                <span className="gradient-text">Guard</span>
              </span>
              {/* Accent line under brand */}
              <span className="block w-14 h-[3px] bg-gradient-to-r from-brand-400 to-yellow-400 rounded-full mt-4" />
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-base text-gray-900/50 max-w-md leading-7 tracking-wide opacity-0">
              Tecnología de grado médico en un diseño resistente y elegante.
              Monitoreo 24/7 con 7 días de batería.
            </p>
          </div>

          {/* ─── 3-col layout: specs | collar | specs ─── */}
          <div className="grid lg:grid-cols-[1fr_280px_1fr] gap-6 lg:gap-8 items-center relative z-10">
            {/* LEFT specs */}
            <div ref={specsLeftRef} className="space-y-3 hidden lg:flex flex-col">
              {specsLeft.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="flex items-center gap-3 bg-white border border-brand-400/20 rounded-xl px-4 py-3.5 max-w-[220px] shadow-[0_2px_12px_rgba(164,214,94,0.07)] hover:bg-brand-50/50 hover:border-brand-400/40 hover:shadow-[0_4px_20px_rgba(164,214,94,0.14)] transition-all duration-300 cursor-default opacity-0"
                  >
                    <div className="w-6 flex-shrink-0 flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-brand-400" />
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.1em] uppercase text-gray-900/30 font-semibold mb-0.5">
                        {spec.label}
                      </p>
                      <p className="font-display text-[13px] font-bold gradient-text">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CENTER — Collar SVG */}
            <div
              ref={collarRef}
              className="relative w-[280px] h-[280px] flex items-center justify-center mx-auto opacity-0"
            >
              {/* Glow layers */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-gradient-radial from-brand-400/10 to-transparent" />
              <div className="absolute w-[190px] h-[190px] rounded-full bg-gradient-radial from-red-500/15 to-transparent animate-pulse-slow" />

              {/* Collar SVG */}
              <svg
                className="relative drop-shadow-[0_16px_32px_rgba(0,0,0,0.18)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                viewBox="0 0 260 200"
                width="260"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="hw-strapG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e1e1e" />
                    <stop offset="100%" stopColor="#111" />
                  </linearGradient>
                  <linearGradient id="hw-devG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e85040" />
                    <stop offset="100%" stopColor="#a01808" />
                  </linearGradient>
                  <linearGradient id="hw-devsideG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c02010" />
                    <stop offset="100%" stopColor="#7a0e02" />
                  </linearGradient>
                  <filter id="hw-sG">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity=".22" />
                  </filter>
                  <filter id="hw-glowG">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                </defs>
                {/* Shadow ellipse */}
                <ellipse cx="130" cy="170" rx="80" ry="10" fill="#e85040" opacity=".07" filter="url(#hw-glowG)" />
                {/* Strap */}
                <rect x="15" y="70" width="230" height="80" rx="38" fill="url(#hw-strapG)" filter="url(#hw-sG)" />
                <rect x="18" y="73" width="224" height="74" rx="35" fill="#141414" />
                <rect x="20" y="75" width="220" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
                {/* Buckle */}
                <rect x="112" y="56" width="36" height="18" rx="3" fill="#1a1a1a" stroke="#282828" strokeWidth="1" />
                <rect x="120" y="60" width="20" height="10" rx="2" fill="#222" />
                <line x1="130" y1="56" x2="130" y2="74" stroke="#333" strokeWidth="1.5" />
                {/* Device body */}
                <rect x="78" y="80" width="104" height="60" rx="10" fill="url(#hw-devG)" />
                <rect x="80" y="82" width="100" height="56" rx="9" fill="url(#hw-devG)" />
                <rect x="80" y="82" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
                <rect x="78" y="80" width="4" height="60" rx="2" fill="url(#hw-devsideG)" />
                <rect x="178" y="80" width="4" height="60" rx="2" fill="url(#hw-devsideG)" />
                {/* Sensor panel */}
                <rect x="86" y="89" width="34" height="26" rx="5" fill="#090909" />
                <rect x="87" y="90" width="32" height="24" rx="4" fill="#0d0d0d" stroke="#1a1a1a" strokeWidth=".5" />
                {/* LED red */}
                <circle cx="98" cy="101" r="5.5" fill="#d83020">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="98" cy="101" r="2" fill="#ff5040" opacity=".9" />
                {/* LED green */}
                <circle cx="111" cy="101" r="5.5" fill="#3a9c3a">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="111" cy="101" r="2" fill="#6dcc6d" opacity=".9" />
                {/* Sensor dot */}
                <circle cx="122" cy="104" r="3.5" fill="#444" opacity=".5" />
                {/* Brand label on device */}
                <text x="143" y="100" fontFamily="Montserrat, sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.65)" textAnchor="middle" fontWeight="500">
                  PetGuard
                </text>
                {/* IC chip grid */}
                <rect x="152" y="88" width="24" height="24" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth=".5" />
                <rect x="154" y="90" width="6" height="6" rx=".5" fill="rgba(255,255,255,0.2)" />
                <rect x="162" y="90" width="3" height="3" rx=".3" fill="rgba(255,255,255,0.15)" />
                <rect x="167" y="90" width="6" height="6" rx=".5" fill="rgba(255,255,255,0.2)" />
                <rect x="154" y="98" width="3" height="3" rx=".3" fill="rgba(255,255,255,0.15)" />
                <rect x="159" y="98" width="6" height="3" rx=".3" fill="rgba(255,255,255,0.12)" />
                <rect x="154" y="103" width="6" height="6" rx=".5" fill="rgba(255,255,255,0.2)" />
                <rect x="162" y="103" width="3" height="6" rx=".3" fill="rgba(255,255,255,0.15)" />
                <rect x="167" y="103" width="6" height="6" rx=".5" fill="rgba(255,255,255,0.2)" />
                <rect x="85" y="120" width="90" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
              </svg>

              {/* Floating badges */}
              <div className="absolute top-2 -right-2 flex items-center gap-1.5 bg-white/95 border border-brand-400/25 rounded-full px-3 py-1.5 shadow-sm font-display text-[11px] font-semibold">
                <span className="w-[5px] h-[5px] rounded-full bg-brand-400 shadow-[0_0_6px_#a4d65e] animate-pulse" />
                <span className="gradient-text">GPS Activo</span>
              </div>

              <div className="absolute bottom-6 -left-6 flex items-center gap-1.5 bg-white/95 border border-brand-400/25 rounded-full px-3 py-1.5 shadow-sm font-display text-[11px] font-semibold text-red-500">
                <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>{bpm} BPM</span>
              </div>

              <div className="absolute top-[46%] -left-11 -translate-y-1/2 flex items-center gap-1.5 bg-white/95 border border-brand-400/25 rounded-full px-3 py-1.5 shadow-sm font-display text-[11px] font-semibold">
                <div className="w-7 h-[3px] bg-gray-900/10 rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-brand-400 to-yellow-400 rounded-full" />
                </div>
                <span className="gradient-text">87%</span>
              </div>
            </div>

            {/* RIGHT specs */}
            <div ref={specsRightRef} className="space-y-3 hidden lg:flex flex-col items-end">
              {specsRight.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="flex items-center gap-3 flex-row-reverse text-right bg-white border border-brand-400/20 rounded-xl px-4 py-3.5 max-w-[220px] shadow-[0_2px_12px_rgba(164,214,94,0.07)] hover:bg-brand-50/50 hover:border-brand-400/40 hover:shadow-[0_4px_20px_rgba(164,214,94,0.14)] transition-all duration-300 cursor-default opacity-0"
                  >
                    <div className="w-6 flex-shrink-0 flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-brand-400" />
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.1em] uppercase text-gray-900/30 font-semibold mb-0.5">
                        {spec.label}
                      </p>
                      <p className="font-display text-[13px] font-bold gradient-text">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE specs grid */}
            <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 col-span-full mt-6">
              {[...specsLeft, ...specsRight].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="bg-white border border-brand-400/20 rounded-xl p-4 text-center shadow-[0_2px_12px_rgba(164,214,94,0.07)]"
                  >
                    <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                    <p className="text-[9px] tracking-[0.1em] uppercase text-gray-900/30 font-semibold mb-0.5">
                      {spec.label}
                    </p>
                    <p className="font-display text-xs font-bold gradient-text">
                      {spec.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── CTA buttons ─── */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-6 lg:mt-8 relative z-10">
            <RadioactiveButton href="#precios" className="px-8 py-4 text-base">
              Comprar ahora
            </RadioactiveButton>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-brand-400/30 to-transparent hidden sm:block" />
            <button className="btn-secondary">
              Ver especificaciones →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
