"use client";

import { motion } from "framer-motion";

export default function PetGuardLogo({
  size = 40,
  variant = "dark",
}: {
  size?: number;
  variant?: "light" | "dark";
}) {
  const isLight = variant === "light";

  return (
    <motion.div
      className="relative flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Logo icon — squircle with gradient matching the official logo */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          boxShadow: "0 2px 12px rgba(164, 214, 94, 0.3)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Squircle background with yellow-to-green gradient */}
          <defs>
            <linearGradient
              id="logo-bg-grad"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f5d623" />
              <stop offset="35%" stopColor="#b8e036" />
              <stop offset="65%" stopColor="#8bc34a" />
              <stop offset="100%" stopColor="#66bb3c" />
            </linearGradient>
            <linearGradient
              id="ecg-line-grad"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#7cb342" />
              <stop offset="100%" stopColor="#9ccc65" />
            </linearGradient>
          </defs>

          {/* Background fill */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="22"
            ry="22"
            fill="url(#logo-bg-grad)"
          />

          {/* ── Paw pads (white) ── */}
          {/* Top-left toe */}
          <ellipse cx="33" cy="22" rx="9" ry="11" fill="white" opacity="0.95" />
          {/* Top-right toe */}
          <ellipse cx="60" cy="18" rx="8.5" ry="10.5" fill="white" opacity="0.95" />
          {/* Far-right toe (smaller) */}
          <ellipse cx="80" cy="35" rx="7" ry="9" fill="white" opacity="0.95" />
          {/* Far-left toe */}
          <ellipse cx="16" cy="40" rx="7.5" ry="9.5" fill="white" opacity="0.95" />

          {/* Main pad — large blob shape */}
          <path
            d="M50 42 C33 42, 18 54, 18 67 C18 80, 30 90, 50 90 C70 90, 82 80, 82 67 C82 54, 67 42, 50 42 Z"
            fill="white"
            opacity="0.95"
          />

          {/* ── ECG heartbeat line with GPS pin ── */}
          <motion.path
            d="M22 68 L34 68 L38 58 L44 78 L49 63 L53 68 L62 68"
            stroke="url(#ecg-line-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* GPS location pin at the end of the ECG line */}
          <circle
            cx="70"
            cy="68"
            r="7"
            stroke="url(#ecg-line-grad)"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="70" cy="68" r="2.5" fill="url(#ecg-line-grad)" />
          {/* Connector line from ECG to pin */}
          <line
            x1="62"
            y1="68"
            x2="63"
            y2="68"
            stroke="url(#ecg-line-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Logo text */}
      <div className="flex flex-col">
        <span
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            isLight ? "text-white" : "text-gray-900"
          }`}
        >
          Pet
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: isLight
                ? "linear-gradient(135deg, #bef264, #a3e635)"
                : "linear-gradient(135deg, #7cb342, #a4d65e)",
            }}
          >
            Guard
          </span>
        </span>
      </div>
    </motion.div>
  );
}
