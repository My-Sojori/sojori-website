import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeTanger.title'),
    description: t('gestionLocativeTanger.description'),
    alternates: { canonical: `/${locale}/gestion-locative-tanger` },
  };
}

export default function GestionLocativeTangerPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Gestion Locative Tanger" />

        <PageHero
          badge="⚓ Gestion Locative Tanger · Solution Complète"
          title={<>Gérez vos biens.<br /><span className="gradient-text">Depuis le détroit de Gibraltar.</span></>}
          subtitle="Property managers à Tanger : PMS complet, Channel Manager multi-OTA, Conciergerie WhatsApp 24/7, Dynamic Pricing adapté à un marché unique en Europe/Maroc. La porte d'entrée du Maroc, à 14 km de l'Espagne."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi Tanger ?</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              Tanger = <span className="gradient-text">porte du Maroc vers l'Europe</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '🌊', t: 'À 14 km de l\'Europe', d: 'Ferry Tarifa-Tanger en environ 1h, plusieurs départs par jour. Une clientèle unique au Maroc : excursionnistes espagnols à la journée, MRE en transit vers/depuis l\'Europe, et touristes classiques.' },
                { i: '🚄', t: 'Hub Ferroviaire TGV', d: 'Gare de départ de la LGV Al Boraq vers Casablanca et Rabat. Tanger connecte le Nord du Maroc au reste du pays en quelques heures, un atout logistique pour les voyageurs professionnels comme loisirs.' },
                { i: '🏛️', t: 'Médina Historique Authentique', d: 'Une médina et une Kasbah avec un patrimoine multiculturel unique (portugais, anglais, espagnol, international), plus préservée du tourisme de masse que Marrakech ou Fès — un marché de charme encore émergent.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Modules Sojori pour Tanger</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce dont un property manager à Tanger a besoin. <span style={{ color: 'var(--text-3)' }}>Dans un seul logiciel.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '📋', t: 'PMS Multi-Propriétés', d: 'Calendrier unifié médina, Malabata, centre-ville. Réservations, paiements MAD/EUR, facturation automatique, contrats digitaux — adapté à une clientèle mixte marocaine, espagnole et internationale.', link: '/pms' as const },
                { i: '🔄', t: 'Channel Manager Temps Réel', d: 'Synchronisation Airbnb, Booking.com, Expedia. Évitez surréservations pendant les pics d\'été et l\'opération Marhaba, gérez calendrier depuis un dashboard unique.', link: '/channel-manager' as const },
                { i: '💬', t: 'WhatsApp Conciergerie 24/7', d: 'Conciergerie automatique FR/AR/ES/EN adaptée à une clientèle multilingue frontalière. Check-in digital, instructions d\'accès pour la médina, support réactif.', link: '/whatsapp' as const },
                { i: '💰', t: 'Dynamic Pricing Adapté', d: 'Yield management pensé pour la saisonnalité spécifique de Tanger : été, opération Marhaba (retour massif des MRE), excursions à la journée. Optimisez RevPAR automatiquement.', link: '/dynamic-pricing' as const },
                { i: '👥', t: 'Gestion Équipe Locale', d: 'Planification ménage sur des biens de médina comme de résidences modernes, attribution tâches, suivi performances. Coordonnez vos équipes sans chaos WhatsApp.', link: '/teamflow' as const },
                { i: '📊', t: 'Analytics & Reporting', d: 'Revenue par propriété, occupation, ADR, RevPAR. Export comptable mensuel. Dashboards temps réel pour piloter un marché en forte croissance.', link: '/analytics' as const },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <Link href={{ pathname: c.link, query: { source: 'seo-gestion-locative-tanger' } }} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>En savoir plus →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Cas d'usage Tanger</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Nos clients à Tanger. <span className="gradient-text">Leurs résultats.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { profil: 'Property Manager · Riads Médina/Kasbah', pb: 'Gérait quelques riads avec Excel + WhatsApp perso. Clientèle multilingue (espagnole, française, anglophone) difficile à gérer sans automatisation, messages perdus.', sol: 'PMS + Channel Manager + WhatsApp AI déployés en quelques jours. Calendrier unifié, conciergerie multilingue 24/7, reporting financier mensuel.', res: 'Occupation en hausse · communication fluidifiée toutes langues · 0 surréservation' },
                { profil: 'Co-host · Appartements Malabata & Centre-ville', pb: 'Propriétaires voulaient transparence finances sur un marché en forte croissance. Statements manuels = plusieurs jours par mois. Virements retardés.', sol: 'Owner Portal multi-devise. Statements automatiques, virements programmés, dashboards propriétaires en temps réel.', res: 'Temps administratif fortement réduit · rétention propriétaires élevée · portefeuille en croissance' },
                { profil: 'Agence · Portefeuille Mixte Médina & Résidences Modernes', pb: 'Équipe ménage désorganisée sur des biens hétérogènes (riads historiques, appartements récents). Pas de suivi qualité. Reviews clients en baisse.', sol: 'TeamFlow déployé. Planning automatique par propriété, checklist ménage digitale, suivi temps réel. WhatsApp AI pour guests.', res: 'Reviews en hausse · coordination plus rapide · équipe mieux organisée' },
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
          { k: '14 km', l: "De l'Espagne" },
          { k: 'Al Boraq', l: 'Départ TGV vers Casablanca' },
          { k: '24/7', l: 'Support FR/AR/ES' },
          { k: '<7j', l: 'Mise en place' }
        ]} />

        <FinalCTA
          title={<>Rejoignez les property managers de Tanger. <span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Onboarding guidé en français. Migration depuis Hostfully, Smoobu, Lodgify offerte. Support dédié Maroc."
        />

        <PageFooter />
      </div>
    </>
  );
}
