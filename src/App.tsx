import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  MessageSquare, 
  MessageCircle,
  Settings, 
  Calendar, 
  ChevronDown, 
  Trophy, 
  Users, 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  Star, 
  Lock, 
  Sparkles, 
  BookOpen, 
  Users2 
} from "lucide-react";
import AdminPanel from "./components/AdminPanel";
import BannerCounter from "./components/BannerCounter";
import LeadForm from "./components/LeadForm";
import SuccessView from "./components/SuccessView";
import DriveMedia from "./components/DriveMedia";
import { Lead, LaunchConfig } from "./types";
import { challengePhases, faqs } from "./data";

// Import images to allow Vite to bundle them correctly
import cinematicPortraits from "./assets/images/cinematic_portraits_1783353257734.jpg";
import aiPromptIcon from "./assets/images/ai_prompt_icon_1783353268310.jpg";
import connectedTools from "./assets/images/connected_tools_1783353280892.jpg";
import aiEcosystem from "./assets/images/ai_ecosystem_1783353297106.jpg";
import promptInputBox from "./assets/images/prompt_input_box_1783353307316.jpg";
import creativeAssets from "./assets/images/creative_assets_1783353319563.jpg";
import promptBuilder from "./assets/images/prompt_builder_1783350386392.jpg";
import libraryPrompts from "./assets/images/library_prompts_1783350401839.jpg";
import vipCommunity from "./assets/images/vip_community_1783350413454.jpg";

// Default launch setup matching "Growth Spring" and the owner Content Creativo
const DEFAULT_CONFIG: LaunchConfig = {
  whatsappLink: "https://chat.whatsapp.com/CIRi15gFaaZDueOhDnHK2y",
  launchDate: "2026-07-24T19:00", // Viernes 24 de Julio, 7 PM Hora Colombia
  title: "Workshop Clase Maestra: Inteligencia Artificial para Negocios y Marcas Personales",
  subtitle: "Automatiza tus procesos diarios, delega tareas operativas a la IA y multiplica tu contenido en tiempo récord. Entrada por solo $27 USD.",
  description: "Adquiere tu cupo hoy y recibe acceso inmediato al entrenamiento por Zoom, el Kit de Prompts y el Grupo VIP de WhatsApp.",
  videoEmbed: "", // Leave blank by default to show the high-converting spring visual infocard
  leadCountOffset: 348,
  emailRequired: true,
  phoneRequired: true,
  hotmartLink: "https://pay.hotmart.com/example", // Default Hotmart URL
};

const DEFAULT_LEADS: Lead[] = [
  { id: "lead-1", name: "Carlos Ruiz", email: "carlosruiz@growth.com", phone: "+34 600 123 456", timestamp: "2026-06-18T14:32:00Z" },
  { id: "lead-2", name: "Ana María Gómez", email: "anamaria@negocios.cl", phone: "+56 9 8888 7777", timestamp: "2026-06-18T16:45:00Z" },
  { id: "lead-3", name: "Mauricio Santos", email: "msantos@sistemas.mx", phone: "+52 55 5678 1234", timestamp: "2026-06-18T19:12:00Z" },
  { id: "lead-4", name: "Laura Martínez", email: "lauramart@educacion.co", phone: "+57 301 234 5678", timestamp: "2026-06-19T08:21:00Z" },
  { id: "lead-5", name: "Eduardo Castillo", email: "edu.castillo@global.ar", phone: "+54 9 11 4455 6677", timestamp: "2026-06-19T10:05:00Z" },
];

