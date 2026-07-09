"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import PetGuardLogo from "./PetGuardLogo";
import RadioactiveButton from "@/components/ui/RadioactiveButton";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Funciones", href: "#funciones" },
  { label: "Veterinarios", href: "#veterinarios" },
  { label: "App", href: "#app" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [hidden, setHidden] = useState(false);
  const [insideCollar, setInsideCollar] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ── Scroll logic to handle hiding and collar section ── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY;
    let isInsideCollar = false;

    // Check if we are currently inside the collar scroll section
    const collarEl = document.getElementById("collar-scroll");
    if (collarEl) {
      const rect = collarEl.getBoundingClientRect();
      // We are inside if the top is at or above the viewport top,
      // and the bottom is at or below the viewport bottom.
      if (rect.top <= 50 && rect.bottom >= window.innerHeight - 50) {
        isInsideCollar = true;
      }
    }

    setInsideCollar(isInsideCollar);

    if (isInsideCollar) {
      // Always hide navbar while exploring the collar module
      setHidden(true);
    } else {
      // Normal behavior: hide on scroll down, show on scroll up
      if (diff > 5 && latest > 200) {
        setHidden(true);
      } else if (diff < -5) {
        setHidden(false);
      }
    }

    setScrolled(latest > 40);
    setLastScrollY(latest);
  });

  /* ── Track active section with IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Determine if navbar is in "hero" area (dark theme) ── */
  const isOverHero = !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: (hidden || insideCollar) && !mobileOpen ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(0,0,0,0.15)",
          backdropFilter: scrolled
            ? "blur(24px) saturate(180%)"
            : "blur(12px)",
          WebkitBackdropFilter: scrolled
            ? "blur(24px) saturate(180%)"
            : "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(200,200,200,0.3)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.06)"
            : "none",
        }}
      >
        <div className="container-custom mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#inicio" className="relative z-10">
              <PetGuardLogo size={36} variant={isOverHero ? "light" : "dark"} />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      isOverHero
                        ? isActive
                          ? "text-brand-300"
                          : "text-white/80 hover:text-white"
                        : isActive
                          ? "text-brand-500"
                          : "text-gray-600 hover:text-brand-500"
                    }`}
                  >
                    {link.label}
                    {/* Underline indicator */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-0.5 rounded-full"
                      style={{
                        background: isOverHero
                          ? "linear-gradient(90deg, rgba(164,214,94,0.8), rgba(253,224,25,0.6))"
                          : "linear-gradient(90deg, #436900, #a4d65e)",
                        x: "-50%",
                      }}
                      initial={false}
                      animate={{
                        width: isActive ? "60%" : "0%",
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    {/* Hover underline */}
                    {!isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-2/3"
                        style={{
                          background: isOverHero
                            ? "rgba(164,214,94,0.4)"
                            : "rgba(164,214,94,0.5)",
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <RadioactiveButton href="#precios" className="hidden md:inline-flex px-6 py-2.5 text-sm">
                <ShoppingCart className="w-4 h-4" />
                Comprar
              </RadioactiveButton>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden relative w-10 h-10 flex items-center justify-center transition-colors ${
                  isOverHero
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-brand-500"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Glow bar under the navbar when over hero */}
        {isOverHero && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, rgba(164,214,94,0.2) 30%, rgba(164,214,94,0.35) 50%, rgba(164,214,94,0.2) 70%, transparent 90%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        )}
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,18,0,0.97) 0%, rgba(17,32,0,0.98) 50%, rgba(10,18,0,0.97) 100%)",
              backdropFilter: "blur(30px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className={`text-2xl font-semibold transition-colors ${
                      isActive
                        ? "text-brand-400"
                        : "text-white/70 hover:text-brand-300"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active"
                        className="h-0.5 mt-1 rounded-full mx-auto"
                        style={{
                          background:
                            "linear-gradient(90deg, #a4d65e, #ffe329)",
                          width: "60%",
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <RadioactiveButton href="#precios" onClick={() => setMobileOpen(false)} className="px-8 py-3 text-lg">
                  <ShoppingCart className="w-5 h-5" />
                  Comprar
                </RadioactiveButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
