"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import SectionWrapper, { fadeInUp } from "./SectionWrapper";
import RadioactiveButton from "@/components/ui/RadioactiveButton";

export default function FinalCTA() {
  return (
    <SectionWrapper className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(164,214,94,0.15),transparent_70%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Floating orbs */}
      <motion.div className="absolute top-10 left-10 w-32 h-32 bg-brand-500/20 rounded-full blur-[60px]" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-[80px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="container-custom mx-auto relative z-10 text-center">
        <motion.div variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4" />
            Comienza hoy
          </span>
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
          Tu mascota merece<br />protección inteligente
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10">
          Únete a miles de familias que ya confían en PetGuard para cuidar lo que más quieren.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RadioactiveButton href="#" className="px-8 py-4 text-base">
            <Download className="w-5 h-5" />
            Descargar App
          </RadioactiveButton>
          <a href="#contacto" className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Solicitar Demo
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
