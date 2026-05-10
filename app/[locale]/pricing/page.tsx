'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

interface Tier {
  name: string;
  price: number;
  tagline: string;
  description: string;
  accent: string;
  accentRgb: string;
  popular: boolean;
  features: { key: string; included: boolean | string }[];
}

const MAD_RATE = 10.7;

export default function PricingPage() {
  const t = useTranslations('pricing');

  const [listings, setListings] = useState(15);
  const [annual, setAnnual] = useState(false);

  // Build tiers from translations
  // Prices are constants (same across all languages)
  const TIERS: Tier[] = [
    {
      name: t('tiers.solo.name'),
      price: 15,
      tagline: t('tiers.solo.tagline'),
      description: t('tiers.solo.description'),
      accent: '#06b6d4',
      accentRgb: '6, 182, 212',
      popular: false,
      features: [
        { key: 'pms', included: true },
        { key: 'channelManager', included: true },
        { key: 'inbox', included: true },
        { key: 'tasks', included: true },
        { key: 'whatsappGuest', included: 'limité' },
        { key: 'ownerPortal', included: 'limité' },
        { key: 'billing', included: true },
        { key: 'support', included: true },
      ],
    },
    {
      name: t('tiers.orchestre.name'),
      price: 35,
      tagline: t('tiers.orchestre.tagline'),
      description: t('tiers.orchestre.description'),
      accent: '#f4cf5e',
      accentRgb: '244, 207, 94',
      popular: true,
      features: [
        { key: 'allSolo', included: true },
        { key: 'whatsappGuestAI', included: true },
        { key: 'whatsappAdmin', included: true },
        { key: 'whatsappStaff', included: true },
        { key: 'webDirectBooking', included: true },
        { key: 'channelManagerUnlimited', included: true },
        { key: 'dynamicPricing', included: true },
        { key: 'teamflow', included: true },
        { key: 'ownerPortalFull', included: true },
        { key: 'analytics', included: true },
        { key: 'support', included: true },
      ],
    },
    {
      name: t('tiers.symphonie.name'),
      price: 59,
      tagline: t('tiers.symphonie.tagline'),
      description: t('tiers.symphonie.description'),
      accent: '#8b5cf6',
      accentRgb: '139, 92, 246',
      popular: false,
      features: [
        { key: 'allOrchestre', included: true },
        { key: 'whatsappBookingDirect', included: true },
        { key: 'teamflowAdvanced', included: true },
        { key: 'multiBrand', included: true },
        { key: 'orchestrationFull', included: true },
        { key: 'api', included: true },
        { key: 'csm', included: true },
        { key: 'sla', included: true },
        { key: 'securityAudit', included: true },
      ],
    },
  ];

  const computeUnitPrice = (basePrice: number) => {
    let price = basePrice;
    if (annual) price = price * 0.8;
    return price;
  };

  const computeTotal = (basePrice: number) => {
    return Math.round(computeUnitPrice(basePrice) * listings);
  };

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader />
        <PageHero
          badge={t('hero.badge')}
          title={<>{t('hero.title')}<br /><span className="gradient-text">{t('hero.titleGradient')}</span></>}
          subtitle={t('hero.subtitle')}
        />

        {/* Toggle mensuel / annuel */}
        <section className="pricing-toggle-section" style={{ padding: '16px 32px 22px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: 999, padding: 3 }}>
              {[
                { k: false, l: t('toggles.monthly') },
                { k: true, l: t('toggles.annual') },
              ].map(o => (
                <button
                  key={o.l}
                  type="button"
                  onClick={() => setAnnual(o.k)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 999,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: annual === o.k ? 'rgba(244,207,94,0.18)' : 'transparent',
                    color: annual === o.k ? '#f4cf5e' : 'var(--text-2)',
                  }}
                >
                  {o.l}
                  {o.k && (
                    <span style={{ marginLeft: 5, fontSize: 9, padding: '2px 5px', background: 'rgba(16,185,129,0.2)', color: '#10b981', borderRadius: 4 }}>
                      {t('toggles.annualSave')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Listings input */}
        <section className="pricing-calculator-section" style={{ padding: '0 32px 40px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 16, color: 'var(--text-3)', fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {t('calculator.yourProperties')}
            </div>
            <div className="calculator-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
              <input
                type="range"
                min={1}
                max={200}
                value={listings}
                onChange={e => setListings(parseInt(e.target.value))}
                style={{ flex: 1, maxWidth: 400 }}
              />
              <input
                type="number"
                min={1}
                max={500}
                value={listings}
                onChange={e => setListings(parseInt(e.target.value) || 1)}
                style={{
                  width: 90,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 8,
                  color: 'var(--text)',
                  fontSize: 16,
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              />
              <span style={{ color: 'var(--text-3)', fontSize: 13 }}>{t('calculator.listings')}</span>
            </div>
          </div>
        </section>

        {/* Tier cards — 3 slides directes (pattern ScrollPaginationDots + peek mobile, grille desktop) */}
        <section className="pricing-carousel-section" style={{ padding: '0 0 32px' }}>
          <div className="pricing-tier-row-cap" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
            <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="pricing-tier-carousel-scroll">
              {TIERS.map((tier, idx) => {
                const unitPrice = computeUnitPrice(tier.price);
                const totalMonth = computeTotal(tier.price);
                const unitRoundedCents = Math.round(unitPrice * 100) / 100;
                const unitDisplay =
                  Math.abs(unitRoundedCents - Math.round(unitRoundedCents)) < 1e-6
                    ? String(Math.round(unitRoundedCents))
                    : unitRoundedCents.toFixed(2);
                const tierKey = idx === 0 ? 'solo' : idx === 1 ? 'orchestre' : 'symphonie';

                return (
                  <div
                    key={tier.name}
                    data-carousel-slide
                    data-pricing-tier-card
                    style={{
                      position: 'relative',
                      padding: '22px 20px',
                      borderRadius: 14,
                      background: tier.popular
                        ? 'linear-gradient(180deg, rgba(244,207,94,0.08), rgba(244,207,94,0.02))'
                        : 'rgba(255,255,255,0.02)',
                      border: tier.popular ? '1px solid rgba(244,207,94,0.4)' : '1px solid var(--glass-border)',
                      boxShadow: tier.popular ? '0 20px 56px rgba(244,207,94,0.1)' : 'none',
                      transform: tier.popular ? 'scale(1.01)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tier.popular && (
                      <div
                        style={{
                          position: 'absolute',
                          top: -10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          padding: '3px 11px',
                          borderRadius: 999,
                          fontSize: 9,
                          fontWeight: 700,
                          background: 'linear-gradient(180deg, #f4cf5e, #e6b022)',
                          color: '#1a1408',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t('tiers.popularBadge')}
                      </div>
                    )}

                    <div style={{ marginBottom: 3, fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>{tier.name}</div>
                    <div style={{ marginBottom: 14, color: tier.accent, fontSize: 12, fontWeight: 600 }}>{tier.tagline}</div>

                    {annual && (
                      <div style={{ marginBottom: 5, fontSize: 11, color: 'var(--text-3)', textDecoration: 'line-through' }}>
                        {tier.price}€/listing
                      </div>
                    )}
                    <div style={{ marginBottom: 3 }}>
                      <span className="pricing-unit-price" style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em' }}>{unitDisplay}€</span>
                      <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 5 }}>{t('calculator.perListing')}</span>
                    </div>
                    <div style={{ marginBottom: 14, fontSize: 11, color: 'var(--text-3)' }}>
                      ≈ {Math.round(unitPrice * MAD_RATE)} MAD · {t('calculator.billing', { period: annual ? 'annuelle' : 'mensuelle' })}
                    </div>

                    {/* Total computed */}
                    <div
                      style={{
                        padding: '11px 13px',
                        marginBottom: 14,
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 9,
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {t('calculator.forListings', { count: listings, plural: listings > 1 ? 's' : '' })}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>
                        {totalMonth.toLocaleString('fr-FR')}{t('calculator.perMonth')}
                      </div>
                      {annual && (
                        <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>
                          {t('calculator.perYear', { amount: (totalMonth * 12).toLocaleString('fr-FR') })}
                        </div>
                      )}
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.45, marginBottom: 14 }}>
                      {tier.description}
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tier.features.map(f => (
                        <li key={f.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-2)' }}>
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                            <circle cx="12" cy="12" r="10" fill={`rgba(${tier.accentRgb}, 0.15)`} />
                            <path d="M8 12l3 3 5-6" stroke={tier.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>
                            {t(`tiers.${tierKey}.features.${f.key}`)}
                            {typeof f.included === 'string' && (
                              <span style={{ marginLeft: 5, fontSize: 9, padding: '1px 5px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-3)', borderRadius: 4, fontWeight: 600 }}>
                                {f.included}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/demo"
                      className={tier.popular ? 'btn btn-primary' : 'btn btn-ghost'}
                      style={{ width: '100%', justifyContent: 'center', padding: '11px 18px', fontSize: 13 }}
                    >
                      {t(`tiers.${tierKey}.cta`)}
                    </Link>
                  </div>
                );
              })}
            </ScrollPaginationDots>
          </div>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginTop: 16 }}>
            <div
              style={{
                padding: '12px 18px',
                borderRadius: 11,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--text-2)',
              }}
            >
              <strong style={{ color: 'var(--text)' }}>{t('onboarding.title')}</strong> {t('onboarding.description')}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pricing-faq-section" style={{ padding: '60px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              {t('faq.badge')}
            </div>
            <h2 style={{ fontSize: 36, marginBottom: 32, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('faq.title', { gradient: '' })} <span className="gradient-text">{t('faq.titleGradient')}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['engagement', 'onboarding', 'whatsappCost', 'webVsWhatsappBooking', 'changeTier', 'freeTrial'].map(key => (
                <details key={key} className="card" style={{ padding: 20 }}>
                  <summary style={{ cursor: 'pointer', fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                    {t(`faq.questions.${key}.q`)}
                  </summary>
                  <div style={{ marginTop: 12, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    {t(`faq.questions.${key}.a`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          title={<>{t('finalCTA.title', { gradient: '' })} <span className="gradient-text">{t('finalCTA.titleGradient')}</span></>}
          subtitle={t('finalCTA.subtitle')}
        />
        <PageFooter />
      </div>

      <style jsx>{`
        .pricing-tier-row-cap {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .pricing-tier-row-cap {
            max-width: none !important;
          }

          .pricing-toggle-section,
          .pricing-calculator-section,
          .pricing-faq-section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .pricing-carousel-section {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .pricing-unit-price {
            font-size: 34px !important;
          }

          @media (max-width: 480px) {
            .calculator-wrapper {
              flex-direction: column !important;
              gap: 12px !important;
            }
          }
        }
      `}</style>
    </>
  );
}
