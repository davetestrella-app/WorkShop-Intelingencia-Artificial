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
  Menu, 
  Sparkles, 
  BookOpen, 
  Users2 
} from "lucide-react";
import AdminPanel from "./components/AdminPanel";
import BannerCounter from "./components/BannerCounter";
import LeadForm from "./components/LeadForm";
import { Lead, LaunchConfig } from "./types";

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
  subtitle: "Automatiza tus procesos diarios, delega tareas operativas a la IA y multiplica tu contenido en tiempo récord. Entrada por solo $5 USD.",
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
        // Force upgrade if it's the old default date, contains Mentors Expert, old titles, or old WhatsApp link to ensure the user gets his workshop and correct link
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

    // Check if user is already registered in this browser session
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

    // Save registration in session to prevent double layout prompt
    setRegisteredLead(newLead);
    sessionStorage.setItem("wrowth_registered_lead", JSON.stringify(newLead));

    // Smooth scroll back to top of capture container
    const captureEl = document.getElementById("capture-card-container");
    if (captureEl) {
      captureEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetRegistration = () => {
    setRegisteredLead(null);
    sessionStorage.removeItem("wrowth_registered_lead");
  };

  // Structured timeline weeks
  const challengePhases = [
    {
      week: "BLOQUE 1",
      title: "Sistemas y Automatización",
      desc: "Integra asistentes inteligentes para delegar tareas repetitivas y liberar hasta un 70% de tu tiempo operativo.",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      week: "BLOQUE 2",
      title: "Contenido de Alto Impacto",
      desc: "Crea contenido magnético para tus redes sociales en segundos usando Inteligencia Artificial generativa.",
      icon: Zap,
      color: "bg-teal-50 text-teal-700 border-teal-100",
    },
    {
      week: "BLOQUE 3",
      title: "Prospección y Cierre",
      desc: "Usa agentes para agendar citas, responder dudas frecuentes y cerrar más ventas en piloto automático.",
      icon: Trophy,
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      week: "BLOQUE 4",
      title: "Plan de Acción Directo",
      desc: "Construye tu hoja de ruta personalizada para implantar sistemas de IA en tu negocio desde el día uno.",
      icon: Users2,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
  ];

  // High converting FAQ questions (conciertas y precisas)
  const faqs = [
    {
      q: "¿Tiene algún costo el acceso al Workshop?",
      a: "No, el acceso completo al workshop en vivo es 100% gratuito por esta ocasión especial."
    },
    {
      q: "¿Cómo recibiré los accesos y bonos?",
      a: "Al unirte directamente a nuestro Grupo VIP de WhatsApp, recibirás todas las credenciales de conexión de Zoom y los enlaces de descarga para la guía interactiva y los bonos."
    },
    {
      q: "¿Qué pasa si no puedo asistir en vivo?",
      a: "No te preocupes. La grabación del entrenamiento completo se compartirá exclusivamente por tiempo limitado dentro del Grupo VIP de WhatsApp."
    },
    {
      q: "¿Cómo funciona la garantía de satisfacción?",
      a: "Aunque el workshop y los bonos son completamente gratuitos, mantenemos nuestro estándar de calidad más alto. Si consideras que el workshop no cumplió tus expectativas de valor, puedes simplemente salir del grupo VIP sin compromisos."
    }
  ];

  return (
    <div id="main-landing-app" className="min-h-screen bg-[#0a0f0b] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      
      {/* Ambient Glowing Background Elements per Design Theme guidelines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-600/10 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[130px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Sleek Top Invitation Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-950/80 via-black/80 to-blue-950/80 backdrop-blur-md text-white text-center py-2.5 px-4 text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 border-b border-white/5 relative z-10">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>WORKSHOP CLASE MAESTRA COMPLETAMENTE EN VIVO — VIERNES 24 DE JULIO, 7:00 PM COLOMBIA</span>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-16 md:space-y-24 relative z-10">
        
        {/* HEADER BRAND */}
        <header className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500 to-emerald-700 text-white rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Presentado por Content Creativo</span>
              <h1 className="text-xl font-bold font-display tracking-tight text-white mt-1">Growth<span className="text-emerald-400 font-extrabold">.Spring</span></h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
            <span className="flex items-center text-emerald-300 bg-emerald-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-400 animate-pulse" />
              100% Confirmado
            </span>
            <span className="text-white/10">|</span>
            <div className="flex items-center text-slate-300">
              <Calendar className="w-4 h-4 mr-1.5 text-emerald-400" />
              <span>Inicia: {new Date(config.launchDate).toLocaleDateString("es-ES", { month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </header>

        {/* HERO CAPTURE AREA */}
        <section id="hero-capture-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 md:pr-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/10" />
              <span>Clase Maestra Virtual y de Aforo Limitado por Content Creativo</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-[1.1] text-white tracking-tight">
              {config.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {config.subtitle}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-emerald-450 uppercase tracking-widest">Lo que este Workshop desbloqueará para ti:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Sistemas de IA para Negocio",
                  "Automatización de Marca Personal",
                  "Guía de Prompts Interactiva PDF",
                  "Acceso Preferente al Programa Completo",
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown timer embedded directly inside the content flow */}
            <div className="pt-6 border-t border-white/10 w-full flex justify-center sm:justify-start">
              <BannerCounter targetDate={config.launchDate} />
            </div>
          </div>

          {/* Right Squeeze / Action Form Column */}
          <div id="capture-card-container" className="lg:col-span-5 w-full">
            <LeadForm 
              config={config} 
              registeredCount={leads.length}
            />
          </div>
        </section>

        {/* PAIN POINTS SECTION / "¿TE HAS SENTIDO ASÍ ALGUNA VEZ?" */}
        <section id="pain-points-section" className="space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">¿El Contexto Actual te Abruma?</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              ¿Te has sentido estancado o frustrado así?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              La llegada masiva de la Inteligencia Artificial está cambiando el juego. No te quedes atrás en la era digital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Pierdes tiempo",
                desc: "Pasas horas redactando correos, estructurando ideas o creando contenido que la IA resolvería en segundos.",
                color: "border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.03)]",
              },
              {
                title: "Inseguridad",
                desc: "Sientes que todos avanzan rápido con la Inteligencia Artificial, pero tú no sabes por dónde arrancar.",
                color: "border-blue-500/25 shadow-[0_0_20px_rgba(59,130,246,0.03)]",
              },
              {
                title: "Prompts Genéricos",
                desc: "Te frustra que ChatGPT o Claude te den respuestas genéricas, vacías o inútiles para tu negocio.",
                color: "border-indigo-500/25 shadow-[0_0_20px_rgba(99,102,241,0.03)]",
              },
              {
                title: "Operación Manual",
                desc: "Buscas un método directo para delegar tu carga de trabajo y enfocarte en multiplicar tus resultados.",
                color: "border-teal-500/25 shadow-[0_0_20px_rgba(20,184,166,0.03)]",
              }
            ].map((pain, i) => (
              <div 
                key={i} 
                className={`bg-[#0a0d0b]/80 backdrop-blur-md rounded-2xl border ${pain.color} p-5 hover:scale-[1.02] hover:border-emerald-500/50 transition-all group relative overflow-hidden`}
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-mono font-bold text-xs text-slate-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all border border-white/5">
                  0{i+1}
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                  {pain.title}
                </h4>
                <p className="text-[11px] text-slate-350 leading-relaxed mt-2.5">
                  {pain.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-400 italic">
              No estás solo en este camino. Es precisamente para ayudarte a erradicar estos bloqueos que creamos el <span className="text-emerald-400 font-bold">Workshop de IA</span>.
            </p>
          </div>
        </section>

        {/* GRAPHICAL VALUE REPRESENTATION / OPTIONAL EMBED VIDEO */}
        <section id="features-and-video-section" className="py-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.02)] p-6 sm:p-10 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center space-x-1.5">
              <span>CONTENIDO RELEVANTE EXCLUSIVO</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              ¿Cómo funciona este Workshop y Clase Maestra?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              No es otro curso teórico pregrabado. Es una experiencia práctica en vivo donde conocerás herramientas avanzadas de Inteligencia Artificial aplicadas de forma directa y sin tecnicismos complejos para automatizar tu negocio, impulsar tu marca personal y potenciar tus emprendimientos hoy mismo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Column (either YouTube Embed or high quality promo box) */}
            <div className="lg:col-span-6 w-full h-full flex flex-col justify-center">
              {config.videoEmbed ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-950">
                  <iframe
                    id="youtube-presentational-video"
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${config.videoEmbed.trim()}`}
                    title="Presentación Desafío Growth Spring"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-emerald-950/40 via-black/40 to-blue-950/30 backdrop-blur-md text-white rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between aspect-video select-none">
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-2 relative z-10">
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      COMUNIDAD DE IMPACTO
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-display leading-snug">
                      Growth.Spring: Workshop y Clase Maestra
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      El nombre "Growth Spring" representa el crecimiento estratégico ('Growth') floreciendo con el dinamismo y vigor de la primavera o resurgimiento ('Spring'). Un paso adelante en tu vida personal y profesional.
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/10 pt-4 relative z-10 text-xs text-slate-300">
                    <span className="font-semibold flex items-center">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1 text-amber-400 animate-pulse" />
                      Soporte de Content Creativo
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400">100% ONLINE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Core Value points */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">Control mediante WhatsApp VIP</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Evita correos en spam. Al registrarte te unes directamente al grupo exclusivo silencioso. Recibirás recordatorios 1 hora antes de iniciar cada sesión grupal.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">Demostraciones de IA en Vivo y Casos Reales</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Verás en tiempo real cómo configurar herramientas de IA de última generación para tu negocio, marca personal y proyectos, de la mano de expertos prácticos.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shadow-sm">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">Kit de Prompts y Guía PDF de Trabajo IA</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Recibirás un cuaderno de trabajo interactivo y un listado de prompts validados listos para copiar, pegar y adaptar a tu propio nicho comercial.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TIMELINE ARCHITECTURE (The 4 Weeks/Phases) */}
        <section id="chronicle-timeline-section" className="space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ruta de Aprendizaje</span>
            <h3 className="text-3xl font-bold font-display text-white">Ejes Temáticos de la Clase Maestra</h3>
            <p className="text-sm sm:text-base text-slate-300">
              Un recorrido dinámico donde reestructuraremos tu flujo de trabajo con Inteligencia Artificial y conocerás nuestra estrategia para marcas o negocios reales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challengePhases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-5.5 hover:border-emerald-500/50 hover:bg-white/10 transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-3xl flex items-center justify-center border-l border-b border-white/10 font-bold font-display text-xs text-slate-400">
                    0{i+1}
                  </div>

                  <div className="space-y-4">
                    <span className="inline-flex px-3 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                      {phase.week}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4 flex items-center text-[11px] font-bold text-emerald-400">
                    <Icon className="w-4 h-4 mr-1.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                    <span>Clases en Directo y Guía PDF</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* NEW BENTO GRID SHOWCASE LIKE PORTUGUESE DESIGN */}
        <section id="bento-learning-showcase" className="space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Habilidades Prácticas de Creación Visual</span>
            <h3 className="text-3xl font-extrabold font-display text-white tracking-tight">
              ¿Qué vas a aprender a crear con Inteligencia Artificial?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Aprende el método paso a paso para dominar la generación visual y la automatización creativa, logrando resultados profesionales desde el primer día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Wide portraits */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-2">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Crear <span className="text-white font-extrabold">retratos y sesiones fotográficas ultrarealistas</span> y transformarlas en composiciones de cine con <span className="text-emerald-400 font-extrabold">calidad surreal</span>.
                </p>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
                <img 
                  src={cinematicPortraits} 
                  alt="Retratos ultrarealistas" 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Card 2: Prompts */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-1">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Utilizar prompts avanzados para generar <span className="text-white font-extrabold">imágenes y recursos visuales</span> de nivel <span className="text-emerald-400 font-extrabold">cinematográfico</span>.
                </p>
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-black/40 flex items-center justify-center">
                <img 
                  src={aiPromptIcon} 
                  alt="Prompts e imágenes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Card 3: Photoshop/Integrations */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-1">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Cómo <span className="text-white font-extrabold">perfeccionar tus imágenes</span> e integrarlas con herramientas avanzadas para tu negocio.
                </p>
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-black/40 flex items-center justify-center">
                <img 
                  src={connectedTools} 
                  alt="Integraciones de diseño" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Card 4: Main IAs */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-1">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Dominar las <span className="text-white font-extrabold">principales I.A.s</span> de generación visual y automatización aplicadas a <span className="text-emerald-400 font-extrabold">tu rutina</span>.
                </p>
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-black/40 flex items-center justify-center">
                <img 
                  src={aiEcosystem} 
                  alt="Ecosistema de I.A.s" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Card 5: Reference and Prompt */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-1">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Generar <span className="text-white font-extrabold">imágenes y mockups impactantes</span> a partir de imágenes de <span className="text-emerald-400 font-extrabold">referencia y descripciones</span>.
                </p>
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-black/40 flex items-center justify-center">
                <img 
                  src={promptInputBox} 
                  alt="Generación por referencia" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Card 6: Creative assets */}
            <div className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between md:col-span-3">
              <div className="space-y-4 mb-6">
                <p className="text-sm sm:text-base text-slate-350 leading-relaxed font-sans">
                  Crear en la práctica <span className="text-white font-extrabold">creativos visuales de alto impacto</span> para tus redes, anuncios y <span className="text-emerald-400 font-extrabold">páginas web</span>.
                </p>
              </div>
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
                <img 
                  src={creativeAssets} 
                  alt="Diseños de alto impacto" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/85 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </section>

        {/* EXCLUSIVE BONUSES SECTION / "BONOS EXCLUSIVOS INCLUIDOS" */}
        <section id="exclusive-bonuses-section" className="space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Oferta Especial de Lanzamiento</span>
            <h3 className="text-3xl font-extrabold font-display text-white tracking-tight">
              Recibe estos Bonos Exclusivos al Unirte Hoy
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Queremos darte todo el soporte para que implementes la IA de inmediato. Al unirte hoy de forma <span className="text-emerald-400 font-extrabold">100% gratuita</span>, te llevas todo esto de regalo:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                bonus: "BONO #1",
                title: "Prompt Builder PRO (Agente GPT)",
                value: "$97.00 USD",
                desc: "Un asistente de IA inteligente pre-configurado para redactar prompts avanzados, específicos y personalizados para tu negocio u oferta comercial en segundos.",
                icon: Sparkles,
                badge: "¡GRATIS HOY!",
                img: promptBuilder
              },
              {
                bonus: "BONO #2",
                title: "Central de Prompts Maestros IA",
                value: "$49.00 USD",
                desc: "Una biblioteca exclusiva con más de 200 copypastes de prompts validados por creadores de marca para automatizar emails, guiones de video y post de venta.",
                icon: BookOpen,
                badge: "¡GRATIS HOY!",
                img: libraryPrompts
              },
              {
                bonus: "BONO #3",
                title: "Comunidad VIP y Enlace de Zoom",
                value: "$49.00 USD",
                desc: "Acceso inmediato al grupo exclusivo silencioso de WhatsApp para descargar las guías PDF, networking, resolver dudas y recibir el enlace privado de Zoom.",
                icon: Users2,
                badge: "¡GRATIS HOY!",
                img: vipCommunity
              },
            ].map((bonus, idx) => {
              const Icon = bonus.icon;
              return (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-[#0c140f] to-[#040805] rounded-2xl border border-emerald-500/15 p-5 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)] transition-all group relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Neon tag */}
                  <span className="absolute top-4 right-4 z-10 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-extrabold tracking-wider">
                    {bonus.badge}
                  </span>

                  <div className="space-y-4">
                    {/* Styled Image Frame */}
                    {bonus.img && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        <img 
                          src={bonus.img} 
                          alt={bonus.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040805]/70 via-transparent to-transparent"></div>
                      </div>
                    )}

                    <span className="text-xs font-bold text-emerald-400 tracking-wider block">
                      {bonus.bonus}
                    </span>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {bonus.title}
                      </h4>
                      <p className="text-xs text-slate-350 leading-relaxed">
                        {bonus.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/5 mt-5 flex items-center justify-between">
                    <div className="flex items-center text-xs font-bold text-slate-400">
                      <Icon className="w-4 h-4 mr-1.5 text-emerald-400" />
                      <span>Material Digital</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 line-through">
                      Valorado en {bonus.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7-DAY UNCONDITIONAL GUARANTEE SECTION */}
        <section id="unconditional-guarantee-section" className="bg-gradient-to-r from-[#0c130e] to-black rounded-3xl border border-emerald-500/25 p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Guarantee Badge */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative group cursor-default">
                {/* Ambient gold glow */}
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500 pointer-events-none"></div>
                
                {/* Golden Stamp Seal */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 relative flex items-center justify-center">
                  {/* Scalloped vector-like circle stroke simulating a stamp */}
                  <svg className="absolute w-full h-full animate-[spin_60s_linear_infinite] text-amber-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="gold-stamp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#gold-stamp-gradient)" strokeWidth="2.5" strokeDasharray="5 3" />
                    <circle cx="50" cy="50" r="41" stroke="url(#gold-stamp-gradient)" strokeWidth="1" opacity="0.6" />
                  </svg>

                  {/* Inner Golden Seal Plate */}
                  <div className="w-26 h-26 sm:w-30 sm:h-30 rounded-full bg-gradient-to-b from-[#1e1509] to-[#0a0703] border-2 border-amber-500/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center p-3 text-center relative z-10">
                    
                    {/* Curved Stars at the top */}
                    <div className="flex items-center gap-0.5 mb-1.5 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 -translate-y-0.5" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 -translate-y-1" />
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 -translate-y-0.5" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>

                    {/* Main Number 7 */}
                    <span className="text-3xl sm:text-4xl font-extrabold font-display leading-none bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-500 bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      7
                    </span>
                    
                    {/* Main text: DÍAS */}
                    <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-amber-200/90 uppercase leading-none mt-1">
                      DÍAS
                    </span>

                    {/* Curved Guarantee banner ribbon style */}
                    <div className="absolute -bottom-1 px-3.5 py-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-black text-[8px] sm:text-[9px] font-black rounded-md shadow-md border border-amber-300/40 tracking-wider uppercase">
                      GARANTÍA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Info */}
            <div className="md:col-span-9 space-y-3.5 text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-300 tracking-widest uppercase">ACCESO 100% LIBRE — CERO RIESGO</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-tight">
                Garantía Incondicional de Satisfacción y Calidad
              </h3>
              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed">
                Queremos que te unas con absoluta tranquilidad. Únete hoy, accede a la clase maestra en vivo el Viernes 24 de Julio, descarga la Guía PDF y utiliza el Kit de Prompts en tu negocio. Aunque el workshop es completamente gratis, mantenemos nuestro compromiso de brindarte la máxima calidad. Si en los primeros 7 días sientes que no aportó el valor que esperabas, puedes simplemente salir del grupo VIP de WhatsApp sin ningún tipo de compromiso.
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONY / SOCIAL PROOF */}
        <section id="testimonials-section" className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Resultados Duraderos</span>
            <h3 className="text-3xl font-bold font-display text-white">Alumnos que ya vivieron la experiencia</h3>
            <p className="text-sm text-slate-300">La mejor prueba son las voces de quienes superaron el reto y alcanzaron metas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Llevaba meses intentando entender cómo usar la IA en mi marca personal y negocio de servicios. Con este workshop de Content Creativo logré estructurar mis primeros prompts y automatizar la creación de contenido del mes en solo una tarde.",
                name: "Carlos Ruiz",
                role: "Emprendedor — España",
                rating: 5
              },
              {
                text: "Increíble la calidad del material. El grupo VIP de WhatsApp es súper directo y silencioso. La guía interactiva de trabajo en PDF tiene los trucos exactos para delegar tareas con IA y ahorrarme horas de diseño.",
                name: "Laura Martínez",
                role: "Creadora de Marca Personal — Colombia",
                rating: 5
              },
              {
                text: "El workshop me abrió los ojos sobre cómo las pequeñas empresas podemos competir usando Inteligencia Artificial. La estructura es amigable y las demostraciones en vivo fueron sumamente reveladoras y prácticas.",
                name: "Mariano Santos",
                role: "Consultor de Negocios — México",
                rating: 5
              }
            ].map((testi, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5.5 flex flex-col justify-between shadow-lg hover:border-emerald-500/30 transition-all">
                <div className="space-y-3.5">
                  <div className="flex gap-1">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-405 stroke-amber-405 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{testi.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-4 flex items-center space-x-3.5">
                  <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center font-bold text-xs text-emerald-300 border border-white/10">
                    {testi.name.slice(0, 2)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{testi.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACCORDION FAQ */}
        <section id="faq-accordions-section" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Resolviendo Inquietudes</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">Preguntas Frecuentes</h3>
            <p className="text-sm text-slate-300">¿Tienes dudas adicionales sobre el Workshop Growth Spring? Despliega para informarte.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-md overflow-hidden transition-all duration-300"
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-white hover:text-emerald-300 hover:bg-white/2 transition-colors text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isOpen && (
                    <div id={`faq-answer-${idx}`} className="px-5 pb-4.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-black/10 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION BOTTOM CAPTURE FLUID */}
        <section id="final-call-to-action" className="bg-gradient-to-tr from-emerald-950/40 via-black/40 to-blue-950/30 backdrop-blur-lg text-white rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 tracking-widest uppercase">ASEGURA TU CUPO ANTES DE QUE SE AGOTEN LOS ACCESOS</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
              ¿Listo para dar el siguiente gran salto en tu carrera?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Únete gratis al Workshop de IA hoy mismo. Recibe acceso inmediato al Grupo VIP de WhatsApp exclusivo para descargar tu Guía interactiva PDF, el Kit de Prompts y recibir las credenciales de conexión de Zoom para el entrenamiento en vivo.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center">
              <a
                id="whatsapp-cta-direct-btn"
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-450 hover:via-emerald-400 hover:to-green-550 text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] active:scale-98 cursor-pointer relative overflow-hidden group inline-flex items-center justify-center space-x-2.5"
              >
                {/* Shimmer / Destello Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                
                <MessageCircle className="w-5 h-5 animate-pulse relative z-10 fill-white/10 text-white" />
                <span className="relative z-10 font-black tracking-wide">UNIRSE AL GRUPO DE WHATSAPP</span>
              </a>
            </div>
            
            <p className="text-[10px] text-slate-400">
              * El entrenamiento en vivo se dictará de forma virtual el Viernes 24 de Julio a las 7:00 PM hora Colombia. Acceso restringido para miembros del grupo VIP.
            </p>
          </div>
        </section>

        {/* BOTTOM METADATA & SUPPORT INFO */}
        <footer className="text-center py-4 border-t border-white/10 text-xs text-slate-450 space-y-2">
          <p>© 2026 Growth Spring & Content Creativo. Todos los derechos reservados.</p>
          <p className="max-w-2xl mx-auto text-[11px] leading-relaxed text-slate-500">
            Este sitio web no forma parte de WhatsApp, Facebook ni Meta Inc. Además, este sitio NO está respaldado por WhatsApp ni Meta de ninguna manera. WHATSAPP es una marca registrada de WhatsApp Inc.
          </p>
        </footer>

      </main>

      {/* FLOATING CHECKOUT CTA BUTTON BAR */}
      {showFloating && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-1/2 md:translate-x-1/2 z-40 max-w-md w-auto bg-[#0a0f0b]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_10px_40px_rgba(16,185,129,0.25)] flex items-center justify-between gap-4 animate-fade-in">
          <div className="hidden sm:flex flex-col text-left pl-2">
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">ACCESO INMEDIATO</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-extrabold text-white">100% GRATIS</span>
            </div>
          </div>
          <a
            id="floating-buy-cta"
            href={config.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-750 text-white font-extrabold rounded-xl text-[11px] tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] active:scale-95 cursor-pointer flex items-center justify-center space-x-2 relative overflow-hidden group"
          >
            {/* Shimmer / Destello Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
            
            <MessageCircle className="w-3.5 h-3.5 text-white animate-pulse relative z-10" />
            <span className="relative z-10">UNIRSE A WHATSAPP</span>
          </a>
        </div>
      )}

      {/* ADMIN FLOATING BADGE & CONTROLLER PANEL VIEW */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center space-x-2">
        <button
          id="toggle-admin-btn"
          onClick={() => setIsAdminOpen(true)}
          className="px-4 py-2.5 bg-[#0e1610]/95 hover:bg-emerald-950 text-white rounded-full shadow-2xl flex items-center space-x-2 text-xs font-bold border border-white/10 hover:border-emerald-500 transition-all group scale-95 sm:scale-100 cursor-pointer backdrop-blur-md"
          title="Abrir Panel del Propietario (Lanzador)"
        >
          <Settings className="w-4 h-4 text-emerald-450 group-hover:rotate-45 transition-transform" />
          <span>⚙️ Panel del Lanzador</span>
        </button>
      </div>

      {/* Admin Panel Drawer Modal */}
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
