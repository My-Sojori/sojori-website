import { useTranslations } from 'next-intl';

/**
 * Le point du matin que l'admin reçoit sur WhatsApp, en exemple : établissements, chiffres et prénom fictifs, aucun vrai logement.
 * Un composant HTML, pas une image : le texte est lu par Google et par les IA, et il est traduit.
 * La carte se règle sur la largeur de son conteneur (celle de la bulle) : les tailles suivent `cqw`, avec un plancher lisible.
 */
const MOUVEMENTS = [
  { n: 12, cle: 'arrivals', icone: 'M3 10h11M10 5l5 5-5 5M17 3v14' },
  { n: 9, cle: 'departures', icone: 'M17 10H6M10 5l-5 5 5 5M3 3v14' },
  { n: 14, cle: 'stayovers', icone: 'M2 15V6M2 11h16v4M18 15v-3a3 3 0 0 0-3-3H9v2M5 9.5a1.5 1.5 0 1 0 0-.01' },
] as const;
const KPIS = [
  { cle: 'occ', or: true }, { cle: 'adr', or: false }, { cle: 'revpar', or: false }, { cle: 'revenue', or: true },
] as const;
const TYPES = [
  { cle: 'riads', occ: 88, adr: '1 250' }, { cle: 'villas', occ: 74, adr: '2 100' },
  { cle: 'apartments', occ: 85, adr: '650' }, { cle: 'studios', occ: 79, adr: '480' },
] as const;
const JOURS = [78, 91, 95, 72, 68, 70, 84];

export function RapportAdmin() {
  const t = useTranslations('refonte.report');
  const ex = useTranslations('refonte.band');
  const jours = t.raw('days.list') as string[];
  return (
    <figure className="sj2 sj2--chrome sj2-rapport" aria-label={t('aria')}>
      <span className="sj2-rapport__exemple">{ex('example')}</span>
      <div className="sj2-rapport__in">
      <div className="sj2-rapport__tete">
        <span className="sj2-rapport__eyebrow">{t('eyebrow')}</span>
        <span className="sj2-rapport__titre">{t('title', { n: 30 })}</span>
        <span className="sj2-rapport__date">{t('date')}</span>
      </div>
      <span className="sj2-rapport__filet" aria-hidden="true" />

      <ul className="sj2-rapport__mouvements">
        {MOUVEMENTS.map((m) => (
          <li key={m.cle}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d={m.icone} stroke="#E6B022" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <strong>{m.n}</strong> {t(`moves.${m.cle}`)}
          </li>
        ))}
      </ul>

      <div className="sj2-rapport__kpis">
        {KPIS.map((k) => (
          <div key={k.cle} className="sj2-rapport__kpi">
            <span className="sj2-rapport__kpi-titre">{t(`kpi.${k.cle}.title`)}</span>
            <span className={`sj2-rapport__kpi-valeur${k.or ? ' is-or' : ''}`}>{t(`kpi.${k.cle}.value`)}</span>
            <span className="sj2-rapport__kpi-unite">{t(`kpi.${k.cle}.unit`)}</span>
          </div>
        ))}
      </div>

      <div className="sj2-rapport__bloc">
        <span className="sj2-rapport__label">{t('types.title')}</span>
        {TYPES.map((x) => (
          <div key={x.cle} className="sj2-rapport__type">
            <span className="sj2-rapport__type-nom">{t(`types.${x.cle}`)}</span>
            <span className="sj2-rapport__piste"><span style={{ width: `${x.occ}%` }} /></span>
            <span className="sj2-rapport__type-val"><strong>{t('pct', { n: x.occ })}</strong> · {t('types.adr', { adr: x.adr })}</span>
          </div>
        ))}
      </div>

      <div className="sj2-rapport__bloc">
        <span className="sj2-rapport__label">{t('days.title')}</span>
        <div className="sj2-rapport__jours">
          {JOURS.map((p, i) => (
            <div key={i} className="sj2-rapport__jour">
              <div className="sj2-rapport__zone" style={{ ['--p' as string]: p }}>
                <span className="sj2-rapport__jour-pct">{t('pct', { n: p }).replace(/[\s\u00a0\u202f]/g, '')}</span>
                <span className="sj2-rapport__barre" />
              </div>
              <span className="sj2-rapport__jour-nom">{jours[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sj2-rapport__pied">
        <span className="sj2-rapport__marque">{t('footer.brand')}</span>
        <span>{t('footer.text')}</span>
      </div>
      </div>
    </figure>
  );
}

/** La carte dans une bulle de message WhatsApp, avec sa légende (« Bonjour Karim, voici votre point du matin. »). */
export function RapportBulle({ theme }: { theme: 'night' | 'wa' }) {
  const t = useTranslations('refonte.report');
  return (
    <div className={`sj2-rapport-bulle sj2-rapport-bulle--${theme}`}>
      <RapportAdmin />
      <p className="sj2-rapport-bulle__legende">{t('caption')}</p>
    </div>
  );
}
