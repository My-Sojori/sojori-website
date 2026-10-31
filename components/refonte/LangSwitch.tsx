'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, routing } from '@/i18n/routing';

/** Les cinq langues en vrais liens : un robot les suit, un lecteur d'écran les annonce. */
export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('refonte.nav');
  return (
    <div className="sj2-lang" role="group" aria-label={t('lang')}>
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          prefetch={false}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
