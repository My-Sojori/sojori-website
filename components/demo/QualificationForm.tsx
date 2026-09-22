'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  SEGMENTS,
  COMMON_TIMELINE,
  HEAR_ABOUT_US,
  HAS_PMS,
  labelOf,
  labelsOf,
  type Segment,
  type Choice,
} from '@/lib/demoQualification';

/**
 * Questionnaire de qualification — une question à la fois.
 *
 * Le prospect a déjà réservé son créneau : tout ce qui coûte un effort ici se
 * paie en abandon. D'où un parcours progressif — il ne voit jamais la longueur
 * du chemin, seulement la question du moment — et aucune saisie libre hors du
 * nom et de « Autre ».
 *
 * Trois temps :
 *
 *   1. Le socle. La première question (établissement ou location courte
 *      durée) commande tout le reste : les deux métiers n'ont ni les mêmes
 *      biens, ni les mêmes outils, ni les mêmes difficultés.
 *
 *   2. Les questions de suivi, choisies d'après ce qui vient d'être répondu.
 *      Elles visent ce qu'aucun formulaire figé n'atteint : l'intensité du
 *      besoin, et la capacité à payer. Le backend sert un jeu écrit à l'avance
 *      quand l'IA n'aboutit pas, donc cette étape n'échoue jamais vraiment.
 *
 *   3. L'envoi.
 *
 * Rien n'est obligatoire : chaque question se passe, et le questionnaire
 * s'envoie même vide.
 */

export interface FollowUpQuestion {
  id: string;
  question: string;
  choices: string[];
  axis?: 'need' | 'budget';
}

export interface QualificationPayload {
  fullName: string;
  company: string;
  roleType: string;
  propertyTypes: string[];
  numberOfProperties: string;
  currentPMS: string;
  currentChannelManager: string;
  currentDynamicPricing: string;
  currentWhatsApp: string;
  timeline: string;
  biggestChallenges: string;
  expectations: string;
  newPropertiesNext12Months: number;
  hearAboutUs: string;
  promoCode: string;
  /** Réponses aux questions de suivi, gardées avec leur intitulé. */
  followUpAnswers?: { question: string; answer: string; axis?: string }[];
}

/** Une étape du parcours. `skip` la retire quand elle n'a plus lieu d'être. */
interface Step {
  id: string;
  render: () => React.ReactNode;
  skip?: boolean;
}

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={selected ? 'qf-pill qf-pill-on' : 'qf-pill'}>
      {label}
    </button>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="qf-q">
      <div className="qf-q-title">{title}</div>
      {hint && <div className="qf-q-hint">{hint}</div>}
      <div className="qf-q-body">{children}</div>
    </div>
  );
}

function Pills({ children }: { children: React.ReactNode }) {
  return <div className="qf-pills">{children}</div>;
}

