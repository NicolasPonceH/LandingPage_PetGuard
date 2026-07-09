"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 120;

interface Hotspot {
  id: string;
  startFrame: number;
  title: string;
  description: string;
  x: string;
  y: string;
  lineDirection: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const hotspotsData: Hotspot[] = [
  {
    id: "vitales",
    startFrame: 45,
    title: "Monitoreo de Pulsaciones y Signos Vitales",
    description: "Sensor óptico de alta precisión en contacto con la piel de la mascota. Mide la frecuencia cardíaca, el pulso y detecta anomalías térmicas o picos de estrés en tiempo real.",
    x: "35%",
    y: "65%",
    lineDirection: "bottom-left"
  },
  {
    id: "gps",
    startFrame: 35,
    title: "Módulo GPS de Alta Precisión",
    description: "Geolocalización en tiempo real vía satélite interconectada con la app. Permite el rastreo exacto de la mascota y activa el sistema de Geofencing (alertas instantáneas si cruza el perímetro seguro).",
    x: "40%",
    y: "35%",
    lineDirection: "top-left"
  },
  {
    id: "actividad",
    startFrame: 60,
    title: "Sensor de Actividad y Movimiento (Acelerómetro)",
    description: "Registra los pasos, horas de sueño, calorías quemadas y niveles de juego diarios de la mascota para evaluar su estado físico y bienestar general.",
    x: "60%",
    y: "30%",
    lineDirection: "top-right"
  },
  {
    id: "antena",
    startFrame: 20,
    title: "Antena de Conectividad Inteligente",
    description: "Módulo de bajo consumo de energía que sincroniza constantemente los datos recolectados por el collar directamente con la nube de PetWard y la aplicación móvil.",
    x: "65%",
    y: "60%",
    lineDirection: "bottom-right"
  }
];

function HotspotItem({ data, currentFrame }: { data: Hotspot; currentFrame: number }) {
  const isVisible = currentFrame >= data.startFrame;
  const [isHovered, setIsHovered] = useState(false);

  let lineX = 0, lineY = 0;
  const lineLength = 80;
  if (data.lineDirection === "top-left") { lineX = -lineLength; lineY = -lineLength; }
  if (data.lineDirection === "top-right") { lineX = lineLength; lineY = -lineLength; }
  if (data.lineDirection === "bottom-left") { lineX = -lineLength; lineY = lineLength; }
  if (data.lineDirection === "bottom-right") { lineX = lineLength; lineY = lineLength; }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            left: data.x,
            top: data.y,
            zIndex: 40,
            pointerEvents: "none"
          }}
        >
          {/* Connector Line */}
          <svg
            style={{
              position: "absolute",
              left: lineX < 0 ? lineX : 0,
              top: lineY < 0 ? lineY : 0,
              width: Math.abs(lineX) + 2,
              height: Math.abs(lineY) + 2,
              overflow: "visible",
              pointerEvents: "none"
            }}
          >
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              x1={lineX < 0 ? Math.abs(lineX) : 0}
              y1={lineY < 0 ? Math.abs(lineY) : 0}
              x2={lineX < 0 ? 0 : lineX}
              y2={lineY < 0 ? 0 : lineY}
              stroke="#a4d65e"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>

          {/* Central Pulsing Dot */}
          <div
            className="absolute flex items-center justify-center cursor-pointer pointer-events-auto"
            style={{
              left: 0,
              top: 0,
              transform: "translate(-50%, -50%)",
              width: "24px",
              height: "24px",
              zIndex: 10
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
          >
            <span className="absolute inline-flex w-full h-full rounded-full opacity-60 bg-[#a4d65e] animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 rounded-full bg-[#a4d65e] shadow-[0_0_10px_#a4d65e]"></span>
          </div>

          {/* Title and Tooltip Container */}
          <div
            className="absolute flex flex-col pointer-events-auto z-20"
            style={{
              left: lineX,
              top: lineY,
              transform: `translate(${lineX < 0 ? "-100%" : "0%"}, ${lineY < 0 ? "-100%" : "0%"})`,
              alignItems: lineX < 0 ? "flex-end" : "flex-start",
              gap: "8px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
          >
            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#a4d65e]/30 shadow-[0_0_15px_rgba(164,214,94,0.15)] cursor-pointer hover:bg-black/60 transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a4d65e]"></span>
              <span className="text-[#a4d65e] text-xs md:text-sm font-bold tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {data.title}
              </span>
            </motion.div>

            {/* Description Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: lineY < 0 ? 10 : -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: lineY < 0 ? 10 : -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-max max-w-[280px] p-4 rounded-xl bg-[#040d02]/80 backdrop-blur-xl border border-[#a4d65e]/20 shadow-2xl"
                  style={{
                    transformOrigin: lineX < 0 ? "bottom right" : "top left",
                  }}
                >
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed m-0" style={{ fontFamily: "Inter, sans-serif" }}>
                    {data.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/frames/img_${padded}.png`;
}

export default function CollarScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [activeFrame, setActiveFrame] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentFrameRef = useRef(1);
  const rafRef = useRef<number>(0);
  const particleRafRef = useRef<number>(0);

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
  }

  /* ── Constellation Particles animation ── */
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 50;
    const CONNECTION_DIST = 120;

    let particles: Particle[] = [];
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * (window.devicePixelRatio > 1 ? 2 : 1);
      canvas.height = H * (window.devicePixelRatio > 1 ? 2 : 1);
      ctx.scale(window.devicePixelRatio > 1 ? 2 : 1, window.devicePixelRatio > 1 ? 2 : 1);
    };

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(164, 214, 94, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(164, 214, 94, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particleRafRef.current = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(particleRafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Precargar todos los frames al montar
  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      const onDone = () => {
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };

      img.onload = onDone;
      img.onerror = onDone;
      images[i] = img;
    }

    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, []);

  // Dibujar primer frame cuando se carguen
  useEffect(() => {
    if (loaded) {
      drawFrame(1);
      setActiveFrame(1);
    }
  }, [loaded, drawFrame]);

  // Scroll handler con requestAnimationFrame
  useEffect(() => {
    if (!loaded) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = section.offsetHeight;
          const viewportHeight = window.innerHeight;

          const scrollableDistance = sectionHeight - viewportHeight;
          const scrolled = -sectionTop;
          const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
          setScrollProgress(progress);

          const frameIndex = Math.max(
            1,
            Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            setActiveFrame(frameIndex);
            drawFrame(frameIndex);
          }

          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  return (
    <section
      ref={sectionRef}
      id="collar-scroll"
      style={{
        height: "600vh",
        position: "relative",
      }}
    >
      {/* ── Layered background ── */}
      {/* Base: dark PetGuard green-black gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #040d02 0%, #0a1a06 25%, #0d2410 50%, #081a0a 75%, #030a02 100%)",
        }}
      />

      {/* Radial brand glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(164,214,94,0.06) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(67,105,0,0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 35% 35% at 80% 20%, rgba(253,224,25,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(164,214,94,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(164,214,94,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Gradient transition: Hero → Collar (top) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(80px, 15vh, 200px)",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(4,13,2,0.9) 40%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Gradient transition: Collar → Features (bottom) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "clamp(120px, 20vh, 280px)",
          background: "linear-gradient(to bottom, transparent 0%, rgba(4,13,2,0.8) 30%, rgba(30,40,20,0.9) 60%, #f8f9fa 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated ambient glow that follows scroll */}
        <div
          style={{
            position: "absolute",
            width: "clamp(300px, 50vw, 600px)",
            height: "clamp(300px, 50vw, 600px)",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(164,214,94,${0.04 + scrollProgress * 0.06}) 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.3})`,
            transition: "transform 0.3s ease-out",
            pointerEvents: "none",
          }}
        />

        {/* ── Constellation Particles (canvas) ── */}
        <canvas
          ref={particlesRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />

        {/* ── Removed Dark GPS Map Background for cleaner abstract look ── */}

        {/* Loading */}
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "192px",
                height: "4px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, #a4d65e, #ffe329)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Cargando {loadProgress}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            position: "relative",
            zIndex: 2,
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 3,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(4,13,2,0.5) 80%, rgba(4,13,2,0.85) 100%)",
          }}
        />

        {/* ── Component Hotspots ── */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {hotspotsData.map((hotspot) => (
            <HotspotItem key={hotspot.id} data={hotspot} currentFrame={activeFrame} />
          ))}
        </div>

        {/* ── Top center: section title ── */}
        <div
          style={{
            position: "absolute",
            top: "clamp(20px, 3vh, 40px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(164,214,94,0.08)",
              border: "1px solid rgba(164,214,94,0.15)",
              borderRadius: "999px",
              padding: "6px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#a4d65e",
                boxShadow: "0 0 8px #a4d65e",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              PetGuard Hardware — Deconstrucción
            </span>
          </div>
        </div>

        {/* ── Scroll progress bar (vertical) ── */}
        <div
          style={{
            position: "absolute",
            right: "clamp(20px, 3vw, 40px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "120px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "9999px",
                background: "linear-gradient(to bottom, #a4d65e, #ffe329)",
                height: `${scrollProgress * 100}%`,
                transition: "height 0.15s ease-out",
              }}
            />
          </div>
          {/* Dot indicators for each section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
            {hotspotsData.map((_, i) => {
              const isActive = activeFrame >= hotspotsData[i].startFrame;
              return (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: isActive ? "#a4d65e" : "rgba(255,255,255,0.15)",
                    boxShadow: isActive ? "0 0 6px #a4d65e" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        {loaded && currentFrameRef.current <= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              bottom: "clamp(20px, 4vh, 48px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Scroll para explorar
            </span>
            <motion.svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              style={{ opacity: 0.3 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeWidth="1.5" />
              <motion.circle
                cx="8"
                r="2"
                fill="white"
                animate={{ cy: [8, 14, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}
