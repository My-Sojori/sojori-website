"use client";

import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA, SectionHead } from "@/components/SharedComponents";
import Link from "next/link";

// ========================================
// WhatsApp Phone Component (Réutilisable)
// ========================================

interface Message {
  from: "user" | "sojori" | "system";
  text: string;
  time: string;
  type?: "text" | "date" | "system";
  ext?: string;
  status?: "read" | "sent";
}

interface WhatsAppPhoneProps {
  title: string;
  subtitle: string;
  messages: Message[];
  time?: string;
}

function WhatsAppPhone({ title, subtitle, messages, time = "14:32" }: WhatsAppPhoneProps) {
  return (
    <div style={{
      width: 340, height: 680, borderRadius: 38, padding: 10,
      background: "linear-gradient(180deg, #1a1a1f, #0a0a0d)",
      boxShadow: "0 40px 80px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1) inset",
      flexShrink: 0,
    }}>
      <div style={{width: "100%", height: "100%", borderRadius: 32, background: "#0b1418", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative"}}>
        {/* Dynamic Island */}
        <div style={{position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 28, borderRadius: 14, background: "#000", zIndex: 10}} />

        {/* Status Bar */}
        <div style={{display: "flex", justifyContent: "space-between", padding: "14px 24px 8px", fontSize: 11, color: "#fff", fontWeight: 600, fontFamily: "var(--font-mono)"}}>
          <span>{time}</span>
          <span>📶 5G ⚡ 87%</span>
        </div>

        {/* WhatsApp Header */}
        <div style={{background: "#075e54", padding: "14px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(0,0,0,0.2)"}}>
          <span style={{color: "#fff", fontSize: 18}}>‹</span>
          <div style={{width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #f4cf5e, #e6b022)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#1a1408", position: "relative"}}>
            S
            <span style={{position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: "#10b981", border: "2px solid #075e54"}} />
          </div>
          <div style={{flex: 1, lineHeight: 1.2}}>
            <div style={{color: "#fff", fontSize: 13.5, fontWeight: 600}}>{title}</div>
            <div style={{color: "rgba(255,255,255,0.8)", fontSize: 10.5}}>{subtitle}</div>
          </div>
          <span style={{color: "#fff", fontSize: 15, opacity: 0.9}}>📞</span>
          <span style={{color: "#fff", fontSize: 15, opacity: 0.9}}>⋮</span>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          background: "#0b1418",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23173a3f' opacity='0.35'%3E%3Cpath d='M30 5 L35 15 L30 25 L25 15 Z'/%3E%3Ccircle cx='10' cy='40' r='3'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          padding: "12px 10px",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {messages.map((m, i) => <Bubble key={i} {...m} />)}
        </div>

        {/* Input Area */}
        <div style={{background: "#0b1418", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid rgba(255,255,255,0.05)"}}>
          <div style={{flex: 1, background: "#1f2c33", borderRadius: 22, padding: "9px 14px", color: "rgba(255,255,255,0.5)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 8}}>
            <span>😊</span>
            <span>Message</span>
            <span style={{marginLeft: "auto", opacity: 0.7}}>📎 📷</span>
          </div>
          <div style={{width: 38, height: 38, borderRadius: "50%", background: "#00a884", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16}}>🎤</div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ from, text, time, type = "text", ext, status }: Message) {
  const isUser = from === "user";
  const isAI = from === "sojori";

  if (type === "date") return <div style={{alignSelf: "center", background: "rgba(15,30,38,0.8)", color: "rgba(255,255,255,0.6)", fontSize: 10, padding: "4px 11px", borderRadius: 11, margin: "6px 0", fontWeight: 500}}>{text}</div>;
  if (type === "system") return <div style={{alignSelf: "center", background: "rgba(255,217,90,0.15)", color: "#f4cf5e", fontSize: 10, padding: "5px 12px", borderRadius: 11, margin: "4px 0", display: "flex", alignItems: "center", gap: 5, fontWeight: 500}}>🔒 {text}</div>;

  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "80%",
      background: isUser ? "#005c4b" : (isAI ? "linear-gradient(135deg, #1f2c33, #243038)" : "#1f2c33"),
      borderRadius: isUser ? "13px 13px 2px 13px" : "13px 13px 13px 2px",
      padding: "8px 11px 5px",
      position: "relative",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
      border: isAI ? "1px solid rgba(244,207,94,0.2)" : "none",
    }}>
      {isAI && <div style={{display: "flex", alignItems: "center", gap: 4, marginBottom: 4, color: "#f4cf5e", fontSize: 9, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.6px"}}>✨ SOJORI AI</div>}
      <div style={{color: "#e9edef", fontSize: 13, lineHeight: 1.45, whiteSpace: "pre-wrap"}}>{text}</div>
      {ext && <div style={{marginTop: 7, padding: 9, background: "rgba(0,0,0,0.3)", borderRadius: 7, fontSize: 11.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.4}}>{ext}</div>}
      <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 3, fontSize: 9.5, color: "rgba(255,255,255,0.55)"}}>
        <span>{time}</span>
        {isUser && <span style={{color: status === "read" ? "#53bdeb" : "rgba(255,255,255,0.55)"}}>✓✓</span>}
      </div>
    </div>
  );
}

// ========================================
// System Data
// ========================================

const SYSTEMS = [
  {
    id: "guest",
    label: "WhatsApp Guest",
    badge: "💬 Voyageurs",
    icon: "🌟",
    color: "#25D366",
    stat: "87% autonome"
  },
  {
    id: "staff",
    label: "WhatsApp Staff",
    badge: "👷 Équipe",
    icon: "🔧",
    color: "#34d399",
    stat: "Real-time"
  },
  {
    id: "admin",
    label: "WhatsApp Admin",
    badge: "🎯 PMS Light",
    icon: "📊",
    color: "#a78bfa",
    stat: "6 fonctions"
  },
  {
    id: "booking",
    label: "Direct Booking",
    badge: "💰 Sans OTA",
    icon: "🎫",
    color: "#f59e0b",
    stat: "0% commission"
  },
];

const GUEST_MESSAGES: Message[] = [
  { from: "system", type: "date", text: "Aujourd'hui", time: "" },
  { from: "sojori", text: "Bonjour Sarah ! 👋 Bienvenue à Paris.\n\nVotre check-in est dans 2h à l'appartement Montmartre. Voici vos accès :", time: "13:00" },
  { from: "sojori", text: "🔑 Code porte : 4729\n📍 47 Rue des Abbesses\n🚇 Métro : Abbesses (ligne 12)", ext: "WiFi : SOJORI_PARIS\nMot de passe : paris2024", time: "13:00" },
  { from: "user", text: "Merci ! Je peux arriver plus tôt vers 14h ?", time: "13:15", status: "read" },
  { from: "sojori", text: "Parfait ✓ L'appartement sera prêt à 14h.\n\nJ'ai prévenu l'équipe. Lucas vous attendra devant l'immeuble pour vous accueillir 🙂", time: "13:16" },
  { from: "user", text: "Super, merci beaucoup ! 🙏", time: "13:17", status: "read" },
  { from: "system", type: "system", text: "Check-in effectué · QR code scanné", time: "" },
];

const STAFF_MESSAGES: Message[] = [
  { from: "system", type: "date", text: "Aujourd'hui · 08:30", time: "" },
  { from: "sojori", text: "Bonjour Sophie 👋\n\n*📋 Vos tâches du jour (3)*\n\n1️⃣ Ménage · Appt Montmartre\n   Check-out 11h · Arrivée 15h\n   ⏱️ 2h estimées\n\n2️⃣ Maintenance · Appt Marais\n   AC à vérifier · Guest signalement\n   ⏱️ 30 min\n\n3️⃣ Linge · Studio Bastille\n   Changement draps · Avant 14h\n   ⏱️ 45 min", time: "08:30" },
  { from: "user", text: "Reçu ! Je commence par Montmartre ✓", time: "08:45", status: "read" },
  { from: "sojori", text: "Parfait 🙌 J'ai mis la tâche en cours.\n\nN'oublie pas de scanner le QR à l'arrivée pour démarrer le chrono.", time: "08:45" },
  { from: "system", type: "system", text: "Tâche #1 démarrée · Géolocalisation OK", time: "" },
  { from: "user", text: "Ménage terminé ! Photos envoyées 📸", time: "10:20", status: "read" },
  { from: "sojori", text: "Super Sophie ! ⭐\n\nTâche validée · 1h50 (10 min d'avance)\nProchaine tâche : Appt Marais à 11h", time: "10:21" },
];

const ADMIN_MESSAGES: Message[] = [
  { from: "system", type: "date", text: "Lundi 15:00", time: "" },
  { from: "sojori", text: "Bonjour Marc 👋\n\n*🎯 Tableau de bord*\n\nTapez la lettre correspondante :\n\n*T* - Tâches en attente (3)\n*D* - Déclarations arrivée/départ (2)\n*R* - Réservations check-in/out (5)\n*M* - Messages guests (7)\n*V* - Avis à répondre (2)\n*L* - Demandes réservation (4)", time: "15:00" },
  { from: "user", text: "M", time: "15:05", status: "read" },
  { from: "sojori", text: "💬 *Messages en attente (7)*\n\n1. Sarah · Appt Montmartre\n   « WiFi code ? » · il y a 15 min\n   [Répondre]\n\n2. Marco · Villa Barcelona\n   « AC doesn't work » · il y a 32 min\n   [URGENT]\n\n3. Emma · Studio Marais\n   « Late checkout possible? » · il y a 1h\n   [Répondre]", time: "15:05" },
  { from: "user", text: "Je prends Marco en priorité", time: "15:06", status: "read" },
  { from: "sojori", text: "Conversation transférée ✓\n\nVous pouvez maintenant échanger directement avec Marco.\n\nL'IA a déjà proposé : vérifier disjoncteur + envoi technicien si besoin.", time: "15:06" },
];

const BOOKING_MESSAGES: Message[] = [
  { from: "system", type: "date", text: "Mardi 10:00", time: "" },
  { from: "user", text: "Bonjour, je cherche un appartement à Paris du 15 au 20 juin pour 2 personnes", time: "10:00", status: "read" },
  { from: "sojori", text: "Bonjour ! 👋\n\nJ'ai trouvé *3 appartements disponibles* pour vos dates :\n\n🏠 *Appt Montmartre* · 65m²\n   €120/nuit · 2 personnes\n   ⭐ 4.9 (47 avis)\n   [Voir photos]\n\n🏠 *Studio Marais* · 45m²\n   €95/nuit · 2 personnes\n   ⭐ 4.8 (32 avis)\n   [Voir photos]\n\n🏠 *Loft République* · 80m²\n   €150/nuit · 4 personnes\n   ⭐ 5.0 (12 avis)\n   [Voir photos]", time: "10:01" },
  { from: "user", text: "L'appartement Montmartre m'intéresse ! C'est combien au total ?", time: "10:03", status: "read" },
  { from: "sojori", text: "🏠 *Appartement Montmartre*\n5 nuits · 15-20 juin 2025\n\n💰 *Tarif*\n€120 × 5 nuits = €600\nFrais ménage = €40\n*Total = €640*\n\n✨ Réservation directe :\n❌ Pas de commission Airbnb\n💳 Paiement sécurisé\n🎁 Check-in flexible\n\n[Réserver maintenant]", time: "10:03" },
  { from: "user", text: "Parfait, je réserve !", time: "10:05", status: "read" },
  { from: "system", type: "system", text: "Paiement reçu €640 · Réservation confirmée", time: "" },
  { from: "sojori", text: "🎉 *Réservation confirmée !*\n\nVous recevrez sous 5 min :\n✉️ Email de confirmation\n📱 Accès guest app\n📍 Guidebook Paris\n\nHâte de vous accueillir Sarah ! 🙂", time: "10:06" },
];

// ========================================
// Main Component
// ========================================

export default function WhatsAppPage() {
  const [activeSystem, setActiveSystem] = useState("guest");

  const currentMessages =
    activeSystem === "guest" ? GUEST_MESSAGES :
    activeSystem === "staff" ? STAFF_MESSAGES :
    activeSystem === "admin" ? ADMIN_MESSAGES :
    BOOKING_MESSAGES;

  const currentTitle =
    activeSystem === "guest" ? "Sojori AI" :
    activeSystem === "staff" ? "Sojori Staff" :
    activeSystem === "admin" ? "Sojori Admin" :
    "Sojori Booking";

  const currentSubtitle =
    activeSystem === "guest" ? "Online · répond en quelques secondes" :
    activeSystem === "staff" ? "Planning & tâches temps réel" :
    activeSystem === "admin" ? "PMS Light via WhatsApp" :
    "Réservation directe sans OTA";

  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle="WhatsApp Systems" />

        {/* Hero */}
        <PageHero
          badge="💬 WhatsApp · Au cœur de Sojori"
          title={<>4 systèmes WhatsApp.<br /><span className="gradient-text">Une plateforme unifiée.</span></>}
          subtitle="Sojori utilise WhatsApp comme canal principal pour communiquer avec vos voyageurs, votre équipe, et vous permettre de gérer votre activité depuis votre téléphone. Pas d'app à télécharger. Juste WhatsApp."
        />

        {/* System Badges */}
        <section style={{padding: "0 32px 60px"}}>
          <div style={{maxWidth: 1100, margin: "0 auto"}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12}}>
              {SYSTEMS.map(sys => (
                <button
                  key={sys.id}
                  onClick={() => setActiveSystem(sys.id)}
                  style={{
                    padding: "18px 16px",
                    borderRadius: 14,
                    background: activeSystem === sys.id ?
                      `linear-gradient(135deg, ${sys.color}15, ${sys.color}08)` :
                      "rgba(255,255,255,0.02)",
                    border: activeSystem === sys.id ?
                      `1.5px solid ${sys.color}40` :
                      "1.5px solid var(--glass-border)",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    textAlign: "center",
                  }}
                >
                  <div style={{fontSize: 32, marginBottom: 8}}>{sys.icon}</div>
                  <div style={{fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 4}}>{sys.label}</div>
                  <div style={{fontSize: 11, color: "var(--text-3)"}}>{sys.stat}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section style={{padding: "20px 32px 80px", background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.03) 50%, transparent)"}}>
          <div style={{maxWidth: 1150, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", textAlign: "center", marginBottom: 28}}>
              ● {SYSTEMS.find(s => s.id === activeSystem)?.badge}
            </div>

            <div style={{display: "grid", gridTemplateColumns: "380px 1fr", gap: 70, alignItems: "center"}}>
              {/* Phone Mockup */}
              <div style={{display: "flex", justifyContent: "center", position: "relative"}}>
                <div style={{position: "absolute", inset: "-50px", background: `radial-gradient(circle, ${SYSTEMS.find(s => s.id === activeSystem)?.color}20, transparent 70%)`, pointerEvents: "none", filter: "blur(40px)"}} />
                <WhatsAppPhone
                  title={currentTitle}
                  subtitle={currentSubtitle}
                  messages={currentMessages}
                />
              </div>

              {/* Details */}
              <div>
                {activeSystem === "guest" && (
                  <>
                    <h2 style={{fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15}}>
                      WhatsApp Guest <span className="gradient-text">Intelligence</span>
                    </h2>
                    <p style={{fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28}}>
                      L'IA Sojori répond à vos voyageurs 24/7 sur WhatsApp. Check-in autonome, support instantané, upsell intelligent, demande d'avis. Le tout en 12 langues.
                    </p>

                    <div style={{marginBottom: 28}}>
                      <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 14}}>Menu principal</div>
                      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {[
                          { l: "A", t: "Menu principal", i: "📋" },
                          { l: "B", t: "Changer langue", i: "🌍" },
                          { l: "C", t: "Ma réservation", i: "📅" },
                          { l: "E", t: "Enregistrement voyageurs", i: "👥" },
                          { l: "F", t: "Accès & codes", i: "🔐" },
                          { l: "G", t: "Propriété & WiFi", i: "🏠" },
                          { l: "H", t: "Règles & à propos", i: "📋" },
                          { l: "I", t: "Demande ménage", i: "🧹" },
                          { l: "J", t: "Services conciergerie", i: "🛎️" },
                          { l: "K", t: "Support", i: "🆘" },
                        ].map(item => (
                          <div key={item.l} style={{display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", borderRadius: 10}}>
                            <div className="mono" style={{fontSize: 12, fontWeight: 700, color: "#25D366", width: 20}}>{item.l}</div>
                            <div style={{fontSize: 16}}>{item.i}</div>
                            <div style={{fontSize: 13.5, color: "var(--text-2)"}}>{item.t}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass" style={{padding: 18, borderRadius: 12}}>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14}}>
                        {[
                          { k: "<2 sec", l: "Temps réponse" },
                          { k: "12", l: "Langues" },
                          { k: "87%", l: "Autonome" },
                        ].map(s => (
                          <div key={s.l} style={{textAlign: "center"}}>
                            <div style={{fontSize: 26, fontWeight: 700}} className="gradient-text">{s.k}</div>
                            <div style={{fontSize: 11, color: "var(--text-3)", marginTop: 3}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSystem === "staff" && (
                  <>
                    <h2 style={{fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15}}>
                      WhatsApp Staff <span className="gradient-text">Coordination</span>
                    </h2>
                    <p style={{fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28}}>
                      Votre équipe (ménage, maintenance, conciergerie) reçoit ses tâches, planning et notifications en temps réel sur WhatsApp. Plus besoin d'app ou de formation.
                    </p>

                    <div style={{marginBottom: 28}}>
                      <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 14}}>Fonctionnalités</div>
                      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {[
                          { i: "📋", t: "Tâches assignées en temps réel", d: "Check-in, ménage, maintenance" },
                          { i: "📅", t: "Planning visuel du jour", d: "Vue chronologique avec estimations" },
                          { i: "📍", t: "Navigation GPS intégrée", d: "Itinéraire vers chaque bien" },
                          { i: "✅", t: "Validation avec QR code", d: "Scan à l'arrivée + photos de fin" },
                          { i: "⏱️", t: "Chrono automatique", d: "Temps réel vs estimé · analytics" },
                          { i: "🔔", t: "Alertes urgentes", d: "Guest bloqué, problème signalé" },
                        ].map(item => (
                          <div key={item.t} style={{display: "flex", gap: 12, padding: "12px 14px", background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 10}}>
                            <div style={{fontSize: 18}}>{item.i}</div>
                            <div>
                              <div style={{fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 2}}>{item.t}</div>
                              <div style={{fontSize: 12, color: "var(--text-3)"}}>{item.d}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass" style={{padding: 18, borderRadius: 12}}>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14}}>
                        {[
                          { k: "0€", l: "Par staff" },
                          { k: "Real-time", l: "Notifications" },
                          { k: "QR", l: "Validation" },
                        ].map(s => (
                          <div key={s.l} style={{textAlign: "center"}}>
                            <div style={{fontSize: 26, fontWeight: 700}} className="gradient-text">{s.k}</div>
                            <div style={{fontSize: 11, color: "var(--text-3)", marginTop: 3}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSystem === "admin" && (
                  <>
                    <h2 style={{fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15}}>
                      WhatsApp Admin <span className="gradient-text">PMS Light</span>
                    </h2>
                    <p style={{fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28}}>
                      Gérez votre activité depuis votre téléphone. Tâches, déclarations, réservations, messages, avis, leads. Tout sur WhatsApp, sans ouvrir le dashboard.
                    </p>

                    <div style={{marginBottom: 28}}>
                      <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 14}}>Menu admin</div>
                      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {[
                          { l: "T", t: "Tâches à gérer", i: "✅", c: "#10b981" },
                          { l: "D", t: "Déclarations arrivée/départ", i: "📋", c: "#3b82f6" },
                          { l: "R", t: "Réservations (check-in/out)", i: "📅", c: "#8b5cf6" },
                          { l: "M", t: "Messages en attente", i: "💬", c: "#f59e0b" },
                          { l: "V", t: "Avis à répondre", i: "⭐", c: "#f4cf5e" },
                          { l: "L", t: "Demandes réservation (Leads)", i: "🎯", c: "#ec4899" },
                        ].map(item => (
                          <div key={item.l} style={{display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `${item.c}08`, border: `1px solid ${item.c}30`, borderRadius: 10}}>
                            <div className="mono" style={{fontSize: 13, fontWeight: 700, color: item.c, width: 20}}>{item.l}</div>
                            <div style={{fontSize: 18}}>{item.i}</div>
                            <div style={{fontSize: 14, color: "var(--text-2)", flex: 1}}>{item.t}</div>
                            <div style={{width: 8, height: 8, borderRadius: "50%", background: item.c, boxShadow: `0 0 10px ${item.c}`}} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass" style={{padding: 18, borderRadius: 12}}>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14}}>
                        {[
                          { k: "6", l: "Fonctions" },
                          { k: "Mobile", l: "PMS" },
                          { k: "Instant", l: "Notifications" },
                        ].map(s => (
                          <div key={s.l} style={{textAlign: "center"}}>
                            <div style={{fontSize: 26, fontWeight: 700}} className="gradient-text">{s.k}</div>
                            <div style={{fontSize: 11, color: "var(--text-3)", marginTop: 3}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSystem === "booking" && (
                  <>
                    <h2 style={{fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15}}>
                      WhatsApp Direct <span className="gradient-text">Booking</span>
                    </h2>
                    <p style={{fontSize: 16, color: "var(--text-2)", lineHeight: 1.65, marginBottom: 28}}>
                      Vos anciens voyageurs peuvent réserver directement via WhatsApp. Plus de commission OTA. Paiement sécurisé. Confirmation instantanée.
                    </p>

                    <div style={{marginBottom: 28}}>
                      <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 14}}>Avantages</div>
                      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {[
                          { i: "💰", t: "0% commission", d: "Gardez 100% du chiffre d'affaires", c: "#10b981" },
                          { i: "🔄", t: "Fidélisation guests", d: "Retour direct sans passer par OTA", c: "#3b82f6" },
                          { i: "💳", t: "Paiement sécurisé", d: "Stripe intégré · PCI compliant", c: "#8b5cf6" },
                          { i: "⚡", t: "Confirmation instant", d: "Disponibilités en temps réel", c: "#f59e0b" },
                          { i: "📊", t: "Tarifs dynamiques", d: "Dynamic pricing automatique", c: "#ec4899" },
                          { i: "🎁", t: "Upsell intégré", d: "Services additionnels dans le flow", c: "#f4cf5e" },
                        ].map(item => (
                          <div key={item.t} style={{display: "flex", gap: 12, padding: "12px 14px", background: `${item.c}08`, border: `1px solid ${item.c}30`, borderRadius: 10}}>
                            <div style={{fontSize: 18}}>{item.i}</div>
                            <div>
                              <div style={{fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 2}}>{item.t}</div>
                              <div style={{fontSize: 12, color: "var(--text-3)"}}>{item.d}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass" style={{padding: 18, borderRadius: 12}}>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14}}>
                        {[
                          { k: "0%", l: "Commission" },
                          { k: "€0", l: "Setup" },
                          { k: "24/7", l: "Disponible" },
                        ].map(s => (
                          <div key={s.l} style={{textAlign: "center"}}>
                            <div style={{fontSize: 26, fontWeight: 700}} className="gradient-text">{s.k}</div>
                            <div style={{fontSize: 11, color: "var(--text-3)", marginTop: 3}}>{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{padding: "70px 32px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <SectionHead
              badge="💎 Avantages"
              title={<>Tout depuis WhatsApp. <span className="gradient-text">Zéro complexité.</span></>}
              subtitle="Une seule app que tout le monde connaît. Pas de formation, pas de nouveau logiciel à installer."
            />

            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40}}>
              {[
                { i: "🤖", t: "Intelligence Artificielle", d: "Conversation naturelle · 12 langues · Disponible 24/7" },
                { i: "⚡", t: "Réponse Instantanée", d: "Moins de 2 secondes · Pas d'attente · Satisfaction garantie" },
                { i: "🔄", t: "Synchronisation Auto", d: "Mises à jour en temps réel · Notifications instantanées" },
                { i: "📊", t: "Analytics Intégrés", d: "Historique complet · Performance tracking · Insights clients" },
                { i: "🔐", t: "Sécurité Maximum", d: "Données chiffrées · Conformité RGPD · Hébergement France" },
                { i: "📈", t: "Monitoring 24/7", d: "Supervision continue · Alertes automatiques · Uptime 99.9%" },
              ].map(benefit => (
                <div key={benefit.t} className="card" style={{padding: 22}}>
                  <div style={{fontSize: 32, marginBottom: 12}}>{benefit.i}</div>
                  <div style={{fontSize: 16, fontWeight: 600, marginBottom: 6}}>{benefit.t}</div>
                  <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.5}}>{benefit.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section style={{padding: "70px 32px", background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.03) 50%, transparent)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <SectionHead
              badge="✨ Cas d'usage"
              title={<>Ce que Sojori fait <span className="gradient-text">automatiquement.</span></>}
              subtitle="Des workflows complexes orchestrés par l'IA, sans intervention humaine."
            />

            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 40}}>
              {[
                {
                  title: "Check-in autonome J-7 → J+1",
                  steps: [
                    "J-7 : Message bienvenue + langue détectée",
                    "J-3 : Demande passeport · OCR + KYC en 30 sec",
                    "J-1 : Code porte + WiFi + GPS",
                    "J : Vérification arrivée · QR scan",
                    "J+1 : Demande d'avis · lien pré-rempli",
                  ],
                  color: "#25D366"
                },
                {
                  title: "Support 24/7 multilingue",
                  steps: [
                    "Guest envoie message (n'importe quelle langue)",
                    "AI détecte langue + catégorie (WiFi, AC, code...)",
                    "Répond en <2 sec avec solution",
                    "Si urgent → escalade staff humain",
                    "Ticket créé + tracking jusqu'à résolution",
                  ],
                  color: "#3b82f6"
                },
                {
                  title: "Upsell intelligent",
                  steps: [
                    "AI analyse profil + séjour en cours",
                    "Détecte opportunités (late checkout, services...)",
                    "Propose au bon moment (non intrusif)",
                    "Paiement intégré dans WhatsApp",
                    "Confirmation + sync avec équipe",
                  ],
                  color: "#f59e0b"
                },
                {
                  title: "Staff task management",
                  steps: [
                    "Check-out détecté → tâche ménage créée",
                    "Staff reçoit notif WhatsApp avec détails",
                    "Navigation GPS vers le bien",
                    "QR scan arrivée → chrono démarre",
                    "Photos + validation → paiement auto",
                  ],
                  color: "#10b981"
                },
              ].map(useCase => (
                <div key={useCase.title} className="glass" style={{padding: 24, borderRadius: 14, border: `1px solid ${useCase.color}30`}}>
                  <div style={{fontSize: 18, fontWeight: 700, marginBottom: 16, color: "var(--text-1)"}}>{useCase.title}</div>
                  <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                    {useCase.steps.map((step, i) => (
                      <div key={i} style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
                        <div style={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: `${useCase.color}20`,
                          border: `1.5px solid ${useCase.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          color: useCase.color,
                          marginTop: 2
                        }}>
                          {i + 1}
                        </div>
                        <div style={{fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.5, flex: 1}}>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsBar stats={[
          {k:"4 systèmes",l:"WhatsApp"},
          {k:"87%",l:"Autonome AI"},
          {k:"<2 sec",l:"Temps réponse"},
          {k:"12 langues",l:"Support natif"}
        ]} />

        {/* Final CTA */}
        <FinalCTA
          title={<>Activez WhatsApp. <span className="gradient-text">Dès aujourd'hui.</span></>}
          subtitle="4 systèmes WhatsApp inclus dès le plan Pro. Setup en 5 minutes. Support technique illimité."
        />

        <PageFooter />
      </div>
    </>
  );
}
