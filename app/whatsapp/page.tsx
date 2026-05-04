"use client";

import { useState } from "react";
import { Metadata } from "next";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";

interface Message {
  from: "user" | "sojori" | "system";
  text: string;
  time: string;
  type?: "text" | "date" | "system";
  ext?: string;
  status?: "read" | "sent";
}

interface Scenario {
  id: string;
  label: string;
  desc: string;
  title: string;
  subtitle: string;
  time?: string;
  messages: Message[];
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
      width: 320, height: 640, borderRadius: 38, padding: 8,
      background: "linear-gradient(180deg, #1a1a1f, #0a0a0d)",
      boxShadow: "0 30px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset",
      flexShrink: 0,
    }}>
      <div style={{width: "100%", height: "100%", borderRadius: 32, background: "#0b1418", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative"}}>
        <div style={{position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 26, borderRadius: 13, background: "#000", zIndex: 10}} />
        <div style={{display: "flex", justifyContent: "space-between", padding: "14px 24px 8px", fontSize: 11, color: "#fff", fontWeight: 600, fontFamily: "var(--font-mono)"}}>
          <span>{time}</span>
          <span>📶 5G ⚡</span>
        </div>
        <div style={{background: "#075e54", padding: "14px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(0,0,0,0.2)"}}>
          <span style={{color: "#fff", fontSize: 18}}>‹</span>
          <div style={{width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #f4cf5e, #e6b022)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#1a1408", position: "relative"}}>
            S
            <span style={{position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#10b981", border: "2px solid #075e54"}} />
          </div>
          <div style={{flex: 1, lineHeight: 1.2}}>
            <div style={{color: "#fff", fontSize: 13, fontWeight: 600}}>{title}</div>
            <div style={{color: "rgba(255,255,255,0.75)", fontSize: 10}}>{subtitle}</div>
          </div>
          <span style={{color: "#fff", fontSize: 14, opacity: 0.9}}>📞</span>
          <span style={{color: "#fff", fontSize: 14, opacity: 0.9}}>⋮</span>
        </div>
        <div style={{
          flex: 1,
          background: "#0b1418",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23173a3f' opacity='0.35'%3E%3Cpath d='M30 5 L35 15 L30 25 L25 15 Z'/%3E%3Ccircle cx='10' cy='40' r='3'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          padding: "12px 10px",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: 5,
        }}>
          {messages.map((m, i) => <Bubble key={i} {...m} />)}
        </div>
        <div style={{background: "#0b1418", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid rgba(255,255,255,0.05)"}}>
          <div style={{flex: 1, background: "#1f2c33", borderRadius: 22, padding: "8px 14px", color: "rgba(255,255,255,0.5)", fontSize: 12, display: "flex", alignItems: "center", gap: 8}}>
            <span>😊</span>
            <span>Message</span>
            <span style={{marginLeft: "auto", opacity: 0.7}}>📎 📷</span>
          </div>
          <div style={{width: 36, height: 36, borderRadius: "50%", background: "#00a884", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"}}>🎤</div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ from, text, time, type = "text", ext, status }: Message) {
  const isUser = from === "user";
  const isAI = from === "sojori";
  if (type === "date") return <div style={{alignSelf: "center", background: "rgba(15,30,38,0.8)", color: "rgba(255,255,255,0.6)", fontSize: 10, padding: "3px 10px", borderRadius: 10, margin: "6px 0"}}>{text}</div>;
  if (type === "system") return <div style={{alignSelf: "center", background: "rgba(255,217,90,0.15)", color: "#f4cf5e", fontSize: 10, padding: "4px 10px", borderRadius: 10, margin: "4px 0", display: "flex", alignItems: "center", gap: 5}}>🔒 {text}</div>;

  return (
    <div style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "78%",
      background: isUser ? "#005c4b" : (isAI ? "linear-gradient(135deg, #1f2c33, #243038)" : "#1f2c33"),
      borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
      padding: "7px 10px 4px",
      position: "relative",
      boxShadow: "0 1px 1px rgba(0,0,0,0.15)",
      border: isAI ? "1px solid rgba(244,207,94,0.18)" : "none",
    }}>
      {isAI && <div style={{display: "flex", alignItems: "center", gap: 4, marginBottom: 3, color: "#f4cf5e", fontSize: 9, fontWeight: 600, fontFamily: "var(--font-mono)", letterSpacing: "0.5px"}}>✨ SOJORI AI</div>}
      <div style={{color: "#e9edef", fontSize: 12.5, lineHeight: 1.4, whiteSpace: "pre-wrap"}}>{text}</div>
      {ext && <div style={{marginTop: 6, padding: 8, background: "rgba(0,0,0,0.25)", borderRadius: 6, fontSize: 11, color: "rgba(255,255,255,0.85)"}}>{ext}</div>}
      <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 3, marginTop: 2, fontSize: 9, color: "rgba(255,255,255,0.55)"}}>
        <span>{time}</span>
        {isUser && <span style={{color: status === "read" ? "#53bdeb" : "rgba(255,255,255,0.55)"}}>✓✓</span>}
      </div>
    </div>
  );
}

const SCENARIOS: Scenario[] = [
  {
    id: "checkin",
    label: "🛬 Check-in autonome",
    desc: "Le voyageur arrive, scanne le QR, accède au logement.",
    title: "Sarah Johnson",
    subtitle: "Riad El Fenn · 15:00",
    messages: [
      { from: "system", type: "date", text: "Aujourd'hui", time: "" },
      { from: "sojori", text: "Bonjour Sarah ! 👋 Bienvenue à Marrakech.\n\nVotre check-in est dans 1h à Riad El Fenn. Voici votre code d'arrivée:", time: "14:00" },
      { from: "sojori", text: "🔑 Code: 4729", ext: "📍 47 Derb El Hammam\nGPS: 31.6295, -7.9811", time: "14:00" },
      { from: "user", text: "Merci ! Je suis dans le taxi 🚕", time: "14:55", status: "read" },
      { from: "sojori", text: "Parfait ✓ J'ai informé l'équipe. Mehdi vous attend devant le riad.\n\nBesoin d'aide pour vos bagages ?", time: "14:55" },
      { from: "user", text: "Non c'est bon merci 🙏", time: "14:56", status: "read" },
      { from: "system", type: "system", text: "Identité vérifiée · QR scanné", time: "" },
      { from: "sojori", text: "Vous êtes enregistrée ✅\n\nVotre WiFi: SOJORI_FENN / wifi2024\nClimatisation: réglée 22°C\n\nBon séjour à Marrakech ✨", time: "15:02" },
    ],
  },
  {
    id: "support",
    label: "🆘 Support 24/7",
    desc: "Problème AC à 3h du matin. AI répond instantanément.",
    title: "Marco Rossi",
    subtitle: "Dar Sojori",
    time: "03:14",
    messages: [
      { from: "system", type: "date", text: "03:14 — Aujourd'hui", time: "" },
      { from: "user", text: "Bonsoir, la climatisation ne marche plus 😓 il fait très chaud", time: "03:14", status: "read" },
      { from: "sojori", text: "Bonsoir Marco, je suis désolé pour ce désagrément 😔\n\nJe vais résoudre ça immédiatement. Pouvez-vous vérifier 2 choses pour moi ?", time: "03:14" },
      { from: "sojori", text: "1️⃣ Le tableau électrique (entrée) — un disjoncteur est-il en bas ?\n2️⃣ La télécommande affiche-t-elle quelque chose ?", time: "03:14" },
      { from: "user", text: "Oui ! Un disjoncteur est tombé", time: "03:16", status: "read" },
      { from: "sojori", text: "Parfait ✨ Remontez-le simplement. La climatisation devrait redémarrer dans 30 sec.", time: "03:16" },
      { from: "user", text: "Ça marche !! Merci beaucoup 🙏❄️", time: "03:18", status: "read" },
      { from: "sojori", text: "Avec plaisir 😊 Bonne nuit Marco.\n\nJe note pour qu'un technicien passe demain vérifier le tableau (sans vous déranger).", time: "03:18" },
      { from: "system", type: "system", text: "Ticket #4928 résolu en 4 min · 0 escalade humaine", time: "" },
    ],
  },
  {
    id: "upsell",
    label: "✨ Upsell intelligent",
    desc: "AI détecte une opportunité, propose un service additionnel.",
    title: "Aisha Khalil",
    subtitle: "Villa Atlas · 6 invités",
    messages: [
      { from: "system", type: "date", text: "Hier", time: "" },
      { from: "sojori", text: "Bonjour Aisha ! J'espère que vous profitez de Villa Atlas 🌴\n\nVotre séjour se passe bien ?", time: "11:00" },
      { from: "user", text: "Oui c'est magnifique ! On adore la piscine 🏊", time: "11:08", status: "read" },
      { from: "sojori", text: "Génial ! 🥹\n\nJ'ai vu que vous restez 3 jours de plus. Petite suggestion: notre chef peut préparer un dîner privé sur la terrasse vendredi soir.\n\nEnvie d'en savoir plus ?", time: "11:09" },
      { from: "user", text: "Oh oui ça nous intéresse !", time: "11:12", status: "read" },
      { from: "sojori", text: "🍽️ Dîner privé · Chef Karim", ext: "✨ Menu 4 services · produits locaux\n👥 Jusqu'à 8 personnes\n💰 €45/personne · vins inclus\n📅 Vendredi 19:30", time: "11:12" },
      { from: "user", text: "On prend pour 6 ! 🙌", time: "11:14", status: "read" },
      { from: "system", type: "system", text: "Réservation confirmée · €270 ajoutés au séjour", time: "" },
      { from: "sojori", text: "Parfait ✓ Karim prépare quelque chose de spécial pour vous.\n\nÀ vendredi 19:30 ! 🌙", time: "11:14" },
    ],
  },
  {
    id: "review",
    label: "⭐ Avis post-séjour",
    desc: "Demande naturelle d'avis qui convertit (4.9/5 moyenne).",
    title: "James Park",
    subtitle: "Séjour terminé",
    messages: [
      { from: "system", type: "date", text: "Aujourd'hui · 12:00", time: "" },
      { from: "sojori", text: "James, j'espère que votre vol s'est bien passé ✈️\n\nMerci d'avoir choisi Sojori 🙏", time: "12:00" },
      { from: "user", text: "Merci à vous ! Séjour incroyable, tout était parfait", time: "14:23", status: "read" },
      { from: "sojori", text: "Ça nous touche beaucoup 🥺\n\nSi vous avez 30 secondes, votre avis Airbnb fait toute la différence pour nous (et les voyageurs après vous).", time: "14:24" },
      { from: "sojori", text: "⭐ Laisser un avis Airbnb", ext: "🔗 Lien direct (pré-rempli avec vos dates)\n⏱️ 30 secondes", time: "14:24" },
      { from: "user", text: "Avec plaisir, je le fais maintenant ⭐⭐⭐⭐⭐", time: "14:25", status: "read" },
      { from: "system", type: "system", text: "5 étoiles reçues · publié sur Airbnb", time: "" },
      { from: "sojori", text: "Vous êtes adorable 💛 Merci infiniment !\n\nJ'ai gardé votre profil. Si vous revenez à Marrakech (ou ailleurs au Maroc), -10% sur votre prochain séjour 🎁", time: "14:30" },
    ],
  },
];

interface ScenarioPickerProps {
  active: string;
  onChange: (id: string) => void;
}

function ScenarioPicker({ active, onChange }: ScenarioPickerProps) {
  return (
    <div style={{display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 36}}>
      {SCENARIOS.map(s => (
        <button key={s.id} onClick={() => onChange(s.id)} style={{
          padding: "11px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer",
          background: active === s.id ? "linear-gradient(180deg, #f4cf5e, #e6b022)" : "rgba(255,255,255,0.04)",
          color: active === s.id ? "#1a1408" : "var(--text-2)",
          border: active === s.id ? "1px solid rgba(244,207,94,0.5)" : "1px solid var(--glass-border)",
          transition: "all 0.2s",
        }}>{s.label}</button>
      ))}
    </div>
  );
}

export default function WhatsappPage() {
  const [active, setActive] = useState("checkin");
  const scenario = SCENARIOS.find(s => s.id === active)!;

  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle="WhatsApp Bot" />
        <PageHero
          badge="💬 WhatsApp · Le canal #1 au Maroc"
          title={<>L'IA Sojori,<br /><span className="gradient-text">disponible 24/7 sur WhatsApp.</span></>}
          subtitle="Pas d'app à télécharger. Pas de friction. Vos voyageurs écrivent, l'IA répond en 2 secondes en 12 langues — check-in, support, upsell, avis. Tout sur WhatsApp."
          cta1="Voir une démo"
          cta2="Brancher mon WhatsApp"
        />

        <section style={{padding: "20px 32px 80px"}}>
          <div style={{maxWidth: 1100, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", textAlign: "center", marginBottom: 14}}>● 4 scénarios concrets</div>
            <ScenarioPicker active={active} onChange={setActive} />

            <div style={{display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "center", maxWidth: 980, margin: "0 auto"}}>
              <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                <div style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15}}>{scenario.label}</div>
                <div style={{fontSize: 16, color: "var(--text-2)", lineHeight: 1.55}}>{scenario.desc}</div>
                <div style={{height: 1, background: "var(--glass-border)", margin: "8px 0"}} />
                {[
                  { l: "Temps réponse", v: "2 sec" },
                  { l: "Langue détectée", v: "Auto · 12 langues" },
                  { l: "Escalade humaine", v: "Si nécessaire" },
                  { l: "Coût par message", v: "€0.04" },
                ].map(s => (
                  <div key={s.l} style={{display: "flex", justifyContent: "space-between", fontSize: 13}}>
                    <span style={{color: "var(--text-3)"}}>{s.l}</span>
                    <span style={{color: "var(--text-1)", fontWeight: 500}}>{s.v}</span>
                  </div>
                ))}
              </div>
              <div style={{display: "flex", justifyContent: "center", position: "relative"}}>
                <div style={{position: "absolute", inset: "-40px", background: "radial-gradient(circle, rgba(230,176,34,0.18), transparent 65%)", pointerEvents: "none"}} />
                <WhatsAppPhone {...scenario} />
              </div>
            </div>
          </div>
        </section>

        <section style={{padding: "40px 32px 80px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>● Capacités</div>
            <div style={{fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 36, maxWidth: 700}}>Tout ce qu'un concierge fait. <span style={{color: "var(--text-3)"}}>Sauf qu'il ne dort jamais.</span></div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
              {[
                { i: "🌍", t: "12 langues natives", d: "FR, EN, AR, ES, IT, DE, NL, PT, RU, ZH, JP, KO. Détection auto." },
                { i: "🧠", t: "Mémoire contextuelle", d: "Connaît le voyageur, son séjour, ses préférences." },
                { i: "🔐", t: "Check-in autonome", d: "QR + GPS + vérif identité. Sans intervention humaine." },
                { i: "🎫", t: "Réservations services", d: "Transport, courses, dîner, spa. Confirmées en chat." },
                { i: "🚨", t: "Escalade intelligente", d: "Si urgent → notifie staff humain en 30 sec." },
                { i: "⭐", t: "Demande d'avis", d: "Au bon moment. Lien pré-rempli. +47% de conversions." },
              ].map(c => (
                <div key={c.t} className="card" style={{padding: 20}}>
                  <div style={{fontSize: 28, marginBottom: 10}}>{c.i}</div>
                  <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>{c.t}</div>
                  <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.5}}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={[{k:"<2 sec",l:"Temps de réponse"},{k:"12 langues",l:"Support natif"},{k:"87%",l:"Résolu sans humain"},{k:"24/7",l:"Toujours dispo"}]} />
        <FinalCTA title={<>Activez WhatsApp. <span className="gradient-text">En 5 minutes.</span></>} subtitle="Connectez votre numéro. L'IA prend le relais sur tous vos voyageurs, instantanément." />
        <PageFooter />
      </div>
    </>
  );
}
