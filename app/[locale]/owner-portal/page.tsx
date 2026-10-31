import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { SojoriMark } from "@/components/Logo";
import { InFlow } from '@/components/InFlow';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { Exemple } from '@/components/refonte/Exemple';
import { Trait } from '@/components/refonte/Trait';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('ownerPortal.title'),
    description: t('ownerPortal.description'),
    alternates: { canonical: `/${locale}/owner-portal` },
  };
}

function OwnerPhone() {
  const tb = useTranslations('pageBodies.owner-portal');
  return (
    <div style={{
      width: 320, height: 660, borderRadius: 38, padding: 8,
      background: "linear-gradient(180deg, #1a1a1f, #0a0a0d)",
      boxShadow: "0 30px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset",
    }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 32, background: "#0a0a10", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 110, height: 26, borderRadius: 13, background: "#000", zIndex: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 24px 8px", fontSize: 11, color: "#fff", fontWeight: 600, fontFamily: "Geist Mono" }}>
          <span>09:42</span><span>5G </span>
        </div>
        <div style={{ padding: "10px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SojoriMark size={26} />
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em", color: "#fff" }}>sojori</span>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>HM</div>
        </div>
        <div style={{ padding: "4px 16px 12px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{tb('k038')}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 2 }}>{tb('k039')}</div>
        </div>

        {/* Revenue card */}
        <div style={{ margin: "0 16px", padding: 16, borderRadius: 14, background: "linear-gradient(135deg, rgba(244,207,94,0.18), rgba(244,207,94,0.05))", border: "1px solid rgba(244,207,94,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>{tb('k040')}</div>
            <div style={{ fontSize: 10, color: "#10b981", fontWeight: 600 }}>{tb('k041')}</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginTop: 6, letterSpacing: "-0.02em" }}>{tb('k042')}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{tb('k043')}</div>
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
            { l: "ADR", v: tb('k044'), s: "+120 MAD", c: "#06b6d4" },
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
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{tb('k045')}</div>
          {[
            { name: tb('k046'), date: "Auj. 15:00", n: "1,450 MAD" },
            { name: tb('k047'), date: "Mer. 14:00", n: "2,100 MAD" },
            { name: tb('k048'), date: "Sam. 16:00", n: "2,850 MAD" },
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
          {[{ i: "", l: "Home", a: 1 }, { i: "", l: "Stats" }, { i: "", l: "Revenus" }, { i: "", l: "Profil" }].map((t, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 18, opacity: t.a ? 1 : 0.4 }}><Trait /></div>
              <div style={{ fontSize: 9, color: t.a ? "#f4cf5e" : "rgba(255,255,255,0.45)", marginTop: 2, fontWeight: 500 }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonthlyStatement() {
  const tb = useTranslations('pageBodies.owner-portal');
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", maxWidth: 580 }}>
      <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(244,207,94,0.05)" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1 }}>Statement</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{tb('k049')}</div>
        </div>
        <button style={{ background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "7px 14px", borderRadius: 7, fontSize: 12, cursor: "pointer" }}>PDF</button>
      </div>
      <div style={{ padding: 22 }}>
        {[
          { l: tb('k050'), v: tb('k051'), d: tb('k052') },
          { l: tb('k053'), v: tb('k054'), d: tb('k055') },
          { l: tb('k056'), v: tb('k057'), d: tb('k058') },
          { l: tb('k059'), v: "Inclus", d: tb('k060') },
          { l: tb('k061'), v: tb('k062'), d: tb('k063') },
          { l: "Maintenance", v: tb('k064'), d: tb('k065') },
          { l: tb('k066'), v: tb('k067'), d: tb('k068') },
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
          <div style={{ fontSize: 14, fontWeight: 600 }}>{tb('k069')}</div>
          <div className="gradient-text" style={{ fontSize: 24, fontWeight: 700, fontFamily: "Geist Mono", letterSpacing: "-0.02em" }}>{tb('k070')}</div>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, fontSize: 12, color: "#86efac", display: "flex", alignItems: "center", gap: 8 }}>
          <span>✓</span>{tb('k071')}</div>
      </div>
    </div>
  );
}

export default function OwnerPortalPage() {
  const tb = useTranslations('pageBodies.owner-portal');
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PageHeader pageTitle={tb('k001')} />
        <PageHero
          badge={tb('k002')}
          title={<>{tb('k003')}<br /><span className="gradient-text">{tb('k004')}</span></>}
          subtitle={tb('k005')}
          cta1={tb('k006')}
          cta2={tb('k007')}
        />

        <section style={{ padding: "12px 32px 44px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="owner-portal-showcase" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
              <div>
                <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 14 }}>{tb('k008')}</div>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1 }}>{tb('k009')}<span className="gradient-text">{tb('k010')}</span></div>
                <div style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 28 }}>{tb('k011')}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { i: "", t: tb('k012'), d: tb('k013') },
                    { i: "", t: tb('k014'), d: tb('k015') },
                    { i: "", t: tb('k016'), d: tb('k017') },
                    { i: "", t: tb('k018'), d: tb('k019') },
                  ].map(c => (
                    <div key={c.t} style={{ display: "flex", gap: 14 }}>
                      <div style={{ fontSize: 22, marginTop: 2 }}><Trait /></div>
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
                  <Exemple><OwnerPhone /></Exemple>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "24px 32px 44px", borderTop: "1px solid var(--glass-border)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="uppercase-sm" style={{ color: "var(--text-3)", marginBottom: 12 }}>{tb('k020')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14, maxWidth: 700 }}>Transparence <span className="gradient-text">totale</span>{tb('k021')}</div>
            <div style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 620, marginBottom: 32, lineHeight: 1.55 }}>{tb('k022')}</div>
            <Exemple><MonthlyStatement /></Exemple>
          </div>
        </section>

        <StatsBar stats={[{k:tb('k023'),l:tb('k024')},{k:tb('k025'),l:tb('k026')},{k:"100%",l:tb('k027')},{k:"4.94★",l:tb('k028')}]} />

        <InFlow
          domain={tb('k029')}
          domainColor="#8b5cf6"
          self={tb('k030')}
          upstream={[{ label: tb('k031'), href: '/analytics' }, { label: tb('k032'), href: '/pms' }]}
          downstream={[{ label: tb('k033') }, { label: tb('k034') }]}
        />

        <FaqFromMessages page="owner-portal" />


        <FinalCTA title={<>{tb('k035')}<span className="gradient-text">{tb('k036')}</span></>} subtitle={tb('k037')} />
        <PageFooter />
      </div>
    </>
  );
}
