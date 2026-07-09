"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  HeartPulse,
  Bell,
  FileText,
  Shield,
  Stethoscope,
} from "lucide-react";
import SectionWrapper, {
  SectionHeader,
  fadeInUp,
} from "./SectionWrapper";

const features = [
  {
    icon: MapPin,
    title: "GPS en tiempo real",
    description:
      "Rastrea la ubicación exacta de tu mascota con precisión centimétrica y actualizaciones cada 10 segundos.",
    color: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeHUFU9n95wZ7VUr1lvCxaVivb5VqiovsNOP3xMqt9CKQnzsg2VfcBKM_ljGtDh-FwQRORYq_Goyt2NNGZKvE5DBTzFtfQZCcsf1W1cyPehfwKz44dSfcxsOs5TT-ULepGkZCrwhB-AgmtiVTR3AVOy5AXgzZQb96buXEuuvujNMSbl-GXz7rrEDfR7RwQWFHZIq_596hdIaYpNSjmFSZzUnu2bNUC4SXZN86TJ_oZXLAoJcwom_Hj6lWPY7hivlCY_CvKiTko4GGN",
  },
  {
    icon: HeartPulse,
    title: "Signos vitales 24/7",
    description:
      "Monitoreo continuo de frecuencia cardíaca, temperatura corporal y saturación de oxígeno.",
    color: "from-red-500 to-pink-500",
    glowColor: "shadow-red-500/20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFZJ6nw2fA8auRb-ApD3NjVrMQBMuZsTU4FRBhOonTdBXjIvHaALI38sIkDymPyjtI2bcUIaOw8R-xKoCF8eKcODR31JEYElgxLG0PdagEReoM32inNj50d_nrCKAcxf_MgOdtUXeQQddEoUJJAnZnSYP9VaDBVW2-PQbbxeyqwfKj6hQDZrDM-AmznMKByCHq0xlhnMIm1EYhdiKdywrhZYvVyfHFse4m5B_AFUkY_mGdSKccE-LsNcEll5H7NuTo_yfyeUhbcHqJ",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description:
      "Notificaciones instantáneas por anomalías, geofencing o cambios bruscos en signos vitales.",
    color: "from-amber-500 to-orange-500",
    glowColor: "shadow-amber-500/20",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq6hl9ayoKvAR7MgtBewn6F9MGvOsk52wm8OCBmfZQhl848uu5HN5ApbX9jEIpOgAolG8Hp2fwoTyY5Cexsd48CK6l7DEVe7FFsSGGurYrVIbfcuPYGQ9bs4izTuMxe_Xl8lc_52IttAdn74gQ5ZvxilBVbRz5RJxdSQJBVhZgdwqyTT7yPPJVs3IqzIWkEYiV2C2uTwTbtaPwUYFRKaaf9UZwsXh9J3Ar4DxYDCkY39oAnTpad471w9UAIyQnCqwcH4qqrxlHQckT",
  },
  {
    icon: FileText,
    title: "Historial clínico",
    description:
      "Registro digital completo de vacunas, tratamientos, alergias y visitas al veterinario.",
    color: "from-green-500 to-emerald-500",
    glowColor: "shadow-green-500/20",
  },
  {
    icon: Shield,
    title: "Geofencing",
    description:
      "Define zonas seguras personalizadas y recibe alertas si tu mascota sale del perímetro.",
    color: "from-brand-500 to-brand-400",
    glowColor: "shadow-brand-500/20",
  },
  {
    icon: Stethoscope,
    title: "Panel veterinario",
    description:
      "Acceso profesional para veterinarios con datos biométricos, historiales y alertas médicas.",
    color: "from-yellow-400 to-amber-400",
    glowColor: "shadow-yellow-400/20",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className="group glass-card-hover relative overflow-hidden flex flex-col h-full"
    >
      {/* Feature image area */}
      {feature.image && (
        <div className="relative h-48 overflow-hidden rounded-t-[15px]">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60`} />
        </div>
      )}

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Glow effect on hover */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-[0.04] rounded-2xl blur-xl transition-opacity duration-700`}
        />

        {/* Icon */}
        <div
          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg ${feature.glowColor}`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-brand-500 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <SectionWrapper id="funciones" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px]" />

      <div className="container-custom mx-auto relative z-10">
        <div className="premium-section-container p-6 md:p-10">
        <SectionHeader
          badge="✦ Funciones"
          title="Tecnología que protege"
          subtitle="Cada función está diseñada para darte tranquilidad total sobre la salud y seguridad de tu mascota."
        />

        <motion.div
          variants={fadeInUp}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
