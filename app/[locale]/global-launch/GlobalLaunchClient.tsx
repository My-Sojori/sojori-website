'use client';

import { Link } from '@/i18n/routing';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { trackOfferCta } from '@/lib/analytics';

/* Landing internationale (test d'appétence multi-pays, ads Meta) — générique,
   sans devise ni mention Maroc. Contenu EN volontairement en dur. */

const BRIQUES = [
  { icon: '🗂️', label: 'PMS' },
  { icon: '🔗', label: 'Channel Manager' },
  { icon: '📈', label: 'Dynamic pricing' },
  { icon: '💬', label: 'WhatsApp Guest' },
  { icon: '🌐', label: 'Direct booking' },
  { icon: '✨', label: 'Upsell' },
  { icon: '🧹', label: 'Staff & Cleaning' },
  { icon: '📥', label: 'Unified inbox' },
  { icon: '📊', label: 'Analytics' },
  { icon: '🏠', label: 'Owner portal' },
];

const ETAPES = [
  {
    n: '1',
    title: 'Demo — 15 minutes',
    text: 'We show you Sojori on your own case: your properties, your channels, your team.',
  },
  {
    n: '2',
    title: 'Migration included — we handle everything',
    text: 'Listings, calendars, reservations, guests: our team transfers it all. You touch nothing, zero downtime.',
  },
  {
    n: '3',
    title: '2 months free — no commitment',
    text: "See it for yourself. If Sojori doesn't save you time and money, you walk away — your data with you.",
  },
];

const REASSURANCE = [
  { icon: '💬', text: 'WhatsApp support, real humans' },
  { icon: '🔓', text: 'No commitment — your data stays yours' },
];

function trackLead() {
  trackOfferCta('global-launch');
}

export function GlobalLaunchClient() {
  return (
    <>
      <BackgroundEffects />
      <PageHeader />

      {/* Hero offer */}
      <section style={{ padding: '90px 32px 50px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: 22 }}>
            <span className="badge-dot"></span>
            Launch offer — limited early access
          </span>
          <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
            2 months free.<br />
            <span className="gradient-text">Migration included.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 640, margin: '0 auto' }}>
            Running short-term rentals? Sojori is <strong style={{ color: 'var(--text)' }}>the software</strong>{' '}
            that orchestrates your whole operation — listings, calendars, dynamic pricing, guests, cleaning.
            Manage more properties, earn more per property, with the same team.
            <strong style={{ color: 'var(--text)' }}> No commitment.</strong>
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
            <Link
              href={{ pathname: '/demo', query: { source: 'global-launch' } }}
              className="btn btn-primary btn-lg"
              onClick={trackLead}
            >
              Book a demo
            </Link>
            <Link href="/" className="btn btn-ghost btn-lg">Discover</Link>
          </div>
          <div className="mono" style={{ marginTop: 16, fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.1 }}>
            15-MIN DEMO · MIGRATION INCLUDED · 2 MONTHS FREE
          </div>
        </div>
      </section>

      {/* The bricks */}
      <section style={{ padding: '30px 32px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 18 }}>
            One tool. Fully orchestrated.
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

      {/* How it works */}
      <section style={{ padding: '40px 32px 50px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 34 }}>How it works</h2>
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

      {/* Reassurance */}
      <section style={{ padding: '10px 32px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {REASSURANCE.map((r) => (
            <div key={r.text} style={{ fontSize: 14, color: 'var(--text-2)' }}>
              <span style={{ marginRight: 6 }}>{r.icon}</span>{r.text}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: '56px 32px 70px', textAlign: 'center',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14), transparent 70%)',
        }}
      >
        <h2 style={{ marginBottom: 12 }}>
          Limited spots. <span className="gradient-text">First come, first served.</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520, margin: '0 auto 26px' }}>
          The launch offer ends once early access is full.
        </p>
        <Link
          href={{ pathname: '/demo', query: { source: 'global-launch' } }}
          className="btn btn-primary btn-lg"
          onClick={trackLead}
        >
          Claim my spot
        </Link>
      </section>

      <PageFooter />
    </>
  );
}
