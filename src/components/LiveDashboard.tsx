"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Heart,
  Thermometer,
  Droplets,
  Activity,
  MapPin,
  AlertTriangle,
  Wifi,
  Battery,
  Clock,
} from "lucide-react";
import SectionWrapper, {
  SectionHeader,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "./SectionWrapper";

function useAnimatedValue(base: number, range: number, interval = 2000) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * range);
    }, interval);
    return () => clearInterval(id);
  }, [base, range, interval]);
  return Math.round(value * 10) / 10;
}

function VitalCard({
  icon: Icon,
  label,
  value,
  unit,
  status,
  color,
  bgColor,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  unit: string;
  status: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-[#f3ffe8]/80 border border-[#a4d65e]/20 rounded-2xl shadow-sm hover:shadow-[0_4px_20px_rgba(164,214,94,0.15)] hover:border-[#a4d65e]/40 transition-all duration-300 p-4 md:p-5 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400 font-medium">{status}</span>
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
}

function ECGChart() {
  return (
    <div className="glass-card p-4 md:p-5 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-gray-600">ECG en vivo</span>
        </div>
        <span className="text-xs text-gray-500">Últimos 30s</span>
      </div>
      <svg viewBox="0 0 500 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ecg-live" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.05)" />
            <stop offset="50%" stopColor="rgba(34, 197, 94, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="500"
            y2={y}
            stroke="rgba(200,200,200,0.3)"
            strokeWidth="1"
          />
        ))}

        <motion.path
          d="M0 40 L40 40 L55 40 L65 15 L75 65 L85 30 L95 45 L105 40 L145 40 L160 40 L170 15 L180 65 L190 30 L200 45 L210 40 L250 40 L265 40 L275 15 L285 65 L295 30 L305 45 L315 40 L355 40 L370 40 L380 15 L390 65 L400 30 L410 45 L420 40 L500 40"
          fill="none"
          stroke="url(#ecg-live)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

function MapSimulation() {
  return (
    <div className="glass-card rounded-xl overflow-hidden relative h-56 md:h-64">
      {/* Simulated map background */}
      <div className="absolute inset-0 bg-gray-100">
        {/* Road grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(164, 214, 94, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(164, 214, 94, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        {/* Some "roads" */}
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-300/50" />
        <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300/30" />
        <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-300/30" />
        <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-300/50" />

        {/* "Park" area */}
        <div className="absolute top-[10%] left-[10%] w-20 h-16 rounded-lg bg-green-100/60 border border-green-300/30" />

        {/* "Buildings" */}
        <div className="absolute top-[55%] left-[55%] w-12 h-8 rounded bg-gray-200/60" />
        <div className="absolute top-[20%] left-[70%] w-8 h-12 rounded bg-gray-200/60" />
      </div>

      {/* Geofence circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-brand-500/40 bg-brand-500/5"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Pet location */}
      <motion.div
        className="absolute top-[45%] left-[48%]"
        animate={{ x: [-5, 5, -3, 5, -5], y: [-3, 5, -5, 3, -3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="w-5 h-5 bg-brand-500 rounded-full border-2 border-white shadow-lg shadow-brand-400/50" />
          <div className="absolute inset-0 w-5 h-5 bg-brand-500 rounded-full animate-ping opacity-30" />
        </div>
      </motion.div>

      {/* Home location */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-white rounded-full opacity-60" />
      </div>

      {/* Map overlay info */}
      <div className="absolute top-3 left-3 glass px-3 py-1.5 rounded-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-xs text-gray-600 font-medium">Max • Calle Principal 42</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 glass px-3 py-1.5 rounded-lg">
        <span className="text-[10px] text-green-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Dentro de zona segura
        </span>
      </div>
    </div>
  );
}

function AlertsPanel() {
  const alerts = [
    {
      type: "info",
      message: "Max completó su paseo diario",
      time: "Hace 5 min",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      type: "success",
      message: "Signos vitales estables",
      time: "Hace 12 min",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      type: "warning",
      message: "Temperatura ligeramente elevada",
      time: "Hace 30 min",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  return (
    <div className="glass-card p-4 md:p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-gray-600">Alertas recientes</span>
        </div>
        <span className="text-xs text-brand-400 cursor-pointer hover:underline">Ver todas</span>
      </div>
      <div className="space-y-2.5">
        {alerts.map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`${alert.bg} border ${alert.border} rounded-lg p-3 flex items-center justify-between`}
          >
            <span className={`text-xs ${alert.color}`}>{alert.message}</span>
            <span className="text-[10px] text-gray-500 ml-2 whitespace-nowrap">
              {alert.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function LiveDashboard() {
  const bpm = useAnimatedValue(92, 8, 2500);
  const temp = useAnimatedValue(38.5, 1, 3000);
  const spo2 = useAnimatedValue(98, 2, 4000);

  return (
    <SectionWrapper id="dashboard" className="section-padding relative">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[150px]" />

      <div className="container-custom mx-auto relative z-10">
        {/* Tonal section container */}
        <div className="premium-section-container p-6 md:p-10">
        <SectionHeader
          badge="Dashboard en vivo"
          title="Monitoreo en tiempo real"
          subtitle="Visualiza la salud y ubicación de tu mascota con actualizaciones cada 10 segundos."
        />

        {/* Dashboard header bar */}
        <motion.div variants={fadeInUp}>
          <div className="glass-card p-3 md:p-4 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
                <span className="text-lg">🐕</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Max</p>
                <p className="text-[11px] text-gray-500">Golden Retriever • 3 años</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-green-400" />
                Conectado
              </span>
              <span className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-green-400" />
                87%
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                Hace 8s
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {/* Left column: Vitals */}
          <motion.div variants={slideInLeft} className="space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <VitalCard
                icon={Heart}
                label="Frecuencia Cardíaca"
                value={bpm}
                unit="BPM"
                status="Normal"
                color="text-red-400"
                bgColor="bg-red-500/10"
              />
              <VitalCard
                icon={Thermometer}
                label="Temperatura"
                value={temp}
                unit="°C"
                status="Normal"
                color="text-amber-400"
                bgColor="bg-amber-500/10"
              />
              <VitalCard
                icon={Droplets}
                label="Saturación O₂"
                value={spo2}
                unit="%"
                status="Óptimo"
                color="text-blue-400"
                bgColor="bg-blue-500/10"
              />
            </div>
          </motion.div>

          {/* Center column: Map + ECG */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-5">
            <MapSimulation />
            <ECGChart />
          </motion.div>

          {/* Right column: Alerts + status */}
          <motion.div variants={slideInRight} className="space-y-5">
            <AlertsPanel />

            {/* Pet status */}
            <div className="glass-card p-4 md:p-5 rounded-xl">
              <h4 className="text-sm font-medium text-gray-600 mb-4">Estado general</h4>
              <div className="space-y-3">
                {[
                  { label: "Actividad", value: 72, color: "bg-brand-500" },
                  { label: "Hidratación", value: 85, color: "bg-blue-500" },
                  { label: "Descanso", value: 60, color: "bg-brand-400" },
                  { label: "Nutrición", value: 90, color: "bg-green-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
