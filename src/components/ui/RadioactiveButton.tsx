"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface RadioactiveParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  color: string;
}

const COLORS = {
  lime: "#A4E637",
  yellow: "#FEEB1A",
  dark: "#1a1a1a",
  glow: "rgba(164, 230, 55, 0.9)",
  borderGlow: "#D4FF00",
};

export default function RadioactiveButton({
  children,
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<RadioactiveParticle[]>([]);
  const rafRef = useRef<number>(0);
  const isHoveredRef = useRef(false);

  // Keep ref in sync for the animation loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const createParticle = useCallback(
    (): RadioactiveParticle => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 5 + 2,
      opacity: 1,
      life: 1.0,
      color: Math.random() > 0.5 ? COLORS.lime : COLORS.yellow,
    }),
    []
  );

  const updateParticles = useCallback(() => {
    setParticles((prev) => {
      if (isHoveredRef.current) {
        const newParticles = [...prev, createParticle()].slice(-40);
        return newParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.02,
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0);
      } else if (prev.length > 0) {
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.05,
            life: p.life - 0.05,
          }))
          .filter((p) => p.life > 0);
      }
      return prev;
    });
    rafRef.current = requestAnimationFrame(updateParticles);
  }, [createParticle]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateParticles]);

  const sharedClassName = `
    relative z-10 flex items-center gap-3 
    rounded-full font-bold transition-all duration-500
    ${isHovered ? "radioactive-glow" : "shadow-lg"}
    ${className}
  `;

  const sharedStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${COLORS.lime}, ${COLORS.yellow}, ${COLORS.lime})`,
    backgroundSize: "200% 100%",
    animation: "flowRight 2s linear infinite",
    color: COLORS.dark,
    border: "none",
    cursor: "pointer",
  };

  const innerContent = (
    <>
      {/* Particles layer */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute rounded-full z-[5]"
          style={{
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 8px ${p.color}`,
            transform: `scale(${p.life})`,
            filter: "blur(1px)",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Neon glow border (outer / soft) */}
      <div
        className={`absolute -inset-[5px] rounded-full transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, #FFFFFF, ${COLORS.borderGlow}, ${COLORS.lime}, #FFFFFF)`,
          backgroundSize: "200% 100%",
          animation: "flowRight 0.6s linear infinite",
          filter: "blur(8px)",
          zIndex: 1,
        }}
      />

      {/* Neon glow border (inner / sharp) */}
      <div
        className={`absolute -inset-[2.5px] rounded-full transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(90deg, #FFFFFF, ${COLORS.borderGlow}, ${COLORS.lime}, #FFFFFF)`,
          backgroundSize: "200% 100%",
          animation: "flowRight 0.6s linear infinite",
          zIndex: 2,
        }}
      />

      {/* Button label */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const wrapperClassName = `relative group transition-transform duration-500 ${
    isHovered ? "scale-110" : ""
  }`;

  if (href) {
    return (
      <div
        className={wrapperClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={href}
          onClick={onClick}
          className={sharedClassName}
          style={sharedStyle}
        >
          {innerContent}
        </a>
      </div>
    );
  }

  return (
    <div
      className={wrapperClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button onClick={onClick} className={sharedClassName} style={sharedStyle}>
        {innerContent}
      </button>
    </div>
  );
}
