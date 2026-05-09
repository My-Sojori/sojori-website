import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeMarrakech.title'),
    description: t('gestionLocativeMarrakech.description'),
  };
}

export default function GestionLocativeMarrakechPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Gestion Locative Marrakech" />

        <PageHero
          badge="🏛️ Gestion Locative Marrakech · Solution Complète"
          title={<>Gérez vos riads & villas.<br /><span className="gradient-text">Depuis Marrakech.</span></>}
          subtitle="Property managers à Marrakech : PMS complet, Channel Manager multi-OTA, Conciergerie WhatsApp 24/7, Dynamic Pricing local. La solution pensée pour le marché marocain — Airbnb, Booking, gestion équipe, tout synchronisé."
          cta1="Voir la démo"
          cta2="Parler à un expert"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi Marrakech ?</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              Marrakech = <span className="gradient-text">capitale location saisonnière Maroc</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '🏛️', t: 'Riads & Villas Premium', d: 'Marrakech concentre 70% des locations de luxe au Maroc. Médina historique, Palmeraie, Agdal — nos property managers gèrent 500+ propriétés haut de gamme.' },
                { i: '🌍', t: 'Hub Tourisme International', d: 'Aéroport international, 13M visiteurs/an. Clients FR/EN/AR. Sojori gère les 3 langues nativement — WhatsApp AI, inbox unifié, traduction automatique.' },
                { i: '📈', t: 'Marché Professionnel', d: 'Les property managers à Marrakech gèrent en moyenne 12 propriétés. Besoin d\'outils pro : multi-propriétés, yield management, gestion staff locale.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Modules Sojori pour Marrakech</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce dont un property manager à Marrakech a besoin. <span style={{ color: 'var(--text-3)' }}>Dans un seul logiciel.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '📋', t: 'PMS Multi-Propriétés', d: 'Calendrier unifié riads/villas. Réservations, paiements MAD/EUR, facturation automatique, contrats digitaux. Taxe de séjour Marrakech intégrée.', link: '/pms' },
                { i: '🔄', t: 'Channel Manager Temps Réel', d: 'Synchronisation Airbnb, Booking.com, Expedia. Évitez surréservations, gérez calendrier depuis un dashboard. API 2-way temps réel.', link: '/channel-manager' },
                { i: '💬', t: 'WhatsApp Conciergerie 24/7', d: 'WhatsApp Business API. Conciergerie automatique FR/AR/EN. Check-in digital, réservation transport, épicerie, expériences. Guests satisfaits = reviews 5★.', link: '/whatsapp' },
                { i: '💰', t: 'Dynamic Pricing Local', d: 'Yield management adapté Marrakech : événements (Marathon, festivals), saisons touristiques, jours fériés marocains. Optimisez RevPAR automatiquement.', link: '/dynamic-pricing' },
                { i: '👥', t: 'Gestion Équipe Locale', d: 'Planification ménage, attribution tâches conciergerie, suivi performances. Coordonnez femmes de ménage, gardiens, maintenance — zéro WhatsApp perso.', link: '/teamflow' },
                { i: '📊', t: 'Analytics & Reporting', d: 'Revenue par propriété, occupation, ADR, RevPAR. Export comptable mensuel. Dashboards temps réel pour pilotage data-driven.', link: '/analytics' },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <a href={c.link} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>En savoir plus →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Cas d'usage Marrakech</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Nos clients à Marrakech. <span className="gradient-text">Leurs résultats.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              {[
                { profil: 'Property Manager · 8 Riads Médina', pb: 'Gérait 8 riads avec Excel + WhatsApp perso. Surréservations fréquentes, messages guests perdus, pas de visibilité revenus.', sol: 'PMS + Channel Manager + WhatsApp AI déployés en 5 jours. Calendrier unifié, conciergerie 24/7 automatique, reporting financier mensuel.', res: '+40% occupation · 0 surréservation · 92% satisfaction guests' },
                { profil: 'Co-host · 15 Villas Palmeraie', pb: 'Propriétaires voulaient transparence finances. Statements manuels Excel = 2 jours/mois. Virements retardés.', sol: 'Owner Portal multi-devise. Statements automatiques J+1, virements programmés J+7. Dashboards propriétaires temps réel.', res: '0h admin/mois · 100% rétention propriétaires · +5 villas signées' },
                { profil: 'Agence · 25 Propriétés Mix', pb: 'Équipe ménage désorganisée. Planning WhatsApp = chaos. Pas de suivi qualité. Reviews clients en baisse.', sol: 'TeamFlow déployé. Planning automatique par propriété, checklist ménage digitale, suivi temps réel. WhatsApp AI pour guests.', res: '+0.4★ reviews · -30% temps coordination · Équipe motivée' },
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
          { k: '500+', l: 'Propriétés Marrakech' },
          { k: '70+', l: 'Property Managers' },
          { k: '4.8★', l: 'Satisfaction moyenne' },
          { k: '24/7', l: 'Support FR/AR' }
        ]} />

        <FinalCTA
          title={<>Rejoignez les property managers de Marrakech. <span className="gradient-text">Essai 14 jours gratuit.</span></>}
          subtitle="Onboarding guidé en français. Migration depuis Hostfully, Smoobu, Lodgify offerte. Support dédié Marrakech."
        />

        <PageFooter />
      </div>
    </>
  );
}
