'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { enTest } from '@/lib/demoTest';

/** Visible seulement si l'adresse porte `?test=1` ET que le serveur confirme le mode test (aperçus et local, jamais en production). */
export function BandeauTest() {
  const t = useTranslations('refonte.testMode');
  const [actif, setActif] = useState(false);
  useEffect(() => {
    if (!enTest()) return;
    let annule = false;
    fetch('/api/v1/demo/test-mode').then((r) => r.json()).then((d: { data?: { test?: boolean } }) => { if (!annule) setActif(d?.data?.test === true); }).catch(() => {});
    return () => { annule = true; };
  }, []);
  if (!actif) return null;
  return <p className="sj2-bandeau-test sj2-scope" role="status">{t('text')}</p>;
}
