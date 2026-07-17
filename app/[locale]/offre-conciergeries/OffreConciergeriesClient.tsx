'use client';

import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { trackOfferCta } from '@/lib/analytics';

/* Landing dédiée aux campagnes d'acquisition conciergeries (ads Meta).
   Contenu FR volontairement en dur : la cible est le Maroc francophone. */

const BRIQUES = [
  { icon: '🗂️', label: 'PMS' },
  { icon: '🔗', label: 'Channel Manager' },
  { icon: '📈', label: 'Prix dynamiques' },
  { icon: '💬', label: 'WhatsApp Guest' },
  { icon: '🌐', label: 'Booking direct' },
  { icon: '✨', label: 'Upsell' },
  { icon: '🧹', label: 'Staff & Ménage' },
  { icon: '📥', label: 'Inbox unifiée' },
  { icon: '📊', label: 'Analytics' },
  { icon: '🏠', label: 'Portail propriétaire' },
];

const ETAPES = [
  {
    n: '1',
    title: 'Démo — 15 minutes',
    text: 'On vous montre Sojori sur vos propres cas : vos biens, vos canaux, votre équipe.',
  },
  {
    n: '2',
    title: 'Migration offerte — on s’occupe de tout',
    text: 'Annonces Airbnb & Booking, calendriers, réservations, voyageurs : notre équipe transfère tout. Vous ne touchez à rien, zéro interruption d’activité.',
  },
  {
    n: '3',
    title: '2 mois gratuits — sans engagement',
    text: 'Vous jugez sur pièces. Si Sojori ne vous fait pas gagner de temps et d’argent, vous partez — vos données avec vous.',
  },
];

const REASSURANCE = [
  { icon: '🇲🇦', text: 'Paiement marocain, facturation locale' },
  { icon: '🗣️', text: 'Support WhatsApp en français et en arabe' },
  { icon: '🔓', text: 'Sans engagement — vos données restent les vôtres' },
];

function trackLead() {
  trackOfferCta('offre-conciergeries');
}

export function OffreConciergeriesClient() {
  return (
    <>
      <BackgroundEffects />
      <PageHeader />

      {/* Hero offre */}
      <section style={{ padding: '90px 32px 50px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: 22 }}>
            <span className="badge-dot"></span>
            Offre de lancement — réservée aux 15 premières conciergeries
          </span>
          <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
            2 mois gratuits.<br />
            <span className="gradient-text">Migration offerte.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 640, margin: '0 auto' }}>
            Vous gérez des Airbnb au Maroc ? Sojori est <strong style={{ color: 'var(--text)' }}>le logiciel</strong>{' '}qui
            orchestre toute votre activité — annonces, calendriers, prix dynamiques, voyageurs, ménage.
            Gérez plus de biens, gagnez plus par bien, avec la même équipe.
            <strong style={{ color: 'var(--text)' }}> Sans engagement.</strong>
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
            <Link
              href={{ pathname: '/demo', query: { source: 'offre-conciergeries' } }}
              className="btn btn-primary btn-lg"
              onClick={trackLead}
            >
              Réserver ma démo (15 min)
            </Link>
            <Link href="/pricing" className="btn btn-ghost btn-lg">Voir les tarifs</Link>
          </div>
          <div className="mono" style={{ marginTop: 16, fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.1 }}>
            DÉMO 15 MIN · MIGRATION INCLUSE · 2 MOIS OFFERTS
          </div>
        </div>
      </section>

      {/* Les 6 briques */}
      <section style={{ padding: '30px 32px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 18 }}>
            Un seul outil. Tout orchestré.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {BRIQUES.map((b) => (
              <div key={b.label} className="glass" style={{ padding: '10px 18px', borderRadius: 12, fontSize: 15, fontWeight: 600 }}>
                <span style={{ marginRight: 8 }}>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section style={{ padding: '40px 32px 50px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 34 }}>Comment ça se passe ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {ETAPES.map((e) => (
              <div key={e.n} className="card" style={{ padding: 26, borderRadius: 16, textAlign: 'left' }}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 12, marginBottom: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 17, color: '#1a1408',
                    background: 'linear-gradient(135deg, #f4cf5e, #e6b022)',
                  }}
                >
                  {e.n}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{e.title}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-2)' }}>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <section style={{ padding: '10px 32px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {REASSURANCE.map((r) => (
            <div key={r.text} style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <span style={{ marginRight: 6 }}>{r.icon}</span>{r.text}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section
        style={{
          padding: '56px 32px 70px', textAlign: 'center',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14), transparent 70%)',
        }}
      >
        <h2 style={{ marginBottom: 12 }}>
          15 places. <span className="gradient-text">Pas une de plus.</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520, margin: '0 auto 26px' }}>
          L&apos;offre de lancement s&apos;arrête dès que les 15 premières conciergeries sont à bord.
        </p>
        <Link
          href={{ pathname: '/demo', query: { source: 'offre-conciergeries' } }}
          className="btn btn-primary btn-lg"
          onClick={trackLead}
        >
          Je prends ma place
        </Link>
      </section>

      <PageFooter />
    </>
  );
}
