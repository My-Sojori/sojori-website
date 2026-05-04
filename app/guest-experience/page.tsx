"use client";

import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";

interface Tab {
  id: string;
  l: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: "home", l: "Accueil", icon: "🏠" },
  { id: "guide", l: "Guidebook", icon: "📖" },
  { id: "experiences", l: "Réservations", icon: "✨" },
  { id: "help", l: "Aide", icon: "💬" },
];

function Phone({ tab }: { tab: string }) {
  return (
    <div style={{ width: 360, background: "#0a0a0a", borderRadius: 38, padding: 10, boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset", flexShrink: 0 }}>
      <div style={{ background: "linear-gradient(180deg, #faf6ed, #fff)", borderRadius: 28, minHeight: 700, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{ padding: "10px 22px 4px", display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#1a1408" }}>
          <span>9:41</span><span>● ● ● ●</span>
        </div>
        {/* Header */}
        {tab === "home" && (
          <div style={{ padding: "12px 22px 16px" }}>
            <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, letterSpacing: 1, fontFamily: "Geist Mono" }}>RIAD EL FENN · MARRAKECH</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1408", marginTop: 4, letterSpacing: "-0.02em" }}>Bonjour Sarah 👋</div>
            <div style={{ fontSize: 13, color: "#665a45", marginTop: 4 }}>Check-out demain · 11:00</div>
          </div>
        )}
        {tab === "guide" && <div style={{ padding: "12px 22px 16px" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#1a1408", letterSpacing: "-0.02em" }}>Le guide Marrakech</div><div style={{ fontSize: 12, color: "#665a45", marginTop: 4 }}>Curated by Sojori · 47 spots</div></div>}
        {tab === "experiences" && <div style={{ padding: "12px 22px 16px" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#1a1408", letterSpacing: "-0.02em" }}>Vos réservations</div><div style={{ fontSize: 12, color: "#665a45", marginTop: 4 }}>3 expériences à venir</div></div>}
        {tab === "help" && <div style={{ padding: "12px 22px 16px" }}><div style={{ fontSize: 24, fontWeight: 700, color: "#1a1408", letterSpacing: "-0.02em" }}>Besoin d&apos;aide ?</div><div style={{ fontSize: 12, color: "#665a45", marginTop: 4 }}>Réponse en moins de 2 min</div></div>}

        {/* Body */}
        <div style={{ padding: "0 16px 80px", flex: 1, overflow: "auto" }}>
          {tab === "home" && (
            <>
              <div style={{ background: "linear-gradient(135deg, #f4cf5e, #e6b022)", borderRadius: 16, padding: 16, color: "#1a1408", marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, fontFamily: "Geist Mono" }}>WIFI</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>RiadElFenn_Guest</div>
                <div style={{ fontSize: 12, marginTop: 2 }}>mdp: marrakech2025 · <span style={{ textDecoration: "underline" }}>copier</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {[
                  { i: "🔑", l: "Code porte", v: "4729" },
                  { i: "📍", l: "Adresse", v: "Voir GPS" },
                  { i: "🚖", l: "Taxi", v: "Réserver" },
                  { i: "🍳", l: "Petit-déj", v: "8h-10h" },
                ].map(b => (
                  <div key={b.l} style={{ background: "#fff", border: "1px solid #f0e9d8", borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 18 }}>{b.i}</div>
                    <div style={{ fontSize: 10, color: "#998669", marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 700 }}>{b.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1408", marginTop: 2 }}>{b.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: "#998669", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", margin: "14px 4px 8px" }}>Recommandations IA</div>
              {[
                { e: "🍽️", t: "Nomad — dîner", d: "5 min à pied · vue sur place", tag: "Suggéré pour vous" },
                { e: "🧘", t: "Hammam La Maison Arabe", d: "15 min · réservation requise", tag: "4.9 ★" },
              ].map(c => (
                <div key={c.t} style={{ background: "#fff", border: "1px solid #f0e9d8", borderRadius: 12, padding: 14, marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fdf6e3", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.e}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1408" }}>{c.t}</div>
                    <div style={{ fontSize: 11, color: "#998669" }}>{c.d}</div>
                  </div>
                  <div style={{ fontSize: 9, padding: "3px 7px", background: "#fdf6e3", color: "#b8881a", borderRadius: 4, fontWeight: 700 }}>{c.tag}</div>
                </div>
              ))}
            </>
          )}
          {tab === "guide" && (
            <>
              {[
                { c: "#fcd34d", e: "🌅", t: "Lever de soleil", n: "4 spots" },
                { c: "#a78bfa", e: "🌙", t: "Vie nocturne", n: "6 spots" },
                { c: "#34d399", e: "🍵", t: "Cafés cosy", n: "8 spots" },
                { c: "#fb7185", e: "🛍️", t: "Souks à voir", n: "5 spots" },
              ].map(g => (
                <div key={g.t} style={{ background: g.c, borderRadius: 14, padding: 16, marginBottom: 8, color: "#1a1408", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 26 }}>{g.e}</div>
                  <div><div style={{ fontWeight: 700, fontSize: 15 }}>{g.t}</div><div style={{ fontSize: 11 }}>{g.n}</div></div>
                </div>
              ))}
            </>
          )}
          {tab === "experiences" && (
            <>
              {[
                { d: "Aujourd'hui · 19:30", t: "Dîner Nomad", s: "Confirmé", sc: "#10b981" },
                { d: "Demain · 10:00", t: "Cours de cuisine", s: "En attente", sc: "#f59e0b" },
                { d: "Demain · 14:00", t: "Hammam", s: "Confirmé", sc: "#10b981" },
              ].map(r => (
                <div key={r.t} style={{ background: "#fff", border: "1px solid #f0e9d8", borderRadius: 12, padding: 14, marginBottom: 8 }}>
                  <div style={{ fontSize: 10, color: "#998669", fontFamily: "Geist Mono", fontWeight: 700, letterSpacing: 0.5 }}>{r.d}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1408", marginTop: 4 }}>{r.t}</div>
                  <div style={{ marginTop: 6, fontSize: 10, padding: "2px 8px", background: r.sc + "20", color: r.sc, borderRadius: 4, display: "inline-block", fontWeight: 700 }}>{r.s}</div>
                </div>
              ))}
              <button style={{ width: "100%", padding: 14, background: "#f4cf5e", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#1a1408", marginTop: 8 }}>+ Réserver une expérience</button>
            </>
          )}
          {tab === "help" && (
            <>
              {["Mon code ne marche pas", "WiFi ne fonctionne pas", "Demander check-out tardif", "Parler à l'équipe"].map(h => (
                <button key={h} style={{ width: "100%", padding: 14, background: "#fff", border: "1px solid #f0e9d8", borderRadius: 12, fontSize: 13, color: "#1a1408", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>{h}<span style={{ float: "right", color: "#998669" }}>›</span></button>
              ))}
              <div style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", borderRadius: 14, padding: 18, color: "#fff", marginTop: 8, textAlign: "center" }}>
                <div style={{ fontSize: 28 }}>💬</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6 }}>Discuter sur WhatsApp</div>
                <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>Réponse en moins de 2 min</div>
              </div>
            </>
          )}
        </div>
        {/* Tab bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #f0e9d8", padding: "10px 8px 22px", display: "flex", justifyContent: "space-around" }}>
          {TABS.map(t => (
            <div key={t.id} style={{ textAlign: "center", color: t.id === tab ? "#f59e0b" : "#998669", fontSize: 9, fontWeight: 700 }}>
              <div style={{ fontSize: 18 }}>{t.icon}</div>
              <div style={{ marginTop: 2 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GuestExperiencePage() {
  const [tab, setTab] = useState("home");

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PageHeader pageTitle="Guest Experience" />
        <PageHero
          badge="📱 Guest Experience · L'app du voyageur"
          title={<>Une app web. <span className="gradient-text">Zéro download.</span><br />Toute votre expérience.</>}
          subtitle="Vos voyageurs reçoivent un lien personnalisé. WiFi, code porte, GPS, guidebook curé par IA, réservations d'expériences. Multi-langue, marque blanche."
          cta1="Voir la démo"
          cta2="Personnaliser"
        />
        <section style={{ padding: "20px 32px 80px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><Phone tab={tab} /></div>
            <div>
              <div style={{ fontSize: 11, color: "#f4cf5e", fontWeight: 700, letterSpacing: 1.5, fontFamily: "Geist Mono", marginBottom: 14 }}>● VUE INTERACTIVE</div>
              <h2 style={{ fontSize: 36, marginBottom: 18, letterSpacing: "-0.02em" }}>L&apos;expérience voyageur, <span className="gradient-text">sans friction.</span></h2>
              <p style={{ color: "var(--text-3)", lineHeight: 1.7, fontSize: 15, marginBottom: 30 }}>Cliquez sur un onglet pour explorer. C&apos;est exactement ce que vos voyageurs voient sur leur téléphone.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} style={{
                    textAlign: "left", padding: "14px 18px", borderRadius: 10,
                    background: tab === t.id ? "linear-gradient(90deg, rgba(244,207,94,0.12), rgba(244,207,94,0.04))" : "rgba(255,255,255,0.02)",
                    border: tab === t.id ? "1px solid rgba(244,207,94,0.3)" : "1px solid var(--glass-border)",
                    color: "var(--text-1)", cursor: "pointer", display: "flex", gap: 14, alignItems: "center",
                  }}>
                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.l}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                        {t.id === "home" && "WiFi, code porte, recos IA"}
                        {t.id === "guide" && "Guidebook curé par votre équipe"}
                        {t.id === "experiences" && "Upsell expériences locales"}
                        {t.id === "help" && "WhatsApp 24/7 + self-service"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "60px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 12 }}>● Tout inclus</div>
            <h2 style={{ fontSize: 36, marginBottom: 32, maxWidth: 700 }}>Tout ce dont un <span className="gradient-text">voyageur a besoin.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { i: "🌍", t: "12 langues", d: "Détection auto + traduction native" },
                { i: "🎨", t: "Marque blanche", d: "Logo, couleurs, domaine perso" },
                { i: "📍", t: "Guidebook IA", d: "Recos générées selon préférences" },
                { i: "🎁", t: "Upsell intégré", d: "Late check-out, expériences, transferts" },
                { i: "🔐", t: "Code porte temporaire", d: "Généré auto, expire au check-out" },
                { i: "📞", t: "Support 1-tap", d: "WhatsApp, appel, message" },
                { i: "⭐", t: "Avis post-séjour", d: "Demande automatique + redirection" },
                { i: "📊", t: "Analytics guests", d: "Engagement, langue, parcours" },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.5 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={[{k:"94%",l:"taux d'ouverture"},{k:"2.4×",l:"upsell vs avant"},{k:"12 langues",l:"support natif"},{k:"4.9★",l:"satisfaction guest"}]} />
        <FinalCTA title={<>Activez votre app guest. <span className="gradient-text">Aujourd&apos;hui.</span></>} subtitle="Inclus dès le plan Pro. Setup automatique avec vos biens. Marque blanche en option." />
        <PageFooter />
      </div>
    </>
  );
}
