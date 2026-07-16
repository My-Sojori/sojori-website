import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('conciergerieAgadir.title'),
    description: t('conciergerieAgadir.description'),
  };
}

export default function ConciergerieAgadirPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Conciergerie Agadir" />

        <PageHero
          badge="💬 Conciergerie Agadir · WhatsApp 24/7"
          title={<>Conciergerie automatique.<br /><span className="gradient-text">Pour résidences balnéaires Agadir.</span></>}
          subtitle="WhatsApp Business AI trilingue FR/AR/EN. Check-in digital, réservation transport aéroport, plage, excursions. Adapté aux arrivées charter groupées et aux séjours longs. Guests satisfaits, reviews 5 étoiles — sans personnel 24/7."
          cta1="Voir la démo WhatsApp"
          cta2="Tester gratuitement"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi la conciergerie est critique à Agadir</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 900 }}>
              Agadir = ville <span className="gradient-text">à forte demande saisonnière</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '👨‍👩‍👧', t: 'Familles & Séjours Longs', d: 'Guests FR/EN/AR avec attentes élevées sur la réactivité. Besoin d\'info plage, excursions, activités enfants. Sojori traduit et répond automatiquement, toute l\'année.' },
                { i: '✈️', t: 'Arrivées Charter Groupées', d: 'Vols charter et low-cost concentrés sur certains créneaux. Impossible d\'avoir staff physique disponible pour absorber les pics. WhatsApp AI gère check-in, code porte, instructions en simultané.' },
                { i: '⭐', t: 'Reviews = Tout', d: 'Sur Airbnb/Booking, une review <4★ tue la visibilité. Conciergerie réactive = satisfaction guest = 5★. Sojori répond <2min, 24/7.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Services Conciergerie Sojori Agadir</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce que vos guests demandent. <span style={{ color: 'var(--text-3)' }}>Automatisé sur WhatsApp.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '🚖', t: 'Transport Aéroport', d: 'Réservation taxi aéroport Al Massira automatique. Guest envoie heure d\'arrivée sur WhatsApp → taxi confirmé, prix transparent. Tracking chauffeur temps réel.' },
                { i: '🏖️', t: 'Guidebook Digital Agadir', d: 'Recommandations quartier : Marina, Founty, Talborjt. Restaurants, plage, souk El Had. Mis à jour en continu.' },
                { i: '🍽️', t: 'Réservations Restaurants', d: 'Guest demande resto sur WhatsApp → suggestions + réservation directe. Adapté aux familles comme aux couples.' },
                { i: '🏄', t: 'Excursions & Activités', d: 'Surf, vallée de l\'Ourika, désert, activités enfants. Tarifs négociés, réservation instantanée, commission property manager.' },
                { i: '🔑', t: 'Check-in Digital', d: 'Code porte envoyé automatiquement J-1. Instructions WiFi, climatisation, équipements. Arrivée autonome même en pic charter.' },
                { i: '🛎️', t: 'Demandes Sur-Mesure', d: 'Épicerie livrée, baby-sitting, location matériel plage. Tout traité sur WhatsApp, facturation automatique.' },
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
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Comment ça marche</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Du check-in au check-out. <span className="gradient-text">Tout sur WhatsApp.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {[
                { step: '1', moment: 'J-2 avant arrivée', action: 'Message automatique WhatsApp', detail: 'Guest reçoit lien guidebook Agadir + formulaire check-in digital (passeport scan, heure arrivée). AI répond questions en FR/AR/EN.' },
                { step: '2', moment: 'J-1 avant arrivée', action: 'Instructions accès', detail: 'Code porte, adresse exacte Google Maps. Proposition taxi aéroport si besoin. Tout sur WhatsApp.' },
                { step: '3', moment: 'Jour J arrivée', action: 'Check-in autonome', detail: 'Guest arrive, code fonctionne, instructions WiFi/équipements reçues. Pas besoin de staff physique même en pic d\'arrivées. AI disponible 24/7.' },
                { step: '4', moment: 'Pendant séjour', action: 'Conciergerie à la demande', detail: 'Guest demande resto, excursion, activité plage → WhatsApp AI traite, réserve, confirme. Property manager notifié si intervention humaine nécessaire.' },
                { step: '5', moment: 'Jour check-out', action: 'Feedback automatique', detail: 'Message remerciement + demande review Airbnb/Booking. Lien direct, taux conversion élevé.' },
              ].map((c) => (
                <div key={c.step} className="card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f4cf5e', color: '#0a0a10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{c.step}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{c.moment}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.action}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Résultats Property Managers Agadir</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Avant / Après Sojori Conciergerie
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24, background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>❌ Avant (sans Sojori)</div>
                {[
                  'Personnel conciergerie 24/7 coûteux',
                  'Pics d\'arrivées charter ingérables manuellement',
                  'Délai réponse plusieurs heures (guests frustrés)',
                  'Reviews en dessous du potentiel',
                  'Surcharge admin : guidebook PDF, Excel transport',
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 8 }}>• {t}</div>
                ))}
              </div>
              <div className="card" style={{ padding: 24, background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>✅ Après (avec Sojori)</div>
                {[
                  'WhatsApp AI 24/7 = 0 coût personnel',
                  'Pics d\'arrivées absorbés automatiquement',
                  'Réponse <2min, jour & nuit',
                  'Reviews en hausse',
                  'Guidebook auto-mis-à-jour, réservations 1 clic',
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 8 }}>• {t}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: '<2min', l: 'Temps réponse moyen' },
          { k: '24/7', l: 'Disponibilité' },
          { k: '3 langues', l: 'FR/AR/EN auto' },
          { k: 'Al Massira', l: '3ème aéroport du pays' }
        ]} />

        <FinalCTA
          title={<>Testez la conciergerie WhatsApp AI. <span className="gradient-text">1 mois gratuit.</span></>}
          subtitle="Onboarding 1 semaine. Guidebook Agadir pré-rempli. Formation équipe incluse. Support FR/AR."
        />

        <PageFooter />
      </div>
    </>
  );
}
