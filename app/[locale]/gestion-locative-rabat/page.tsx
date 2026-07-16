import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeRabat.title'),
    description: t('gestionLocativeRabat.description'),
  };
}

export default function GestionLocativeRabatPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Gestion Locative Rabat" />

        <PageHero
          badge="🏛️ Gestion Locative Rabat · Solution Complète"
          title={<>Gérez vos appartements.<br /><span className="gradient-text">Depuis la capitale.</span></>}
          subtitle="Property managers à Rabat : PMS complet, Channel Manager multi-OTA, Conciergerie WhatsApp 24/7, Dynamic Pricing adapté à une clientèle institutionnelle et diplomatique. La solution pensée pour la capitale administrative du Maroc, classée patrimoine mondial UNESCO."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi Rabat ?</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              Rabat = <span className="gradient-text">capitale administrative et diplomatique</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '🏛️', t: 'Clientèle Institutionnelle', d: 'Parlement, ministères, ambassades, organisations internationales : Rabat concentre une demande de séjours professionnels, diplomatiques et administratifs très différente du tourisme loisirs classique.' },
                { i: '🏆', t: 'Patrimoine Mondial UNESCO', d: 'Inscrite depuis 2012 sous le nom "Rabat, capitale moderne et ville historique" — Tour Hassan, Kasbah des Oudayas, Chellah, médina historique. Un tourisme culturel qualitatif, complémentaire du séjour affaires.' },
                { i: '🚄', t: 'Bien Connectée par TGV', d: 'Sur la ligne à grande vitesse Al Boraq entre Tanger et Casablanca. Rabat est facilement accessible pour des missions multi-villes, un atout pour les voyageurs professionnels enchaînant plusieurs rendez-vous au Maroc.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Modules Sojori pour Rabat</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce dont un property manager à Rabat a besoin. <span style={{ color: 'var(--text-3)' }}>Dans un seul logiciel.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '📋', t: 'PMS Multi-Propriétés', d: 'Calendrier unifié pour appartements de standing (Agdal, Hay Riad, Hassan). Réservations, paiements MAD/EUR, facturation automatique, contrats digitaux — adapté aux séjours professionnels et diplomatiques.', link: '/pms' as const },
                { i: '🔄', t: 'Channel Manager Temps Réel', d: 'Synchronisation Airbnb, Booking.com, Expedia. Évitez surréservations sur des portefeuilles à demande régulière toute l\'année, gérez calendrier depuis un dashboard unique.', link: '/channel-manager' as const },
                { i: '💬', t: 'WhatsApp Conciergerie 24/7', d: 'Conciergerie automatique FR/AR/EN adaptée aux séjours courts et missions professionnelles. Check-in digital, instructions d\'accès, support réactif.', link: '/whatsapp' as const },
                { i: '💰', t: 'Dynamic Pricing Adapté', d: 'Yield management pensé pour une demande plus lissée qu\'une destination balnéaire : missions professionnelles en semaine, tourisme culturel le weekend. Optimisez RevPAR automatiquement.', link: '/dynamic-pricing' as const },
                { i: '👥', t: 'Gestion Équipe Locale', d: 'Planification ménage sur des portefeuilles d\'appartements de standing, attribution tâches, suivi performances. Coordonnez vos équipes sans chaos WhatsApp.', link: '/teamflow' as const },
                { i: '📊', t: 'Analytics & Reporting', d: 'Revenue par propriété, occupation, ADR, RevPAR. Export comptable mensuel. Dashboards temps réel pour piloter un portefeuille à demande stable.', link: '/analytics' as const },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <Link href={{ pathname: c.link, query: { source: 'seo-gestion-locative-rabat' } }} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>En savoir plus →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Cas d'usage Rabat</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Nos clients à Rabat. <span className="gradient-text">Leurs résultats.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { profil: 'Property Manager · Appartements Agdal/Hay Riad', pb: 'Gérait un portefeuille d\'appartements avec Excel + WhatsApp perso. Clientèle professionnelle exigeante sur les délais de réponse, messages guests perdus, pas de visibilité revenus.', sol: 'PMS + Channel Manager + WhatsApp AI déployés en quelques jours. Calendrier unifié, conciergerie 24/7 automatique, reporting financier mensuel.', res: 'Occupation en hausse · réactivité accrue pour la clientèle professionnelle · 0 surréservation' },
                { profil: 'Co-host · Appartements Standing Souissi/Hassan', pb: 'Propriétaires voulaient transparence finances sur des locations à clientèle mixte affaires/culture. Statements manuels = plusieurs jours par mois. Virements retardés.', sol: 'Owner Portal multi-devise. Statements automatiques, virements programmés, dashboards propriétaires en temps réel.', res: 'Temps administratif fortement réduit · rétention propriétaires élevée · portefeuille en croissance' },
                { profil: 'Agence · Portefeuille Missions Professionnelles', pb: 'Équipe ménage désorganisée sur des rotations rapides liées aux missions courtes. Pas de suivi qualité. Reviews clients en baisse.', sol: 'TeamFlow déployé. Planning automatique par propriété, checklist ménage digitale, suivi temps réel. WhatsApp AI pour guests business.', res: 'Reviews en hausse · coordination plus rapide · équipe mieux organisée' },
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
          { k: 'UNESCO', l: 'Patrimoine mondial depuis 2012' },
          { k: 'Al Boraq', l: 'Sur la ligne TGV' },
          { k: '24/7', l: 'Support FR/AR' },
          { k: '<7j', l: 'Mise en place' }
        ]} />

        <FinalCTA
          title={<>Rejoignez les property managers de Rabat. <span className="gradient-text">1 mois d&apos;essai gratuit.</span></>}
          subtitle="Onboarding guidé en français. Migration depuis Hostfully, Smoobu, Lodgify offerte. Support dédié Maroc."
        />

        <PageFooter />
      </div>
    </>
  );
}
