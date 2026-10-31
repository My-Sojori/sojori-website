import { useLocale, useTranslations } from 'next-intl';

type Source = 'airbnb' | 'booking' | 'direct' | 'bloque';
type Resa = [debut: number, nuits: number, source: Source, voyageur: string];

/** Les quatre sources : couleurs de bordure, de fond et de texte (contraste ≥ 4,5:1 sur le fond de la barre). */
const SOURCES: Record<Source, { fond: string; bord: string; texte: string }> = {
  airbnb: { fond: '#3A1F24', bord: '#C4525F', texte: '#F7D7DB' },
  booking: { fond: '#14263F', bord: '#4F86C6', texte: '#D6E6F7' },
  direct: { fond: '#2A220C', bord: '#E6B022', texte: '#F7E7B5' },
  bloque: { fond: '#1F1E1B', bord: '#6B6455', texte: '#BDB6A8' },
};

/**
 * Huit logements fictifs sur 14 jours, du 1er au 14 novembre : [nom, type, prix, [[colonne de départ, nuits, source, voyageur]]].
 * Aucun vrai logement, aucun vrai séjour, aucun numéro. Les noms de voyageurs ne sont pas traduits ; « Propriétaire » et
 * « Ménage » le sont (clés owner et cleaning).
 */
const LOGEMENTS: [string, 'riad' | 'villa' | 'studio' | 'apartment' | 'suite', string, Resa[]][] = [
  ['Riad Amana', 'riad', '1 250', [[1, 3, 'airbnb', 'Sarah M.'], [5, 4, 'booking', 'Léa D.'], [10, 4, 'direct', 'Omar K.']]],
  ['Villa Palmeraie', 'villa', '2 100', [[2, 5, 'booking', 'Family R.'], [8, 3, 'bloque', 'owner'], [12, 3, 'airbnb', 'Marco T.']]],
  ['Studio Hivernage', 'studio', '480', [[1, 2, 'direct', 'Youssef B.'], [4, 3, 'airbnb', 'Emma W.'], [8, 5, 'booking', 'Nadia H.']]],
  ['Dar Zellige', 'riad', '1 400', [[3, 4, 'airbnb', 'Paul & Ana'], [9, 5, 'direct', 'Karim A.']]],
  ['Appartement Guéliz', 'apartment', '650', [[1, 4, 'booking', 'Jonas P.'], [6, 3, 'airbnb', 'Inès L.'], [11, 4, 'booking', 'Tom G.']]],
  ['Suite Médina', 'suite', '980', [[2, 3, 'direct', 'Aïcha S.'], [6, 6, 'airbnb', 'Group V.'], [13, 2, 'booking', 'Sofia C.']]],
  ['Villa Atlas', 'villa', '1 900', [[4, 4, 'booking', 'Hugo F.'], [9, 4, 'airbnb', 'Maya D.']]],
  ['Studio Agdal', 'studio', '520', [[1, 5, 'airbnb', 'Elena R.'], [7, 2, 'bloque', 'cleaning'], [10, 5, 'booking', 'David N.']]],
];
const SOURCES_ORDRE: Source[] = ['airbnb', 'booking', 'direct', 'bloque'];
const NB_JOURS = 14;

/**
 * Le calendrier unifié du PMS, en exemple : un composant HTML (texte lisible par les robots, traduit), pas une capture.
 * La grille des dates reste de gauche à droite en arabe ; les libellés suivent la langue. Le défilement horizontal,
 * si l'écran est étroit, reste dans le composant : jamais sur la page.
 */
export function CalendrierExemple() {
  const t = useTranslations('refonte.calendar');
  const ex = useTranslations('refonte.band');
  const locale = useLocale();
  // chiffres occidentaux partout, y compris en arabe
  const tag = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const jourFmt = new Intl.DateTimeFormat(tag, { weekday: 'short', timeZone: 'UTC' });
  const moisFmt = new Intl.DateTimeFormat(tag, { month: 'long', timeZone: 'UTC' });
  const jours = Array.from({ length: NB_JOURS }, (_, i) => {
    const d = new Date(Date.UTC(2026, 10, i + 1));
    const dow = d.getUTCDay();
    return { num: i + 1, nom: jourFmt.format(d), weekend: dow === 0 || dow === 6 };
  });
  const mois = moisFmt.format(new Date(Date.UTC(2026, 10, 1)));
  const nom = (b: Resa) => (b[3] === 'owner' ? t('owner') : b[3] === 'cleaning' ? t('cleaning') : b[3]);

  return (
    <figure className="sj2-cal">
      <span className="sj2-cal__exemple">{ex('example')}</span>
      <div className="sj2-cal__scroll" dir="ltr" tabIndex={0} role="img" aria-label={t('aria')}>
        <div className="sj2-cal__board">
          <div className="sj2-cal__haut">
            <span className="sj2-cal__vue is-actif">{t('viewMulti')}</span>
            <span className="sj2-cal__vue">{t('viewSingle')}</span>
            <span className="sj2-cal__plage">{t.rich('range', { start: 1, end: NB_JOURS, month: mois, days: (c) => <bdi dir="ltr">{c}</bdi> })}</span>
          </div>
          <div className="sj2-cal__legende">
            {SOURCES_ORDRE.map((s) => (
              <span key={s}><i style={{ background: SOURCES[s].bord }} />{t(`source.${s}`)}</span>
            ))}
          </div>
          <div className="sj2-cal__ligne sj2-cal__ligne--tete">
            <span className="sj2-cal__etiquette">{t('property')}</span>
            <div className="sj2-cal__jours">
              {jours.map((j) => (
                <div key={j.num} className={j.weekend ? 'is-weekend' : undefined}><span>{j.nom}</span><strong>{j.num}</strong></div>
              ))}
            </div>
          </div>
          {LOGEMENTS.map(([nomLogement, type, prix, resas]) => (
            <div key={nomLogement} className="sj2-cal__ligne">
              <div className="sj2-cal__logement"><strong>{nomLogement}</strong><span><bdi>{t(`type.${type}`)}</bdi> · <bdi dir="ltr">{prix} MAD</bdi></span></div>
              <div className="sj2-cal__piste">
                {resas.map((b) => {
                  const s = SOURCES[b[2]];
                  const fin = Math.min(NB_JOURS + 1, b[0] + b[1]);
                  return (
                    <div key={b[0]} className="sj2-cal__barre" style={{ gridColumn: `${b[0]} / ${fin}`, borderColor: s.bord, background: s.fond, color: s.texte }}>
                      <strong>{nom(b)}</strong><span>{t.rich('nights', { n: b[1], num: (c) => <bdi dir="ltr">{c}</bdi> })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption>{t('note')}</figcaption>
    </figure>
  );
}
