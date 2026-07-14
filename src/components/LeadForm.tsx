import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Sparkles, Lock, CheckCircle2, Star, Zap, User, Mail, Phone } from "lucide-react";
import { LaunchConfig } from "../types";

interface LeadFormProps {
  config: LaunchConfig;
  registeredCount: number;
  onSignUp?: (data: { name: string; email: string; phone: string }) => void;
}

export default function LeadForm({ config, registeredCount, onSignUp }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAttendees = config.leadCountOffset + registeredCount;
  const hotmartUrl = config.hotmartLink || "https://pay.hotmart.com/example";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (config.emailRequired && !email.trim()) return;
    if (config.phoneRequired && !phone.trim()) return;

    setIsSubmitting(true);
    
    if (onSignUp) {
      onSignUp({ name, email, phone });
    }

    // Open Hotmart checkout in same window
    setTimeout(() => {
      window.location.href = hotmartUrl;
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-blue-450/40">
      {/* Decorative top header line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500"></div>
      
      {/* Glow highlight */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-5">
        {/* Urgency Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>CLASE MAESTRA DE ALTO IMPACTO</span>
          </span>
          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold uppercase animate-pulse border border-emerald-200">
            Aforo Limitado
          </span>
        </div>

        {/* Pricing Header */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Asegura tu Cupo Hoy
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Completa tus datos para pre-registrarte como alumno y procede al pago seguro de tu entrada para el entrenamiento en vivo.
          </p>
        </div>

        {/* Big Premium Pricing Badge */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 text-center space-y-1 relative overflow-hidden">
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">PRECIO ESPECIAL DE PRE-VENTA</span>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              $27.00 USD
            </span>
            <span className="text-sm text-slate-400 line-through font-bold">
              $49.00 USD
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1 mt-1">
            <Zap className="w-3 h-3 text-blue-600 fill-blue-600" /> Pago único • Acceso de por vida
          </p>
        </div>

        {/* Interactive Capture Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* NOMBRE */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Tu Nombre Completo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                id="lead-name-input"
                type="text"
                required
                placeholder="Ej. Carlos Ruiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* EMAIL */}
          {config.emailRequired && (
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Tu Correo Electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="lead-email-input"
                  type="email"
                  required
                  placeholder="Ej. carlos@tuempresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* PHONE */}
          {config.phoneRequired && (
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Tu WhatsApp / Teléfono</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  id="lead-phone-input"
                  type="tel"
                  required
                  placeholder="Ej. +57 301 234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON WITH FEEDBACK */}
          <button
            id="lead-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-base transform active:scale-[0.99] cursor-pointer text-center relative overflow-hidden group"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
            
            <span className="relative z-10 font-bold uppercase tracking-wide">
              {isSubmitting ? "Redirigiendo a Hotmart..." : "Asegurar Mi Entrada — $27 USD"}
            </span>
          </button>
        </form>

        {/* Dynamic attendee counter */}
        <div className="flex items-center justify-between py-2.5 px-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
            </div>
            <span className="font-semibold text-slate-600">
              ¡Ya somos <strong className="text-blue-600 font-bold">+{totalAttendees}</strong> inscritos!
            </span>
          </div>
          <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> 4.9/5
          </span>
        </div>

        {/* Guarantee Seal Details */}
        <div className="pt-3.5 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 bg-amber-50 rounded-xl border border-amber-200/60 p-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 font-black font-display text-base text-amber-700">
                7
              </div>
            </div>
            <div className="text-[10px] text-slate-600 leading-relaxed space-y-0.5">
              <p className="font-bold text-amber-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Garantía de Satisfacción 100%
              </p>
              <p>
                Si en 7 días decides que el workshop no cumplió tus expectativas, te devolvemos el 100% de tu dinero de inmediato.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-600" /> SSL Encriptado</span>
            <span>•</span>
            <span>Hotmart® Seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
