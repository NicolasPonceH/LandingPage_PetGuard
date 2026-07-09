"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Monitor,
  FileHeart,
  Bell,
  BarChart3,
  Shield,
} from "lucide-react";
import SectionWrapper, {
  SectionHeader,
  fadeInUp,
} from "./SectionWrapper";

const vetFeatures = [
  {
    icon: Monitor,
    title: "Acceso remoto",
    description:
      "Monitorea pacientes desde cualquier lugar con datos en tiempo real y alertas instantáneas.",
  },
  {
    icon: FileHeart,
    title: "Historial clínico digital",
    description:
      "Expedientes completos con vacunas, tratamientos, alergias y evolución del paciente.",
  },
  {
    icon: Bell,
    title: "Alertas médicas",
    description:
      "Recibe notificaciones cuando un paciente presenta anomalías en sus signos vitales.",
  },
  {
    icon: BarChart3,
    title: "Datos biométricos",
    description:
      "Accede a ECG, temperatura, SpO2 y frecuencia cardíaca con gráficas históricas.",
  },
  {
    icon: Stethoscope,
    title: "Seguimiento remoto",
    description:
      "Acompaña la recuperación postoperatoria de tus pacientes sin necesidad de visitas presenciales.",
  },
  {
    icon: Shield,
    title: "Datos encriptados",
    description:
      "Toda la información clínica cumple con estándares de seguridad y privacidad médica.",
  },
];

export default function Veterinary() {
  return (
    <SectionWrapper id="veterinarios" className="section-padding relative">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-[120px]" />

      <div className="container-custom mx-auto relative z-10">
        <div className="premium-section-container p-6 md:p-10">
        <SectionHeader
          badge="✦ Para Veterinarios"
          title="Plataforma profesional veterinaria"
          subtitle="Herramientas avanzadas para que los profesionales veterinarios brinden mejor atención a sus pacientes."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Dashboard mockup */}
          <motion.div variants={fadeInUp}>
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-gray-500 ml-2">PetGuard — Panel Veterinario</span>
              </div>

              {/* Dashboard content */}
              <div className="p-4 md:p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Dr. García — Clínica VetPro</p>
                    <p className="text-[11px] text-gray-500">12 pacientes activos</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">En línea</span>
                  </div>
                </div>

                {/* Patient list */}
                <div className="space-y-2">
                  {[
                    { name: "Max", breed: "Golden Retriever", status: "Estable", statusColor: "text-green-400", bpm: "92", emoji: "🐕" },
                    { name: "Luna", breed: "Bulldog Francés", status: "Monitoreo", statusColor: "text-amber-400", bpm: "108", emoji: "🐕‍🦺" },
                    { name: "Rocky", breed: "Pastor Alemán", status: "Postoperatorio", statusColor: "text-blue-400", bpm: "85", emoji: "🐕" },
                  ].map((patient) => (
                    <div
                      key={patient.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{patient.emoji}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                          <p className="text-[10px] text-gray-500">{patient.breed}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${patient.statusColor}`}>
                          {patient.status}
                        </p>
                        <p className="text-[10px] text-gray-500">{patient.bpm} BPM</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-2">Tendencia BPM — Max (7 días)</p>
                  <svg viewBox="0 0 300 60" className="w-full h-12">
                    <defs>
                      <linearGradient id="vet-chart" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(164, 214, 94, 0.3)" />
                        <stop offset="100%" stopColor="rgba(164, 214, 94, 0)" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 40 L50 35 L100 42 L150 30 L200 38 L250 32 L300 36"
                      fill="none"
                      stroke="#436900"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />
                    <path
                      d="M0 40 L50 35 L100 42 L150 30 L200 38 L250 32 L300 36 L300 60 L0 60Z"
                      fill="url(#vet-chart)"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-4">
            {vetFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-[#f3ffe8]/80 border border-[#a4d65e]/20 rounded-2xl shadow-sm hover:shadow-[0_4px_20px_rgba(164,214,94,0.15)] hover:border-[#a4d65e]/40 transition-all duration-300 p-5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
