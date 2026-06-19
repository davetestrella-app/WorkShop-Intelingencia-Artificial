import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  MessageSquare, 
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
import SuccessView from "./components/SuccessView";
import { Lead, LaunchConfig } from "./types";

// Default launch setup matching "Growth Spring" and the owner Content Creativo
const DEFAULT_CONFIG: LaunchConfig = {
  whatsappLink: "https://chat.whatsapp.com/CIRi15gFaaZDueOhDnHK2y",
  launchDate: "2026-07-24T19:00", // Viernes 24 de Julio, 7 PM Hora Colombia
  title: "Workshop Clase Maestra: Inteligencia Artificial para Negocios y Marcas Personales",
  subtitle: "Un entrenamiento práctico 100% gratuito para emprendedores y profesionales. Aprende a automatizar procesos, delegar tareas operativas a la IA, multiplicar tu creación de contenido y acelerar tus metas comerciales. Viernes 24 de Julio, 7:00 PM (Hora Colombia).",
  description: "Reserva tu plaza gratuita hoy. Al registrarte te daremos el enlace del Grupo VIP de WhatsApp exclusivo para recibir la Guía de Trabajo de IA interactiva en PDF con Prompts listos para copiar, y el enlace de Zoom.",
  videoEmbed: "", // Leave blank by default to show the high-converting spring visual infocard
  leadCountOffset: 348,
  emailRequired: true,
  phoneRequired: true,
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
      title: "IA y Automatización de Procesos",
      desc: "Cómo integrar agentes y asistentes inteligentes en tu flujo diario para procesar datos, delegar lo operativo y liberar el 70% de tu tiempo.",
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      week: "BLOQUE 2",
      title: "IA para Marca Personal y Contenido",
      desc: "Estrategias de redacción y diseño con IA generativa para crear contenidos de alto impacto para redes sociales e imantar clientes potenciales.",
      icon: Zap,
      color: "bg-teal-50 text-teal-700 border-teal-100",
    },
    {
      week: "BLOQUE 3",
      title: "Captación y Cierre de Ventas con IA",
      desc: "Cómo usar asistentes automatizados de prospección y chat inteligente para responder al instante, agendar citas y cerrar acuerdos en piloto automático.",
      icon: Trophy,
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      week: "BLOQUE 4",
      title: "Plan de Implementación Avanzado",
      desc: "Al cierre, presentaremos de forma exclusiva el programa premium de mentoría personalizada para ayudarte a desplegar IA en tu negocio.",
      icon: Users2,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
  ];

  // High converting FAQ questions
  const faqs = [
    {
      q: "¿Tiene algún costo reservar mi plaza para la Clase Maestra / Workshop?",
      a: "No, la participación en este Workshop especial es 100% gratuita. Está diseñado y financiado por Content Creativo para introducir herramientas prácticas de Inteligencia Artificial para tus proyectos y presentar al final nuestro programa avanzado completo para quienes deseen ir más allá."
    },
    {
      q: "¿Es obligatorio unirme al grupo de WhatsApp?",
      a: "Sí, es un requisito de registro y logística. Debido a la saturación del correo electrónico, todos los enlaces de acceso de Zoom de la transmisión del Viernes 24 de Julio, las alertas en vivo y la descarga de la Guía de Trabajo de IA interactiva en PDF se entregarán únicamente en el Grupo VIP silencioso."
    },
    {
      q: "¿De qué trata el programa de mentoría completo que se mencionará al final?",
      a: "Al finalizar el entrenamiento técnico de Inteligencia Artificial, presentaremos de forma exclusiva el programa premium de mentoría avanzada y personalizada para la implantación de sistemas digitales e IA en tu negocio. Compartiremos un descuento por preventa de lanzamiento y bonos únicos únicamente para los asistentes en vivo."
    },
    {
      q: "¿Habrá grabación disponible si no puedo asistir a las 7:00 PM?",
      a: "Te recomendamos asistir en vivo para hacer preguntas a los mentores e interactuar. No obstante, compartiremos una grabación por tiempo sumamente restringido a través del Grupo VIP de WhatsApp para aquellos que tengan imprevistos."
    },
    {
      q: "¿Qué herramientas necesito para participar?",
      a: "Te recomendamos conectarte desde una computadora o tableta para apreciar las demostraciones en vivo de herramientas de IA, y tener a la mano la Guía de Trabajo interactiva en PDF que te daremos gratis en el grupo de WhatsApp para rellenar tus apuntes."
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
            <div className="pt-6 border-t border-white/10 w-full flex justify-start">
              <BannerCounter targetDate={config.launchDate} />
            </div>
          </div>

          {/* Right Squeeze / Action Form Column */}
          <div id="capture-card-container" className="lg:col-span-5 w-full">
            {registeredLead ? (
              <SuccessView 
                name={registeredLead.name} 
                whatsappLink={config.whatsappLink} 
              />
            ) : (
              <LeadForm 
                config={config} 
                onSubmit={handleNewSignUp} 
                registeredCount={leads.length}
              />
            )}

            {registeredLead && (
              <div className="text-center mt-3">
                <button
                  id="reset-form-test-btn"
                  onClick={handleResetRegistration}
                  className="text-xs text-sage-500 hover:text-emerald-700 underline font-medium cursor-pointer transition-colors"
                >
                  Regresar al Formulario (Ideal para pruebas del Lanzamiento)
                </button>
              </div>
            )}
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
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 tracking-widest uppercase">REGÍSTRATE ANTES DE QUE ACABE EL TIEMPO</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight">
              ¿Listo para dar el siguiente gran salto en tu carrera?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reserva tu plaza gratuita para la Clase Maestra Workshop Growth Spring hoy mismo. Únete al Grupo VIP de WhatsApp exclusivo para recibir las credenciales de Zoom y descargar tu Guía de Trabajo PDF interactiva.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center">
              <button
                id="back-to-capture-scroll-btn"
                onClick={() => {
                  const captureEl = document.getElementById("hero-capture-section");
                  if (captureEl) {
                    captureEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-750 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-98 cursor-pointer"
              >
                RESERVAR MI PARTICIPACIÓN (ACCESO GRATUITO)
              </button>
            </div>
            
            <p className="text-[10px] text-slate-400">
              * La clase maestra interactiva se dictará en vivo el Viernes 24 de Julio a las 7:00 PM hora Colombia. Acceso restringido.
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
