import React from "react";
import { MessageCircle, ShieldCheck, Sparkles, Lock, CheckCircle2, Star, Zap } from "lucide-react";
import { LaunchConfig } from "../types";

interface LeadFormProps {
  config: LaunchConfig;
  registeredCount: number;
}

export default function LeadForm({ config, registeredCount }: LeadFormProps) {
  const totalAttendees = config.leadCountOffset + registeredCount;
  const whatsappUrl = config.whatsappLink || "https://chat.whatsapp.com/CIRi15gFaaZDueOhDnHK2y";

  return (
    <div className="bg-[#0b120d] backdrop-blur-2xl rounded-2xl border-2 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50">
      {/* Decorative cyber lines */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"></div>
      
      {/* Glow highlight */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Urgency Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>ACCESO DIRECTO POR WHATSAPP</span>
          </span>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-bold uppercase animate-pulse border border-emerald-500/35">
            Grupo VIP Activo
          </span>
        </div>

        {/* Pricing Header */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
            Únete al Workshop
          </h3>
          <p className="text-xs text-slate-350 leading-relaxed">
            Asegura tu cupo al Workshop de IA y descarga tus bonos de inmediato uniéndote al Grupo VIP de WhatsApp de forma directa.
          </p>
        </div>

        {/* Big Premium Pricing Badge */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#0b120d] to-emerald-950/40 rounded-xl border border-emerald-500/25 p-4 text-center space-y-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
          <span className="text-[10px] text-emerald-450 font-bold uppercase tracking-wider block">OFERTA DE LANZAMIENTO</span>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-4xl sm:text-5xl font-black text-emerald-450 font-display tracking-tight animate-pulse">
              100% GRATIS
            </span>
            <span className="text-sm text-slate-500 line-through font-bold">
              $49.00 USD
            </span>
          </div>
          <p className="text-[10px] text-emerald-300/85 font-medium flex items-center justify-center gap-1 mt-1">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Acceso gratuito por tiempo limitado
          </p>
        </div>

        {/* Value-Adds List */}
        <div className="space-y-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tu Acceso Incluye:</span>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-white">🎟️ Workshop en Vivo de IA</p>
                <p className="text-[11px] text-slate-400">Viernes 24 de Julio, 7:00 PM por Zoom.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-emerald-300">🎁 BONO: Prompt Builder PRO</p>
                <p className="text-[11px] text-slate-400">Asistente GPT avanzado para tu negocio.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-emerald-300">🎁 BONO: +200 Prompts Maestros</p>
                <p className="text-[11px] text-slate-400 font-normal">Biblioteca para copiar, pegar y vender.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-emerald-300">💬 BONO: Grupo VIP WhatsApp</p>
                <p className="text-[11px] text-slate-400">Networking, guías de trabajo y link de acceso.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic attendee urgency counter */}
        <div className="flex items-center justify-between py-2.5 px-3.5 bg-gradient-to-r from-white/5 to-emerald-950/30 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-emerald-500/30" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
              <img className="inline-block h-5 w-5 rounded-full ring-2 ring-emerald-500/30" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60" alt="" referrerPolicy="no-referrer" />
            </div>
            <span className="font-medium text-slate-350">
              ¡Ya somos <strong className="text-emerald-400 font-bold">+{totalAttendees}</strong> inscritos!
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 animate-pulse" /> 4.9/5
          </span>
        </div>

        {/* HUGE WHATSAPP BUTTON */}
        <a
          id="whatsapp-join-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-450 hover:via-emerald-400 hover:to-green-550 text-white font-black rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.35)] hover:shadow-[0_0_35px_rgba(34,197,94,0.55)] transition-all duration-300 flex items-center justify-center space-x-2.5 text-base sm:text-lg transform active:scale-[0.99] cursor-pointer text-center tracking-wide relative overflow-hidden group"
        >
          {/* Shimmer / Destello Effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
          
          <MessageCircle className="w-6 h-6 animate-pulse relative z-10 fill-white/10 text-white" />
          <span className="relative z-10 font-black tracking-wide">UNIRSE A WHATSAPP</span>
        </a>

        {/* Footer/Guarantees details */}
        <div className="pt-3.5 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-4 bg-amber-500/5 rounded-xl border border-amber-500/15 p-3">
            {/* Mini Golden Stamp */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md pointer-events-none"></div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                {/* Scalloped circle stroke */}
                <svg className="absolute w-full h-full animate-[spin_40s_linear_infinite] text-amber-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2.5" />
                </svg>

                {/* Inner Seal Plate */}
                <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#1c1409] to-[#0a0703] border border-amber-500/50 shadow-[inset_0_0_10px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center text-center relative z-10">
                  <div className="flex gap-0.5 text-amber-400 -mt-1 scale-75">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 -translate-y-0.5" />
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-lg font-black font-display leading-none bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    7
                  </span>
                  <span className="text-[7px] font-black tracking-widest text-amber-200/90 uppercase leading-none mt-0.5">
                    DÍAS
                  </span>
                </div>
              </div>
            </div>

            {/* Guarantee Text */}
            <div className="text-[10px] text-slate-350 leading-relaxed space-y-1">
              <p className="font-bold text-amber-350 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Garantía de Satisfacción 100%
              </p>
              <p>
                Prueba el Workshop y descarga los Bonos. Si en 7 días decides que no es para ti, te devolvemos el 100% de tu dinero de inmediato.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-500" /> SSL Encriptado</span>
            <span>•</span>
            <span>Hotmart® Seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
