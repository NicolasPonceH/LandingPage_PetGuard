"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import PetGuardLogo from "./PetGuardLogo";

const footerLinks = {
  Producto: ["Funciones", "Planes", "Seguridad"],
  Legal: ["Privacidad", "Términos", "Cookies", "Licencias"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 3000); }
  };

  return (
    <footer id="contacto" className="relative bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#a4d65e]/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-[#a4d65e]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          
          {/* Column 1: Branding and Contact */}
          <div className="space-y-6">
            <PetGuardLogo size={36} variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Protección inteligente para tu mascota.
            </p>

            {/* Contact info */}
            <div className="space-y-4 pt-2">
              <span className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-[#a4d65e]" />
                Arica, Chile
              </span>
              <a href="mailto:j2nsoftwarecontact@gmail.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-[#a4d65e] group-hover:text-white transition-colors" />
                j2nsoftwarecontact@gmail.com
              </a>
              <a href="https://wa.me/56935568454" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-[#a4d65e] group-hover:text-white transition-colors" />
                +56 9 3556 8454
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#a4d65e]/50 hover:bg-[#a4d65e]/10 transition-all duration-300" aria-label={s.label}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Producto Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.Producto.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.Legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">Suscríbete al newsletter</h4>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">Recibe las últimas novedades y actualizaciones de PetGuard.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="tu@email.com" 
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#a4d65e]/50 focus:ring-1 focus:ring-[#a4d65e]/30 transition-all" 
                required 
              />
              <button 
                type="submit" 
                className="w-full px-5 py-3 bg-[#a4d65e] hover:bg-[#8bc440] text-neutral-950 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {subscribed ? "¡Suscrito! ✓" : <><Send className="w-4 h-4" /> Suscribir</>}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700/50 py-6 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-400">© 2026 PetGuard. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
