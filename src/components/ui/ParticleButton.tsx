"use client";
import { useState } from "react";

export default function ParticleButton({
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

  const sharedClassName = `relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] ${className}`;

  const sharedStyle = {
    background: "linear-gradient(135deg, #a4d65e 0%, #fde019 100%)",
    color: "#112000",
    boxShadow: isHovered
      ? "0 0 32px rgba(164,214,94,0.55), 0 0 64px rgba(253,224,25,0.25), 0 8px 24px rgba(67,105,0,0.2)"
      : "0 4px 16px rgba(164,214,94,0.3)",
  };

  const innerContent = (
    <>
      {/* Shimmer sweep on hover */}
      {isHovered && (
        <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  // Render as <a> if href is provided, otherwise <button>
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={sharedClassName}
        style={sharedStyle}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={sharedClassName}
      style={sharedStyle}
    >
      {innerContent}
    </button>
  );
}
