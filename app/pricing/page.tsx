'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';

const PLANS = [
  { name: 'Starter', price: 49, prop: "jusqu'à 5", tagline: 'Pour démarrer en douceur', popular: false, features: ['PMS multi-bien', 'Channel Manager (3 OTA)', 'WhatsApp Bot (basic)', 'Inbox unifiée', 'Calendrier centralisé', 'Support email'] },
  { name: 'Pro', price: 89, prop: "jusqu'à 25", tagline: 'Le choix des gestionnaires', popular: true, features: ['Tout Starter +', 'Channel Manager illimité', 'Dynamic Pricing AI', 'TeamFlow (staff & ménage)', 'Owner Portal', 'Smart Analytics', 'Guest Experience', 'Support prioritaire 24/7'] },
  { name: 'Scale', price: 'Custom', prop: '50+', tagline: 'Pour les grands portfolios', popular: false, features: ['Tout Pro +', 'Multi-marque / multi-équipes', 'API & webhooks dédiés', 'SSO & rôles avancés', 'SLA 99.95%', 'Customer success dédié', 'Onboarding sur site', 'Audit sécurité personnalisé'] },
];

interface ToggleProps {
  annual: boolean;
  setAnnual: (v: boolean) => void;
}

function Toggle({ annual, setAnnual }: ToggleProps) {
  return (
    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: 999, padding: 4, marginBottom: 40 }}>
      {[{ k: false, l: 'Mensuel' }, { k: true, l: 'Annuel' }].map(o => (
        <button key={o.l} onClick={() => setAnnual(o.k)} style={{
          padding: '8px 20px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          background: annual === o.k ? 'rgba(244,207,94,0.18)' : 'transparent',
          color: annual === o.k ? '#f4cf5e' : 'var(--text-2)',
        }}>{o.l}{o.k && <span style={{ marginLeft: 6, fontSize: 10, padding: '2px 6px', background: 'rgba(16,185,129,0.2)', color: '#10b981', borderRadius: 4 }}>−20%</span>}</button>
      ))}
    </div>
  );
}

interface Plan {
  name: string;
  price: number | string;
  prop: string;
  tagline: string;
  popular: boolean;
  features: string[];
}

interface PriceCardProps {
  plan: Plan;
  annual: boolean;
}

function PriceCard({ plan, annual }: PriceCardProps) {
  const price = typeof plan.price === 'number' ? (annual ? Math.round(plan.price * 0.8) : plan.price) : plan.price;
  return (
    <div style={{
      position: 'relative',
      padding: 32,
      borderRadius: 16,
      background: plan.popular ? 'linear-gradient(180deg, rgba(244,207,94,0.08), rgba(244,207,94,0.02))' : 'rgba(255,255,255,0.02)',
      border: plan.popular ? '1px solid rgba(244,207,94,0.4)' : '1px solid var(--glass-border)',
      boxShadow: plan.popular ? '0 30px 80px rgba(244,207,94,0.12)' : 'none',
      transform: plan.popular ? 'scale(1.03)' : 'none',
    }}>
      {plan.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#f4cf5e', color: '#1a1408', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, letterSpacing: 0.5 }}>★ POPULAIRE</div>}
      <div style={{ fontSize: 13, color: '#f4cf5e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Geist Mono', marginBottom: 8 }}>{plan.name}</div>
      <div style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 24 }}>{plan.tagline}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
        {typeof price === 'number' ? (
          <><span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.04em' }}>€{price}</span><span style={{ fontSize: 14, color: 'var(--text-3)' }}>/mois</span></>
        ) : (
          <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em' }}>Sur devis</span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 24 }}>par bien · {plan.prop} biens</div>
      <a href={`/demo?source=pricing-${plan.name.toLowerCase()}`} className={plan.popular ? 'btn btn-primary' : 'btn btn-ghost'} style={{ display: 'block', textAlign: 'center', marginBottom: 28 }}>{typeof plan.price === 'number' ? 'Démarrer' : 'Nous contacter'} →</a>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)', alignItems: 'flex-start' }}>
            <span style={{ color: '#10b981', flexShrink: 0, marginTop: 1 }}>✓</span>{f}
          </div>
        ))}
      </div>
    </div>
  );
}

