'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Compte de résultat animé — bascule hôtelier / gestionnaire.
 *
 * Le module finances de l'orchestrateur ne raisonne aujourd'hui qu'en
 * `listing` (356 occurrences, zéro « chambre »). Sur le site, on n'a pas cette
 * contrainte : on peut montrer les deux lectures, et c'est même préférable —
 * un hôtelier et un gestionnaire ne regardent pas les mêmes lignes.
 *
 *   L'hôtelier lit un compte d'exploitation : ce que l'établissement dégage.
 *   Le gestionnaire lit un relevé propriétaire : ce qu'il reverse, et ce qu'il
 *   garde.
 *
 * Les lignes se construisent en cascade à l'entrée dans le viewport, les
 * montants comptent jusqu'à leur valeur. Le mouvement sert la lecture : on
 * voit le résultat se former ligne après ligne, ce qu'un tableau figé ne
 * montre pas.
 *
 * Montants illustratifs, en dirhams — jamais présentés comme des chiffres
 * clients. Aucune bibliothèque : IntersectionObserver et CSS.
 */

type Kind = 'revenue' | 'charge' | 'subtotal' | 'result';

interface Line {
  label: string;
  hint?: string;
  amount: number;
  kind: Kind;
}

interface Profile {
  id: 'hotel' | 'manager';
  tab: string;
  title: string;
  subtitle: string;
  unit: string;
  lines: Line[];
  kpis: { label: string; value: string; hint: string }[];
}

const PROFILES: Profile[] = [
  {
    id: 'hotel',
    tab: 'Hôtel',
    title: "Compte d'exploitation",
    subtitle: "Ce que l'établissement dégage, mois par mois — par type de chambre et par canal.",
    unit: '42 chambres · septembre',
    lines: [
      { label: 'Hébergement', hint: 'Nuitées, tous canaux', amount: 1_284_600, kind: 'revenue' },
      { label: 'Extras et services', hint: 'Surclassements, arrivées anticipées, room service', amount: 186_400, kind: 'revenue' },
      { label: 'Conciergerie', hint: 'Transferts, excursions — commission établissement', amount: 42_800, kind: 'revenue' },
      { label: 'Produit total', amount: 1_513_800, kind: 'subtotal' },
      { label: 'Commissions plateformes', hint: '68 % du CA passe encore par les OTA', amount: -157_200, kind: 'charge' },
      { label: 'Ménage et blanchisserie', amount: -212_500, kind: 'charge' },
      { label: 'Personnel et charges', amount: -486_300, kind: 'charge' },
      { label: 'Maintenance et énergie', amount: -134_900, kind: 'charge' },
      { label: 'Résultat d’exploitation', amount: 522_900, kind: 'result' },
    ],
    kpis: [
      { label: 'ADR', value: '1 264 MAD', hint: 'Prix moyen par nuit vendue' },
      { label: 'RevPAR', value: '1 103 MAD', hint: 'Revenu par chambre disponible' },
      { label: 'Occupation', value: '87 %', hint: 'Sur le mois' },
      { label: 'Part directe', value: '32 %', hint: 'Hors commission plateforme' },
    ],
  },
  {
    id: 'manager',
    tab: 'Gestionnaire',
    title: 'Relevé propriétaire',
    subtitle: 'Ce que vous reversez, ce que vous gardez — un relevé par propriétaire, généré et envoyé.',
    unit: 'Villa Majorelle · septembre',
    lines: [
      { label: 'Loyers encaissés', hint: '18 nuits louées', amount: 124_200, kind: 'revenue' },
      { label: 'Services vendus', hint: 'Ménage supplémentaire, transferts, courses', amount: 9_800, kind: 'revenue' },
      { label: 'Encaissements', amount: 134_000, kind: 'subtotal' },
      { label: 'Commissions plateformes', amount: -18_600, kind: 'charge' },
      { label: 'Ménage et linge', amount: -12_400, kind: 'charge' },
      { label: 'Maintenance', hint: 'Plomberie, justificatif joint', amount: -3_200, kind: 'charge' },
      { label: 'Votre commission de gestion', hint: '20 % du net', amount: -19_960, kind: 'charge' },
      { label: 'Versé au propriétaire', amount: 79_840, kind: 'result' },
    ],
    kpis: [
      { label: 'Votre commission', value: '19 960 MAD', hint: 'Sur ce bien, ce mois' },
      { label: 'Conciergerie', value: '2 450 MAD', hint: 'Votre part sur les prestations' },
      { label: 'Taux d’occupation', value: '60 %', hint: '18 nuits sur 30' },
      { label: 'Délai de versement', value: '< 48 h', hint: 'Après clôture du mois' },
    ],
  },
];

