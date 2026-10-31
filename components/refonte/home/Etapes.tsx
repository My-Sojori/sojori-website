'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const N = 7;

/**
 * Les sept étapes d'un séjour. Chaque panneau contient ses deux versions (en ordre / ça bloque) :
 * le HTML porte tout le texte, le bouton « Et si ça bloque ? » ne fait que choisir laquelle s'affiche.
 */
export function Etapes() {
  const t = useTranslations('refonte.home.stay');
  const [idx, setIdx] = useState(2);
  const [bloque, setBloque] = useState(false);

  const etat = (k: number) => (k < idx ? 'ok' : k === idx ? (bloque ? 'late' : 'now') : 'next');

  return (
    <div className="sj2-etapes" data-bloque={bloque ? 'true' : 'false'}>
      <div className="sj2-etapes__tete">
        <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('pick')}</span>
        <span style={{ flexGrow: 1 }} />
        <button type="button" className={`sj2-bloque${bloque ? ' is-on' : ''}`} aria-pressed={bloque} onClick={() => setBloque((b) => !b)}>
          {bloque ? t('blockOff') : t('blockOn')}
        </button>
      </div>

      <div role="group" aria-label={t('stepsAria')} className="sj2-etapes__liste">
        {Array.from({ length: N }, (_, k) => {
          const e = etat(k);
          return (
            <button key={k} type="button" className={`sj2-etape sj2-etape--${e}`} aria-pressed={idx === k} aria-label={`${t(`list.${k}.name`)} : ${t(`state.${e}`)}`} onClick={() => setIdx(k)}>
              <span className={`sj2-pastille sj2-pastille--${e}`} aria-hidden="true">{e === 'ok' ? '✓' : e === 'late' ? '!' : ''}</span>
              <span className="sj2-etape__nom">{t(`list.${k}.name`)}</span>
              <span className="sj2-etape__etat">{t(`state.${e}`)}</span>
            </button>
          );
        })}
      </div>

      <div className="sj2-etapes__corps">
        {Array.from({ length: N }, (_, k) => (
          <div key={k} className="sj2-etape-detail" hidden={idx !== k}>
            <div className="sj2-etape-detail__qui">
              <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('whoTitle')}</span>
              <h3 className="sj2-h3">{t(`list.${k}.name`)} · {t(`list.${k}.agent`)}</h3>
              <p className="sj2-agent__resume">{t(`list.${k}.what`)}</p>
              <span className="sj2-bubble sj2-bubble--r">{t(`list.${k}.msg`)}</span>
            </div>
            <div className="sj2-etape-detail__voit">
              <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('seeTitle')}</span>
              <div className="sj2-voit sj2-voit--bloque">
                <span className="sj2-voit__badge"><i>!</i>{t('overdue')}</span>
                <span className="sj2-voit__titre">{t(`list.${k}.blockTitle`)}</span>
                <span className="sj2-voit__cause">{t('why', { cause: t(`list.${k}.blockCause`) })}</span>
                <span className="sj2-voit__action">{t(`list.${k}.blockAction`)}</span>
              </div>
              <div className="sj2-voit sj2-voit--ok">
                <span className="sj2-voit__titre">{t('nothing')}</span>
                <span className="sj2-agent__resume" style={{ fontSize: 15 }}>{t('nothingText')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
