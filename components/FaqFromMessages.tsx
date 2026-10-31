import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { FaqSection, type FaqItem } from './FaqSection';

/**
 * FAQ d'une page, lue dans messages (`faqPages.<page>`), donc traduite avec le
 * reste de la page. Le texte visible et le JSON-LD FAQPage viennent de la même
 * source (FaqSection) et sont dans la langue de la page.
 */
export function FaqFromMessages({ page }: { page: string }): ReactNode {
  const t = useTranslations('faqPages');
  return <FaqSection badge={t(`${page}.badge`)} title={t('title')} items={t.raw(`${page}.items`) as FaqItem[]} />;
}
