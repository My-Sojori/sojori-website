"use client";

import { useState } from "react";
import { Metadata } from "next";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";

interface Channel {
  id: string;
  l: string;
  icon: string;
  color?: string;
  count: number;
}

interface Thread {
  id: number;
  name: string;
  ch: string;
  color: string;
  preview: string;
  time: string;
  unread: number;
  avatar: string;
  active?: boolean;
}

interface ConversationMessage {
  from: "them" | "sojori";
  t: string;
  time: string;
}

const CHANNELS: Channel[] = [
  { id: "all", l: "Tous", icon: "✦", count: 24 },
  { id: "wa", l: "WhatsApp", icon: "💬", color: "#25D366", count: 12 },
  { id: "ab", l: "Airbnb", icon: "A", color: "#FF5A5F", count: 6 },
  { id: "bk", l: "Booking", icon: "B", color: "#003580", count: 4 },
  { id: "em", l: "Email", icon: "@", color: "#a78bfa", count: 2 },
];

const THREADS: Thread[] = [
  { id: 1, name: "Sarah Johnson", ch: "wa", color: "#25D366", preview: "Merci ! Je suis dans le taxi 🚕", time: "2 min", unread: 0, avatar: "#f59e0b", active: true },
  { id: 2, name: "Marco Rossi", ch: "ab", color: "#FF5A5F", preview: "Question about the AC unit, it stopped...", time: "8 min", unread: 2, avatar: "#06b6d4" },
  { id: 3, name: "Emma Rodriguez", ch: "wa", color: "#25D366", preview: "On prend pour 6 ! 🙌", time: "14 min", unread: 0, avatar: "#a78bfa" },
  { id: 4, name: "James Park", ch: "ab", color: "#FF5A5F", preview: "Thanks again, amazing stay!", time: "34 min", unread: 0, avatar: "#10b981" },
  { id: 5, name: "Linh Nguyen", ch: "bk", color: "#003580", preview: "Need to extend my stay by 2 nights", time: "1h", unread: 1, avatar: "#ec4899" },
  { id: 6, name: "Carlos M.", ch: "wa", color: "#25D366", preview: "Could you arrange airport pickup?", time: "2h", unread: 0, avatar: "#f97316" },
  { id: 7, name: "Wei Liu", ch: "em", color: "#a78bfa", preview: "Re: Invoice for stay March 12-18", time: "3h", unread: 0, avatar: "#3b82f6" },
];

