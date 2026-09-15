import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { PropertyTable } from "@/components/analytics/PropertyTable";
import { MainChart } from "@/components/analytics/MainChart";
import { CapabilitiesScroll } from "@/components/analytics/CapabilitiesScroll";
import { InFlow } from '@/components/InFlow';
import { FaqSection } from '@/components/FaqSection';

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
  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle="Smart Analytics" />
        <PageHero
          badge="📊 Smart Analytics · Decision intelligence"
          title={<>Vos données.<br /><span className="gradient-text">Transformées en décisions.</span></>}
          subtitle="Revenue, Occupation, ADR, RevPAR par propriété. Performance staff. Alertes intelligentes. Export comptable. Le pilotage de votre activité — sans tableur Excel."
          cta1="Voir la démo" cta2="Audit gratuit"
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
                { l: "Revenue net", v: "€247,890", d: "+24.6%", c: "#f4cf5e" },
                { l: "Occupation", v: "87.4%", d: "+5.2pts", c: "#06b6d4" },
                { l: "ADR moyen", v: "€1,264", d: "+€84", c: "#a78bfa" },
                { l: "RevPAR", v: "€1,103", d: "+€142", c: "#10b981" },
              ].map(s => (
                <div key={s.l} className="card" style={{padding: 18, minWidth: 200, flexShrink: 0}}>
                  <div style={{fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1}}>{s.l}</div>
                  <div style={{fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em", color: s.c}}>{s.v}</div>
                  <div style={{fontSize: 12, color: "#10b981", marginTop: 2}}>↗ {s.d}</div>
                </div>
              ))}
            </div>
            <MainChart />
            <PropertyTable />
          </div>
        </section>
        <section style={{padding: "24px 32px 44px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1280, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>● Capacités</div>
            <div style={{fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 700}}>Pilotez. <span className="gradient-text">Ne devinez plus.</span></div>
            <CapabilitiesScroll capabilities={[
              { i: "📊", t: "Dashboards live", d: "Mis à jour à la minute. Filtres par propriété, période, OTA, source." },
              { i: "🚨", t: "Alertes intelligentes", d: "Baisse anormale, surcharge staff, opportunité pricing — détection auto." },
              { i: "📈", t: "Benchmarks marché", d: "Comparaison avec votre quartier, votre type de bien, votre saison." },
              { i: "📥", t: "Exports comptable", d: "CSV, PDF, format compta (FEC, Sage). Auto le 1er du mois." },
              { i: "🔮", t: "Forecasts prédictifs", d: "Revenue prévisionnel à 90 jours. Scénarios what-if intégrés." },
              { i: "🎯", t: "Cohort analysis", d: "Clients récurrents, sources qui convertissent, LTV par canal." },
            ]} />
          </div>
        </section>
        <StatsBar stats={[{k:"Live",l:"Mises à jour minute"},{k:"47 KPIs",l:"Tracked en continu"},{k:"90 jours",l:"Forecast prédictif"},{k:"Excel?",l:"Plus jamais"}]} />

        <InFlow
          domain="Ventes & revenu"
          domainColor="#10b981"
          self="Analytics mesure ce que le séjour rapporte réellement, par canal et par chambre."
          upstream={[{ label: 'Séjours du PMS', href: '/pms' }, { label: 'Revenus des extras', href: '/guest-experience' }, { label: 'Commissions canaux', href: '/channel-manager' }]}
          downstream={[{ label: 'Règles de prix affinées', href: '/dynamic-pricing' }, { label: 'Décisions de distribution', href: '/channel-manager' }]}
        />

        <FaqSection
          badge="Analytics"
          title="Questions fréquentes"
          items={[
  {
    "q": "Quels indicateurs suivre en priorité ?",
    "a": "Le taux d'occupation, le prix moyen et le revenu par chambre disponible — mais surtout par période, par catégorie et par canal, jamais en moyenne globale. Une moyenne mensuelle masque exactement ce qu'il faut corriger : le creux du week-end à Casablanca, la saison basse à Tanger."
  },
  {
    "q": "Peut-on voir le revenu hors hébergement ?",
    "a": "Oui. Restauration, spa, transferts, surclassements et départs tardifs sont suivis séparément. C'est souvent la part la plus mal mesurée d'une exploitation, alors qu'elle progresse quand la relation client est orchestrée."
  },
  {
    "q": "Les données sont-elles en temps réel ?",
    "a": "Les indicateurs d'exploitation — arrivées, départs, état des chambres, messages en attente — reflètent la situation courante. Les analyses de revenu se consolident sur la période choisie."
  },
  {
    "q": "Peut-on exporter vers notre comptabilité ?",
    "a": "Oui, des exports sont prévus pour alimenter votre outil comptable. Sojori n'est pas un logiciel de comptabilité et ne cherche pas à le remplacer : il fournit les données d'exploitation."
  },
  {
    "q": "Comment comparer plusieurs établissements ?",
    "a": "Le reporting consolide les sites tout en permettant de les comparer entre eux — occupation, prix moyen, mix canaux, revenu par chambre disponible. C'est ce que les outils conçus pour un établissement unique font mal."
  }
]}
        />


        <FinalCTA title={<>Audit analytics <span className="gradient-text">gratuit</span>.</>} subtitle="On analyse votre data 12 derniers mois et on vous montre vos angles morts. Aucun engagement." />
        <PageFooter />
      </div>
    </>
  );
}