export function QualificationForm({
  onSubmit,
  onRequestFollowUp,
  loading,
  error,
  submitLabel,
}: {
  onSubmit: (payload: QualificationPayload) => void;
  /**
   * Va chercher les questions de suivi. Absent, le parcours enchaîne
   * directement sur la dernière question.
   */
  onRequestFollowUp?: (payload: QualificationPayload) => Promise<FollowUpQuestion[]>;
  loading?: boolean;
  error?: string;
  submitLabel: string;
}) {
  const [segment, setSegment] = useState<Segment | ''>('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [size, setSize] = useState('');
  const [hasPms, setHasPms] = useState('');
  const [pms, setPms] = useState('');
  const [pmsOther, setPmsOther] = useState('');
  const [cm, setCm] = useState('');
  const [cmOther, setCmOther] = useState('');
  const [pricing, setPricing] = useState('');
  const [pricingOther, setPricingOther] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [expectations, setExpectations] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [growth, setGrowth] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const [index, setIndex] = useState(0);
  const [followUps, setFollowUps] = useState<FollowUpQuestion[] | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [fetchingFollowUp, setFetchingFollowUp] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const cfg = segment ? SEGMENTS[segment] : null;

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const resolve = (choices: Choice[], value: string, other: string) =>
    value === 'other' ? other.trim() : value ? labelOf(choices, value) : '';

  const buildPayload = (): QualificationPayload => {
    const growthMap: Record<string, number> = { '0': 0, '1-5': 5, '6-15': 15, '15+': 20 };
    const answers = (followUps ?? [])
      .filter(q => followUpAnswers[q.id])
      .map(q => ({ question: q.question, answer: followUpAnswers[q.id], axis: q.axis }));

    return {
      fullName: fullName.trim(),
      company: company.trim(),
      roleType: segment === 'hotel' ? 'hotel' : 'property-manager',
      propertyTypes: cfg ? propertyTypes.map(v => labelOf(cfg.propertyTypes, v)) : [],
      numberOfProperties: cfg && size ? labelOf(cfg.sizes, size) : '',
      currentPMS:
        hasPms === 'yes' && cfg
          ? resolve(cfg.pms, pms, pmsOther)
          : hasPms
            ? labelOf(HAS_PMS, hasPms)
            : '',
      currentChannelManager: cfg ? resolve(cfg.channelManager, cm, cmOther) : '',
      currentDynamicPricing: cfg ? resolve(cfg.pricing, pricing, pricingOther) : '',
      currentWhatsApp: '',
      timeline,
      biggestChallenges: cfg ? labelsOf(cfg.challenges, challenges) : '',
      expectations: cfg ? labelsOf(cfg.expectations, expectations) : '',
      newPropertiesNext12Months: growth ? (growthMap[growth] ?? 0) : 0,
      hearAboutUs,
      promoCode: promoCode.trim(),
      ...(answers.length ? { followUpAnswers: answers } : {}),
    };
  };

  const steps: Step[] = useMemo(() => {
    const list: Step[] = [
      {
        id: 'segment',
        render: () => (
          <Question title="Vous gérez quoi&nbsp;?">
            <div className="qf-segments">
              <button
                type="button"
                onClick={() => setSegment('hotel')}
                className={segment === 'hotel' ? 'qf-seg qf-seg-on' : 'qf-seg'}
              >
                <span className="qf-seg-title">Un établissement</span>
                <span className="qf-seg-desc">Hôtel, riad, maison d&apos;hôtes</span>
              </button>
              <button
                type="button"
                onClick={() => setSegment('str')}
                className={segment === 'str' ? 'qf-seg qf-seg-on' : 'qf-seg'}
              >
                <span className="qf-seg-title">Des locations courte durée</span>
                <span className="qf-seg-desc">Pour vous ou pour des propriétaires</span>
              </button>
            </div>
          </Question>
        ),
      },
      {
        id: 'identity',
        render: () => (
          <Question title="Comment vous appelez-vous&nbsp;?">
            <div className="qf-inputs">
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Votre nom"
                className="qf-input"
              />
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder={segment === 'hotel' ? "Nom de l'établissement" : 'Votre société'}
                className="qf-input"
              />
            </div>
          </Question>
        ),
      },
      {
        id: 'types',
        render: () => (
          <Question
            title={segment === 'hotel' ? 'Quel type d’établissement ?' : 'Quels types de biens ?'}
            hint="Plusieurs réponses possibles."
          >
            <Pills>
              {cfg?.propertyTypes.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={propertyTypes.includes(c.value)}
                  onClick={() => toggle(propertyTypes, setPropertyTypes, c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'size',
        render: () => (
          <Question title={`Combien de ${cfg?.unitLabel ?? 'bien'}s ?`}>
            <Pills>
              {cfg?.sizes.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={size === c.value}
                  onClick={() => setSize(size === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'has-pms',
        render: () => (
          <Question
            title={
              segment === 'hotel'
                ? 'Avez-vous un PMS aujourd’hui ?'
                : 'Avez-vous un logiciel de gestion aujourd’hui ?'
            }
            hint="Sojori s’y connecte, ou vous en fournit un."
          >
            <Pills>
              {HAS_PMS.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={hasPms === c.value}
                  onClick={() => {
                    const next = hasPms === c.value ? '' : c.value;
                    setHasPms(next);
                    // Changer d'avis ne doit pas laisser un éditeur fantôme.
                    if (next !== 'yes') {
                      setPms('');
                      setPmsOther('');
                    }
                  }}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'pms',
        skip: hasPms !== 'yes',
        render: () => (
          <Question title="Lequel&nbsp;?">
            <Pills>
              {cfg?.pms.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={pms === c.value}
                  onClick={() => setPms(pms === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
            {pms === 'other' && (
              <input
                type="text"
                className="qf-other"
                value={pmsOther}
                onChange={e => setPmsOther(e.target.value)}
                placeholder="Lequel ?"
              />
            )}
          </Question>
        ),
      },
      {
        id: 'channels',
        render: () => (
          <Question title="Et pour vos canaux de distribution&nbsp;?">
            <Pills>
              {cfg?.channelManager.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={cm === c.value}
                  onClick={() => setCm(cm === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
            {cm === 'other' && (
              <input
                type="text"
                className="qf-other"
                value={cmOther}
                onChange={e => setCmOther(e.target.value)}
                placeholder="Lequel ?"
              />
            )}
          </Question>
        ),
      },
      {
        id: 'pricing',
        render: () => (
          <Question title="Comment fixez-vous vos prix&nbsp;?">
            <Pills>
              {cfg?.pricing.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={pricing === c.value}
                  onClick={() => setPricing(pricing === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
            {pricing === 'other' && (
              <input
                type="text"
                className="qf-other"
                value={pricingOther}
                onChange={e => setPricingOther(e.target.value)}
                placeholder="Lequel ?"
              />
            )}
          </Question>
        ),
      },
      {
        id: 'challenges',
        render: () => (
          <Question
            title="Qu’est-ce qui vous prend le plus de temps&nbsp;?"
            hint="Plusieurs réponses possibles."
          >
            <Pills>
              {cfg?.challenges.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={challenges.includes(c.value)}
                  onClick={() => toggle(challenges, setChallenges, c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'expectations',
        render: () => (
          <Question title="Qu’attendez-vous de Sojori&nbsp;?" hint="Plusieurs réponses possibles.">
            <Pills>
              {cfg?.expectations.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={expectations.includes(c.value)}
                  onClick={() => toggle(expectations, setExpectations, c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'growth',
        skip: !cfg?.growth,
        render: () => (
          <Question title="Combien de biens en plus dans les douze mois&nbsp;?">
            <Pills>
              {cfg?.growth?.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={growth === c.value}
                  onClick={() => setGrowth(growth === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
      {
        id: 'timeline',
        render: () => (
          <Question title="Quand souhaitez-vous démarrer&nbsp;?">
            <Pills>
              {COMMON_TIMELINE.map(c => (
                <Pill
                  key={c.value}
                  label={c.label}
                  selected={timeline === c.value}
                  onClick={() => setTimeline(timeline === c.value ? '' : c.value)}
                />
              ))}
            </Pills>
          </Question>
        ),
      },
    ];

    // Les questions de suivi s'insèrent ici, une fois reçues.
    for (const q of followUps ?? []) {
      list.push({
        id: `fu-${q.id}`,
        render: () => (
          <Question title={q.question}>
            <Pills>
              {q.choices.map(c => (
                <Pill
                  key={c}
                  label={c}
                  selected={followUpAnswers[q.id] === c}
                  onClick={() =>
                    setFollowUpAnswers(prev => ({
                      ...prev,
                      [q.id]: prev[q.id] === c ? '' : c,
                    }))
                  }
                />
              ))}
            </Pills>
          </Question>
        ),
      });
    }

    list.push({
      id: 'source',
      render: () => (
        <Question title="Comment nous avez-vous connus&nbsp;?">
          <Pills>
            {HEAR_ABOUT_US.map(c => (
              <Pill
                key={c.value}
                label={c.label}
                selected={hearAboutUs === c.value}
                onClick={() => setHearAboutUs(hearAboutUs === c.value ? '' : c.value)}
              />
            ))}
          </Pills>
          <input
            type="text"
            className="qf-input qf-input-narrow qf-promo"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            placeholder="Code promo, si vous en avez un"
          />
        </Question>
      ),
    });

    return list;
  }, [
    segment, cfg, fullName, company, propertyTypes, size, hasPms, pms, pmsOther,
    cm, cmOther, pricing, pricingOther, challenges, expectations, growth,
    timeline, hearAboutUs, promoCode, followUps, followUpAnswers,
  ]);

  const visible = steps.filter(s => !s.skip);
  const safeIndex = Math.min(index, visible.length - 1);
  const current = visible[safeIndex];
  const isLast = safeIndex >= visible.length - 1;
  const progress = visible.length > 1 ? (safeIndex / (visible.length - 1)) * 100 : 0;

  /** Cette étape a-t-elle reçu une réponse ? */
  const answered = (() => {
    if (!current) return false;
    if (current.id.startsWith('fu-')) {
      return Boolean(followUpAnswers[current.id.slice(3)]);
    }
    switch (current.id) {
      case 'segment': return Boolean(segment);
      case 'identity': return Boolean(fullName.trim() || company.trim());
      case 'types': return propertyTypes.length > 0;
      case 'size': return Boolean(size);
      case 'has-pms': return Boolean(hasPms);
      case 'pms': return Boolean(pms);
      case 'channels': return Boolean(cm);
      case 'pricing': return Boolean(pricing);
      case 'challenges': return challenges.length > 0;
      case 'expectations': return expectations.length > 0;
      case 'growth': return Boolean(growth);
      case 'timeline': return Boolean(timeline);
      case 'source': return Boolean(hearAboutUs);
      default: return false;
    }
  })();

  /**
   * Sur une question à choix unique, cliquer une réponse fait avancer : lui
   * demander en plus de valider serait une étape de trop. Les questions à
   * choix multiple, elles, attendent qu'on ait fini de cocher.
   */
  const AUTO_ADVANCE = new Set([
    'segment', 'size', 'has-pms', 'pms', 'channels', 'pricing', 'growth', 'timeline',
  ]);

  useEffect(() => {
    if (!current || !answered) return;
    const auto = AUTO_ADVANCE.has(current.id) || current.id.startsWith('fu-');
    if (!auto) return;
    const t = setTimeout(() => setIndex(i => Math.min(i + 1, visible.length - 1)), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment, size, hasPms, pms, cm, pricing, growth, timeline, followUpAnswers]);

  // Le changement d'étape est porté aux lecteurs d'écran.
  useEffect(() => {
    stageRef.current?.focus();
  }, [safeIndex]);

  const goNext = async () => {
    // Juste avant la dernière question, on va chercher les questions de suivi.
    const nextIsSource = visible[safeIndex + 1]?.id === 'source';
    if (nextIsSource && followUps === null && onRequestFollowUp) {
      setFetchingFollowUp(true);
      try {
        setFollowUps(await onRequestFollowUp(buildPayload()));
      } catch {
        // L'absence de questions ne doit jamais interrompre le parcours.
        setFollowUps([]);
      } finally {
        setFetchingFollowUp(false);
      }
      setIndex(i => i + 1);
      return;
    }
    setIndex(i => Math.min(i + 1, visible.length - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(buildPayload());
  };

  return (
    <form onSubmit={handleSubmit} className="qf">
      <div className="qf-progress" aria-hidden>
        <div className="qf-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="qf-count">
        {safeIndex + 1} / {visible.length}
      </div>

      <div className="qf-stage" ref={stageRef} tabIndex={-1} aria-live="polite">
        {fetchingFollowUp ? (
          <div className="qf-thinking">
            <span className="qf-dot" />
            <span className="qf-dot" />
            <span className="qf-dot" />
            <span className="qf-thinking-text">Une ou deux questions de plus…</span>
          </div>
        ) : (
          current?.render()
        )}
      </div>

      {error && <div className="qf-error">{error}</div>}

      <div className="qf-nav">
        {safeIndex > 0 && (
          <button type="button" className="qf-back" onClick={() => setIndex(i => i - 1)}>
            ← Retour
          </button>
        )}

        <div className="qf-nav-right">
          {!isLast && (
            <button
              type="button"
              className={answered ? 'btn btn-primary qf-next' : 'qf-skip'}
              onClick={goNext}
              disabled={fetchingFollowUp}
            >
              {answered ? 'Suivant →' : 'Passer'}
            </button>
          )}

          {isLast && (
            <button type="submit" className="btn btn-primary qf-next" disabled={loading}>
              {loading ? '…' : submitLabel}
            </button>
          )}
        </div>
      </div>

      <p className="qf-foot">Rien n&apos;est obligatoire — chaque question peut être passée.</p>
    </form>
  );
}
