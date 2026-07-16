import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeCasablanca.title'),
    description: t('gestionLocativeCasablanca.description'),
  };
}

export default function GestionLocativeCasablancaPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Gestion Locative Casablanca" />

        <PageHero
          badge="🏙️ Gestion Locative Casablanca · Solution Complète"
          title={<>Gérez vos appartements.<br /><span className="gradient-text">Depuis Casablanca.</span></>}
          subtitle="Property managers à Casablanca : PMS complet, Channel Manager multi-OTA, Conciergerie WhatsApp 24/7, Dynamic Pricing adapté à la clientèle affaires. La solution pensée pour la capitale économique du Maroc."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi Casablanca ?</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              Casablanca = <span className="gradient-text">capitale économique du Maroc</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '💼', t: 'Clientèle Affaires Dominante', d: "Premier pôle économique et financier du Maroc : sièges sociaux, banques, Casablanca Finance City. La location courte durée y répond d'abord à une demande business — séjours pro, missions, relocations — plus qu'au tourisme loisirs pur." },
                { i: '✈️', t: 'Hub Aérien International', d: "Aéroport Mohammed V, principal point d'entrée international du pays avec de nombreuses liaisons long-courrier. Beaucoup d'arrivées tardives et de séjours courts en semaine, un rythme différent des villes balnéaires." },
                { i: '🏢', t: 'Marché Immobilier Le Plus Dense', d: "Le plus grand parc de logements meublés du pays, concentré dans des quartiers modernes (Maarif, Gauthier, Racine, CFC). Les property managers y gèrent des portefeuilles d'appartements standardisés plutôt que des biens de charme uniques." },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Modules Sojori pour Casablanca</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce dont un property manager à Casablanca a besoin. <span style={{ color: 'var(--text-3)' }}>Dans un seul logiciel.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '📋', t: 'PMS Multi-Propriétés', d: 'Calendrier unifié pour portefeuilles d\'appartements. Réservations, paiements MAD/EUR, facturation automatique, contrats digitaux — adapté aux séjours courts business autant qu\'aux vacances.', link: '/pms' as const },
                { i: '🔄', t: 'Channel Manager Temps Réel', d: 'Synchronisation Airbnb, Booking.com, Expedia. Évitez surréservations sur des portefeuilles de dizaines d\'appartements, gérez calendrier depuis un dashboard unique.', link: '/channel-manager' as const },
                { i: '💬', t: 'WhatsApp Conciergerie 24/7', d: 'Conciergerie automatique FR/AR/EN adaptée aux arrivées tardives fréquentes (vols long-courrier). Check-in digital, instructions d\'accès, support réactif.', link: '/whatsapp' as const },
                { i: '💰', t: 'Dynamic Pricing Adapté', d: 'Yield management pensé pour une demande mixte affaires/loisirs : semaine vs weekend, événements professionnels, saisonnalité touristique. Optimisez RevPAR automatiquement.', link: '/dynamic-pricing' as const },
                { i: '👥', t: 'Gestion Équipe Locale', d: 'Planification ménage sur des portefeuilles étendus, attribution tâches, suivi performances. Coordonnez plusieurs équipes sur plusieurs quartiers sans chaos WhatsApp.', link: '/teamflow' as const },
                { i: '📊', t: 'Analytics & Reporting', d: 'Revenue par propriété, occupation, ADR, RevPAR. Export comptable mensuel. Dashboards temps réel pour piloter un portefeuille dense et professionnalisé.', link: '/analytics' as const },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <Link href={{ pathname: c.link, query: { source: 'seo-gestion-locative-casablanca' } }} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>En savoir plus →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Cas d'usage Casablanca</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Nos clients à Casablanca. <span className="gradient-text">Leurs résultats.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { profil: 'Property Manager · Portefeuille Appartements Maarif/Gauthier', pb: 'Gérait un portefeuille d\'appartements avec Excel + WhatsApp perso. Arrivées tardives non gérées la nuit, messages guests perdus, pas de visibilité revenus consolidée.', sol: 'PMS + Channel Manager + WhatsApp AI déployés en quelques jours. Calendrier unifié, conciergerie 24/7 automatique pour les arrivées tardives, reporting financier mensuel.', res: 'Occupation en hausse · surréservations éliminées · gestion des arrivées de nuit automatisée' },
                { profil: 'Co-host · Studios & Appartements Meublés', pb: 'Propriétaires voulaient transparence finances sur des séjours majoritairement courts. Statements manuels = plusieurs jours par mois. Virements retardés.', sol: 'Owner Portal multi-devise. Statements automatiques, virements programmés, dashboards propriétaires en temps réel.', res: 'Temps administratif fortement réduit · rétention propriétaires élevée · portefeuille en croissance' },
                { profil: 'Agence · Portefeuille Mixte Business & Loisirs', pb: 'Équipe ménage désorganisée sur des rotations rapides (séjours courts fréquents). Pas de suivi qualité. Reviews clients en baisse.', sol: 'TeamFlow déployé. Planning automatique par propriété, checklist ménage digitale, suivi temps réel. WhatsApp AI pour guests business et loisirs.', res: 'Reviews en hausse · coordination plus rapide · équipe mieux organisée' },
              ].map((c, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{c.profil}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Problème</div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.pb}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Solution Sojori</div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.sol}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: 'var(--text-2)' }}>Résultats</div>
                      <div style={{ fontSize: 13, color: '#10b981', lineHeight: 1.55, fontWeight: 600 }}>{c.res}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: '1er', l: 'Pôle économique du Maroc' },
          { k: 'Mohammed V', l: 'Hub aérien international' },
          { k: '24/7', l: 'Support FR/AR' },
          { k: '<7j', l: 'Mise en place' }
        ]} />

        <FinalCTA
          title={<>Rejoignez les property managers de Casablanca. <span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Onboarding guidé en français. Migration depuis Hostfully, Smoobu, Lodgify offerte. Support dédié Maroc."
        />

        <PageFooter />
      </div>
    </>
  );
}