const FAQ = [
  { q: "Y a-t-il des frais de setup ?", a: "Non. Onboarding gratuit + import de vos données existantes (PMS, calendriers, biens) inclus." },
  { q: "Comment fonctionne la facturation par bien ?", a: "Vous payez uniquement pour les biens actifs. Si vous mettez un bien en pause, il n'est pas facturé ce mois-ci." },
  { q: "Puis-je changer de plan en cours de route ?", a: "Oui, à tout moment. Upgrade immédiat, downgrade en fin de cycle de facturation." },
  { q: "Y a-t-il un engagement ?", a: "Aucun. Mensuel sans engagement. Annuel = −20% mais résiliable à chaque date anniversaire." },
  { q: "Quelles OTA sont incluses ?", a: "Airbnb, Booking, Vrbo, Expedia, Google Vacation Rentals + 50 autres canaux. Voir Integrations." },
  { q: "Le WhatsApp Bot AI est-il limité ?", a: "Starter: 500 conv/mois. Pro: illimité. Scale: illimité + agents IA personnalisés." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Pricing" />
        <PageHero
          badge="💰 Pricing transparent · Sans engagement"
          title={<>Une plateforme.<br /><span className="gradient-text">Trois plans.</span> Vos économies dès le mois 1.</>}
          subtitle="PMS + Channel Manager + AI inclus dès Starter. Vous payez par bien actif. Setup gratuit, données importées par notre équipe."
        />
        <section style={{ padding: '20px 32px 80px', textAlign: 'center' }}>
          <Toggle annual={annual} setAnnual={setAnnual} />
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
            {PLANS.map(p => <PriceCard key={p.name} plan={p} annual={annual} />)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 30, fontFamily: 'Geist Mono' }}>* TVA non incluse. Paiement CB ou virement SEPA.</div>
        </section>

        {/* Comparison */}
        <section style={{ padding: '60px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>● Comparatif</div>
            <h2 style={{ textAlign: 'center', fontSize: 36, marginBottom: 40 }}>Toutes les <span className="gradient-text">fonctionnalités</span></h2>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>Fonctionnalité</th>
                    {PLANS.map(p => <th key={p.name} style={{ padding: '14px 20px', textAlign: 'center', color: p.popular ? '#f4cf5e' : 'var(--text-2)', fontWeight: 700 }}>{p.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Biens inclus', '5', '25', 'Illimité'],
                    ['PMS multi-canal', '✓', '✓', '✓'],
                    ['Channel Manager OTA', '3', 'Illimité', 'Illimité'],
                    ['Dynamic Pricing AI', '—', '✓', '✓ + custom rules'],
                    ['WhatsApp Bot conv/mois', '500', 'Illimité', 'Illimité'],
                    ['TeamFlow', '—', '✓', '✓ multi-équipes'],
                    ['Owner Portal', '—', '✓', '✓ white-label'],
                    ['Smart Analytics', 'Basic', 'Avancé', 'Custom dashboards'],
                    ['API & webhooks', '—', '✓', '✓ dédiés'],
                    ['SSO (SAML)', '—', '—', '✓'],
                    ['SLA garanti', '99%', '99.9%', '99.95%'],
                    ['Customer success', 'Email', 'Chat 24/7', 'Dédié'],
                  ].map((r, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '12px 20px', color: 'var(--text-2)' }}>{r[0]}</td>
                      {r.slice(1).map((v, j) => <td key={j} style={{ padding: '12px 20px', textAlign: 'center', color: v === '—' ? 'var(--text-3)' : 'var(--text-1)' }}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '70px 32px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>● Questions fréquentes</div>
            <h2 style={{ textAlign: 'center', fontSize: 36, marginBottom: 32 }}>FAQ</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQ.map(f => (
                <details key={f.q} className="card" style={{ padding: 20 }}>
                  <summary style={{ fontSize: 15, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>{f.q}<span style={{ color: '#f4cf5e' }}>+</span></summary>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 12, lineHeight: 1.6 }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA title={<>Calculez votre <span className="gradient-text">ROI</span> en 2 min</>} subtitle="Notre équipe vous montre exactement ce que Sojori vous fait économiser sur votre portfolio actuel." />
        <PageFooter />
      </div>
    </>
  );
}
