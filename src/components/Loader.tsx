"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        {/* Animated logo */}
        <motion.div
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-brand-500"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-brand-500"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
          />

          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <ellipse cx="12" cy="10" rx="4" ry="4.5" fill="white" opacity="0.9" />
            <ellipse cx="28" cy="10" rx="4" ry="4.5" fill="white" opacity="0.9" />
            <ellipse cx="7" cy="20" rx="3.5" ry="4" fill="white" opacity="0.9" />
            <ellipse cx="33" cy="20" rx="3.5" ry="4" fill="white" opacity="0.9" />
            <path
              d="M20 18c-5 0-10 4-10 9 0 5 4 8 10 8s10-3 10-8c0-5-5-9-10-9z"
              fill="white"
              opacity="0.9"
            />
            <motion.path
              d="M12 27 L16 27 L18 22 L20 32 L22 24 L24 27 L28 27"
              stroke="rgba(67, 105, 0, 1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-2xl font-bold tracking-tight">
            Pet<span className="text-brand-400">Guard</span>
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-brand-500"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
