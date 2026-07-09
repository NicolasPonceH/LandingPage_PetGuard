"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Heart, Bell } from "lucide-react";
import SectionWrapper, { SectionHeader, fadeInUp } from "./SectionWrapper";

const SCREENS = ["Inicio", "GPS", "Salud", "Alertas"] as const;
type ScreenName = (typeof SCREENS)[number];

const TAB_ICONS: Record<ScreenName, typeof Home> = {
  Inicio: Home,
  GPS: MapPin,
  Salud: Heart,
  Alertas: Bell,
};

const PHONE_W = 200;
const PHONE_H = 420;
const INNER_RADIUS = 28;
const NOTCH_H = 24;
const TABBAR_H = 44;
const SCREEN_H = PHONE_H - NOTCH_H - TABBAR_H;

/* ─── Sub-components ─── */

function Notch() {
  return (
    <div
      style={{
        background: "#111",
        height: NOTCH_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <span style={{ position: "absolute", left: 12, fontSize: 9, color: "#fff", fontWeight: 500 }}>9:41</span>
      <div style={{ background: "#000", width: 64, height: 13, borderRadius: 99 }} />
      <span style={{ position: "absolute", right: 12, fontSize: 8, color: "#fff" }}>▲ ▮▮▮</span>
    </div>
  );
}

function TabBar({ active }: { active: ScreenName }) {
  return (
    <div
      style={{
        height: TABBAR_H,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTop: "0.5px solid #e5e7eb",
        background: "#fff",
        flexShrink: 0,
      }}
    >
      {SCREENS.map((s) => {
        const Icon = TAB_ICONS[s];
        return (
          <div
            key={s}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              fontSize: 8,
              color: active === s ? "#2e6b0a" : "#bbb",
            }}
          >
            <Icon size={16} />
            {s}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Screen: Inicio ─── */

function ScreenInicio({ visible }: { visible: boolean }) {
  const bars = [40, 55, 30, 70, 60, 80, 50, 65, 75, 45, 85, 60, 70, 55, 90];
  return (
    <div style={{ height: SCREEN_H, padding: "12px 11px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ fontSize: 10, color: "#999", marginBottom: 1, opacity: visible ? 1 : 0, transition: "opacity .4s .1s" }}>Bienvenido</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 8, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)", transition: "opacity .4s .15s, transform .4s .15s" }}>Hola, Karen</div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, background: "#eaf3de", borderRadius: 8, padding: "6px 8px", marginBottom: 10, opacity: visible ? 1 : 0, transition: "opacity .4s .2s" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4d9e1a", flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 9, color: "#27500a", fontWeight: 500 }}>Todo en orden</div>
          <div style={{ fontSize: 8, color: "#639922", marginTop: 1 }}>Max está seguro, signos normales</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10, flex: "0 0 auto" }}>
        {[
          { val: "92", lbl: "BPM", color: "#e24b4a" },
          { val: "38.5°", lbl: "Temp", color: "#ef9f27" },
          { val: "98%", lbl: "SpO2", color: "#378add" },
          { val: "2.4K", lbl: "Pasos", color: "#639922" },
        ].map(({ val, lbl, color }, i) => (
          <div
            key={lbl}
            style={{
              background: "#f8f8f8",
              borderRadius: 9,
              padding: "7px 8px",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(.92)",
              transition: `opacity .35s ${0.25 + i * 0.07}s, transform .35s ${0.25 + i * 0.07}s`,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{val}</div>
            <div style={{ fontSize: 7, color: "#bbb", textTransform: "uppercase", letterSpacing: 0.3 }}>{lbl}</div>
            <div style={{ width: 12, height: 3, borderRadius: 2, background: color, marginTop: 3 }} />
          </div>
        ))}
      </div>
      <div style={{ fontSize: 8, fontWeight: 600, color: "#bbb", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>Actividad hoy</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, flex: 1, minHeight: 0 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: visible ? `${h}%` : "0%",
              background: i === 14 ? "#4d9e1a" : "#c0dd97",
              borderRadius: "2px 2px 0 0",
              transition: `height .55s ${0.3 + i * 0.025}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Screen: GPS ─── */

function ScreenGPS({ visible }: { visible: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!visible) return;
    const animate = () => {
      angleRef.current += 0.012;
      const cx = 50 + Math.cos(angleRef.current) * 20;
      const cy = 50 + Math.sin(angleRef.current) * 14;
      if (dotRef.current) {
        dotRef.current.style.left = `${cx}%`;
        dotRef.current.style.top = `${cy}%`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  return (
    <div style={{ height: SCREEN_H, padding: "12px 11px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: "#111", marginBottom: 8, opacity: visible ? 1 : 0, transition: "opacity .4s .1s" }}>GPS</div>
      <div style={{ background: "#f0f4ee", borderRadius: 10, flex: 1, position: "relative", overflow: "hidden", marginBottom: 10 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pgrid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(46,107,10,.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pgrid)" />
        </svg>
        {[80, 54, 30].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              border: "1px solid rgba(46,107,10,.14)",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              animation: `mockup-ripple ${2.4 + i * 0.6}s ease-out infinite`,
              animationDelay: `${i * 0.55}s`,
              opacity: visible ? 1 : 0,
              transition: `opacity .5s ${0.3 + i * 0.1}s`,
            }}
          />
        ))}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            width: 11,
            height: 11,
            background: "#2e6b0a",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            border: "2px solid #fff",
            boxShadow: "0 0 0 3px rgba(46,107,10,.18)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: visible ? 1 : 0, transition: "opacity .4s .4s" }}>
        <div>
          <div style={{ fontSize: 8, color: "#aaa" }}>Ubicación actual</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#111" }}>Parque Central #42</div>
        </div>
        <div style={{ background: "#eaf3de", borderRadius: 99, padding: "3px 7px", fontSize: 8, color: "#27500a", fontWeight: 600 }}>Zona segura</div>
      </div>
    </div>
  );
}

/* ─── ECG Canvas ─── */

function EcgCanvas({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);

  const ecgShape = (x: number) => {
    const cycle = x % 60;
    if (cycle < 20) return 0;
    if (cycle < 24) return -(cycle - 20) * 2.5;
    if (cycle < 26) return (cycle - 24) * 12;
    if (cycle < 28) return 24 - (cycle - 26) * 16;
    if (cycle < 30) return -8 + (cycle - 28) * 8;
    if (cycle < 34) return (cycle - 30) * 1.5;
    if (cycle < 38) return 6 - (cycle - 34) * 1.5;
    return 0;
  };

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const mid = H / 2;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = "#4d9e1a";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      for (let px = 0; px <= W; px++) {
        const y = mid - ecgShape((px + offsetRef.current) * 0.6);
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.stroke();
      offsetRef.current += 1.2;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  return <canvas ref={canvasRef} width={156} height={34} style={{ width: "100%", height: 34, display: "block" }} />;
}

/* ─── Screen: Salud ─── */

function ScreenSalud({ visible }: { visible: boolean }) {
  const metrics = [
    { name: "Frec. Cardíaca", val: "92 BPM", pct: 62, color: "#e24b4a" },
    { name: "Temperatura", val: "38.5°C", pct: 75, color: "#ef9f27" },
    { name: "Oxígeno", val: "98%", pct: 98, color: "#378add" },
  ];
  return (
    <div style={{ height: SCREEN_H, padding: "12px 11px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#111", opacity: visible ? 1 : 0, transition: "opacity .4s .1s" }}>Salud de Max</div>
        <div style={{ background: "#eaf3de", borderRadius: 99, padding: "2px 7px", fontSize: 8, color: "#27500a", fontWeight: 600, opacity: visible ? 1 : 0, transition: "opacity .4s .15s" }}>Estable</div>
      </div>
      <div style={{ background: "#f8f8f8", borderRadius: 9, padding: "7px 9px", marginBottom: 8, opacity: visible ? 1 : 0, transition: "opacity .4s .2s" }}>
        <div style={{ fontSize: 8, color: "#aaa", marginBottom: 3 }}>ECG en vivo</div>
        <EcgCanvas visible={visible} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {metrics.map(({ name, val, pct, color }, i) => (
          <div
            key={name}
            style={{
              background: "#f8f8f8",
              borderRadius: 9,
              padding: "7px 9px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity .4s ${0.35 + i * 0.1}s, transform .4s ${0.35 + i * 0.1}s`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 9, color: "#666" }}>{name}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color }}>{val}</span>
            </div>
            <div style={{ height: 4, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: visible ? `${pct}%` : "0%",
                  background: color,
                  borderRadius: 99,
                  transition: `width .8s ${0.5 + i * 0.15}s ease-out`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Screen: Alertas ─── */

function ScreenAlertas({ visible }: { visible: boolean }) {
  const items = [
    { title: "Zona segura", desc: "Max salió de la zona establecida", time: "Hace 2 min", bg: "#eaf3de", titleColor: "#27500a", descColor: "#3b6d11", timeColor: "#639922" },
    { title: "Ritmo cardíaco", desc: "BPM volvió a niveles normales", time: "Hace 15 min", bg: "#eaf3de", titleColor: "#27500a", descColor: "#3b6d11", timeColor: "#639922" },
    { title: "Paseo completado", desc: "Max caminó 2.4 km hoy", time: "Hace 1 hora", bg: "#f8f8f8", titleColor: "#111", descColor: "#888", timeColor: "#bbb" },
    { title: "Vacuna pendiente", desc: "Recordatorio: vacuna antirrábica", time: "Mañana", bg: "#faeeda", titleColor: "#633806", descColor: "#854f0b", timeColor: "#854f0b" },
  ];
  return (
    <div style={{ height: SCREEN_H, padding: "12px 11px 10px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#111", opacity: visible ? 1 : 0, transition: "opacity .4s .1s" }}>Notificaciones</div>
        <div style={{ background: "#eaf3de", borderRadius: 99, padding: "2px 7px", fontSize: 8, color: "#27500a", fontWeight: 600, opacity: visible ? 1 : 0, transition: "opacity .4s .15s" }}>3 nuevas</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {items.map(({ title, desc, time, bg, titleColor, descColor, timeColor }, i) => (
          <div
            key={i}
            style={{
              background: bg,
              borderRadius: 9,
              padding: "7px 9px",
              flex: 1,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(12px)",
              transition: `opacity .4s ${0.15 + i * 0.09}s, transform .4s ${0.15 + i * 0.09}s`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: titleColor }}>{title}</div>
              <div style={{ fontSize: 7, color: timeColor }}>{time}</div>
            </div>
            <div style={{ fontSize: 8, color: descColor }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Phone wrapper ─── */

function Phone({ screen, index }: { screen: ScreenName; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ${index * 0.12}s, transform .6s ${index * 0.12}s`,
      }}
    >
      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          background: "#111",
          borderRadius: 36,
          padding: 9,
          border: "2px solid #2a2a2a",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            borderRadius: INNER_RADIUS,
            overflow: "hidden",
            background: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Notch />
          {screen === "Inicio" && <ScreenInicio visible={visible} />}
          {screen === "GPS" && <ScreenGPS visible={visible} />}
          {screen === "Salud" && <ScreenSalud visible={visible} />}
          {screen === "Alertas" && <ScreenAlertas visible={visible} />}
          <TabBar active={screen} />
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: "#999", fontWeight: 500 }}>{screen}</div>
    </div>
  );
}

/* ─── Main section ─── */

export default function MobileApp() {
  return (
    <SectionWrapper id="app" className="section-padding relative">
      {/* Background blur */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-600/5 rounded-full blur-[150px]" />

      <div className="container-custom mx-auto relative z-10">
        <SectionHeader
          badge="App Móvil"
          title="Todo en la palma de tu mano"
          subtitle="Una aplicación intuitiva y potente para cuidar a tu mascota desde cualquier lugar."
        />

        {/* Phone mockups */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center items-start gap-6 flex-wrap mb-6 md:mb-8"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
        >
          {SCREENS.map((s, i) => (
            <Phone key={s} screen={s} index={i} />
          ))}
        </motion.div>

        {/* Download badges */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="glass-card-hover px-6 py-3 flex items-center gap-3 group"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-900" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <div>
              <p className="text-[9px] text-gray-500 uppercase">Descargar en</p>
              <p className="text-sm font-semibold text-gray-900">App Store</p>
            </div>
          </a>
          <a
            href="#"
            className="glass-card-hover px-6 py-3 flex items-center gap-3 group"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-900" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.627L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
            </svg>
            <div>
              <p className="text-[9px] text-gray-500 uppercase">Disponible en</p>
              <p className="text-sm font-semibold text-gray-900">Google Play</p>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes mockup-ripple {
          0% { transform: translate(-50%,-50%) scale(1); opacity: .5; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
      `}</style>
    </SectionWrapper>
  );
}
