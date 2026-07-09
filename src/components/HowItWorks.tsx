"use client";

import { motion } from "framer-motion";
import { Watch, BarChart3, Smartphone } from "lucide-react";
import SectionWrapper, {
  SectionHeader,
  fadeInUp,
} from "./SectionWrapper";

const steps = [
  {
    number: "01",
    icon: Watch,
    title: "Collar inteligente",
    description:
      "Coloca el collar PetGuard en tu mascota. Sensores biométricos y GPS comienzan a recopilar datos automáticamente.",
    color: "from-brand-500 to-brand-400",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Datos en tiempo real",
    description:
      "Los datos se envían a la nube cada 10 segundos. Nuestra IA analiza patrones y detecta anomalías instantáneamente.",
    color: "from-brand-400 to-yellow-400",
  },
  {
    number: "03",
    icon: Smartphone,
    title: "Monitoreo desde la app",
    description:
      "Visualiza todo desde tu celular: ubicación, salud, alertas y comparte datos con tu veterinario de confianza.",
    color: "from-yellow-400 to-amber-400",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper className="section-padding relative">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-[120px]" />

      <div className="container-custom mx-auto relative z-10">
        <div className="premium-section-container p-6 md:p-10">
        <SectionHeader
          badge="✦ ¿Cómo funciona?"
          title="Simple, inteligente, seguro"
          subtitle="Tres pasos para una protección completa. Sin complicaciones, sin configuraciones técnicas."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-brand-400/50 to-yellow-400/50 hidden sm:block md:-translate-x-px" />

          <div className="space-y-8 md:space-y-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className={`relative flex items-center gap-8 md:gap-16 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col sm:flex-row`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      className="glass-card-hover p-6 md:p-8"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-4xl font-black text-brand-500/20 mb-2 block">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <div className="relative flex-shrink-0 hidden sm:block">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg z-10 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    {/* Pulse */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-30 animate-ping`} />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
