"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { Cpu, Wifi, Heart, MapPin, Battery, Shield } from "lucide-react";

const specs = [
  { icon: Cpu, label: "Procesador", value: "ARM Cortex-M4", side: "left" },
  { icon: Wifi, label: "Conectividad", value: "4G LTE + BLE 5.0", side: "left" },
  { icon: Heart, label: "Sensores", value: "ECG + SpO2 + Temp", side: "left" },
  { icon: MapPin, label: "GPS", value: "Multi-GNSS L1/L5", side: "right" },
  { icon: Battery, label: "Batería", value: "7 días de uso", side: "right" },
  { icon: Shield, label: "Resistencia", value: "IP68 Waterproof", side: "right" },
];

export default function CollarShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const collarRef = useRef<HTMLDivElement>(null);
  const specsLeftRef = useRef<HTMLDivElement>(null);
  const specsRightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

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
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const runAnimations = () => {
    // Title animation
    if (titleRef.current) {
      animate(titleRef.current.children, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: "easeOutExpo",
        delay: stagger(150),
      });
    }

    // Collar main image - scale + rotate entrance
    if (collarRef.current) {
      animate(collarRef.current, {
        opacity: [0, 1],
        scale: [0.6, 1],
        rotateY: [90, 0],
        duration: 1200,
        easing: "easeOutExpo",
        delay: 300,
      });
    }

    // Glow pulse
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0, 0.6, 0.3],
        scale: [0.8, 1.2, 1],
        duration: 2000,
        easing: "easeInOutSine",
        delay: 600,
      });
    }

    // Left specs - slide in from left
    if (specsLeftRef.current) {
      animate(specsLeftRef.current.children, {
        opacity: [0, 1],
        translateX: [-60, 0],
        duration: 700,
        easing: "easeOutExpo",
        delay: stagger(120, { start: 500 }),
      });
    }

    // Right specs - slide in from right
    if (specsRightRef.current) {
      animate(specsRightRef.current.children, {
        opacity: [0, 1],
        translateX: [60, 0],
        duration: 700,
        easing: "easeOutExpo",
        delay: stagger(120, { start: 500 }),
      });
    }

    // Continuous floating animation for collar
    setTimeout(() => {
      if (collarRef.current) {
        animate(collarRef.current, {
          translateY: [-10, 10, -10],
          duration: 4000,
          easing: "easeInOutSine",
          loop: true,
        });
      }
    }, 1500);
  };

  const leftSpecs = specs.filter((s) => s.side === "left");
  const rightSpecs = specs.filter((s) => s.side === "right");

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-600/5 rounded-full blur-[180px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/3 rounded-full blur-[120px]" />

      <div className="container-custom mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 mb-6 opacity-0">
            Hardware Premium
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance opacity-0">
            Collar inteligente{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-brand-400 to-yellow-400">
              PetGuard
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto text-balance opacity-0">
            Tecnología de grado médico en un diseño resistente y elegante. Monitoreo 24/7 con 7 días de batería.
          </p>
        </div>

        {/* Collar showcase with specs */}
        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Left specs */}
          <div ref={specsLeftRef} className="space-y-5 hidden lg:block">
            {leftSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="glass-card-hover p-5 flex items-center gap-4 opacity-0"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{spec.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center - Collar image */}
          <div className="relative flex justify-center items-center py-8">
            {/* Glow behind collar */}
            <div
              ref={glowRef}
              className="absolute inset-0 flex items-center justify-center opacity-0"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-radial from-brand-600/20 via-red-500/10 to-transparent blur-2xl" />
            </div>

            {/* Blob decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -mr-32 -mt-32" />

            {/* Collar image */}
            <div
              ref={collarRef}
              className="relative z-10 opacity-0"
              style={{ perspective: "1000px" }}
            >
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpD3vT4Z6v6tQqbUmutEww2Uocwwu6BS6EIYZrTFYcaGOn1AeJ1kyNBmJwU_KOQqX3EKFh32KpcVb7FZyPKjmL7DH5XSV8MSGD3N0PQX-4ciaH1Swy1jCmxw_CBzaexB112Y9Sf2H82Z05f6VBrXDYHC5A3ynVqer5enwjae6ZEPWWng6BuT4bdvQDaTSRSoUqJXeMkSTCQCj5pP21jBniEahNZdu8QYnMJy0XBfCOWitstTD3r1IebgkMxKcfMIsOt_LrCsfvJgFl"
                alt="PetGuard Smart Collar"
                width={450}
                height={450}
                className="w-[300px] md:w-[400px] lg:w-[450px] h-auto drop-shadow-[0_20px_60px_rgba(67,105,0,0.3)] -rotate-12 hover:rotate-0 transition-transform duration-500"
                priority
                unoptimized
              />

              {/* Floating indicators around collar */}
              <div className="absolute top-4 right-0 glass-card p-2.5 rounded-xl animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400 font-medium">GPS Activo</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 glass-card p-2.5 rounded-xl animate-float-delayed">
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] text-red-400 font-medium">92 BPM</span>
                </div>
              </div>

              <div className="absolute top-1/2 -left-4 glass-card p-2.5 rounded-xl animate-float hidden md:block">
                <div className="flex items-center gap-2">
                  <Battery className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[10px] text-gray-600 font-medium">87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right specs */}
          <div ref={specsRightRef} className="space-y-5 hidden lg:block">
            {rightSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="glass-card-hover p-5 flex items-center gap-4 opacity-0"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{spec.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile specs (shown on small screens) */}
          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 col-span-full">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div key={spec.label} className="glass-card p-4 text-center">
                  <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 mb-0.5">{spec.label}</p>
                  <p className="text-xs font-semibold text-gray-900">{spec.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