function Inbox() {
  const [active, setActive] = useState(1);
  return (
    <div style={{background: "rgba(10,10,16,0.6)", borderRadius: 16, border: "1px solid var(--glass-border)", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.5)", display: "flex", height: 620}}>
      <div style={{width: 80, background: "rgba(0,0,0,0.3)", borderRight: "1px solid var(--glass-border)", padding: "14px 8px", display: "flex", flexDirection: "column", gap: 6, alignItems: "center"}}>
        {CHANNELS.map(c => (
          <div key={c.id} style={{
            width: 56, padding: "10px 6px", borderRadius: 10,
            background: c.id === "all" ? "rgba(244,207,94,0.12)" : "transparent",
            border: c.id === "all" ? "1px solid rgba(244,207,94,0.3)" : "1px solid transparent",
            textAlign: "center", cursor: "pointer", position: "relative",
          }}>
            <div style={{width: 32, height: 32, borderRadius: 8, background: c.color || "transparent", color: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto"}}>{c.icon}</div>
            <div style={{fontSize: 9, color: "var(--text-3)", marginTop: 4}}>{c.l}</div>
            {c.count > 0 && <span style={{position: "absolute", top: 4, right: 4, fontSize: 9, background: "#ef4444", color: "#fff", padding: "1px 5px", borderRadius: 999, fontWeight: 700}}>{c.count}</span>}
          </div>
        ))}
      </div>
      <div style={{width: 320, borderRight: "1px solid var(--glass-border)", display: "flex", flexDirection: "column"}}>
        <div style={{padding: "14px 16px", borderBottom: "1px solid var(--glass-border)"}}>
          <div style={{fontSize: 14, fontWeight: 600, marginBottom: 8}}>Inbox unifiée</div>
          <div style={{background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 8}}>🔍 Rechercher…</div>
        </div>
        <div style={{flex: 1, overflowY: "auto"}}>
          {THREADS.map(t => (
            <div key={t.id} onClick={() => setActive(t.id)} style={{
              padding: "12px 16px", display: "flex", gap: 12, cursor: "pointer",
              background: active === t.id ? "rgba(244,207,94,0.08)" : "transparent",
              borderLeft: active === t.id ? "2px solid #f4cf5e" : "2px solid transparent",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}>
              <div style={{position: "relative", flexShrink: 0}}>
                <div style={{width: 38, height: 38, borderRadius: "50%", background: t.avatar, fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"}}>{t.name.split(" ").map(p => p[0]).join("")}</div>
                <div style={{position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: 4, background: t.color, fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #0a0a10"}}>{CHANNELS.find(c => c.id === t.ch)?.icon}</div>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 3, gap: 8, minWidth: 0}}>
                  <span style={{fontSize: 13, fontWeight: 600, color: "var(--text-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1}}>{t.name}</span>
                  <span style={{fontSize: 10, color: "var(--text-3)", fontFamily: "Geist Mono", flexShrink: 0}}>{t.time}</span>
                </div>
                <div style={{fontSize: 12, color: t.unread ? "var(--text-1)" : "var(--text-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: t.unread ? 500 : 400}}>{t.preview}</div>
              </div>
              {t.unread > 0 && <div style={{width: 18, height: 18, borderRadius: 9, background: "#f4cf5e", color: "#1a1408", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center"}}>{t.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
        <div style={{padding: "14px 22px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <div style={{width: 36, height: 36, borderRadius: "50%", background: "#f59e0b", fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center"}}>SJ</div>
            <div>
              <div style={{fontSize: 14, fontWeight: 600}}>Sarah Johnson</div>
              <div style={{fontSize: 11, color: "var(--text-3)"}}>WhatsApp · Appartement Paris 15 · check-in 15:00</div>
            </div>
          </div>
          <div style={{display: "flex", gap: 6}}>
            <button style={{background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "6px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer"}}>Profil guest</button>
            <button style={{background: "rgba(244,207,94,0.1)", border: "1px solid rgba(244,207,94,0.3)", color: "#f4cf5e", padding: "6px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontWeight: 600}}>✨ AI assist</button>
          </div>
        </div>
        <div style={{flex: 1, padding: 22, display: "flex", flexDirection: "column", gap: 10, overflow: "auto"}}>
          {[
            { from: "them", t: "Bonjour ! Je suis Sarah, j'arrive à 15h pour le check-in.", time: "14:00" },
            { from: "sojori", t: "Bonjour Sarah ! 👋 Bienvenue à Paris. Voici votre code: 4729. 47 Rue des Abbesses.", time: "14:00" },
            { from: "them", t: "Merci ! Je suis dans le taxi 🚕", time: "14:55" },
            { from: "sojori", t: "Parfait ✓ J'ai informé l'équipe. Lucas vous attend devant l'immeuble.", time: "14:55" },
          ].map((m, i) => (
            <div key={i} style={{alignSelf: m.from === "them" ? "flex-start" : "flex-end", maxWidth: "70%"}}>
              <div style={{background: m.from === "them" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, rgba(244,207,94,0.18), rgba(244,207,94,0.08))", border: m.from === "sojori" ? "1px solid rgba(244,207,94,0.3)" : "1px solid var(--glass-border)", borderRadius: m.from === "them" ? "12px 12px 12px 2px" : "12px 12px 2px 12px", padding: "10px 14px", fontSize: 13, color: "var(--text-1)", lineHeight: 1.45}}>
                {m.from === "sojori" && <div style={{fontSize: 9, color: "#f4cf5e", fontWeight: 700, letterSpacing: 0.5, marginBottom: 4, fontFamily: "Geist Mono"}}>✨ SOJORI AI · auto-réponse</div>}
                {m.t}
                <div style={{fontSize: 9, color: "var(--text-3)", marginTop: 4, textAlign: "right", fontFamily: "Geist Mono"}}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding: "12px 22px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{display: "flex", gap: 6, marginBottom: 10}}>
            {["👍 Confirmer arrivée", "🗺️ Renvoyer GPS", "✨ Suggérer dîner"].map(s => (
              <button key={s} style={{background: "rgba(244,207,94,0.08)", border: "1px solid rgba(244,207,94,0.25)", color: "#f4cf5e", padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer"}}>{s}</button>
            ))}
          </div>
          <div style={{display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid var(--glass-border)", borderRadius: 10, padding: "10px 14px"}}>
            <span style={{color: "var(--text-3)", fontSize: 14}}>📎</span>
            <input placeholder="Tapez votre message…" style={{flex: 1, background: "transparent", border: "none", color: "var(--text-1)", fontSize: 13, outline: "none"}} />
            <button style={{background: "#f4cf5e", border: "none", color: "#1a1408", width: 32, height: 32, borderRadius: 7, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InboxPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle="Unified Inbox" />
        <PageHero
          badge="💬 Unified Inbox · Tous les canaux. Une boîte."
          title={<>WhatsApp, Airbnb, Booking, email.<br /><span className="gradient-text">Au même endroit.</span></>}
          subtitle="Chaque message voyageur, peu importe le canal, dans une seule boîte. Réponses suggérées par IA. Historique complet. Templates personnalisés. Plus jamais de message oublié."
          cta1="Voir la démo" cta2="Connecter mes canaux"
        />
        <section style={{padding: "20px 32px 80px"}}>
          <div style={{maxWidth: 1280, margin: "0 auto"}}>
            <Inbox />
          </div>
        </section>
        <section style={{padding: "40px 32px 80px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>● Capacités</div>
            <div style={{fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 700}}>Une boîte. <span className="gradient-text">Toute la communication.</span></div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
              {[
                { i: "✨", t: "Réponses IA suggérées", d: "L'IA propose 3 réponses contextuelles. Vous choisissez. Vous envoyez." },
                { i: "👤", t: "Profil guest 360°", d: "Historique séjours, préférences, anniversaires, langue. À chaque message." },
                { i: "📝", t: "Templates dynamiques", d: "Variables auto (nom, date, code WiFi). Multi-langue. Réutilisables." },
                { i: "🌍", t: "Traduction native", d: "Vous écrivez en français, il reçoit en mandarin. Et vice-versa." },
                { i: "⏰", t: "Snooze & rappels", d: "Pas le temps maintenant ? Mis de côté, rappelé au bon moment." },
                { i: "📊", t: "SLA tracking", d: "Temps de réponse moyen, taux de résolution. Par canal, par membre." },
              ].map(c => (
                <div key={c.t} className="card" style={{padding: 22}}>
                  <div style={{fontSize: 28, marginBottom: 10}}>{c.i}</div>
                  <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>{c.t}</div>
                  <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.55}}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <StatsBar stats={[{k:"4 canaux",l:"WA, Airbnb, Booking, Email"},{k:"<2 min",l:"Temps de réponse moyen"},{k:"12 langues",l:"Traduction auto"},{k:"0",l:"Message oublié"}]} />
        <FinalCTA title={<>Connectez vos canaux. <span className="gradient-text">En 5 minutes.</span></>} subtitle="WhatsApp, Airbnb, Booking, email — tous en un. Setup instantané, OAuth sécurisé." />
        <PageFooter />
      </div>
    </>
  );
}