export default function App() {
  const [config, setConfig] = useState<LaunchConfig>(DEFAULT_CONFIG);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [registeredLead, setRegisteredLead] = useState<Lead | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showFloating, setShowFloating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Prevent double audio on mount by delaying iframe loading slightly
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection for floating buy button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load configs and leads from localStorage on mount
  useEffect(() => {
    const storedConfig = localStorage.getItem("wrowth_launch_config");
    let initialConfig = DEFAULT_CONFIG;
    if (storedConfig) {
      try {
        const parsed = JSON.parse(storedConfig);
        if (
          parsed.launchDate === "2026-07-19T20:00" ||
          parsed.title.includes("Wrowth") ||
          parsed.title.includes("Desafío Wrowth") ||
          !parsed.title.includes("Inteligencia Artificial") ||
          JSON.stringify(parsed).includes("Mentors Expert") ||
          parsed.whatsappLink?.includes("GisL9bJDvW83bF6E8ZgH9J")
        ) {
          localStorage.setItem("wrowth_launch_config", JSON.stringify(DEFAULT_CONFIG));
          initialConfig = DEFAULT_CONFIG;
        } else {
          initialConfig = parsed;
        }
      } catch (err) {
        console.error("Error reading stored config", err);
      }
    } else {
      localStorage.setItem("wrowth_launch_config", JSON.stringify(DEFAULT_CONFIG));
    }
    setConfig(initialConfig);

    const storedLeads = localStorage.getItem("wrowth_launch_leads");
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (err) {
        console.error("Error reading stored leads", err);
      }
    } else {
      setLeads(DEFAULT_LEADS);
      localStorage.setItem("wrowth_launch_leads", JSON.stringify(DEFAULT_LEADS));
    }

    const sessionLead = sessionStorage.getItem("wrowth_registered_lead");
    if (sessionLead) {
      try {
        setRegisteredLead(JSON.parse(sessionLead));
      } catch (err) {
        console.error("Error reading session lead", err);
      }
    }
  }, []);

  const handleUpdateConfig = (newConfig: LaunchConfig) => {
    setConfig(newConfig);
    localStorage.setItem("wrowth_launch_config", JSON.stringify(newConfig));
  };

  const handleClearLeads = () => {
    setLeads([]);
    localStorage.setItem("wrowth_launch_leads", JSON.stringify([]));
  };

  const handleAddMockLeads = () => {
    const names = ["Sofía Herrera", "Roberto Díaz", "Elena Varela", "Gastón Medina", "Patricio Rojas"];
    const emails = ["sofiah@gmail.com", "roberto.diaz@work.cl", "elena@varela.mx", "gaston@tecnologia.ar", "projas@negocios.co"];
    const codes = ["+34", "+56", "+52", "+54", "+57"];
    const newLeads: Lead[] = [];

    for (let i = 0; i < 5; i++) {
      const idx = Math.floor(Math.random() * 100000);
      newLeads.push({
        id: `lead-mock-${idx}`,
        name: names[i],
        email: emails[i],
        phone: `${codes[i]} 9 ${Math.floor(10000000 + Math.random() * 90000000)}`,
        timestamp: new Date().toISOString(),
      });
    }

    const updated = [...newLeads, ...leads];
    setLeads(updated);
    localStorage.setItem("wrowth_launch_leads", JSON.stringify(updated));
  };

  const handleNewSignUp = (data: { name: string; email: string; phone: string }) => {
    const newLead: Lead = {
      id: `lead-real-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      timestamp: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem("wrowth_launch_leads", JSON.stringify(updated));

    setRegisteredLead(newLead);
    sessionStorage.setItem("wrowth_registered_lead", JSON.stringify(newLead));

    const captureEl = document.getElementById("capture-card-container");
    if (captureEl) {
      captureEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="main-landing-app" className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-500/30 selection:text-blue-900 relative overflow-hidden">
      
      {/* Ambient glowing pastel watercolor-like backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-100/40 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-100/30 rounded-full blur-[130px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] bg-indigo-100/30 rounded-full blur-[150px]"></div>
      </div>

      {/* Top Urgent Notification Banner */}
      <div className="w-full bg-slate-950 text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 relative z-10 shadow-sm border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span className="uppercase font-mono text-[10px] sm:text-xs">WORKSHOP CLASE MAESTRA COMPLETAMENTE EN VIVO — ENTRADA POR SOLO $27 USD</span>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-24 space-y-24 md:space-y-36 relative z-10">
        
        {/* HEADER BRAND */}
        <header className="flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-slate-200/80 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.2)]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">Presentado por Content Creativo</span>
              <h1 className="text-xl font-bold font-display tracking-tight text-slate-950 mt-1">Growth<span className="text-blue-600 font-extrabold">.Spring</span></h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-bold">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-blue-600" />
              Cupos Disponibles
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center text-slate-600 font-mono">
              <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
              <span>Inicia: {new Date(config.launchDate).toLocaleDateString("es-ES", { month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION */}
        <section id="hero-section" className="space-y-12">
          {/* Tagline */}
          <div className="flex justify-center">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100/80 shadow-sm uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Workshop Práctico de IA</span>
            </span>
          </div>

          {/* Headline and Subheadline */}
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.12] text-slate-950 tracking-tight">
              Delega el 80% de tu <span className="text-blue-600 relative inline-block">
                Negocio a la IA
                <span className="absolute bottom-1.5 left-0 w-full h-1 bg-blue-600/10 rounded"></span>
              </span> y trabaja de forma inteligente
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {config.subtitle}
            </p>
          </div>

          {/* Urgency Counter */}
          <div className="flex justify-center max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-sm w-full flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">La oferta especial termina en:</span>
              <BannerCounter targetDate={config.launchDate} />
            </div>
          </div>

          {/* Primary CTA and trust badges */}
          <div className="space-y-6 text-center">
            <div>
              <button
                onClick={() => {
                  const el = document.getElementById("capture-card-container");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs sm:text-sm tracking-widest uppercase transition-all shadow-[0_12px_28px_rgba(15,23,42,0.15)] hover:shadow-[0_15px_32px_rgba(15,23,42,0.22)] active:scale-98 cursor-pointer inline-flex items-center space-x-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                <span>Inscribirme por solo $27 USD</span>
              </button>
            </div>

            {/* Trust elements below CTA */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex -space-x-1.5">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                ].map((src, idx) => (
                  <img key={idx} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Asistente" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-500 font-semibold text-xs sm:text-sm">
                <span className="text-slate-900 font-bold">⭐ 4.9/5 Calificación</span>
                <span className="text-slate-300">•</span>
                <span>🔥 +1,500 alumnos inscritos</span>
                <span className="text-slate-300">•</span>
                <span className="text-blue-600 font-extrabold flex items-center">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600 mr-1" />
                  Acceso Vitalicio
                </span>
              </div>
            </div>
          </div>

          {/* Presentational Video Container */}
          <div className="max-w-4xl mx-auto pt-6 relative group">
            {/* Ambient background glow (Destello/Glow) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[32px] blur-xl opacity-30 group-hover:opacity-45 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none"></div>
            
            <div className="relative bg-white p-3 rounded-3xl border border-blue-100/80 shadow-[0_20px_50px_rgba(37,99,235,0.1)] overflow-hidden z-10">
              {/* Sliding reflection glint (Destello de luz) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none z-20" />
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner relative">
                {showVideo && (
                  <iframe
                    className="w-full h-full absolute inset-0 z-10"
                    src="https://www.youtube.com/embed/scWg-C2MDds?autoplay=1&amp;controls=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>

          {/* Under video CTA */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("capture-card-container");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider inline-flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Asegurar mi cupo al Workshop en Vivo</span>
            </button>
          </div>
        </section>

        {/* 2. PROBLEMA SECTION */}
        <section id="problem-section" className="py-12 border-y border-slate-200/60 max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-widest block">¿La IA te resulta abrumadora?</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            Deja de perder tiempo intentando descifrar tutoriales complejos
          </h3>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            La avalancha constante de Inteligencia Artificial está cambiando el juego. Mientras tus competidores automatizan su rutina, tú sigues perdiendo horas valiosas atrapado en tareas operativas y manuales repetitivas.
          </p>
        </section>

        {/* 3. BENEFICIO PRINCIPAL */}
        <section id="key-benefits-showcase" className="py-12 space-y-16 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">SISTEMA INTEGRAL DE APRENDIZAJE</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-955 tracking-tight">
              Esto es todo lo que lograrás después del Workshop
            </h3>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Visualiza el nivel estético, organizativo y de conversión que implementarás en tu proyecto desde el primer día.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-colors">
              <DriveMedia id="1xb4XkXLwTk8FYDUvVicGDWgk1fhb5eBD" title="Fotos de alta conversión" aspectRatioClass="aspect-[4/5]" />
              <div className="text-left space-y-1 px-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono">Resultado Visual</span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Identidad de Cine</h4>
                <p className="text-xs text-slate-500">Sesiones y retratos ultrarealistas en minutos.</p>
              </div>
            </div>
            
            <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-colors md:translate-y-6">
              <DriveMedia id="1gBiCZRo9huTea050lMPxRTcpR0LSfJr_" title="Retratos cinemáticos" aspectRatioClass="aspect-[4/5]" isVideo={true} />
              <div className="text-left space-y-1 px-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono">Agilidad Extrema</span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Creación de Contenido</h4>
                <p className="text-xs text-slate-500">Diseños profesionales de anuncios y páginas web.</p>
              </div>
            </div>
            
            <div className="space-y-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-colors">
              <DriveMedia id="1BCynUuYEUcKllgqGAS4wv8fK1-iNvCu8" title="Herramientas conectadas" aspectRatioClass="aspect-[4/5]" />
              <div className="text-left space-y-1 px-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-mono">Infraestructura</span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">Automatización de Flujos</h4>
                <p className="text-xs text-slate-500">Configuración de agentes autónomos y chats directos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. QUÉ APRENDERÁS (Bloques Alternados) */}
        <section id="what-you-will-learn" className="py-12 space-y-28 md:space-y-40">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">Ruta Temática Detallada</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950 tracking-tight">
              Todo lo que aprenderás en pocas horas
            </h3>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Descubre las cuatro áreas estratégicas diseñadas meticulosamente para maximizar tu productividad, optimizar tus ventas y liberar tu tiempo de una vez por todas.
            </p>
          </div>

          {/* Bloque 1: Automatización y Agentes Inteligentes (Image Left, Content Right) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <DriveMedia id="1enSIjOedqz_v7qHlGMeMeIg6hTGRk8mw" title="Agentes IA y Automatización" aspectRatioClass="aspect-[4/3]" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-widest">
                • Automatización Radical
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-955 tracking-tight leading-snug">
                Agentes IA para Delegar Procesos
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Aprende a configurar asistentes inteligentes listos para integrarse en la estructura de tu negocio para procesar datos, responder dudas y liberar hasta el 70% de tus horas operativas.
              </p>

              <div className="border-t border-slate-200/80 pt-6 space-y-5">
                {[
                  {
                    num: "01",
                    title: "Creación de Agentes Personalizados",
                    desc: "Entrena asistentes autónomos diseñados específicamente con los datos, productos y políticas de tu negocio para operar sin supervisión constante."
                  },
                  {
                    num: "02",
                    title: "Automatización de Tareas Mecánicas",
                    desc: "Elimina por completo la carga administrativa lenta conectando herramientas de automatización que funcionan en segundo plano 24/7."
                  },
                  {
                    num: "03",
                    title: "Optimización de Soporte VIP",
                    desc: "Sustituye la atención manual de primer nivel por IA capaz de filtrar clientes calificados y agendar reuniones automáticas."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-950 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloque 2: Creación de Contenido Viral (Image Right, Content Left) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <DriveMedia id="1q4IZyMko4iAA6a0-UvqvdBT-jax3Lwb4" title="Contenido Viral" aspectRatioClass="aspect-[4/3]" isVideo={true} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-widest">
                • Marketing y Redes
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-955 tracking-tight leading-snug">
                Creación de Contenido Viral a Escala
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Diseña estructuras de comunicación y vídeos magnéticos de alta retención que capten la atención de tu audiencia desde el primer segundo sin gastar horas en redacción.
              </p>

              <div className="border-t border-slate-200/80 pt-6 space-y-5">
                {[
                  {
                    num: "01",
                    title: "Guionizado Altamente Persuasivo",
                    desc: "Descubre estructuras ganadoras optimizadas por algoritmos para redactar ganchos e hilos de retención irresistibles."
                  },
                  {
                    num: "02",
                    title: "Producción de Formato Corto",
                    desc: "Genera el material necesario para todo tu mes de reels, posts de Instagram, carruseles y copys de venta en una sola tarde de enfoque."
                  },
                  {
                    num: "03",
                    title: "Sistemas de Distribución Inteligente",
                    desc: "Programa de forma automatizada y escala tus publicaciones diarias adaptadas con el tono exacto de tu voz personal."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-950 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloque 3: Sesiones y Fotos de Cine (Image Left, Content Right) */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <DriveMedia id="1Ug0lJJNFK_1e4VxblaN8AxDTHu3Cw_G1" title="Fotografía y Mockups" aspectRatioClass="aspect-[4/3]" isVideo={true} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-widest">
                • Generación Visual
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-955 tracking-tight leading-snug">
                Fotografía y Mockups Profesionales
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Obtén retratos fotográficos realistas de tu rostro o tus productos y úsalos en anuncios de alta calidad o dentro de tus páginas web en segundos.
              </p>

              <div className="border-t border-slate-200/80 pt-6 space-y-5">
                {[
                  {
                    num: "01",
                    title: "Retratos de Fidelidad Ultrarealista",
                    desc: "Consigue fotos profesionales en cualquier pose, vestimenta u orientación artística sin cámaras ni costosas contrataciones."
                  },
                  {
                    num: "02",
                    title: "Mockups Publicitarios Premium",
                    desc: "Posiciona productos físicos en entornos fotográficos de lujo y catálogo de manera inmediata."
                  },
                  {
                    num: "03",
                    title: "Diseño Gráfico de Landing Pages",
                    desc: "Produce banners de alto impacto, recursos vectoriales y fondos estéticos que impulsan y duplican la tasa de clics."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-950 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bloque 4: Conversión y Embudo de Ventas (Image Right, Content Left) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <DriveMedia id="1WnpbBYjoHMljHZbn-GKZNxjeFYD3Hfi-" title="Prospección de Clientes" aspectRatioClass="aspect-[4/3]" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-widest">
                • Conversión de Negocio
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-955 tracking-tight leading-snug">
                Prospección y Cierre Automático
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Configura sistemas comerciales inteligentes para guiar de forma interactiva a tus clientes potenciales directo hacia tu botón de pago sin intervención manual.
              </p>

              <div className="border-t border-slate-200/80 pt-6 space-y-5">
                {[
                  {
                    num: "01",
                    title: "Calificación Autónoma de Leads",
                    desc: "Filtra el interés real de posibles clientes en tus canales de chat de forma totalmente automática y sin interrupciones."
                  },
                  {
                    num: "02",
                    title: "Ecosistemas de Embudos Persuasivos",
                    desc: "Estructura embudos de conversión ágiles que dirigen el tráfico calificado a tus pasarelas de pago las 24 horas del día."
                  },
                  {
                    num: "03",
                    title: "Sistemas de Facturación en Continuo",
                    desc: "Mantén un canal comercial de atracción, prospección y educación de prospectos que genera ingresos de forma autónoma."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-950 text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. SECCIÓN DESTACADA: CLÓNATE A TI MISMO */}
        <section id="avatar-showcase" className="py-16 sm:py-20 bg-slate-950 text-white rounded-3xl border border-slate-800 p-8 sm:p-12 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
            <DriveMedia 
              id="1KOuBoLRTltw699n14DLNFoW2dEFSgW98" 
              title="Clónate a ti mismo - Paso 1" 
              aspectRatioClass="aspect-[16/10]" 
              className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
            />
            <DriveMedia 
              id="1NxnUQXsuSTy8pevWdAyFfsl_qDZdc7u4" 
              title="Clónate a ti mismo - Paso 2" 
              aspectRatioClass="aspect-[16/10]" 
              className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
            />
            <DriveMedia 
              id="1e04gXpsxc2uQ61XAuwhv1LPYNFiD44Su" 
              title="Clónate a ti mismo - Paso 3" 
              aspectRatioClass="aspect-[16/10]" 
              className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="text-[10px] text-blue-450 font-bold uppercase tracking-widest block font-mono">Presencia Masiva 24/7</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              Clónate a ti mismo con tu Avatar de IA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
              Ahorra horas de grabación de contenido presencial y miles de dólares en costosos equipos. Descubre cómo entrenar un avatar inteligente con tu rostro y tono de voz exacto para crear vídeos de ventas y educativos de forma masiva con un solo clic.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById("capture-card-container");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(37,99,235,0.25)] active:scale-95 cursor-pointer"
              >
                Acceder al Entrenamiento Ahora
              </button>
            </div>
          </div>
        </section>

        {/* 9. BONOS SECTION (EXACTLY TWO CARDS) */}
        <section id="bonuses-section" className="py-12 space-y-16">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">Aditamentos de Crecimiento</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-955 tracking-tight">
              Bono Complementario Exclusivo para Alumnos
            </h3>
            <p className="text-sm text-slate-500">
              Inscríbete hoy por solo $27 USD y descarga inmediatamente estos materiales premium valorados en más de $150 USD.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Bono 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden">
              <div className="flex-1 space-y-3.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-150 inline-block font-mono">
                  BONO #1 • DISPONIBLE INMEDIATAMENTE
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-955 group-hover:text-blue-600 transition-colors tracking-tight">
                  Prompt Builder PRO (Agente GPT de Negocio)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Consigue acceso exclusivo a nuestro agente inteligente pre-configurado para redactar prompts optimizados, persuasivos y adaptados al sector exacto de tu negocio sin bloqueos creativos.
                </p>
              </div>
              <div className="w-full md:w-[280px] h-[170px] rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                <DriveMedia id="1eWwD3c4qS6tOVjrd-z9pbwIgnrPM4HeG" title="Prompt Builder PRO" aspectRatioClass="h-full w-full" className="h-full w-full rounded-2xl" />
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden">
              <div className="flex-1 space-y-3.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-150 inline-block font-mono">
                  BONO #2 • ACCESO DE POR VIDA
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-955 group-hover:text-blue-600 transition-colors tracking-tight">
                  Central de Prompts Maestros IA
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Una biblioteca exhaustiva con copypastes de prompts validados listos para aplicar de inmediato en tu comunicación, correos comerciales, guiones de vídeo y post de conversión.
                </p>
              </div>
              <div className="w-full md:w-[280px] h-[170px] rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                <DriveMedia id="1LF2WpQc3xlH0re3Ynb7BW3QmM3KencWK" title="Central de Prompts Maestros IA" aspectRatioClass="h-full w-full" className="h-full w-full rounded-2xl" />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                const el = document.getElementById("capture-card-container");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Asegurar Mis Bonos Exclusivos
            </button>
          </div>
        </section>

        {/* ACERCA DE MÍ (EXPERTO) */}
        <section id="about-expert-section" className="py-12 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Quién Te Acompaña</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-950">El Experto Detrás del Workshop</h3>
            <p className="text-sm text-slate-500">Aprende directamente de un profesional activo en la industria de la Inteligencia Artificial.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 md:p-12 max-w-4xl mx-auto shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              {/* Photo Container */}
              <div className="w-full lg:w-1/3 max-w-[280px] lg:max-w-none flex-shrink-0">
                <div className="relative group">
                  {/* Decorative backdrop gradients */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  
                  {/* The expert photo using DriveMedia */}
                  <DriveMedia 
                    id="1Mg2RL1pyKULbApLyTOU-h9EkSA-t-1VW" 
                    title="Experto en Inteligencia Artificial" 
                    aspectRatioClass="aspect-[4/5]"
                    className="relative z-10 rounded-2xl shadow-lg"
                  />

                  {/* Absolute badges */}
                  <span className="absolute -bottom-3 -right-3 z-20 inline-flex items-center space-x-1 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold tracking-wider uppercase border border-slate-800 shadow-sm">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Experto IA</span>
                  </span>
                </div>
              </div>

              {/* Bio & Details Container */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100/50 inline-block">
                    Mentor de Negocios & Creador
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-bold font-display text-slate-950 tracking-tight">
                    Especialista en Inteligencia Artificial y Automatización
                  </h4>
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Como <strong>experto en Inteligencia Artificial</strong>, he dedicado mi trayectoria a trabajar codo a codo con diversas marcas, creadores y negocios, ayudándoles a <strong>revolucionar y mejorar la calidad de su contenido</strong>, optimizar sus flujos de trabajo y multiplicar su visibilidad digital.
                  </p>
                  <p>
                    Mi misión es erradicar la complejidad técnica para entregarte soluciones prácticas, directas y automatizadas. Te guiaré paso a paso para que dejes de ser un simple espectador de la tecnología y te conviertas en un líder capaz de delegar procesos operativos, automatizar tus ventas y liberar tu tiempo de manera estratégica.
                  </p>
                </div>

                {/* Bullets/Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-150">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Consultor Estratégico</h5>
                      <p className="text-[11px] text-slate-500">Asesor de marcas e implementador de sistemas de IA.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Trophy className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Enfoque 100% Práctico</h5>
                      <p className="text-[11px] text-slate-500">Estrategias probadas de prompts listos para copiar y pegar.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Users2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Mentor de Impacto</h5>
                      <p className="text-[11px] text-slate-500">Guía para emprendedores digitales y pymes de Latam.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Optimización Radical</h5>
                      <p className="text-[11px] text-slate-500">Sistemas que liberan hasta el 80% de tus horas manuales.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7-DAY UNCONDITIONAL GUARANTEE SECTION */}
        <section id="unconditional-guarantee-section" className="bg-amber-50/50 rounded-3xl border border-amber-200 p-6 sm:p-10 relative overflow-hidden shadow-sm max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Guarantee Badge */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative group cursor-default">
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
                
                {/* Golden Stamp Seal */}
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg className="absolute w-full h-full animate-[spin_60s_linear_infinite] text-amber-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" />
                  </svg>

                  <div className="w-26 h-26 rounded-full bg-gradient-to-b from-white to-slate-50 border-2 border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.1)] flex flex-col items-center justify-center p-3 text-center relative z-10">
                    <div className="flex items-center gap-0.5 mb-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    </div>

                    <span className="text-3xl font-extrabold font-display leading-none text-slate-900">
                      7
                    </span>
                    <span className="text-[10px] font-black tracking-widest text-slate-750 uppercase leading-none mt-1">
                      DÍAS
                    </span>

                    <div className="absolute -bottom-1 px-3.5 py-0.5 bg-amber-500 text-white text-[8px] sm:text-[9px] font-black rounded-md shadow-sm border border-amber-400 tracking-wider uppercase">
                      GARANTÍA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Info */}
            <div className="md:col-span-9 space-y-3 text-center md:text-left">
              <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase block">PAGO 100% SEGURO — GARANTÍA ABSOLUTA</span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-950 tracking-tight leading-tight">
                Garantía Incondicional de Satisfacción y Calidad de 7 Días
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Queremos que te unas con absoluta tranquilidad. Inscríbete hoy, accede a la clase maestra en vivo el Viernes 24 de Julio, descarga la Guía PDF y utiliza el Kit de Prompts en tu negocio. Si en los primeros 7 días sientes que no aportó el valor que esperabas, puedes solicitar un reembolso directo del 100% de tu pago sin preguntas a través de Hotmart.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq-accordions-section" className="max-w-3xl mx-auto space-y-10 py-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Resolviendo Inquietudes</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">Preguntas Frecuentes</h3>
            <p className="text-sm text-slate-500">¿Tienes dudas sobre el Workshop? Despliega para informarte de cada detalle.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50/50 transition-colors text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isOpen && (
                    <div id={`faq-answer-${idx}`} className="px-5 pb-4.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. CALL TO ACTION BOTTOM / CHECKOUT INTEGRATION */}
        <section id="final-call-to-action" className="bg-gradient-to-tr from-blue-50/50 via-slate-50/80 to-indigo-50/50 backdrop-blur-lg rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden shadow-sm border border-slate-200/80 max-w-4xl mx-auto space-y-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase block">La mejor inversión para tu futuro</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight text-slate-950">
              ¿Listo para dar el siguiente gran paso?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inscríbete hoy al Workshop Clase Maestra de IA por tan solo $27 USD. Recibe acceso inmediato, la guía interactiva PDF y el Kit de Prompts de regalo.
            </p>
          </div>

          {/* Recordatorio de las condiciones */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-white/80 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-800 shadow-sm">
            <div className="space-y-1 border-r border-slate-100">
              <span className="text-[9px] text-slate-400 block uppercase">ENTRENAMIENTO</span>
              <span>Workshop IA</span>
            </div>
            <div className="space-y-1 border-r border-slate-100">
              <span className="text-[9px] text-slate-400 block uppercase">FECHA</span>
              <span>24 de Julio</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 block uppercase">INVERSIÓN</span>
              <span className="text-blue-600 font-black">$27.00 USD</span>
            </div>
          </div>

          {/* Checkout LeadForm embedded for direct purchase/registration! */}
          <div id="capture-card-container" className="max-w-md mx-auto relative z-10 text-left pt-2">
            {registeredLead ? (
              <SuccessView 
                name={registeredLead.name} 
                whatsappLink={config.whatsappLink} 
              />
            ) : (
              <LeadForm 
                config={config} 
                registeredCount={leads.length}
                onSignUp={handleNewSignUp}
              />
            )}
          </div>
          
          <p className="text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">
            * El entrenamiento en vivo se dictará de forma virtual el Viernes 24 de Julio a las 7:00 PM hora Colombia. Acceso restringido para alumnos registrados.
          </p>
        </section>

        {/* BOTTOM FOOTER */}
        <footer className="text-center py-6 border-t border-slate-200 text-[11px] text-slate-500 space-y-3 pt-8">
          <p>© 2026 Growth Spring & Content Creativo. Todos los derechos reservados.</p>
          <p className="max-w-2xl mx-auto leading-relaxed text-slate-400 text-[10px]">
            Este sitio web no forma parte de WhatsApp, Facebook ni Meta Inc. Además, este sitio NO está respaldado por WhatsApp ni Meta de ninguna manera. WHATSAPP es una marca registrada de WhatsApp Inc.
          </p>
        </footer>

      </main>

      {/* FLOATING CHECKOUT CTA BUTTON BAR */}
      {showFloating && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-1/2 md:translate-x-1/2 z-40 max-w-md w-auto bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4 animate-fade-in">
          <div className="hidden sm:flex flex-col text-left pl-2">
            <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">PRECIO DE PRE-VENTA</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-extrabold text-slate-900">$27.00 USD</span>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("capture-card-container");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-[11px] tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center space-x-2 relative overflow-hidden group"
          >
            <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>Asegurar Mi Cupo ($27)</span>
          </button>
        </div>
      )}

      {/* ADMIN FLOATING BADGE */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center space-x-2">
        <button
          id="toggle-admin-btn"
          onClick={() => setIsAdminOpen(true)}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-full shadow-lg flex items-center space-x-2 text-xs font-bold border border-slate-200 transition-all group scale-95 sm:scale-100 cursor-pointer backdrop-blur-md"
          title="Abrir Panel del Propietario (Lanzador)"
        >
          <Settings className="w-4 h-4 text-blue-650 group-hover:rotate-45 transition-transform" />
          <span>⚙️ Panel del Lanzador</span>
        </button>
      </div>

      {/* Admin Panel Modal */}
      <AdminPanel
        config={config}
        onUpdateConfig={handleUpdateConfig}
        leads={leads}
        onClearLeads={handleClearLeads}
        onAddMockLeads={handleAddMockLeads}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
