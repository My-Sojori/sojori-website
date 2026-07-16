import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('conciergerieTanger.title'),
    description: t('conciergerieTanger.description'),
    alternates: { canonical: `/${locale}/conciergerie-tanger` },
  };
}

export default function ConciergerieTangerPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Conciergerie Tanger" />

        <PageHero
          badge="💬 Conciergerie Tanger · WhatsApp 24/7"
          title={<>Conciergerie automatique.<br /><span className="gradient-text">Pour biens médina & Tanger moderne.</span></>}
          subtitle="WhatsApp Business AI multilingue FR/AR/ES/EN. Check-in digital, réservation transport, guidebook médina et Kasbah. Adapté à une clientèle frontalière unique au Maroc. Guests satisfaits, reviews 5 étoiles — sans personnel 24/7."
          cta1="Voir la démo WhatsApp"
          cta2="Tester gratuitement"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi la conciergerie est critique à Tanger</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 900 }}>
              Tanger = ville <span className="gradient-text">à clientèle multilingue frontalière</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '🌍', t: 'Clientèle Multilingue', d: 'Guests marocains, espagnols, français, MRE en transit et internationaux. Besoin de communiquer sans friction dans 4 langues. Sojori traduit et répond automatiquement.' },
                { i: '⏰', t: 'Arrivées Variées', d: 'Ferry depuis l\'Espagne, TGV Al Boraq, vol international : les modes d\'arrivée et horaires sont hétérogènes. WhatsApp AI gère check-in, code porte, instructions à toute heure.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Services Conciergerie Sojori Tanger</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce que vos guests demandent. <span style={{ color: 'var(--text-3)' }}>Automatisé sur WhatsApp.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '🚖', t: 'Transport Aéroport & Port', d: 'Réservation taxi aéroport Ibn Battouta ou depuis le port automatique. Guest envoie heure d\'arrivée sur WhatsApp → transport confirmé, prix transparent.' },
                { i: '🏛️', t: 'Guidebook Digital Médina/Kasbah', d: 'Recommandations quartier : médina, Kasbah, Grand Socco, Petit Socco. Restaurants, cafés emblématiques, vue sur le détroit. Mis à jour en continu.' },
                { i: '🍽️', t: 'Réservations Restaurants', d: 'Guest demande resto sur WhatsApp → suggestions + réservation directe. Adapté à une clientèle multiculturelle.' },
                { i: '⚓', t: 'Excursions & Ferry', d: 'Grottes d\'Hercule, Cap Spartel, excursion vers l\'Espagne via ferry. Tarifs négociés, réservation instantanée, commission property manager.' },
                { i: '🔑', t: 'Check-in Digital', d: 'Code porte envoyé automatiquement J-1. Instructions WiFi, climatisation, équipements. Arrivée autonome même dans les ruelles de la médina.' },
                { i: '🛎️', t: 'Demandes Sur-Mesure', d: 'Épicerie livrée, guide privé médina, chauffeur. Tout traité sur WhatsApp, facturation automatique.' },
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
                { step: '1', moment: 'J-2 avant arrivée', action: 'Message automatique WhatsApp', detail: 'Guest reçoit lien guidebook Tanger + formulaire check-in digital (passeport scan, heure arrivée). AI répond questions en FR/AR/ES/EN.' },
                { step: '2', moment: 'J-1 avant arrivée', action: 'Instructions accès', detail: 'Code porte, adresse exacte Google Maps, vidéo guidage médina si besoin. Proposition transport si nécessaire. Tout sur WhatsApp.' },
                { step: '3', moment: 'Jour J arrivée', action: 'Check-in autonome', detail: 'Guest arrive, code fonctionne, instructions WiFi/équipements reçues. Pas besoin de staff physique. AI disponible 24/7 pour questions.' },
                { step: '4', moment: 'Pendant séjour', action: 'Conciergerie à la demande', detail: 'Guest demande resto, excursion, transport → WhatsApp AI traite, réserve, confirme. Property manager notifié si intervention humaine nécessaire.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Résultats Property Managers Tanger</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Avant / Après Sojori Conciergerie
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24, background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>❌ Avant (sans Sojori)</div>
                {[
                  'Personnel conciergerie 24/7 coûteux',
                  'Barrière de langue avec clientèle espagnole/internationale',
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
                  '4 langues gérées automatiquement (FR/AR/ES/EN)',
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
          { k: '4 langues', l: 'FR/AR/ES/EN auto' },
          { k: '14 km', l: "De l'Espagne" }
        ]} />

        <FinalCTA
          title={<>Testez la conciergerie WhatsApp AI. <span className="gradient-text">1 mois gratuit.</span></>}
          subtitle="Onboarding 1 semaine. Guidebook Tanger pré-rempli. Formation équipe incluse. Support FR/AR/ES."
        />

        <PageFooter />
      </div>
    </>
  );
}
