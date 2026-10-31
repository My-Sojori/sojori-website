'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { chiffresDe, TAILLES, type CasId } from '@/lib/refonte/journee';
import { scenario, cleTexte, histoires, type Acteur, type Canal } from '@/lib/refonte/scenario';
import { useCas } from '../CasProvider';

/** Un rythme unique, assez lent pour lire chaque sous-titre. */
const VITESSE = 2600;

/** Postes de la scène (repère 1176 × 640) : x et y sont les centres. */
const NOEUDS: Record<Acteur, { x: number; y: number; w: number; h: number; kind: 'ext' | 'agent' | 'hub' | 'vous' }> = {
  voyageurs: { x: 100, y: 190, w: 150, h: 46, kind: 'ext' },
  staff: { x: 100, y: 330, w: 190, h: 46, kind: 'ext' },
  tiers: { x: 105, y: 470, w: 200, h: 46, kind: 'ext' },
  service: { x: 340, y: 190, w: 176, h: 48, kind: 'agent' },
  operations: { x: 340, y: 330, w: 176, h: 48, kind: 'agent' },
  reservation: { x: 340, y: 470, w: 176, h: 48, kind: 'agent' },
  assistant: { x: 640, y: 172, w: 176, h: 48, kind: 'agent' },
  hub: { x: 640, y: 350, w: 132, h: 132, kind: 'hub' },
  studio: { x: 640, y: 532, w: 176, h: 48, kind: 'agent' },
  tarification: { x: 880, y: 190, w: 176, h: 48, kind: 'agent' },
  site: { x: 880, y: 268, w: 176, h: 48, kind: 'agent' },
  commercial: { x: 880, y: 432, w: 176, h: 48, kind: 'agent' },
  prospection: { x: 880, y: 510, w: 176, h: 48, kind: 'agent' },
  vous: { x: 1062, y: 350, w: 150, h: 54, kind: 'vous' },
  prospects: { x: 1058, y: 586, w: 200, h: 46, kind: 'ext' },
};
const IDS = Object.keys(NOEUDS) as Acteur[];
const AGENTS: Acteur[] = ['service', 'operations', 'reservation', 'tarification', 'studio', 'assistant', 'site', 'commercial', 'prospection'];
const TOPO: [Acteur, Acteur][] = [
  ['voyageurs', 'service'], ['voyageurs', 'reservation'], ['staff', 'operations'], ['tiers', 'operations'],
  ['prospects', 'prospection'], ['prospects', 'commercial'],
  ...AGENTS.map((a): [Acteur, Acteur] => [a, 'hub']),
  ...(['assistant', 'studio', 'site', 'tarification', 'reservation', 'operations', 'commercial'] as Acteur[]).map((a): [Acteur, Acteur] => [a, 'vous']),
];
const COULEUR: Record<Canal, string> = { whatsapp: '#5fcb8c', ticket: '#e6b022', carte: '#d97f55' };

type Etat = { cas: CasId; i: number; dec: Record<number, 'ok' | 'non'>; cycles: number };
const debut = (cas: CasId): Etat => ({ cas, i: 0, dec: {}, cycles: 0 });

/** Mouvement réduit : lu sans effet (pas d'état recopié), faux côté serveur. */
const RM = '(prefers-reduced-motion: reduce)';
const abonnerRM = (cb: () => void) => {
  try { const m = window.matchMedia(RM); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); } catch { return () => {}; }
};
const lireRM = () => { try { return window.matchMedia(RM).matches; } catch { return false; } };

function Badge({ label, couleur }: { label: string; couleur: string }) {
  return <span className="sj2-badge" style={{ borderColor: `${couleur}66`, color: couleur }}>{label}</span>;
}

