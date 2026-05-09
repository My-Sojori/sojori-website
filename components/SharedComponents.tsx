"use client";

import React, { ReactNode } from 'react';
import { Link, routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type AppPathname = keyof typeof routing.pathnames;
import { SojoriLogo, SojoriMark } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3, display: 'block' }}>
      <circle cx="8" cy="8" r="8" fill="rgba(16,185,129,0.18)" />
      <path d="M5 8.2L7 10.2L11 6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionHead({ badge, title, subtitle, center = true }: { badge?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: 720, margin: center ? '0 auto' : '0' }}>
      {badge && <span className="badge" style={{ marginBottom: 18 }}><span className="badge-dot"></span> {badge}</span>}
      <h2 style={{ marginBottom: 14, textWrap: 'balance' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 17, lineHeight: 1.6, textWrap: 'pretty', color: 'var(--text-2)' }}>{subtitle}</p>}
    </div>
  );
}

const PRODUCT_MENU: { group: string; items: { l: string; h: AppPathname; d: string }[] }[] = [
  { group: 'Plateforme', items: [
    { l: 'PMS', h: '/pms', d: 'Gestion multi-bien' },
    { l: 'Channel Manager', h: '/channel-manager', d: 'Sync multi-OTA' },
    { l: 'Tarification dynamique', h: '/dynamic-pricing', d: 'Règles & calendrier' },
    { l: 'Smart Analytics', h: '/analytics', d: 'Indicateurs temps réel' },
  ]},
  { group: 'Guest', items: [
    { l: 'WhatsApp Bot', h: '/whatsapp', d: 'IA & parcours invité' },
    { l: 'Inbox unifiée', h: '/inbox', d: 'Tous les canaux' },
    { l: 'Guest Experience', h: '/guest-experience', d: 'Parcours voyageur' },
  ]},
  { group: 'Operations', items: [
    { l: 'TeamFlow', h: '/teamflow', d: 'Staff & ménage' },
    { l: 'Owner Portal', h: '/owner-portal', d: 'Portail propriétaire' },
    { l: 'Dashboard App', h: '/dashboard-app', d: 'Pilotage gestionnaire' },
  ]},
  { group: 'Entreprise', items: [
    { l: 'Tarifs', h: '/pricing', d: 'Plans & contrats' },
    { l: 'Intégrations', h: '/integrations', d: 'Connecteurs & API' },
    { l: 'À propos', h: '/about', d: 'L\'équipe Sojori' },
  ]},
];

