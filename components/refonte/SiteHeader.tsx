'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { SojoriMark } from '@/components/Logo';
import { LangSwitch } from './LangSwitch';

type Entree = { href: React.ComponentProps<typeof Link>['href']; cle: string; page?: string; section?: string };

const ENTREES: Entree[] = [
  { href: { pathname: '/', hash: 'sejour' }, cle: 'stay', section: 'sejour' },
  { href: { pathname: '/', hash: 'socle' }, cle: 'pms', section: 'socle' },
  { href: { pathname: '/', hash: 'agents' }, cle: 'agents', section: 'agents' },
  { href: { pathname: '/', hash: 'whatsapp' }, cle: 'modules', section: 'whatsapp' },
  { href: '/offre', cle: 'offer', page: '/offre' },
];

export function SiteHeader() {
  const t = useTranslations('refonte.nav');
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState<string | null>(null);

  // menu téléphone : Échap le ferme, la page ne défile plus derrière lui
  useEffect(() => {
    if (!ouvert) return;
    const surEchap = (e: KeyboardEvent) => { if (e.key === 'Escape') setOuvert(false); };
    window.addEventListener('keydown', surEchap);
    // Le verrouillage se pose sur <html> : le viewport reste le conteneur de défilement et l'en-tête reste collé en haut.
    // Sur <body>, `overflow: hidden` en ferait un conteneur de défilement et annulerait `position: sticky`.
    const html = document.documentElement;
    const avant = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', surEchap); html.style.overflow = avant; };
  }, [ouvert]);

  // la rubrique de la section affichée (accueil) est soulignée : la section qui croise le haut de l'écran (4 px sous la barre de 72 px : une frontière exacte ne compte pas pour les deux)
  useEffect(() => {
    if (pathname !== '/' || typeof IntersectionObserver === 'undefined') { setActif(null); return; }
    const sections = ENTREES.flatMap((e) => { const el = e.section ? document.getElementById(e.section) : null; return el && e.section ? [{ id: e.section, el }] : []; });
    if (!sections.length) return;
    const visibles = new Set<string>();
    const o = new IntersectionObserver((entries) => {
      entries.forEach((en) => { const id = sections.find((x) => x.el === en.target)?.id; if (!id) return; if (en.isIntersecting) visibles.add(id); else visibles.delete(id); });
      setActif(sections.find((x) => visibles.has(x.id))?.id ?? null);
    }, { rootMargin: '-76px 0px -60% 0px' });
    sections.forEach((x) => o.observe(x.el));
    return () => o.disconnect();
  }, [pathname]);

  const liens = ENTREES.map((e) => (
    <Link
      key={e.cle}
      href={e.href}
      aria-current={e.page && pathname === e.page ? 'page' : e.section && actif === e.section ? 'location' : undefined}
      onClick={() => setOuvert(false)}
      prefetch={false}
    >
      {t(e.cle)}
    </Link>
  ));

  return (
    <header className="sj2-header">
      <div className="sj2-wrap">
        <div className="sj2-header__bar">
          <Link href="/" className="sj2-logo" aria-label={t('homeAria')}>
            <SojoriMark size={34} />
            <span>sojori</span>
          </Link>
          <nav className="sj2-nav" aria-label={t('main')}>{liens}</nav>
          <div className="sj2-header__spacer" />
          <LangSwitch />
          <Link href="/demo" className="sj2-btn sj2-btn--sm" prefetch={false}>
            <span className="sj2-demo-long">{t('demo')}</span>
            <span className="sj2-demo-short" aria-hidden="true">{t('demoShort')}</span>
          </Link>
          <button
            type="button"
            className="sj2-burger"
            aria-expanded={ouvert}
            aria-controls="sj2-menu"
            aria-label={ouvert ? t('menuClose') : t('menuOpen')}
            onClick={() => setOuvert((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {ouvert
                ? <path d="M4 4l12 12M16 4L4 16" stroke="#F4F1EA" strokeWidth="1.8" strokeLinecap="round" />
                : <path d="M3 6h14M3 10h14M3 14h14" stroke="#F4F1EA" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
        <nav id="sj2-menu" className="sj2-menu" aria-label={t('menu')} hidden={!ouvert}>
          {liens}
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}
