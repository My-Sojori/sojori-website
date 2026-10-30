'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';
import { FaqSection } from '@/components/FaqSection';

interface Tier {
  key: 'base' | 'confort' | 'premium';
  name: string;
  /** Nombre de logements en dessous duquel l'offre n'est pas proposée. */
  minListings: number;
  tagline: string;
  description: string;
  accent: string;
  accentRgb: string;
  popular: boolean;
  features: { key: string }[];
}

const ADDON_KEYS = ['checkin', 'concierge', 'dynamicPricing', 'crm', 'marketing', 'b2bSales'] as const;

export default function PricingPage() {
  const t = useTranslations('pricing');

  const TIERS: Tier[] = [
    {
      key: 'base',
      name: t('tiers.base.name'),
      minListings: 1,
      tagline: t('tiers.base.tagline'),
      description: t('tiers.base.description'),
      accent: '#06b6d4',
      accentRgb: '6, 182, 212',
      popular: false,
      features: [
        { key: 'pms' },
        { key: 'channelManager' },
        { key: 'inbox' },
        { key: 'ownerPortal' },
        { key: 'whatsappGuest' },
        { key: 'whatsappStaff' },
        { key: 'whatsappAdmin' },
        { key: 'rulesPricing' },
        { key: 'cityTax' },
        { key: 'support' },
      ],
    },
    {
      key: 'confort',
      name: t('tiers.confort.name'),
      minListings: 10,
      tagline: t('tiers.confort.tagline'),
      description: t('tiers.confort.description'),
      accent: '#f4cf5e',
      accentRgb: '244, 207, 94',
      popular: true,
      features: [
        { key: 'allBase' },
        { key: 'whatsappAi' },
        { key: 'whatsappOwner' },
        { key: 'teamflow' },
        { key: 'analytics' },
        { key: 'bookingEngine' },
        { key: 'support' },
      ],
    },
    {
      key: 'premium',
      name: t('tiers.premium.name'),
      minListings: 50,
      tagline: t('tiers.premium.tagline'),
      description: t('tiers.premium.description'),
      accent: '#8b5cf6',
      accentRgb: '139, 92, 246',
      popular: false,
      features: [
        { key: 'allConfort' },
        { key: 'orchestration' },
        { key: 'whatsappBooking' },
        { key: 'sojoriPay' },
        { key: 'mcp' },
        { key: 'api' },
        { key: 'csm' },
      ],
    },
  ];

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader />
        <PageHero
          badge={t('hero.badge')}
          title={<>{t('hero.title')}{' '}<br /><span className="gradient-text">{t('hero.titleGradient')}</span></>}
          subtitle={t('hero.subtitle')}
        />

        {/* Offres — 3 slides (peek mobile, grille desktop) */}
        <section className="pricing-carousel-section" style={{ padding: '0 0 32px' }}>
          <div className="pricing-tier-row-cap" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
            <ScrollPaginationDots itemCount={3} gap={14} peekCarousel className="pricing-tier-carousel-scroll">
              {TIERS.map(tier => {
                return (
                  <div
                    key={tier.key}
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

                    <Link
                      href={{ pathname: '/demo', query: { source: `pricing-${tier.key}` } }}
                      style={{
                        display: 'inline-block',
                        marginBottom: 8,
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--text)',
                        textDecoration: 'none',
                      }}
                    >
                      {t('quote')}
                    </Link>
                    <div style={{ marginBottom: 14, fontSize: 11, color: 'var(--text-3)' }}>
                      {tier.minListings > 1 ? t('tiers.minimumLabel', { count: tier.minListings }) : null}
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.45, marginBottom: 14 }}>
                      {tier.description}
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tier.features.map(f => (
                        <li key={f.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text-2)' }}>
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                            <circle cx="12" cy="12" r="10" fill={`rgba(${tier.accentRgb}, 0.15)`} />
                            <path d="M8 12l3 3 5-6" stroke={tier.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{t(`tiers.${tier.key}.features.${f.key}`)}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginBottom: 14, fontSize: 11, color: 'var(--text-3)' }}>
                      {t('onboarding.title')} : <strong style={{ color: 'var(--text-2)' }}>{t('quote')}</strong>
                    </div>

                    <Link
                      href={{ pathname: '/demo', query: { source: `pricing-${tier.key}` } }}
                      className={tier.popular ? 'btn btn-primary' : 'btn btn-ghost'}
                      style={{ width: '100%', justifyContent: 'center', padding: '11px 18px', fontSize: 13 }}
                    >
                      {t('quote')}
                    </Link>
                  </div>
                );
              })}
            </ScrollPaginationDots>
          </div>

        </section>

        {/* Add-ons */}
        <section style={{ padding: '32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              {t('addons.badge')}
            </div>
            <h2 style={{ fontSize: 34, marginBottom: 10, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('addons.title')} <span className="gradient-text">{t('addons.titleGradient')}</span>
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-2)', fontSize: 14, marginBottom: 26 }}>
              {t('addons.subtitle')}
            </p>

            <div className="pricing-addons-grid">
              {ADDON_KEYS.map(key => {
                return (
                  <div
                    key={key}
                    className="card"
                    style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 6 }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t(`addons.items.${key}.name`)}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e' }}>
                      {t('quote')}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                      {t(`addons.items.${key}.description`)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ce que vous gagnez */}
        <section style={{ padding: '32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              {t('earn.badge')}
            </div>
            <h2 style={{ fontSize: 34, marginBottom: 10, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('earn.title')} <span className="gradient-text">{t('earn.titleGradient')}</span>
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-2)', fontSize: 14, marginBottom: 26 }}>
              {t('earn.subtitle')}
            </p>

            <div className="pricing-earn-grid">
              {(['concierge', 'affiliation'] as const).map(key => (
                <div
                  key={key}
                  style={{
                    padding: 24,
                    borderRadius: 14,
                    background: 'linear-gradient(180deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))',
                    border: '1px solid rgba(16,185,129,0.35)',
                  }}
                >
                  <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', color: '#10b981', marginBottom: 4 }}>
                    {t(`earn.items.${key}.percent`)}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{t(`earn.items.${key}.name`)}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {t(`earn.items.${key}.description`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: '32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              {t('services.badge')}
            </div>
            <h2 style={{ fontSize: 34, marginBottom: 26, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('services.title')} <span className="gradient-text">{t('services.titleGradient')}</span>
            </h2>

            <div className="pricing-earn-grid">
              {(['customerService', 'whiteLabel'] as const).map(key => (
                <div key={key} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t(`services.${key}.name`)}</div>
                  <Link
                    href={{ pathname: '/demo', query: { source: `pricing-service-${key}` } }}
                    style={{ display: 'inline-block', marginBottom: 10, fontSize: 16, fontWeight: 750, color: '#f4cf5e', textDecoration: 'none' }}
                  >
                    {t('quote')}
                  </Link>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {t(`services.${key}.description`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pricing-faq-section" style={{ padding: '32px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              {t('faq.badge')}
            </div>
            <h2 style={{ fontSize: 36, marginBottom: 20, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('faq.title', { gradient: '' })} <span className="gradient-text">{t('faq.titleGradient')}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['whyMad', 'minimum', 'engagement', 'onboarding', 'concierge', 'addons', 'whatsappCost', 'changeTier', 'keepPms', 'freeTrial'].map(key => (
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

        <FaqSection
          badge="Tarifs"
          title="Questions fréquentes"
          items={[
            {
              q: 'Comment le prix est-il calculé ?',
              a: "Il n'est pas affiché. Le devis part du nombre de logements, des canaux et de ce que vous branchez. Vos équipes accèdent à ce qui les concerne, sans surcoût par utilisateur.",
            },
            {
              q: 'Y a-t-il des frais de mise en route ?',
              a: "L'onboarding est dans le devis. Il couvre la migration depuis votre outil actuel, le setup du Channel Manager et de WhatsApp, et la formation de vos équipes.",
            },
            {
              q: 'Faut-il s’engager sur la durée ?',
              a: "La durée se décide dans le devis. Rien n'est signé avant que vous ayez le montant.",
            },
            {
              q: 'Le programme Go Siyaha peut-il financer l’abonnement ?',
              a: "Le volet transformation digitale du programme couvre les outils numériques, et des acteurs du secteur indiquent que les solutions PMS y entrent. Nous fournissons les pièces nécessaires à votre dossier, mais nous ne revendiquons aucun agrément : l'éligibilité relève de Maroc PME.",
            },
            {
              q: 'Que se passe-t-il si je garde mon PMS actuel ?',
              a: "C'est possible : Sojori se connecte aux PMS existants, dont Mews, et orchestre par-dessus. Le périmètre et donc le tarif s'ajustent à ce que vous utilisez réellement. Parlons-en avant de décider quoi que ce soit sur votre système de réservation.",
            },
          ]}
        />

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

        .pricing-addons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .pricing-earn-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .pricing-addons-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .pricing-tier-row-cap {
            max-width: none !important;
          }

          .pricing-addons-grid,
          .pricing-earn-grid {
            grid-template-columns: 1fr;
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