export function PageHeader({ pageTitle }: { pageTitle?: string }) {
  const [open, setOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileProductOpen, setMobileProductOpen] = React.useState(false);
  const t = useTranslations('common.nav');

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      padding: '14px 32px',
      background: 'rgba(251,250,246,0.78)',
      backdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid rgba(26,20,8,0.06)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <SojoriLogo size={32} />
          </Link>
          {pageTitle && (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>›</span>
              <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{pageTitle}</span>
            </>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          position: 'relative',
        }}>
          <style jsx>{`
            @media (max-width: 768px) {
              nav {
                display: none !important;
              }
            }
          `}</style>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost"
            style={{
              padding: '8px 14px',
              fontSize: 13,
              background: open ? 'rgba(244,207,94,0.08)' : 'transparent',
              border: '1px solid',
              borderColor: open ? 'rgba(244,207,94,0.3)' : 'transparent',
              cursor: 'pointer'
            }}
          >
            {t('product')} <span style={{ fontSize: 9, marginLeft: 4, opacity: 0.7 }}>▼</span>
          </button>
          <Link href="/whatsapp" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>{t('whatsapp')}</Link>
          <Link href="/pricing" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>{t('pricing')}</Link>
          <Link href="/integrations" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>{t('integrations')}</Link>
          <Link href="/about" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>{t('about')}</Link>
          <LanguageSwitcher />
          <Link
            href={{ pathname: '/demo', query: { source: 'navbar-demo' } }}
            className="btn btn-primary"
            style={{ padding: '9px 16px', fontSize: 13 }}
          >
            {t('getDemo')}
          </Link>

          {/* Desktop Product Dropdown */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                width: 720,
                background: 'rgba(255,255,255,0.94)',
                border: '1px solid rgba(26,20,8,0.10)',
                borderRadius: 14,
                padding: 24,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 24,
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 60px -20px rgba(26,20,8,0.18)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {PRODUCT_MENU.map(g => (
                <div key={g.group}>
                  <div style={{
                    fontSize: 10,
                    color: '#b8881a',
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 10,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {g.group}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {g.items.map(it => (
                      <Link
                        key={it.l}
                        href={it.h}
                        style={{
                          textDecoration: 'none',
                          padding: '8px 10px',
                          borderRadius: 8,
                          display: 'block',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(230,176,34,0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{it.l}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{it.d}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 44,
            height: 44,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            zIndex: 60,
          }}
        >
          <style jsx>{`
            @media (max-width: 768px) {
              button[aria-label="Toggle mobile menu"] {
                display: flex !important;
              }
            }
          `}</style>
          <span style={{
            width: 24,
            height: 2,
            background: 'var(--text-1)',
            borderRadius: 2,
            transition: 'transform 0.3s, opacity 0.3s',
            transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'translateY(0) rotate(0)',
          }} />
          <span style={{
            width: 24,
            height: 2,
            background: 'var(--text-1)',
            borderRadius: 2,
            marginTop: 5,
            transition: 'opacity 0.3s',
            opacity: mobileMenuOpen ? 0 : 1,
          }} />
          <span style={{
            width: 24,
            height: 2,
            background: 'var(--text-1)',
            borderRadius: 2,
            marginTop: 5,
            transition: 'transform 0.3s, opacity 0.3s',
            transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0) rotate(0)',
          }} />
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={handleMobileLinkClick}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(26,20,8,0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 55,
                animation: 'fadeIn 0.3s',
              }}
            />
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Mobile Menu Panel */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85vw',
                maxWidth: 400,
                background: 'rgba(251,250,246,0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 60,
                padding: '80px 24px 24px',
                overflowY: 'auto',
                boxShadow: '-4px 0 24px rgba(26,20,8,0.12)',
                animation: 'slideIn 0.3s ease-out',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Product Menu (Expandable) */}
              <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    background: mobileProductOpen ? 'rgba(244,207,94,0.08)' : 'transparent',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--text-1)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                    minHeight: 44,
                  }}
                >
                  {t('product')}
                  <span style={{
                    fontSize: 10,
                    transition: 'transform 0.3s',
                    transform: mobileProductOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}>▼</span>
                </button>

                {mobileProductOpen && (
                  <div style={{ paddingLeft: 12, marginTop: 8 }}>
                    {PRODUCT_MENU.map(g => (
                      <div key={g.group} style={{ marginBottom: 16 }}>
                        <div style={{
                          fontSize: 10,
                          color: '#b8881a',
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                          marginBottom: 8,
                          fontFamily: 'var(--font-mono)',
                          paddingLeft: 8,
                        }}>
                          {g.group}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {g.items.map(it => (
                            <Link
                              key={it.l}
                              href={it.h}
                              onClick={handleMobileLinkClick}
                              style={{
                                textDecoration: 'none',
                                padding: '10px 12px',
                                borderRadius: 8,
                                display: 'block',
                                background: 'transparent',
                                minHeight: 44,
                              }}
                            >
                              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{it.l}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{it.d}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <Link
                href="/whatsapp"
                onClick={handleMobileLinkClick}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  borderRadius: 10,
                  display: 'block',
                  marginBottom: 8,
                  minHeight: 44,
                }}
              >
                {t('whatsapp')}
              </Link>

              <Link
                href="/pricing"
                onClick={handleMobileLinkClick}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  borderRadius: 10,
                  display: 'block',
                  marginBottom: 8,
                  minHeight: 44,
                }}
              >
                {t('pricing')}
              </Link>

              <Link
                href="/integrations"
                onClick={handleMobileLinkClick}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  borderRadius: 10,
                  display: 'block',
                  marginBottom: 8,
                  minHeight: 44,
                }}
              >
                {t('integrations')}
              </Link>

              <Link
                href="/about"
                onClick={handleMobileLinkClick}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-1)',
                  textDecoration: 'none',
                  borderRadius: 10,
                  display: 'block',
                  marginBottom: 8,
                  minHeight: 44,
                }}
              >
                {t('about')}
              </Link>

              {/* Language Switcher */}
              <div style={{ marginBottom: 24 }}>
                <LanguageSwitcher />
              </div>

              {/* Demo Button - Prominent */}
              <Link
                href={{ pathname: '/demo', query: { source: 'mobile-menu' } }}
                onClick={handleMobileLinkClick}
                className="btn btn-primary"
                style={{
                  padding: '16px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: 'center',
                  borderRadius: 10,
                  marginTop: 'auto',
                  minHeight: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {t('getDemo')} →
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer style={{
      padding: '60px 32px 30px',
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, transparent, rgba(245,243,236,0.6))'
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 2fr) repeat(4, minmax(0, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>
          <div>
            <SojoriLogo size={32} />
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 16, lineHeight: 1.6, maxWidth: 280 }}>
              L&apos;orchestrateur de la location courte durée.
            </p>
            <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
              📍 Paris · Casablanca
            </div>
          </div>
          {PRODUCT_MENU.map(g => (
            <div key={g.group}>
              <div style={{
                fontSize: 11,
                color: 'var(--primary)',
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 14,
                fontFamily: 'var(--font-mono)'
              }}>
                {g.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.items.map(it => (
                  <Link
                    key={it.l}
                    href={it.h}
                    style={{
                      fontSize: 13,
                      color: 'var(--text-2)',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                  >
                    {it.l}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            © 2026 Sojori SAS · Tous droits réservés
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 11, color: 'var(--text-3)' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>CGU/CGV</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Statut</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ badge, title, subtitle, cta1, cta2, children }: {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  cta1?: string;
  cta2?: string;
  children?: ReactNode;
}) {
  return (
    <section style={{ padding: '80px 32px 50px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 44px' }}>
          {badge && <span className="badge" style={{ marginBottom: 20 }}><span className="badge-dot"></span> {badge}</span>}
          <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 660, margin: '0 auto', textWrap: 'pretty' }}>{subtitle}</p>}
          {(cta1 || cta2) && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
              {cta1 && (
                <Link
                  href={{ pathname: '/demo', query: { source: 'page-hero' } }}
                  className="btn btn-primary btn-lg"
                >
                  {cta1} →
                </Link>
              )}
              {cta2 && <a href="#more" className="btn btn-ghost btn-lg">{cta2}</a>}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function StatsBar({ stats }: { stats: Array<{ k: string; l: string }> }) {
  return (
    <section style={{ padding: '50px 32px', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '12px', borderLeft: i ? '1px solid var(--glass-border)' : 'none' }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="gradient-text">{s.k}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA({ title, subtitle }: { title: ReactNode; subtitle: string }) {
  return (
    <section style={{
      padding: '90px 32px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14), transparent 70%)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 48px)', marginBottom: 14, textWrap: 'balance' }}>{title}</h2>
        <p style={{ fontSize: 17, color: 'var(--text-2)', marginBottom: 30 }}>{subtitle}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={{ pathname: '/demo', query: { source: 'footer-cta' } }} className="btn btn-primary btn-lg">
            Demander une démo →
          </Link>
          <Link href="/" className="btn btn-ghost btn-lg">← Retour homepage</Link>
        </div>
      </div>
    </section>
  );
}
