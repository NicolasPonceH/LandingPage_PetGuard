"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionWrapper, { SectionHeader, fadeInUp } from "./SectionWrapper";

const testimonials = [
  { name: "María González", role: "Dueña de mascota", text: "Desde que uso PetGuard, tengo total tranquilidad sobre la salud de Luna. Las alertas inteligentes me notificaron cuando su temperatura subió y pude llevarla al veterinario a tiempo.", avatar: "MG", color: "bg-pink-500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeHUFU9n95wZ7VUr1lvCxaVivb5VqiovsNOP3xMqt9CKQnzsg2VfcBKM_ljGtDh-FwQRORYq_Goyt2NNGZKvE5DBTzFtfQZCcsf1W1cyPehfwKz44dSfcxsOs5TT-ULepGkZCrwhB-AgmtiVTR3AVOy5AXgzZQb96buXEuuvujNMSbl-GXz7rrEDfR7RwQWFHZIq_596hdIaYpNSjmFSZzUnu2bNUC4SXZN86TJ_oZXLAoJcwom_Hj6lWPY7hivlCY_CvKiTko4GGN" },
  { name: "Dr. Carlos Méndez", role: "Veterinario", text: "El panel profesional de PetGuard ha transformado mi práctica. Puedo monitorear a mis pacientes postoperatorios desde casa y recibir alertas si algo cambia.", avatar: "CM", color: "bg-blue-500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFZJ6nw2fA8auRb-ApD3NjVrMQBMuZsTU4FRBhOonTdBXjIvHaALI38sIkDymPyjtI2bcUIaOw8R-xKoCF8eKcODR31JEYElgxLG0PdagEReoM32inNj50d_nrCKAcxf_MgOdtUXeQQddEoUJJAnZnSYP9VaDBVW2-PQbbxeyqwfKj6hQDZrDM-AmznMKByCHq0xlhnMIm1EYhdiKdywrhZYvVyfHFse4m5B_AFUkY_mGdSKccE-LsNcEll5H7NuTo_yfyeUhbcHqJ" },
  { name: "Ana Rodríguez", role: "Dueña de 3 mascotas", text: "Con el plan Familiar puedo rastrear a mis tres perros simultáneamente. El geofencing es increíble: recibo una alerta si alguno sale del jardín.", avatar: "AR", color: "bg-brand-400", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq6hl9ayoKvAR7MgtBewn6F9MGvOsk52wm8OCBmfZQhl848uu5HN5ApbX9jEIpOgAolG8Hp2fwoTyY5Cexsd48CK6l7DEVe7FFsSGGurYrVIbfcuPYGQ9bs4izTuMxe_Xl8lc_52IttAdn74gQ5ZvxilBVbRz5RJxdSQJBVhZgdwqyTT7yPPJVs3IqzIWkEYiV2C2uTwTbtaPwUYFRKaaf9UZwsXh9J3Ar4DxYDCkY39oAnTpad471w9UAIyQnCqwcH4qqrxlHQckT" },
  { name: "Dra. Patricia Luna", role: "Veterinaria", text: "La calidad de los datos biométricos es impresionante. El ECG en tiempo real y las tendencias de signos vitales me ayudan a tomar mejores decisiones clínicas.", avatar: "PL", color: "bg-emerald-500" },
  { name: "Roberto Silva", role: "Dueño de mascota", text: "Mi perro Max se escapó una vez y gracias al GPS de PetGuard lo encontré en minutos. Ahora con el geofencing, recibo alertas antes de que salga de la zona segura.", avatar: "RS", color: "bg-amber-500" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <SectionWrapper className="section-padding relative">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-[120px]" />
      <div className="container-custom mx-auto relative z-10">
        <SectionHeader badge="Testimonios" title="Lo que dicen nuestros usuarios" subtitle="Miles de familias y veterinarios confían en PetGuard para proteger a sus mascotas." />

        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="glass-card p-8 md:p-10 text-center">
                <Quote className="w-10 h-10 text-brand-500/30 mx-auto mb-6" />
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 italic">&ldquo;{testimonials[current].text}&rdquo;</p>
                <div className="flex flex-col items-center gap-3">
                  {testimonials[current].image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-400/30 shadow-md">
                      <Image
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${testimonials[current].color} flex items-center justify-center text-white font-bold text-sm`}>{testimonials[current].avatar}</div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[current].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button onClick={prev} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-brand-500 hover:bg-gray-50 transition-all" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={next} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-brand-500 hover:bg-gray-50 transition-all" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-brand-500 w-6" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to testimonial ${i + 1}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
