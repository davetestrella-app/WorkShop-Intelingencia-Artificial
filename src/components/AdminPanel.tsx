import React, { useState } from "react";
import { 
  Settings, 
  Users, 
  Link, 
  Calendar, 
  Download, 
  Trash2, 
  PlusCircle, 
  X, 
  Check, 
  UserCheck, 
  FileSpreadsheet, 
  Sparkles, 
  Play, 
  PhoneCall, 
  ShieldCheck 
} from "lucide-react";
import { Lead, LaunchConfig } from "../types";

interface AdminPanelProps {
  config: LaunchConfig;
  onUpdateConfig: (newConfig: LaunchConfig) => void;
  leads: Lead[];
  onClearLeads: () => void;
  onAddMockLeads: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({
  config,
  onUpdateConfig,
  leads,
  onClearLeads,
  onAddMockLeads,
  isOpen,
  onClose,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"config" | "leads">("config");
  const [whatsappLink, setWhatsappLink] = useState(config.whatsappLink);
  const [launchDate, setLaunchDate] = useState(config.launchDate);
  const [title, setTitle] = useState(config.title);
  const [subtitle, setSubtitle] = useState(config.subtitle);
  const [description, setDescription] = useState(config.description);
  const [videoEmbed, setVideoEmbed] = useState(config.videoEmbed || "");
  const [leadOffset, setLeadOffset] = useState<number>(config.leadCountOffset);
  const [emailRequired, setEmailRequired] = useState(config.emailRequired);
  const [phoneRequired, setPhoneRequired] = useState(config.phoneRequired);
  const [hotmartLink, setHotmartLink] = useState(config.hotmartLink || "https://pay.hotmart.com/example");
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  if (!isOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      whatsappLink,
      launchDate,
      title,
      subtitle,
      description,
      videoEmbed: videoEmbed.trim() || undefined,
      leadCountOffset: Number(leadOffset) || 0,
      emailRequired,
      phoneRequired,
      hotmartLink,
    });
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  // Export leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No hay leads para exportar.");
      return;
    }
    const headers = "ID,Nombre,Email,WhatsApp,Fecha Registro\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name.replace(/"/g, '""')}","${l.email.replace(
            /"/g,
            '""'
          )}","${l.phone.replace(/"/g, '""')}","${l.timestamp}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Growth-Spring-Leads-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        id="admin-panel-container"
        className="w-full max-w-4xl h-[90vh] md:h-[80vh] bg-[#0c120c]/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10 text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-950 to-black text-white border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            <div>
              <h2 className="text-xl font-semibold font-display tracking-tight">Panel de Control del Lanzamiento</h2>
              <p className="text-xs text-slate-300">Personaliza la captura y visualiza leads en tiempo real</p>
            </div>
          </div>
          <button 
            id="close-admin-panel"
            onClick={onClose} 
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            title="Cerrar panel"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 bg-black/30">
          <button
            id="tab-config-btn"
            onClick={() => setActiveTab("config")}
            className={`flex items-center space-x-2 px-6 py-3.5 font-medium text-sm transition-all border-b-2 ${
              activeTab === "config"
                ? "border-emerald-500 text-emerald-400 bg-white/5"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes de Página de Captura</span>
          </button>
          <button
            id="tab-leads-btn"
            onClick={() => setActiveTab("leads")}
            className={`flex items-center space-x-2 px-6 py-3.5 font-medium text-sm transition-all border-b-2 relative ${
              activeTab === "leads"
                ? "border-emerald-500 text-emerald-400 bg-white/5"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Lista de Leads</span>
            {leads.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs bg-emerald-500 text-white rounded-full font-bold">
                {leads.length}
              </span>
            )}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-black/20">
          {activeTab === "config" ? (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              {showSavedMsg && (
                <div id="save-success-banner" className="flex items-center justify-between p-4 mb-4 text-emerald-300 bg-emerald-500/10 rounded-xl border border-emerald-500/20 animate-pulse">
                  <span className="flex items-center text-sm font-medium">
                    <Check className="w-4 h-4 mr-2" />
                    ¡Configuración guardada con éxito! La página de captura se ha actualizado.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WHATSAPP GROUP LINK */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 flex items-center">
                    <Link className="w-4 h-4 mr-1.5 text-emerald-400" />
                    Enlace de Grupo de WhatsApp VIP
                  </label>
                  <input
                    id="input-whatsapp-link"
                    type="url"
                    required
                    placeholder="https://chat.whatsapp.com/..."
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white placeholder-slate-450"
                  />
                  <p className="text-xs text-slate-400">Un enlace real que redirigirá al prospecto al unirse.</p>
                </div>

                {/* HOTMART LINK */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-emerald-400" />
                    Enlace de Compra en Hotmart (Botón de Pago)
                  </label>
                  <input
                    id="input-hotmart-link"
                    type="url"
                    required
                    placeholder="https://pay.hotmart.com/..."
                    value={hotmartLink}
                    onChange={(e) => setHotmartLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white placeholder-slate-450"
                  />
                  <p className="text-xs text-slate-400">Enlace de Hotmart donde se completará la compra del programa.</p>
                </div>

                {/* LAUNCH TARGET DATE */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-emerald-400" />
                    Fecha de Lanzamiento (Fin de Cuenta Regresiva)
                  </label>
                  <input
                    id="input-launch-date"
                    type="datetime-local"
                    required
                    value={launchDate}
                    onChange={(e) => setLaunchDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white placeholder-slate-450"
                  />
                  <p className="text-xs text-slate-400">El temporizador en tiempo real calcula con respecto a esta fecha.</p>
                </div>

                {/* HEADLINE TITLE */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300">Súper Promesa / Título (H1)</label>
                  <input
                    id="input-page-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white"
                  />
                  <p className="text-xs text-slate-400">La oferta irresistible o promesa principal de tu lanzamiento de primavera.</p>
                </div>

                {/* HEADLINE SUBTITLE */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300">Subtítulo Descriptivo</label>
                  <input
                    id="input-page-subtitle"
                    type="text"
                    required
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white"
                  />
                </div>

                {/* ACCENT DETAILS */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300">Llamada a la Acción de Conexión (Descripción inferior)</label>
                  <textarea
                    id="input-page-description"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white"
                  />
                </div>

                {/* YOUTUBE EMBED OR IMAGE */}
                <div className="space-y-2 col-span-1">
                  <label className="block text-sm font-semibold text-slate-300 flex items-center">
                    <Play className="w-4 h-4 mr-1.5 text-emerald-400" />
                    ID o URL de Video de YouTube (Presentación)
                  </label>
                  <input
                    id="input-video-embed"
                    type="text"
                    placeholder="Ej. dQw4w9WgXcQ (ID de YouTube)"
                    value={videoEmbed}
                    onChange={(e) => setVideoEmbed(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white placeholder-slate-450"
                  />
                  <p className="text-xs text-slate-400">Deja vacío si prefieres mostrar infografía estática de alta conversión.</p>
                </div>

                {/* VALUE ADD SOCIAL PROOF OFFSET */}
                <div className="space-y-2 col-span-1">
                  <label className="block text-sm font-semibold text-slate-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-emerald-400" />
                    Inscritos Virtuales (Urgencia Social)
                  </label>
                  <input
                    id="input-lead-offset"
                    type="number"
                    min="0"
                    value={leadOffset}
                    onChange={(e) => setLeadOffset(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-white/5 text-sm text-white placeholder-slate-450"
                  />
                  <p className="text-xs text-slate-400">Suma este número al total de leads reales (ej. "¡Únete a los +{leadOffset + leads.length} ya inscritos!").</p>
                </div>

                {/* TOGGLE REQUIRED FIELDS */}
                <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10 col-span-2">
                  <h4 className="text-sm font-semibold text-white">Campos Obligatorios en el Formulario</h4>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2 text-sm text-slate-350 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailRequired}
                        onChange={(e) => setEmailRequired(e.target.checked)}
                        className="rounded border-white/10 text-emerald-500 focus:ring-emerald-500/30 h-4 w-4 bg-white/5"
                      />
                      <span>Garantizar Email</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-slate-350 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={phoneRequired}
                        onChange={(e) => setPhoneRequired(e.target.checked)}
                        className="rounded border-white/10 text-emerald-500 focus:ring-emerald-500/30 h-4 w-4 bg-white/5"
                      />
                      <span>Garantizar Teléfono (WhatsApp)</span>
                    </label>
                  </div>
                  <p className="text-xs text-slate-400">El nombre de contacto siempre es obligatorio para la personalización de saludos.</p>
                </div>
              </div>

              {/* ACTION COMMANDS */}
              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  id="save-config-submit-btn"
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm flex items-center space-x-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guardar Configuración</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* METRICS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-xs font-semibold uppercase text-slate-400">Leads Totales Hoy</div>
                  <div className="text-2xl font-bold text-emerald-450 flex items-center mt-1">
                    <UserCheck className="w-5 h-5 mr-1.5 text-emerald-450" />
                    {leads.length}
                  </div>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-xs font-semibold uppercase text-slate-400">Inscritos Presumidos en Página</div>
                  <div className="text-2xl font-bold text-blue-400 flex items-center mt-1">
                    <Sparkles className="w-5 h-5 mr-1.5 text-blue-400" />
                    {leads.length + config.leadCountOffset}
                  </div>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-xs font-semibold uppercase text-slate-400">Estado del Lanzamiento</div>
                  <div className="text-base font-bold text-amber-400 flex items-center mt-1">
                    <PhoneCall className="w-5 h-5 mr-1.5 text-amber-400 animate-bounce" />
                    Fase Captura
                  </div>
                </div>
              </div>

              {/* ACTION COMMANDS */}
              <div className="flex flex-wrap gap-3 justify-between items-center pb-2">
                <div className="flex gap-2">
                  <button
                    id="export-leads-csv-btn"
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar Excel (CSV)</span>
                  </button>
                  <button
                    id="add-mock-leads-btn"
                    onClick={onAddMockLeads}
                    className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Llenar con 5 Pilotos (Mock)</span>
                  </button>
                </div>
                <button
                  id="clear-leads-btn"
                  onClick={() => {
                    if (window.confirm("¿Seguro que deseas eliminar todos los leads de la base? Esta acción es irreversible.")) {
                      onClearLeads();
                    }
                  }}
                  className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar Base de Datos</span>
                </button>
              </div>

              {/* LEADS LIST TABLE */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden text-white">
                {leads.length === 0 ? (
                  <div className="px-6 py-12 text-center text-slate-400">
                    <Users className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-base mb-1">Aún no hay Leads registrados</h3>
                    <p className="text-xs max-w-sm mx-auto text-slate-500">
                      Los datos de las personas que completen el formulario aparecerán aquí en tiempo real para tu control.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-200 font-semibold uppercase">
                          <th className="px-4 py-3">Nombre</th>
                          <th className="px-4 py-3">Correo Electrónico</th>
                          <th className="px-4 py-3">WhatsApp / Teléfono</th>
                          <th className="px-4 py-3">Fecha de Registro</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/10">
                            <td className="px-4 py-3 font-semibold text-white">{lead.name}</td>
                            <td className="px-4 py-3 text-slate-300">{lead.email || "—"}</td>
                            <td className="px-4 py-3 font-mono text-emerald-400">{lead.phone || "—"}</td>
                            <td className="px-4 py-3 text-slate-400">
                              {new Date(lead.timestamp).toLocaleDateString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Panel seguro integrado para Content Creativo
          </span>
          <span>Actualizado hace minutos</span>
        </div>
      </div>
    </div>
  );
}
