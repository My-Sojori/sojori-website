import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Conciergerie Marrakech | Service WhatsApp 24/7 Riads & Villas Maroc',
  description: 'Conciergerie digitale 24/7 pour riads et villas à Marrakech. WhatsApp Business AI trilingue (FR/AR/EN), réservation transport/restaurants, guidebook digital, check-in autonome. Satisfaction guests maximale.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'conciergerie Marrakech',
    'conciergerie riad Marrakech',
    'WhatsApp conciergerie Maroc',
    'service conciergerie automatique',
    'check-in digital Marrakech',
    'guidebook Marrakech',
    'expériences locales Marrakech',
  ],
  path: '/conciergerie-marrakech',
});

export default function ConciergerieMarrakechPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Conciergerie Marrakech" />

        <PageHero
          badge="💬 Conciergerie Marrakech · WhatsApp 24/7"
          title={<>Conciergerie automatique.<br /><span className="gradient-text">Pour riads & villas Marrakech.</span></>}
          subtitle="WhatsApp Business AI trilingue FR/AR/EN. Check-in digital, réservation transport aéroport, restaurants, hammams, excursions. Guidebook interactif Médina/Palmeraie. Guests satisfaits, reviews 5 étoiles — sans personnel 24/7."
          cta1="Voir la démo WhatsApp"
          cta2="Tester gratuitement"
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Pourquoi la conciergerie est critique à Marrakech</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 900 }}>
              Marrakech = ville <span className="gradient-text">à forte demande service</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '🌍', t: 'Clientèle Internationale', d: 'Guests FR/EN/AR avec attentes élevées. Besoin d\'info transport, restaurants, hammams, excursions Sahara/Atlas. Sojori traduit et répond automatiquement.' },
                { i: '⏰', t: 'Arrivées Décalées', d: 'Vols tard le soir, arrivées 23h-minuit fréquentes. Impossible d\'avoir staff physique 24/7. WhatsApp AI gère check-in, code porte, instructions.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Services Conciergerie Sojori Marrakech</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Tout ce que vos guests demandent. <span style={{ color: 'var(--text-3)' }}>Automatisé sur WhatsApp.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '🚖', t: 'Transport Aéroport', d: 'Réservation taxi aéroport Menara automatique. Guest envoie heure d\'arrivée sur WhatsApp → taxi confirmé, prix transparent (150-200 MAD). Tracking chauffeur temps réel.' },
                { i: '🏛️', t: 'Guidebook Digital Marrakech', d: 'Recommandations quartier : Médina, Gueliz, Hivernage. Restaurants (Le Jardin, Nomad), hammams traditionnels, souks, palais. Mis à jour en continu.' },
                { i: '🍽️', t: 'Réservations Restaurants', d: 'Guest demande resto sur WhatsApp → suggestions + réservation directe. Partenariats locaux : La Mamounia, Dar Yacout, terrasses Médina.' },
                { i: '🏜️', t: 'Excursions & Expériences', d: 'Désert Sahara, vallée Ourika, Atlas, quad Palmeraie, cours cuisine. Tarifs négociés, réservation instantanée, commission property manager.' },
                { i: '🔑', t: 'Check-in Digital', d: 'Code porte envoyé automatiquement J-1. Instructions WiFi, climatisation, équipements. Photos/vidéos guidage. Arrivée autonome même à minuit.' },
                { i: '🛎️', t: 'Demandes Sur-Mesure', d: 'Épicerie livrée, baby-sitting, chauffeur privé, massages à domicile. Tout traité sur WhatsApp, facturation automatique.' },
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
                { step: '1', moment: 'J-2 avant arrivée', action: 'Message automatique WhatsApp', detail: 'Guest reçoit lien guidebook Marrakech + formulaire check-in digital (passeport scan, heure arrivée). AI répond questions en FR/AR/EN.' },
                { step: '2', moment: 'J-1 avant arrivée', action: 'Instructions accès', detail: 'Code porte, adresse exacte Google Maps, vidéo guidage Médina. Proposition taxi aéroport si besoin. Tout sur WhatsApp.' },
                { step: '3', moment: 'Jour J arrivée', action: 'Check-in autonome', detail: 'Guest arrive, code fonctionne, instructions WiFi/équipements reçues. Pas besoin de staff physique. AI disponible 24/7 pour questions.' },
                { step: '4', moment: 'Pendant séjour', action: 'Conciergerie à la demande', detail: 'Guest demande resto, taxi, hammam, excursion → WhatsApp AI traite, réserve, confirme. Property manager notifié si intervention humaine nécessaire.' },
                { step: '5', moment: 'Jour check-out', action: 'Feedback automatique', detail: 'Message remerciement + demande review Airbnb/Booking. Lien direct, taux conversion élevé. Satisfaction mesurée automatiquement.' },
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
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Résultats Property Managers Marrakech</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Avant / Après Sojori Conciergerie
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24, background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>❌ Avant (sans Sojori)</div>
                {[
                  'Personnel conciergerie 24/7 = 8000 MAD/mois',
                  'Messages guests perdus la nuit',
                  'Délai réponse 2-6h (guests frustrés)',
                  'Reviews 4.2★ moyenne',
                  'Surcharge admin : guidebook PDF, Excel transport',
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 8 }}>• {t}</div>
                ))}
              </div>
              <div className="card" style={{ padding: 24, background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>✅ Après (avec Sojori)</div>
                {[
                  'WhatsApp AI 24/7 = 0 coût personnel',
                  '100% messages traités en temps réel',
                  'Réponse <2min, jour & nuit',
                  'Reviews 4.8★ moyenne (+0.6★)',
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
          { k: '+0.6★', l: 'Gain reviews' }
        ]} />

        <FinalCTA
          title={<>Testez la conciergerie WhatsApp AI. <span className="gradient-text">14 jours gratuit.</span></>}
          subtitle="Onboarding 1 semaine. Guidebook Marrakech pré-rempli. Formation équipe incluse. Support FR/AR."
        />

        <PageFooter />
      </div>
    </>
  );
}