/** Formatage MAD sans décimales, espaces insécables fines. */
function mad(n: number): string {
  const abs = Math.abs(Math.round(n));
  const s = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (n < 0 ? '−' : '') + s;
}

/** Compteur : le montant se construit, il ne s'affiche pas. */
function useCountUp(target: number, run: boolean, delayMs: number, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / durationMs);
        // easeOutCubic : rapide puis se pose, comme un total qui se fige
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, run, delayMs, durationMs]);

  return value;
}

function LineRow({ line, index, run }: { line: Line; index: number; run: boolean }) {
  const delay = 180 + index * 190;
  const shown = useCountUp(line.amount, run, delay);

  const isResult = line.kind === 'result';
  const isSubtotal = line.kind === 'subtotal';
  const isCharge = line.kind === 'charge';

  return (
    <div
      className={`pnl-row ${isResult ? 'pnl-result' : ''} ${isSubtotal ? 'pnl-subtotal' : ''} ${run ? 'pnl-on' : ''}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      <div className="pnl-label">
        <span className="pnl-name">{line.label}</span>
        {line.hint && <span className="pnl-hint">{line.hint}</span>}
      </div>
      <div className={`pnl-amount ${isCharge ? 'pnl-neg' : ''}`}>
        {mad(shown)} <span className="pnl-cur">MAD</span>
      </div>
    </div>
  );
}

export function PnlAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Profile['id']>('hotel');
  /** Change à chaque bascule pour relancer les compteurs. */
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const profile = PROFILES.find(p => p.id === active)!;

  const select = (id: Profile['id']) => {
    if (id === active) return;
    setActive(id);
    setRunKey(k => k + 1); // les montants se reconstruisent
  };

  return (
    <div ref={ref} className={visible ? 'pnl pnl-live' : 'pnl'}>
      <div className="pnl-head">
        <div>
          <div className="pnl-title">{profile.title}</div>
          <div className="pnl-sub">{profile.subtitle}</div>
        </div>
        <div className="pnl-tabs" role="tablist" aria-label="Type d'établissement">
          {PROFILES.map(p => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === active}
              className={p.id === active ? 'pnl-tab pnl-tab-on' : 'pnl-tab'}
              onClick={() => select(p.id)}
            >
              {p.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="pnl-unit">{profile.unit}</div>

      <div className="pnl-body" key={`${active}-${runKey}`}>
        {profile.lines.map((l, i) => (
          <LineRow key={l.label} line={l} index={i} run={visible} />
        ))}
      </div>

      <div className="pnl-kpis" key={`kpi-${active}-${runKey}`}>
        {profile.kpis.map((k, i) => (
          <div
            key={k.label}
            className={`pnl-kpi ${visible ? 'pnl-on' : ''}`}
            style={{ '--d': `${900 + i * 120}ms` } as React.CSSProperties}
          >
            <div className="pnl-kpi-label">{k.label}</div>
            <div className="pnl-kpi-value">{k.value}</div>
            <div className="pnl-kpi-hint">{k.hint}</div>
          </div>
        ))}
      </div>

      <div className="pnl-foot">
        Montants illustratifs. Le relevé se construit à la clôture, sans préparation manuelle.
      </div>
    </div>
  );
}
