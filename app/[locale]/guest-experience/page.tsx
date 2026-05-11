"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { ScrollPaginationDots } from "@/components/shared/ScrollPaginationDots";

interface Tab {
  id: string;
  l: string;
  icon: string;
}

function WhatsAppPhone({ tab, t }: { tab: string; t: any }) {
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
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{t("phone.header.name")}</div>
            <div style={{ fontSize: 11, color: "#8696a0" }}>{t("phone.header.status")}</div>
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
                  <div style={{ fontSize: 13, color: "#e9edef", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                    {t("phone.home.welcome")}
                  </div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 4, textAlign: "right" }}>14:23</div>
                </div>
              </div>
              {/* Code & WiFi card */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: "#8696a0", fontWeight: 700, letterSpacing: 0.5 }}>{t("phone.home.doorCode")}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#25D366", marginTop: 4, fontFamily: "Geist Mono" }}>{t("phone.home.doorCodeValue")}</div>
                  </div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 11, color: "#8696a0", fontWeight: 700, letterSpacing: 0.5 }}>{t("phone.home.wifi")}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e9edef", marginTop: 4 }}>{t("phone.home.wifiNetwork")}</div>
                    <div style={{ fontSize: 12, color: "#8696a0", marginTop: 2 }}>{t("phone.home.wifiPassword")}</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:23</div>
                </div>
              </div>
              {/* AI recommendations */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ background: "#202c33", borderRadius: "0 12px 12px 12px", padding: "12px", maxWidth: "90%", display: "inline-block" }}>
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>{t("phone.home.recommendations")}</div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>{t("phone.home.rec1Title")}</div>
                    <div style={{ fontSize: 11, color: "#8696a0" }}>{t("phone.home.rec1Detail")}</div>
                  </div>
                  <div style={{ background: "#2a3942", borderRadius: 8, padding: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>{t("phone.home.rec2Title")}</div>
                    <div style={{ fontSize: 11, color: "#8696a0" }}>{t("phone.home.rec2Detail")}</div>
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
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>{t("phone.guide.title")}</div>
                  {[
                    { e: t("phone.guide.cat1Emoji"), title: t("phone.guide.cat1Title"), count: t("phone.guide.cat1Count") },
                    { e: t("phone.guide.cat2Emoji"), title: t("phone.guide.cat2Title"), count: t("phone.guide.cat2Count") },
                    { e: t("phone.guide.cat3Emoji"), title: t("phone.guide.cat3Title"), count: t("phone.guide.cat3Count") },
                    { e: t("phone.guide.cat4Emoji"), title: t("phone.guide.cat4Title"), count: t("phone.guide.cat4Count") },
                  ].map(g => (
                    <div key={g.title} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>{g.e} {g.title}</div>
                      <div style={{ fontSize: 11, color: "#8696a0" }}>{g.count}</div>
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
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>{t("phone.experiences.title")}</div>
                  {[
                    { d: t("phone.experiences.booking1Date"), title: t("phone.experiences.booking1Title"), s: t("phone.experiences.booking1Status") },
                    { d: t("phone.experiences.booking2Date"), title: t("phone.experiences.booking2Title"), s: t("phone.experiences.booking2Status") },
                    { d: t("phone.experiences.booking3Date"), title: t("phone.experiences.booking3Title"), s: t("phone.experiences.booking3Status") },
                  ].map(r => (
                    <div key={r.title} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6 }}>
                      <div style={{ fontSize: 11, color: "#8696a0" }}>{r.d}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef", marginTop: 2 }}>{r.title}</div>
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
                  <div style={{ fontSize: 13, color: "#e9edef", marginBottom: 8 }}>{t("phone.help.title")}</div>
                  {[
                    t("phone.help.option1"),
                    t("phone.help.option2"),
                    t("phone.help.option3"),
                    t("phone.help.option4")
                  ].map((h, i) => (
                    <div key={h} style={{ background: "#2a3942", borderRadius: 8, padding: 10, marginBottom: 6, fontSize: 13, color: "#e9edef" }}>
                      {i + 1}. {h}
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: "#8696a0", marginTop: 8 }}>{t("phone.help.footer")}</div>
                  <div style={{ fontSize: 10, color: "#8696a0", marginTop: 8, textAlign: "right" }}>14:26</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* WhatsApp Input */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#202c33", padding: "8px 12px 22px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#2a3942", borderRadius: 20, padding: "8px 14px", fontSize: 13, color: "#8696a0" }}>{t("phone.input")}</div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎤</div>
        </div>
      </div>
    </div>
  );
}

export default function GuestExperiencePage() {
  const t = useTranslations("guestExperience");
  const [tab, setTab] = useState("home");

  const TABS: Tab[] = [
    { id: "home", l: t("tabs.home.label"), icon: "🏠" },
    { id: "guide", l: t("tabs.guide.label"), icon: "📖" },
    { id: "experiences", l: t("tabs.experiences.label"), icon: "✨" },
    { id: "help", l: t("tabs.help.label"), icon: "💬" },
  ];

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 22px 16px !important; }

          div[style*="gridTemplateColumns: '380px 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="width: 360"] {
            width: 100% !important;
            max-width: 360px !important;
            margin: 0 auto !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 12px 20px !important;
          }
        }
      `}</style>
      <BackgroundEffects />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PageHeader pageTitle={t("pageTitle")} />
        <PageHero
          badge={t("hero.badge")}
          title={<>{t("hero.title").split(".")[0]}. <span className="gradient-text">{t("hero.title").split(".")[1]}.</span><br />{t("hero.title").split(".")[2]}.</>}
          subtitle={t("hero.subtitle")}
          cta1={t("hero.cta1")}
          cta2={t("hero.cta2")}
        />
        <section style={{ padding: "12px 32px 44px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}><WhatsAppPhone tab={tab} t={t} /></div>
            <div>
              <div style={{ fontSize: 11, color: "#f4cf5e", fontWeight: 700, letterSpacing: 1.5, fontFamily: "Geist Mono", marginBottom: 14 }}>{t("interactive.badge")}</div>
              <h2 style={{ fontSize: 36, marginBottom: 18, letterSpacing: "-0.02em" }}>
                {t("interactive.title").split("100%")[0]}
                <span className="gradient-text">100% WhatsApp.</span>
              </h2>
              <p style={{ color: "var(--text-3)", lineHeight: 1.7, fontSize: 15, marginBottom: 30 }}>{t("interactive.subtitle")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TABS.map(tabItem => (
                  <button key={tabItem.id} onClick={() => setTab(tabItem.id)} style={{
                    textAlign: "left", padding: "14px 18px", borderRadius: 10,
                    background: tab === tabItem.id ? "linear-gradient(90deg, rgba(244,207,94,0.12), rgba(244,207,94,0.04))" : "rgba(255,255,255,0.02)",
                    border: tab === tabItem.id ? "1px solid rgba(244,207,94,0.3)" : "1px solid var(--glass-border)",
                    color: "var(--text-1)", cursor: "pointer", display: "flex", gap: 14, alignItems: "center",
                  }}>
                    <span style={{ fontSize: 22 }}>{tabItem.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{tabItem.l}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                        {t(`tabs.${tabItem.id}.description`)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "32px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 12 }}>{t("features.badge")}</div>
            <h2 style={{ fontSize: 36, marginBottom: 32, maxWidth: 700 }}>
              {t("features.title").split("Dans WhatsApp")[0]}
              <span className="gradient-text">{t("features.title").includes("Dans WhatsApp") ? "Dans WhatsApp." : t("features.title").includes("In WhatsApp") ? "In WhatsApp." : t("features.title").includes("En WhatsApp") ? "En WhatsApp." : t("features.title").includes("No WhatsApp") ? "No WhatsApp." : "في واتساب."}</span>
            </h2>
            <ScrollPaginationDots itemCount={8} gap={16} peekCarousel className="sj-peek-sm">
              {Array.from({ length: 8 }).map((_, i) => {
                const item = t.raw(`features.items.${i}`);
                return (
                  <div key={i} data-carousel-slide className="card" style={{ padding: 20, flexShrink: 0 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.5 }}>{item.description}</div>
                  </div>
                );
              })}
            </ScrollPaginationDots>
          </div>
        </section>

        <StatsBar stats={Array.from({ length: 4 }).map((_, i) => {
          const stat = t.raw(`stats.${i}`);
          return { k: stat.key, l: stat.label };
        })} />

        <FinalCTA
          title={<>{t("finalCTA.title").split("En 5 minutes")[0]}<span className="gradient-text">{t("finalCTA.title").includes("En 5 minutes") ? "En 5 minutes." : t("finalCTA.title").includes("In 5 minutes") ? "In 5 minutes." : t("finalCTA.title").includes("Em 5 minutos") ? "Em 5 minutos." : t("finalCTA.title").includes("في 5 دقائق") ? "في 5 دقائق." : "En 5 minutos."}</span></>}
          subtitle={t("finalCTA.subtitle")}
        />
        <PageFooter />
      </div>
    </>
  );
}
