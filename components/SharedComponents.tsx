"use client";

import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type AppPathname = keyof typeof routing.pathnames;
import { SojoriLogo } from './Logo';
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
      {badge && <span className="badge" style={{ marginBottom: 12 }}><span className="badge-dot"></span> {badge}</span>}
      <h2 style={{ marginBottom: 10, textWrap: 'balance' }}>{title}</h2>
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
  const savedScrollY = React.useRef(0);
  const wasMenuOpen = React.useRef(false);
  const t = useTranslations('common.nav');

  /* Ne pas utiliser overflow:hidden sur body : sur Safari / WebKit ça peut clipper les enfants
   * position:fixed du portail (menu invisible alors que le burger passe en ✕). */
  React.useEffect(() => {
    if (!mobileMenuOpen) {
      // Menu fermé - restaurer scroll seulement si le menu était ouvert avant
      if (wasMenuOpen.current) {
        const body = document.body;
        const html = document.documentElement;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        html.classList.remove('sj-mobile-menu-scroll-lock');
        window.scrollTo(0, savedScrollY.current);
        wasMenuOpen.current = false;
      }
      return;
    }

    // Menu ouvert - bloquer le scroll
    wasMenuOpen.current = true;
    const body = document.body;
    const html = document.documentElement;
    savedScrollY.current = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    html.classList.add('sj-mobile-menu-scroll-lock');
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMobileProductOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking a link
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileProductOpen(false);
  };

  return (
    <header
      className="sj-page-header"
      style={{
      position: 'sticky', top: 0, zIndex: 50,
      padding: '14px 32px',
      background: 'rgba(251,250,246,0.78)',
      backdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid rgba(26,20,8,0.06)',
    }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="sj-page-header-brand" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
            <SojoriLogo size={32} />
          </Link>
          {pageTitle && (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, flexShrink: 0 }}>›</span>
              <span className="sj-page-header-title" style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>
                {pageTitle}
              </span>
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

        {/* Mobile Hamburger — styles dans globals.css (.sj-mobile-nav-toggle) : pas de <style> dans le <button> (HTML invalide, lignes invisibles sur certains navigateurs) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sj-mobile-nav-toggle"
          aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className="sj-mobile-nav-toggle-bar"
            style={{
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'translateY(0) rotate(0)',
            }}
          />
          <span
            className="sj-mobile-nav-toggle-bar"
            style={{
              transition: 'opacity 0.3s',
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            className="sj-mobile-nav-toggle-bar"
            style={{
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0) rotate(0)',
            }}
          />
        </button>

        {/* Menu mobile : portail sur document.body — sinon position:fixed est ancré au header (backdrop-filter) et le panneau sort du viewport */}
        {typeof document !== 'undefined' &&
          mobileMenuOpen &&
          createPortal(
            <div
              className="sj-mobile-menu-mount"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2147483000,
                pointerEvents: 'none',
              }}
            >
              <div
                className="sj-mobile-menu-backdrop"
                role="presentation"
                onClick={handleMobileLinkClick}
                style={{ pointerEvents: 'auto' }}
              />

              <div
                className="sj-mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label={t('menuTitle')}
                style={{ pointerEvents: 'auto' }}
              >
              {/* Product Menu (Expandable) */}
              <div style={{ marginBottom: 8 }}>
                <button
                  type="button"
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
            </div>,
            document.body,
          )}
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer
      className="sj-page-footer"
      style={{
      padding: '36px 32px 24px',
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, transparent, rgba(245,243,236,0.6))'
    }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div
          className="sj-page-footer-grid"
          style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 2fr) minmax(0, 1fr)',
          gap: 40,
          marginBottom: 40,
        }}
        >
          <div className="sj-page-footer-brand">
            <SojoriLogo size={32} />
            <p className="sj-page-footer-tagline" style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 16, lineHeight: 1.6, maxWidth: 280 }}>
              L&apos;orchestrateur de la location courte durée.
            </p>
            <div className="sj-page-footer-locations" style={{ marginTop: 16, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
              📍 Paris · Casablanca
            </div>
          </div>
          <div
            className="sj-page-footer-nav-columns"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 40,
              alignContent: 'start',
            }}
          >
            {PRODUCT_MENU.map(g => (
              <div key={g.group} className="sj-page-footer-nav-group">
                <div className="sj-page-footer-nav-heading" style={{
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
                <div className="sj-page-footer-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {g.items.map(it => (
                    <Link
                      key={it.l}
                      href={it.h}
                      className="sj-page-footer-nav-link"
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
        </div>
        <div
          className="sj-page-footer-legal"
          style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}
        >
          <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            © 2026 Sojori SAS · Tous droits réservés
          </div>
          <div className="sj-page-footer-legal-links" style={{ display: 'flex', gap: 18, fontSize: 11, color: 'var(--text-3)' }}>
            <a href="mailto:contact@sojori.com?subject=Mentions%20l%C3%A9gales" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</a>
            <a href="mailto:contact@sojori.com?subject=CGU%20%2F%20CGV" style={{ color: 'inherit', textDecoration: 'none' }}>CGU/CGV</a>
            <a href="mailto:contact@sojori.com?subject=Statut%20du%20service" style={{ color: 'inherit', textDecoration: 'none' }}>Statut</a>
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
    <section className="sj-page-hero" style={{ padding: '44px 32px 28px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 24px' }}>
          {badge && <span className="badge" style={{ marginBottom: 14 }}><span className="badge-dot"></span> {badge}</span>}
          <h1 style={{ marginBottom: 14, textWrap: 'balance' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-2)', maxWidth: 660, margin: '0 auto', textWrap: 'pretty' }}>{subtitle}</p>}
          {(cta1 || cta2) && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
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
    <section className="sj-stats-bar" style={{ padding: '28px 32px', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="sj-stats-bar-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 20 }}>
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
    <section
      className="sj-final-cta"
      style={{
      padding: '48px 32px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14), transparent 70%)',
      textAlign: 'center'
    }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 48px)', marginBottom: 10, textWrap: 'balance' }}>{title}</h2>
        <p style={{ fontSize: 17, color: 'var(--text-2)', marginBottom: 20 }}>{subtitle}</p>
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
