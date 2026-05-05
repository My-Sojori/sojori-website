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

function WhatsAppPhone({ tab }: { tab: string }) {
  return (
    <div style={{ width: 360, background: "#0a0a0a", borderRadius: 38, padding: 10, boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset", flexShrink: 0 }}>
      <div style={{ background: "#0b141a", borderRadius: 28, minHeight: 700, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Status bar */}
        <div style={{ padding: "10px 22px 4px", display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#fff" }}>
          <span>9:41</span><span>● ● ● ●</span>
        </div>
        {/* WhatsApp Header */}
        <div style={{ background: "#202c33", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #25D366, #128C7E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff" }}>S</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Sojori · Riad El Fenn</div>
            <div style={{ fontSize: 11, color: "#8696a0" }}>en ligne</div>
          </div>
          <div style={{ fontSize: 20, color: "#8696a0" }}>⋮</div>
        </div>

        {/* WhatsApp Messages */}
        <div style={{ padding: "16px 12px 80px", flex: 1, overflow: "auto", background: "#0b141a" }}>
          {tab === "home" && (
            <>
              {/* Bot message */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "10px 14px", maxWidth: "85%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", lineHeight: 1.5 }}>
                    Bonjour Sarah ! 👋 Bienvenue au Riad El Fenn à Marrakech.<br/><br/>
                    Votre séjour : 3-5 avril (2 nuits)<br/>
                    Check-out demain à 11h00
                  </div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 4, textAlign: "right" }}>14:23</div>
                </div>
              </div>
              {/* Code & WiFi card */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: "#8696a0", fontWeight: 700, letterSpacing: 0.5 }}>🔑 CODE PORTE</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#25D366", marginTop: 4, fontFamily: "Geist Mono" }}>4729</div>
                  </div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: "#8696a0", fontWeight: 700, letterSpacing: 0.5 }}>📶 WIFI</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e9edef", marginTop: 4 }}>RiadElFenn_Guest</div>
                    <div style={{ fontSize: 12, color: "#8696a0", marginTop: 2 }}>mdp: marrakech2025</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:23</div>
                </div>
              </div>
              {/* AI recommendations */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>🤖 Mes recommandations pour vous :</div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>🍽️ Nomad — dîner</div>
                    <div style={{ fontSize: 11, color: "#8696a0" }}>5 min à pied · vue sur place Jemaa el-Fna</div>
                  </div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>🧘 Hammam La Maison Arabe</div>
                    <div style={{ fontSize: 11, color: "#8696a0" }}>15 min · réservation requise · 4.9★</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:24</div>
                </div>
              </div>
            </>
          )}
          {tab === "guide" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>📖 Votre guide Marrakech (47 spots) :</div>
                  {[
                    { e: "🌅", t: "Lever de soleil", n: "4 spots" },
                    { e: "🌙", t: "Vie nocturne", n: "6 spots" },
                    { e: "🍵", t: "Cafés cosy", n: "8 spots" },
                    { e: "🛍️", t: "Souks à voir", n: "5 spots" },
                  ].map(g => (
                    <div key={g.t} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>{g.e} {g.t}</div>
                      <div style={{ fontSize: 11, color: "#8696a0" }}>{g.n}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:24</div>
                </div>
              </div>
            </>
          )}
          {tab === "experiences" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>✨ Vos réservations :</div>
                  {[
                    { d: "Aujourd'hui 19:30", t: "Dîner Nomad", s: "✓ Confirmé" },
                    { d: "Demain 10:00", t: "Cours de cuisine", s: "⏳ En attente" },
                    { d: "Demain 14:00", t: "Hammam", s: "✓ Confirmé" },
                  ].map(r => (
                    <div key={r.t} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: 11, color: "#8696a0" }}>{r.d}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef", marginTop: 2 }}>{r.t}</div>
                      <div style={{ fontSize: 11, color: "#25D366", marginTop: 2 }}>{r.s}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:25</div>
                </div>
              </div>
            </>
          )}
          {tab === "help" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>💬 Comment puis-je vous aider ?</div>
                  {["Mon code ne marche pas", "WiFi ne fonctionne pas", "Check-out tardif", "Parler à l'équipe"].map((h, i) => (
                    <div key={h} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6, fontSize: 13, color: "#e9edef" }}>
                      {i + 1}. {h}
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "#8696a0", marginTop: 8 }}>Tapez un numéro ou écrivez votre question</div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:26</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* WhatsApp Input */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#202c33", padding: "8px 12px 22px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#2a3942", borderRadius: 20, padding: "8px 14px", fontSize: 13, color: "#8696a0" }}>Message...</div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎤</div>
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
          badge="💬 Guest Experience · 100% WhatsApp"
          title={<>Zéro app. <span className="gradient-text">Zéro téléchargement.</span><br />100% WhatsApp.</>}
          subtitle="Vos voyageurs reçoivent tout par WhatsApp : code porte, WiFi, guidebook IA, réservations. Pas d'app à télécharger, pas de compte à créer. Juste leur numéro de téléphone."
          cta1="Voir la démo"
          cta2="Tester WhatsApp"
        />
        <section style={{ padding: "20px 32px 80px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><WhatsAppPhone tab={tab} /></div>
            <div>
              <div style={{ fontSize: 11, color: "#f4cf5e", fontWeight: 700, letterSpacing: 1.5, fontFamily: "Geist Mono", marginBottom: 14 }}>● VUE INTERACTIVE</div>
              <h2 style={{ fontSize: 36, marginBottom: 18, letterSpacing: "-0.02em" }}>L&apos;expérience voyageur, <span className="gradient-text">100% WhatsApp.</span></h2>
              <p style={{ color: "var(--text-3)", lineHeight: 1.7, fontSize: 15, marginBottom: 30 }}>Pas d&apos;app web à développer. Tout se passe dans WhatsApp. Vos guests ont déjà WhatsApp sur leur téléphone. C&apos;est là qu&apos;ils reçoivent tout.</p>
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
                        {t.id === "home" && "Code porte, WiFi, infos pratiques"}
                        {t.id === "guide" && "Recommandations locales par IA"}
                        {t.id === "experiences" && "Réservation d'expériences"}
                        {t.id === "help" && "Support instantané 24/7"}
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
            <h2 style={{ fontSize: 36, marginBottom: 32, maxWidth: 700 }}>Tout ce dont un voyageur a besoin. <span className="gradient-text">Dans WhatsApp.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { i: "💬", t: "100% WhatsApp", d: "Pas d'app à télécharger, pas de compte" },
                { i: "🔑", t: "Code porte auto", d: "Envoyé le jour J, expire au check-out" },
                { i: "📶", t: "WiFi instantané", d: "Réseau + mot de passe dans la conversation" },
                { i: "🤖", t: "Bot IA 24/7", d: "Répond aux questions en 12 langues" },
                { i: "📍", t: "Guidebook personnalisé", d: "Recommandations générées par IA" },
                { i: "🎁", t: "Upsell intégré", d: "Late check-out, expériences, transferts" },
                { i: "📞", t: "Support humain", d: "Escalade vers votre équipe en 1 clic" },
                { i: "⭐", t: "Avis automatiques", d: "Demande post-séjour + redirection OTA" },
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

        <StatsBar stats={[{k:"98%",l:"taux d'ouverture WhatsApp"},{k:"2.4×",l:"upsell vs email"},{k:"<2min",l:"temps de réponse moyen"},{k:"4.9★",l:"satisfaction guest"}]} />
        <FinalCTA title={<>Lancez WhatsApp pour vos guests. <span className="gradient-text">En 5 minutes.</span></>} subtitle="Inclus dès le plan Pro. Aucun développement requis. Vos guests ont déjà WhatsApp." />
        <PageFooter />
      </div>
    </>
  );
}