export function SalleScene() {
  const t = useTranslations('refonte.home.scene');
  const { cas } = useCas();
  const [brut, setSt] = useState<Etat>(() => debut('conc'));
  // Un autre établissement : on repart du début (état dérivé, pas d'effet).
  const st = brut.cas === cas ? brut : debut(cas);
  const [pauseChoisie, setPauseChoisie] = useState<boolean | null>(null);
  const reduit = useSyncExternalStore(abonnerRM, lireRM, () => false);
  const pause = pauseChoisie ?? reduit;
  const attentes = useRef(0);

  const taille = TAILLES[cas];
  const c = chiffresDe(taille);
  const script = scenario(cas, c);

  const avancer = useCallback(() => {
    setSt((prec) => {
      const s = prec.cas === cas ? prec : debut(cas);
      const sc = scenario(cas, chiffresDe(TAILLES[cas]));
      const cur = sc[s.i];
      if (cur.type === 'carte' && s.dec[s.i] === undefined) {
        attentes.current += 1;
        if (attentes.current >= 3) { attentes.current = 0; return { ...s, dec: { ...s.dec, [s.i]: 'ok' } }; }
        return s;
      }
      attentes.current = 0;
      return s.i + 1 >= sc.length ? { ...debut(cas), cycles: s.cycles + 1 } : { ...s, i: s.i + 1 };
    });
  }, [cas]);

  useEffect(() => {
    if (pause) return;
    const h = setInterval(avancer, VITESSE);
    return () => clearInterval(h);
  }, [pause, cas, avancer]);

  const i = Math.min(st.i, script.length - 1);
  const cur = script[i];
  const nom = (a: Acteur) => (a === 'staff' || a === 'tiers' || a === 'prospects' ? t(`cas.${cas}.${a}`) : t(`actor.${a}`));
  const texteDe = (k: number) => {
    const e = script[k];
    return t(`step.${cleTexte(e, st.dec[k - 1])}`, e.params ?? {});
  };
  const badgeDe = (k: number) => { const e = script[k]; return e.etat ? t(`etat.${e.etat}`) : t(`badge.${e.type}`); };
  const col = COULEUR[cur.type];

  // liens et paquets
  const entreAgents = (a: Acteur) => AGENTS.includes(a);
  const segs: [Acteur, Acteur][] = cur.type === 'ticket' && entreAgents(cur.de) && entreAgents(cur.vers)
    ? [[cur.de, 'hub'], ['hub', cur.vers]] : [[cur.de, cur.vers]];
  const cle = (a: Acteur, b: Acteur) => (a < b ? `${a}|${b}` : `${b}|${a}`);
  const vives = new Set(segs.map(([a, b]) => cle(a, b)));
  const liens = [...TOPO];
  segs.forEach(([a, b]) => { if (!TOPO.some(([x, y]) => cle(x, y) === cle(a, b))) liens.push([a, b]); });
  // un lien est une courbe douce : le point de contrôle est décalé de 12 % de la longueur, sur le côté
  const r1 = (x: number) => Math.round(x * 10) / 10; // arrondi : un décimal long diffère entre le HTML serveur et le navigateur
  const geo = (a: Acteur, b: Acteur) => {
    const A = NOEUDS[a]; const B = NOEUDS[b];
    const sens = a < b ? 1 : -1;
    const cx = (A.x + B.x) / 2 - (B.y - A.y) * 0.12 * sens;
    const cy = (A.y + B.y) / 2 + (B.x - A.x) * 0.12 * sens;
    return `M ${A.x} ${A.y} Q ${r1(cx)} ${r1(cy)} ${B.x} ${B.y}`;
  };

  // l'histoire en cours : ses postes restent allumés, les autres s'estompent sans disparaître
  const hist = histoires(script);
  const hCour = Math.max(0, hist.findIndex((x) => x.pas.includes(i)));
  const pasH = hist[hCour].pas;
  const rang = pasH.indexOf(i);
  const dansHistoire = new Set<Acteur>();
  pasH.forEach((k) => { dansHistoire.add(script[k].de); dansHistoire.add(script[k].vers); });
  if (pasH.some((k) => script[k].type === 'ticket')) dansHistoire.add('hub');
  const sauter = (premier: number) => () => {
    attentes.current = 0;
    setSt((prec) => ({ cas, i: premier, dec: {}, cycles: prec.cas === cas ? prec.cycles : 0 }));
    setPauseChoisie(false);
  };

  const attend = cur.type === 'carte' && st.dec[i] === undefined;
  const decider = (v: 'ok' | 'non') => () => {
    attentes.current = 0;
    setSt((prec) => { const s = prec.cas === cas ? prec : debut(cas); return { ...s, dec: { ...s.dec, [i]: v }, i: Math.min(script.length - 1, i + 1) }; });
  };

  // chiffres du jour
  const compte = (f: (x: (typeof script)[number]) => boolean) => script.filter(f).length;
  let echanges = st.cycles * compte((x) => x.type !== 'whatsapp');
  let cartes = st.cycles * compte((x) => x.type === 'carte');
  for (let k = 0; k <= i; k++) if (script[k].type !== 'whatsapp') echanges += 1;
  for (let k = 0; k < i; k++) if (script[k].type === 'carte' && st.dec[k] !== undefined) cartes += 1;
  const chiffres = [
    { nom: t('numbers.arrivals'), v: c.arrivees },
    { nom: t('numbers.departures'), v: c.departs },
    { nom: t(`cas.${cas}.unites`), v: c.occupees },
    { nom: t('numbers.guestRequests'), v: c.demandes },
    { nom: t('numbers.exchanges'), v: echanges, or: true },
    { nom: t('numbers.cards'), v: cartes, terra: true },
  ];

  const journal: number[] = [];
  for (let k = i; k >= 0 && journal.length < 6; k--) journal.push(k);



  return (
    <div className="sj2-scene-block">
      <span className="sj2-pill sj2-pill--mono sj2-simulation">{t('simulation')}</span>
      <div className="sj2-scene-head">
        <span className="sj2-eyebrow sj2-eyebrow--sm sj2-live"><span className="sj2-dot" />{t('label', { titre: t(`cas.${cas}.titre`) })}</span>
        <span style={{ flexGrow: 1 }} />
        <button type="button" className="sj2-btn sj2-btn--sm sj2-btn--ghost" onClick={() => setPauseChoisie(!pause)} aria-label={pause ? t('resumeAria') : t('pauseAria')}>
          {pause ? t('resume') : t('pause')}
        </button>
      </div>

      <div className="sj2-histoires" role="group" aria-label={t('histoires.aria')}>
        {hist.map((x, k) => {
          const on = k === hCour;
          const avance = on ? Math.round(((rang + 1) / pasH.length) * 100) : k < hCour ? 100 : 0;
          return (
            <button key={x.h} type="button" className="sj2-histoire" aria-pressed={on} onClick={sauter(x.premier)}>
              <span className="sj2-histoire__num">{String(k + 1).padStart(2, '0')}</span>
              <span>{t(`histoires.${x.h}`)}</span>
              <span className="sj2-histoire__barre" aria-hidden="true" style={{ width: `${avance}%` }} />
            </button>
          );
        })}
      </div>

      <div className="sj2-graphe" role="group" aria-label={t('regionAria')}>
        <div className="sj2-scene" dir="ltr">
          <svg className="sj2-liens" viewBox="0 0 1176 640" width="1176" height="640" aria-hidden="true">
            {[...liens].sort(([a, b], [c2, d2]) => Number(vives.has(cle(a, b))) - Number(vives.has(cle(c2, d2)))).map(([a, b]) => {
              const vif = vives.has(cle(a, b));
              const deLHistoire = dansHistoire.has(a) && dansHistoire.has(b);
              return (
                <path key={cle(a, b)} d={geo(a, b)} fill="none" className={vif ? 'sj2-lien sj2-lien--flux' : 'sj2-lien sj2-lien--veille'}
                  stroke={vif ? col : deLHistoire ? '#5a5344' : '#38342a'} strokeWidth={vif ? 2.5 : 1.4} strokeDasharray={vif ? '10 4' : '3 9'} strokeLinecap="round"
                  opacity={vif || deLHistoire ? 1 : 0.85} />
              );
            })}
          </svg>
          {segs.map(([a, b], k) => (
            <div key={`${i}-${st.cycles}-${k}`} className="sj2-paquet"
              style={{ background: col, boxShadow: `0 0 16px ${col}`, offsetPath: `path('${geo(a, b)}')`, offsetRotate: '0deg', animation: `sj2-glisse${i % 2} 1.2s cubic-bezier(.45,.05,.35,1) ${k}s both` }} />
          ))}
          {IDS.map((id) => {
            const nd = NOEUDS[id]; const actif = cur.de === id || cur.vers === id; const allume = actif || dansHistoire.has(id);
            return (
              <div key={id} className={`sj2-noeud sj2-noeud--${nd.kind}${actif ? ' is-actif' : ''}${allume ? '' : ' is-dim'}`} dir={undefined}
                style={{ left: nd.x - nd.w / 2, top: nd.y - nd.h / 2, width: nd.w, height: nd.h, ...(actif ? { borderColor: col, boxShadow: `0 0 0 4px rgba(230,176,34,0.08), 0 0 28px ${col}33` } : allume ? { borderColor: '#4a4538' } : {}) }}>
                {nd.kind === 'ext' && <span className="sj2-noeud__msg" />}
                <span>{nom(id)}</span>
              </div>
            );
          })}

          <div key={`c${i}-${st.cycles}`} className={`sj2-courant sj2-fondu${i % 2}`}>
            <span className="sj2-courant__tete"><Badge label={badgeDe(i)} couleur={COULEUR[script[i].type]} /><span className="sj2-courant__rang" aria-label={`${rang + 1} / ${pasH.length}`}>{rang + 1} / {pasH.length}</span><span className="sj2-courant__qui">{nom(cur.de)} <span className="sj2-arrow" aria-hidden="true">→</span> {nom(cur.vers)}</span></span>
            <span className="sj2-courant__texte">{texteDe(i)}</span>
          </div>

          {attend && (
            <div className="sj2-attend sj2-carte-vous">
              <span className="sj2-attend__titre">{t('waiting')}</span>
              <span style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="sj2-attend__ok" onClick={decider('ok')}>{t('validate')}</button>
                <button type="button" className="sj2-attend__non" onClick={decider('non')}>{t('dismiss')}</button>
              </span>
            </div>
          )}

          <span className="sj2-soon">{t('soon')}</span>
          <div className="sj2-legende">
            <span><i style={{ background: COULEUR.whatsapp }} />{t('legend.messages')}</span>
            <span><i style={{ background: COULEUR.ticket }} />{t('legend.agents')}</span>
            <span><i style={{ background: COULEUR.carte }} />{t('legend.card')}</span>
          </div>
        </div>
      </div>

      <div className="sj2-scene-bas">
        <div className="sj2-panel sj2-panel--journal">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('journalTitle')}</span>
          <ol className="sj2-journal">
            {journal.map((k) => (
              <li key={`${st.cycles}-${k}`} className="sj2-journal__ligne">
                <Badge label={badgeDe(k)} couleur={COULEUR[script[k].type]} />
                <span className="sj2-journal__qui">{nom(script[k].de)} <span className="sj2-arrow" aria-hidden="true">→</span> {nom(script[k].vers)}</span>
                <span className="sj2-journal__texte">{texteDe(k)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sj2-panel sj2-panel--chiffres">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('numbersTitle', { type: t(`cas.${cas}.type`).toUpperCase(), size: t(`cas.${cas}.size`).toUpperCase() })}</span>
          <div className="sj2-chiffres">
            {chiffres.map((x) => (
              <div key={x.nom} className="sj2-chiffre">
                <span className="sj2-chiffre__v" style={{ color: x.or ? '#e6b022' : x.terra ? '#f3a27f' : undefined }}>{x.v}</span>
                <span className="sj2-chiffre__n">{x.nom}</span>
              </div>
            ))}
          </div>
          <p className="sj2-note">{t('numbersNote')}</p>
        </div>
      </div>
    </div>
  );
}
