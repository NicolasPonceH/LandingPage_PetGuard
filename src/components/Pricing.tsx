"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { SectionHeader, fadeInUp } from "./SectionWrapper";

export default function Pricing() {
  return (
    <SectionWrapper id="precios" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[150px]" />
      <div className="container-custom mx-auto relative z-10">
        <SectionHeader badge="✦ Precios" title="Planes para cada necesidad" subtitle="Elige el plan ideal para cuidar a tu mascota o gestionar tu clínica veterinaria." />

        {/* Pricing grid */}
        <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 max-w-[1000px] mx-auto mt-8">
          {/* Plan App Essential */}
          <div className="pt-card group">
            <div className="pt-strip" />
            <div className="pt-body">
              <p className="text-[17px] font-medium text-gray-900 mb-0.5">Plan App Essential</p>
              <p className="text-xs text-gray-500 mb-4 min-h-[32px]">Para dueños que ya tienen el collar o usan funciones básicas.</p>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-xl font-medium text-gray-900">$</span>
                <span className="text-[38px] font-bold text-gray-900 leading-none">9.990</span>
                <span className="text-sm text-gray-500 ml-1">/ mes</span>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {[
                  "Acceso completo a la App móvil (iOS y Android)",
                  "Monitoreo de ubicación GPS en tiempo real",
                  "Historial clínico digital de la mascota",
                  "Configuración de Geofencing (Zonas seguras con alertas inmediatas)",
                  "Alertas inteligentes de salud y actividad"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-[8px] text-[13px] text-gray-600 leading-[1.4]">
                    <div className="w-4 h-4 rounded-full border border-[#A4D65E] bg-[#f2fce5] flex items-center justify-center flex-shrink-0 mt-[2px] text-[9px] text-[#3a7a10]">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="pt-cta">Comenzar Ahora</button>
            </div>
          </div>

          {/* Pack PetWard Starter — Featured */}
          <div className="pt-featured-wrap group">
            <div className="pt-featured-bg" />
            <div className="pt-featured-inner">
              <div className="inline-flex items-center gap-1 bg-[#F2D600] text-[#4a3800] text-[11px] font-bold px-3 py-1 rounded-full mb-3 w-fit tracking-wide shadow-sm">★ MÁS POPULAR</div>
              <p className="text-[19px] font-bold text-white mb-0.5">Pack PetGuard Starter</p>
              <p className="text-[13px] text-white/80 mb-4 min-h-[32px]">El punto de entrada principal. Incluye el Hardware.</p>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-xl font-medium text-white/90">$</span>
                <span className="text-[42px] font-bold text-white leading-none tracking-tight">59.990</span>
              </div>
              <p className="text-[11px] text-[#F2D600] font-medium leading-tight max-w-[200px] mt-1">Pago único inicial, luego $9.990/mes a partir del 3er mes.</p>
              <div className="h-px bg-white/20 my-4" />
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {[
                  "Incluye 1 Collar Inteligente PetGuard (Hardware con sensores premium)",
                  "2 Meses de Suscripción GRATIS a la App (Ahorro de $19.980)",
                  "Envío a todo Chile incluido",
                  "Garantía de fábrica por 1 año",
                  "Después del segundo mes, mantiene todas las funciones del plan App por $9.990/mes"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-[8px] text-[13px] text-white/95 leading-[1.4]">
                    <div className="w-4 h-4 rounded-full border border-[#F2D600]/40 bg-[#F2D600]/15 flex items-center justify-center flex-shrink-0 mt-[2px] text-[9px] text-[#F2D600]">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="pt-featured-cta">Obtener Pack</button>
            </div>
          </div>

          {/* Panel Veterinario Pro */}
          <div className="pt-card group">
            <div className="pt-strip" />
            <div className="pt-body">
              <p className="text-[17px] font-medium text-gray-900 mb-0.5">Panel Veterinario Pro</p>
              <p className="text-xs text-gray-500 mb-4 min-h-[32px]">Exclusivo para clínicas y veterinarios independientes.</p>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-xl font-medium text-gray-900">$</span>
                <span className="text-[38px] font-bold text-gray-900 leading-none">29.990</span>
                <span className="text-sm text-gray-500 ml-1">/ mes</span>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {[
                  "Acceso al Dashboard / Panel Veterinario Web exclusivo",
                  "Visualización de métricas avanzadas y estadísticas de salud en tiempo real de pacientes asignados",
                  "Historial clínico interconectado directamente con los collares de los clientes",
                  "Gestión y seguimiento ilimitado de mascotas a cargo",
                  "Exportación de informes médicos y analíticas de signos vitales para consultas"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-[8px] text-[13px] text-gray-600 leading-[1.4]">
                    <div className="w-4 h-4 rounded-full border border-[#A4D65E] bg-[#f2fce5] flex items-center justify-center flex-shrink-0 mt-[2px] text-[9px] text-[#3a7a10]">✓</div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="pt-cta">Acceso Profesional</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Component-scoped styles */}
      <style>{`
        @keyframes pt-bm { 0% { background-position: 0% 0%; } 100% { background-position: 200% 0%; } }
        @keyframes pt-gm { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .pt-btn-toggle {
          position: relative;
          width: 48px;
          height: 26px;
          border-radius: 99px;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s;
        }
        .pt-btn-toggle[data-active="true"] { background: #A4D65E; }
        .pt-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .pt-btn-toggle[data-active="true"] .pt-knob { transform: translateX(22px); }

        .pt-card {
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.18s;
        }
        .pt-card:hover { transform: translateY(-4px); }

        .pt-strip {
          height: 4px;
          flex-shrink: 0;
          background: linear-gradient(90deg, #2e6b0a, #A4D65E, #F2D600, #A4D65E, #2e6b0a);
          background-size: 200% 100%;
          animation: pt-bm 3s linear infinite;
        }

        .pt-body {
          padding: 22px 20px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pt-cta {
          width: 100%;
          padding: 10px 12px;
          border-radius: 11px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid #e0e0e0;
          background: #fff;
          color: #444;
          transition: all 0.15s;
          margin-top: auto;
        }
        .pt-cta:hover {
          border-color: #A4D65E;
          color: #2e6b0a;
          background: #f5fce8;
        }

        .pt-featured-wrap {
          position: relative;
          border-radius: 18px;
          transition: transform 0.18s;
          display: flex;
          flex-direction: column;
        }
        .pt-featured-wrap:hover { transform: translateY(-4px); }

        .pt-featured-bg {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: linear-gradient(135deg, #1a4d08, #2e6b0a, #4d9e1a, #A4D65E, #c8e830, #F2D600, #A4D65E, #4d9e1a, #2e6b0a, #1a4d08);
          background-size: 300% 300%;
          animation: pt-gm 5s ease infinite;
          z-index: 0;
        }

        .pt-featured-inner {
          position: relative;
          z-index: 1;
          margin: 2px;
          border-radius: 16px;
          padding: 22px 20px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: rgba(0, 0, 0, 0.15);
        }

        .pt-featured-cta {
          background: #F2D600;
          border: none;
          color: #1a3d00;
          font-weight: 700;
          font-size: 12px;
          width: 100%;
          padding: 11px 12px;
          border-radius: 11px;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: auto;
        }
        .pt-featured-cta:hover { background: #ffe000; }
      `}</style>
    </SectionWrapper>
  );
}
