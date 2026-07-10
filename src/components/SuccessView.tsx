import { CheckCircle2, MessageSquare, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

interface SuccessViewProps {
  name: string;
  whatsappLink: string;
}

export default function SuccessView({ name, whatsappLink }: SuccessViewProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(16,185,129,0.05)] p-6 sm:p-8 text-center relative overflow-hidden animate-fade-in">
      {/* Dynamic confetti style top cover */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"></div>
      <div className="absolute top-12 right-12 text-emerald-500/10 opacity-65">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="space-y-6 pt-2">
        {/* Verification Check Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full text-emerald-400 mb-2 relative border border-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
          <span className="absolute -inset-1 rounded-full border border-emerald-400/30 animate-ping opacity-75"></span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            ¡Felicidades, {name}!
          </h2>
          <p className="text-sm font-semibold text-emerald-400">
            Tu pago de $9 USD fue aprobado. Tu entrada al Workshop de IA está confirmada.
          </p>
        </div>

        {/* CRITICAL WARNING CARD */}
        <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-left flex items-start space-x-3 max-w-lg mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 space-y-1">
            <h4 className="font-bold text-amber-400">⚠️ PASO OBLIGATORIO Y FINAL:</h4>
            <p className="text-slate-300">
              El enlace privado de acceso a la sala de Zoom, la Guía del Workshop de IA interactiva en PDF y el Kit de Prompts de regalo se enviarán <strong>exclusivamente por el Grupo VIP de WhatsApp</strong>. Si no ingresas al grupo, no podrás acceder al entrenamiento de julio.
            </p>
          </div>
        </div>

        {/* GIANT COUNTED PULSING WHATSAPP CTA */}
        <div className="py-4 relative flex justify-center">
          {/* Animated decorative ring inside layout */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 pointer-events-none">
            <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse-ring"></span>
          </div>

          <a
            id="whatsapp-vip-redirect-btn"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-full max-w-md bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 flex flex-col items-center justify-center group transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center space-x-3.5">
              <MessageSquare className="w-6 h-6 fill-white stroke-none animate-bounce" />
              <span className="text-base sm:text-lg tracking-tight">
                UNIRME AL GRUPO VIP DE WHATSAPP
              </span>
            </div>
            <div className="text-[10px] opacity-90 font-medium tracking-wider mt-1 flex items-center uppercase">
              <span>Haga clic para redirección instantánea</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Simple Step Guidelines */}
        <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 text-left max-w-lg mx-auto text-xs space-y-3 text-slate-300">
          <h4 className="font-bold text-white flex items-center">
            <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-400" />
            ¿Qué pasará al unirte al grupo de WhatsApp?
          </h4>
          <ul className="space-y-2 border-t border-white/10 pt-2.5">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold text-[9px] mr-2 mt-0.5 border border-emerald-500/20">
                1
              </span>
              <span><strong>Grupo 100% Silencioso:</strong> Solo los administradores (mentores) enviarán avisos cruciales para evitar notificaciones innecesarias.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold text-[9px] mr-2 mt-0.5 border border-emerald-500/20">
                2
              </span>
              <span><strong>Recibe la Guía PDF y Kit de Prompts de IA:</strong> Inmediatamente al ingresar, se te dará el enlace para descargar tu cuaderno de trabajo interactivo y kit de prompts listos para copiar.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold text-[9px] mr-2 mt-0.5 border border-emerald-500/20">
                3
              </span>
              <span><strong>Acceso Directo de Zoom:</strong> Recibe los detalles de conexión directa el Viernes 24 de Julio sin contratiempos antes de iniciar.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
