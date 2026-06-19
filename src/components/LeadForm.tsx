import React, { useState } from "react";
import { User, Mail, Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { LaunchConfig } from "../types";

interface LeadFormProps {
  config: LaunchConfig;
  onSubmit: (lead: { name: string; email: string; phone: string }) => void;
  registeredCount: number;
}

export default function LeadForm({ config, onSubmit, registeredCount }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!name.trim()) {
      tempErrors.name = "Por favor, escribe tu nombre.";
    }

    if (config.emailRequired) {
      if (!email.trim()) {
        tempErrors.email = "El correo electrónico es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Introduce un formato de correo válido.";
      }
    } else if (email && !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Introduce un formato de correo válido.";
    }

    if (config.phoneRequired) {
      if (!phone.replace(/\D/g, "").trim()) {
        tempErrors.phone = "El número de WhatsApp es obligatorio.";
      } else if (phone.length < 8) {
        tempErrors.phone = "Por favor, introduce un número válido.";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate slight network delay of 800ms for solid high-quality premium feel
    setTimeout(() => {
      onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      setLoading(false);
    }, 800);
  };

  const totalAttendees = config.leadCountOffset + registeredCount;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_4px_30px_rgba(16,185,129,0.05)] p-5 sm:p-7 relative overflow-hidden">
      {/* Decorative floral or light aesthetic accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full -z-0"></div>

      <div className="relative z-10 space-y-5">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2.5">
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>ACCESO GRATUITO POR TIEMPO LIMITADO</span>
          </span>
          <h3 className="text-xl font-bold text-white font-display tracking-tight">
            Únete antes del Cierre de Registros
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Completa tus datos para desbloquear el Grupo VIP y recibir el kit de inicio.
          </p>
        </div>

        {/* Dynamic attendee urgency counter */}
        <div className="flex items-center space-x-2 py-2.5 px-3.5 bg-gradient-to-r from-white/5 to-emerald-500/5 rounded-xl border border-white/10">
          <div className="flex -space-x-1.5 overflow-hidden">
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-500/30" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-500/30" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-emerald-500/30" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
          </div>
          <span className="text-xs font-medium text-slate-200">
            ¡Ya somos <strong className="text-emerald-400 text-sm font-bold animate-pulse">+{totalAttendees}</strong> suscritos!
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME FIELD */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">Tu Nombre de Pila *</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-450" />
              <input
                id="input-customer-name"
                type="text"
                disabled={loading}
                required
                placeholder="Ej. Sofía López"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                  errors.name ? "border-rose-450 focus:ring-rose-500/25" : "border-white/10 focus:ring-emerald-500/30"
                } bg-white/5 text-sm focus:outline-none focus:ring-4 focus:border-emerald-500 transition-all font-medium text-white placeholder-slate-405`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-rose-400 font-semibold">{errors.name}</p>}
          </div>

          {/* EMAIL FIELD (Optional / Toggled) */}
          {(config.emailRequired || email) && (
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Tu Correo Electrónico {config.emailRequired ? "*" : "(Opcional)"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-455" />
                <input
                  id="input-customer-email"
                  type="email"
                  disabled={loading}
                  required={config.emailRequired}
                  placeholder="sofia@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                    errors.email ? "border-rose-450 focus:ring-rose-250" : "border-white/10 focus:ring-emerald-500/30"
                  } bg-white/5 text-sm focus:outline-none focus:ring-4 focus:border-emerald-500 transition-all font-medium text-white placeholder-slate-405`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-400 font-semibold">{errors.email}</p>}
            </div>
          )}

          {/* PHONE FIELD (Optional / Toggled / Default WhatsApp) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">
              Número de WhatsApp (Con código de país) {config.phoneRequired ? "*" : "(Recomendado)"}
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-455" />
              <input
                id="input-customer-phone"
                type="tel"
                disabled={loading}
                required={config.phoneRequired}
                placeholder="Ej. +34 600 000 000 o +52 ..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                  errors.phone ? "border-rose-450 focus:ring-rose-250" : "border-white/10 focus:ring-emerald-500/30"
                } bg-white/5 text-sm focus:outline-none focus:ring-4 focus:border-emerald-500 transition-all font-medium text-white placeholder-slate-405`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-rose-400 font-semibold">{errors.phone}</p>}
            {!errors.phone && (
              <p className="text-[10px] text-slate-400 mt-1">
                Utilizado para enviarte los accesos directos de las salas y PDFs gratis.
              </p>
            )}
          </div>

          <button
            id="submit-register-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-750 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base transform active:scale-[0.99] disabled:opacity-85 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>RESERVAR MI LUGAR GRATUITO</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-start space-x-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            Garantía de Privacidad 100%. No hacemos spam. Tus datos se mantendrán protegidos para la distribución de material del reto.
          </p>
        </div>
      </div>
    </div>
  );
}
