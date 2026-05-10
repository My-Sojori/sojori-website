import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { SojoriMark } from "@/components/Logo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('ownerPortal.title'),
    description: t('ownerPortal.description'),
  };
}

function OwnerPhone() {
  return (
    <div style={{
      width: 320, height: 660, borderRadius: 38, padding: 8,
      background: "linear-gradient(180deg, #1a1a1f, #0a0a0d)",
      boxShadow: "0 30px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset",
    }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 32, background: "#0a0a10", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 26, borderRadius: 13, background: "#000", zIndex: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 24px 8px", fontSize: 11, color: "#fff", fontWeight: 600, fontFamily: "Geist Mono" }}>
          <span>09:42</span><span>📶 5G ⚡</span>
        </div>
        <div style={{ padding: "10px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SojoriMark size={26} />
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em", color: "#fff" }}>sojori</span>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>HM</div>
        </div>
        <div style={{ padding: "4px 16px 12px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Bonjour Antoine 👋</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 2 }}>Appartement Paris 15</div>
        </div>

        {/* Revenue card */}
        <div style={{ margin: "0 16px", padding: 16, borderRadius: 14, background: "linear-gradient(135deg, rgba(244,207,94,0.18), rgba(244,207,94,0.05))", border: "1px solid rgba(244,207,94,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>Ce mois-ci</div>
            <div style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>↗ +18% vs M-1</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginTop: 6, letterSpacing: "-0.02em" }}>€18,420</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Net après commission Sojori</div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#f4cf5e" }} />
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#f4cf5e" }} />
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#f4cf5e" }} />
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "Geist Mono" }}>
            <span>S1</span><span>S2</span><span>S3</span><span>S4</span>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "14px 16px 0" }}>
          {[
            { l: "Occupation", v: "94%", s: "+6%", c: "#10b981" },
            { l: "ADR", v: "€1,450", s: "+€120", c: "#06b6d4" },
            { l: "Note", v: "4.92★", s: "47 avis", c: "#fbbf24" },
            { l: "Bookings", v: "12", s: "mois", c: "#a78bfa" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 0.8 }}>{s.l}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginTop: 2 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: s.c, marginTop: 2 }}>{s.s}</div>
            </div>
          ))}
        </div>

        {/* Next bookings */}
        <div style={{ padding: "14px 16px 0", flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Prochaines arrivées</div>
          {[
            { name: "Sarah J.", date: "Auj. 15:00", n: "€1,450" },
            { name: "Marco R.", date: "Mer. 14:00", n: "€2,100" },
            { name: "Emma R.", date: "Sam. 16:00", n: "€2,850" },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, hsl(${i*70},60%,55%), hsl(${i*70+30},60%,40%))`, fontSize: 10, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{b.name.split(" ").map(p => p[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{b.date}</div>
              </div>
              <div style={{ fontSize: 11, color: "#f4cf5e", fontWeight: 600, fontFamily: "Geist Mono" }}>{b.n}</div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "10px 0 22px", background: "#070710" }}>
          {[{ i: "🏠", l: "Home", a: 1 }, { i: "📊", l: "Stats" }, { i: "💰", l: "Revenus" }, { i: "⚙️", l: "Profil" }].map((t, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 18, opacity: t.a ? 1 : 0.4 }}>{t.i}</div>
              <div style={{ fontSize: 9, color: t.a ? "#f4cf5e" : "rgba(255,255,255,0.45)", marginTop: 2, fontWeight: 500 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonthlyStatement() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 580 }}>
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(244,207,94,0.05)" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1 }}>Statement</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>Mars 2025 · Appartement Paris 15</div>
        </div>
        <button style={{ background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "7px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer" }}>📥 PDF</button>
      </div>
      <div style={{ padding: 22 }}>
        {[
          { l: "Revenu brut OTAs", v: "€24,560", d: "12 réservations · 28 nuits" },
          { l: "Commission OTAs", v: "−€2,952", d: "Airbnb 12% · Booking 15%" },
          { l: "Services Sojori", v: "+€1,380", d: "Transport · courses · dîners" },
          { l: "Ménages inclus", v: "Inclus", d: "14 ménages · gratuits" },
          { l: "Ménages extras", v: "+€275", d: "11 ménages payants" },
          { l: "Maintenance", v: "−€140", d: "1 intervention plomberie" },
          { l: "Commission Sojori (15%)", v: "−€3,468", d: "Sur revenu brut" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderTop: i ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{r.l}</div>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{r.d}</div>
            </div>
            <div style={{ fontSize: 14, fontFamily: "Geist Mono", fontWeight: 600, color: r.v.startsWith("−") ? "#fca5a5" : r.v.startsWith("+") ? "#86efac" : "var(--text-1)" }}>{r.v}</div>
          </div>
        ))}
        <div style={{ padding: "18px 0 0", borderTop: "2px solid var(--glass-border)", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Net à reverser</div>
          <div className="gradient-text" style={{ fontSize: 24, fontWeight: 700, fontFamily: "Geist Mono", letterSpacing: "-0.02em" }}>€19,655</div>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, fontSize: 12, color: "#86efac", display: "flex", alignItems: "center", gap: 8 }}>
          <span>✓</span>Virement effectué le 03/04 · Réf: SJR-MAR-RF-0042
        </div>
      </div>
    </div>
  );
}

export default function OwnerPortalPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PageHeader pageTitle="Owner Portal" />
        <PageHero
          badge="👤 Owner Portal · Pour les propriétaires"
          title={<>Vos revenus.<br /><span className="gradient-text">Dans votre poche. Toujours.</span></>}
          subtitle="L&apos;app dédiée aux propriétaires. Suivi temps réel des revenus, occupation, avis. Statements mensuels automatiques. Transparence totale, en 12 langues."
          cta1="Voir la démo"
          cta2="Devenir propriétaire Sojori"
        />

        <section style={{ padding: "20px 32px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="owner-portal-showcase" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
              <div>
                <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>● App mobile dédiée</div>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1 }}>Tout ce que vous voulez savoir. <span className="gradient-text">À portée de pouce.</span></div>
                <div style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 28 }}>Vos revenus du mois, vos prochaines arrivées, votre note moyenne, vos statements PDF — tout dans une app native iOS / Android.</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { i: "📊", t: "Dashboard temps réel", d: "Revenus, occupation, ADR · mis à jour à la minute." },
                    { i: "📅", t: "Calendrier de vos bookings", d: "Vue mois ou liste · arrivées passées et futures." },
                    { i: "⭐", t: "Avis voyageurs", d: "Tous vos avis OTA centralisés · réponses suggérées par IA." },
                    { i: "💰", t: "Statements PDF auto", d: "Le 1er de chaque mois · viré sous 48h ouvrées." },
                  ].map(c => (
                    <div key={c.t} style={{ display: "flex", gap: 14 }}>
                      <div style={{ fontSize: 22, marginTop: 2 }}>{c.i}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{c.t}</div>
                        <div style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5, marginTop: 2 }}>{c.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="owner-portal-phone-wrap" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                <div className="owner-portal-phone-glow" style={{ position: "absolute", inset: "-50px", background: "radial-gradient(circle, rgba(230,176,34,0.18), transparent 65%)", pointerEvents: "none" }} />
                <div className="owner-portal-phone-device">
                  <OwnerPhone />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "40px 32px 80px", borderTop: "1px solid var(--glass-border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 12 }}>● Statement mensuel</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14, maxWidth: 700 }}>Transparence <span className="gradient-text">totale</span>. Aucune surprise.</div>
            <div style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 620, marginBottom: 32, lineHeight: 1.55 }}>Chaque ligne expliquée. Chaque charge justifiée. Le statement PDF arrive automatiquement le 1er du mois, et le virement est effectué sous 48h.</div>
            <MonthlyStatement />
          </div>
        </section>

        <StatsBar stats={[{k:"<48h",l:"Délai de virement"},{k:"12 langues",l:"Statements traduits"},{k:"100%",l:"Transparence frais"},{k:"4.94★",l:"Satisfaction propriétaires"}]} />
        <FinalCTA title={<>Confiez votre logement. <span className="gradient-text">Récupérez votre temps.</span></>} subtitle="Audit gratuit. Onboarding en 7 jours. Premier voyageur sous 14 jours." />
        <PageFooter />
      </div>
    </>
  );
}
