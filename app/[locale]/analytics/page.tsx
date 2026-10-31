import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { PropertyTable } from "@/components/analytics/PropertyTable";
import { MainChart } from "@/components/analytics/MainChart";
import { PnlAnimation } from "@/components/analytics/PnlAnimation";
import { CapabilitiesScroll } from "@/components/analytics/CapabilitiesScroll";
import { InFlow } from '@/components/InFlow';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { Exemple } from '@/components/refonte/Exemple';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('analytics.title'),
    description: t('analytics.description'),
    alternates: { canonical: `/${locale}/analytics` },
  };
}

export default function AnalyticsPage() {
  const tb = useTranslations('pageBodies.analytics');
  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle={tb('k001')} />
        <PageHero
          badge={tb('k002')}
          title={<>{tb('k003')}<br /><span className="gradient-text">{tb('k004')}</span></>}
          subtitle={tb('k005')}
          cta1={tb('k006')} cta2={tb('k007')}
        />
        <section style={{padding: "12px 32px 32px"}}>
          <div style={{maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14}}>
            <div style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(139,92,246,0.3) rgba(255,255,255,0.05)",
              WebkitOverflowScrolling: "touch"
            }}>
              {[
                { l: tb('k008'), v: tb('k009'), d: "+24,6 %", c: "#f4cf5e" },
                { l: "Occupation", v: "87,4 %", d: tb('k010'), c: "#06b6d4" },
                { l: tb('k011'), v: tb('k012'), d: tb('k013'), c: "#a78bfa" },
                { l: "RevPAR", v: tb('k014'), d: tb('k015'), c: "#10b981" },
              ].map(s => (
                <div key={s.l} className="card" style={{padding: 18, minWidth: 200, flexShrink: 0}}>
                  <div style={{fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1}}>{s.l}</div>
                  <div style={{fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em", color: s.c}}>{s.v}</div>
                  <div style={{fontSize: 12, color: "#10b981", marginTop: 2}}>↗ {s.d}</div>
                </div>
              ))}
            </div>
            <Exemple><MainChart /></Exemple>
            <Exemple><PnlAnimation /></Exemple>
            <Exemple><PropertyTable /></Exemple>
          </div>
        </section>
        <section style={{padding: "24px 32px 44px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1280, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>{tb('k016')}</div>
            <div style={{fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 700}}>Pilotez. <span className="gradient-text">{tb('k017')}</span></div>
            <CapabilitiesScroll capabilities={[
              { i: "•", t: tb('k018'), d: tb('k019') },
              { i: "•", t: tb('k020'), d: tb('k021') },
              { i: "•", t: tb('k022'), d: tb('k023') },
              { i: "•", t: tb('k024'), d: tb('k025') },
              { i: "•", t: tb('k026'), d: tb('k027') },
              { i: "•", t: tb('k028'), d: tb('k029') }
            ]} />
          </div>
        </section>
        <StatsBar stats={[{k:"Live",l:tb('k030')},{k:tb('k031'),l:tb('k032')},{k:tb('k033'),l:tb('k034')},{k:tb('k035'),l:tb('k036')}]} />

        <InFlow
          domain={tb('k037')}
          domainColor="#10b981"
          self={tb('k038')}
          upstream={[{ label: tb('k039'), href: '/pms' }, { label: tb('k040'), href: '/guest-experience' }, { label: tb('k041'), href: '/channel-manager' }]}
          downstream={[{ label: tb('k042'), href: '/dynamic-pricing' }, { label: tb('k043'), href: '/channel-manager' }]}
        />

        <FaqFromMessages page="analytics" />


        <FinalCTA title={<>{tb('k044')}<span className="gradient-text">gratuit</span>.</>} subtitle={tb('k045')} />
        <PageFooter />
      </div>
    </>
  );
}
