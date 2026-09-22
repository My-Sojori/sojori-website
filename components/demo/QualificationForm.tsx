'use client';

import { useState } from 'react';
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
 * Questionnaire de qualification — que des boutons, rien d'obligatoire.
 *
 * Le prospect a déjà réservé son créneau : tout ce qui coûte un effort ici se
 * paie en abandon. Une question d'entrée (hôtel ou location courte durée)
 * commande le reste du formulaire, parce que les deux métiers n'ont ni les
 * mêmes biens, ni les mêmes outils, ni les mêmes difficultés.
 *
 * Le champ libre ne réapparaît que derrière « Autre ».
 */

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
}

/** Un bouton-choix, seul ou multiple. */
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

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="qf-field">
      <div className="qf-label">{label}</div>
      {hint && <div className="qf-hint">{hint}</div>}
      <div className="qf-pills">{children}</div>
    </div>
  );
}

/** Groupe à choix unique, avec champ libre si « Autre ». */
function SingleChoice({
  label,
  hint,
  choices,
  value,
  onChange,
  otherValue,
  onOtherChange,
}: {
  label: string;
  hint?: string;
  choices: Choice[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      {choices.map(c => (
        <Pill
          key={c.value}
          label={c.label}
          selected={value === c.value}
          // Un second clic annule : on ne piège personne dans un choix.
          onClick={() => onChange(value === c.value ? '' : c.value)}
        />
      ))}
      {value === 'other' && onOtherChange && (
        <input
          type="text"
          className="qf-other"
          value={otherValue ?? ''}
          onChange={e => onOtherChange(e.target.value)}
          placeholder="Lequel ?"
          autoFocus
        />
      )}
    </Field>
  );
}

function MultiChoice({
  label,
  hint,
  choices,
  values,
  onToggle,
}: {
  label: string;
  hint?: string;
  choices: Choice[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <Field label={label} hint={hint}>
      {choices.map(c => (
        <Pill
          key={c.value}
          label={c.label}
          selected={values.includes(c.value)}
          onClick={() => onToggle(c.value)}
        />
      ))}
    </Field>
  );
}

export function QualificationForm({
  onSubmit,
  loading,
  error,
  submitLabel,
  skipLabel,
  onSkip,
}: {
  onSubmit: (payload: QualificationPayload) => void;
  loading?: boolean;
  error?: string;
  submitLabel: string;
  skipLabel?: string;
  onSkip?: () => void;
}) {
  const [segment, setSegment] = useState<Segment | ''>('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [size, setSize] = useState('');
  /**
   * La réponse qui commande la conversation commerciale : Sojori orchestre
   * au-dessus d'un PMS en place, ou fournit le socle. Ce n'est ni la même
   * offre ni la même démonstration.
   */
  const [hasPms, setHasPms] = useState('');
  const [pms, setPms] = useState('');
  const [pmsOther, setPmsOther] = useState('');
  const [cm, setCm] = useState('');
  const [cmOther, setCmOther] = useState('');
  const [pricing, setPricing] = useState('');
  const [pricingOther, setPricingOther] = useState('');
  const [timeline, setTimeline] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [expectations, setExpectations] = useState<string[]>([]);
  const [growth, setGrowth] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const cfg = segment ? SEGMENTS[segment] : null;

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  /** Le libellé retenu, ou la saisie libre derrière « Autre ». */
  const resolve = (choices: Choice[], value: string, other: string) =>
    value === 'other' ? other.trim() : value ? labelOf(choices, value) : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfg) return;

    const growthMap: Record<string, number> = { '0': 0, '1-5': 5, '6-15': 15, '15+': 20 };

    onSubmit({
      fullName: fullName.trim(),
      company: company.trim(),
      roleType: segment === 'hotel' ? 'hotel' : 'property-manager',
      propertyTypes: propertyTypes.map(v => labelOf(cfg.propertyTypes, v)),
      numberOfProperties: size ? labelOf(cfg.sizes, size) : '',
      currentPMS:
        hasPms === 'yes'
          ? resolve(cfg.pms, pms, pmsOther)
          : hasPms
            ? labelOf(HAS_PMS, hasPms)
            : '',
      currentChannelManager: resolve(cfg.channelManager, cm, cmOther),
      currentDynamicPricing: resolve(cfg.pricing, pricing, pricingOther),
      currentWhatsApp: '',
      timeline,
      biggestChallenges: labelsOf(cfg.challenges, challenges),
      expectations: labelsOf(cfg.expectations, expectations),
      newPropertiesNext12Months: growth ? (growthMap[growth] ?? 0) : 0,
      hearAboutUs,
      promoCode: promoCode.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="qf">
      {/* La question qui commande tout le reste */}
      <div className="qf-field">
        <div className="qf-label qf-label-lead">Vous gérez quoi&nbsp;?</div>
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
      </div>

      {cfg && (
        <>
          <div className="qf-sep" />

          <div className="qf-field">
            <div className="qf-label">Comment vous appelez-vous&nbsp;?</div>
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
          </div>

          <MultiChoice
            label={segment === 'hotel' ? 'Quel type d’établissement ?' : 'Quels types de biens ?'}
            choices={cfg.propertyTypes}
            values={propertyTypes}
            onToggle={v => toggle(propertyTypes, setPropertyTypes, v)}
          />

          <SingleChoice
            label={`Combien de ${cfg.unitLabel}s ?`}
            choices={cfg.sizes}
            value={size}
            onChange={setSize}
          />

          <div className="qf-sep" />

          <SingleChoice
            label={
              segment === 'hotel'
                ? 'Avez-vous un PMS aujourd’hui ?'
                : 'Avez-vous un logiciel de gestion aujourd’hui ?'
            }
            hint="Sojori s’y connecte, ou vous en fournit un. C’est la réponse qui change le plus la démonstration."
            choices={HAS_PMS}
            value={hasPms}
            onChange={v => {
              setHasPms(v);
              // Changer d'avis ne doit pas laisser traîner un éditeur choisi.
              if (v !== 'yes') {
                setPms('');
                setPmsOther('');
              }
            }}
          />

          {hasPms === 'yes' && (
            <SingleChoice
              label="Lequel ?"
              choices={cfg.pms}
              value={pms}
              onChange={setPms}
              otherValue={pmsOther}
              onOtherChange={setPmsOther}
            />
          )}

          <SingleChoice
            label="Et pour vos canaux de distribution ?"
            choices={cfg.channelManager}
            value={cm}
            onChange={setCm}
            otherValue={cmOther}
            onOtherChange={setCmOther}
          />

          <SingleChoice
            label="Comment fixez-vous vos prix ?"
            choices={cfg.pricing}
            value={pricing}
            onChange={setPricing}
            otherValue={pricingOther}
            onOtherChange={setPricingOther}
          />

          <div className="qf-sep" />

          <MultiChoice
            label="Qu’est-ce qui vous prend le plus de temps ?"
            hint="Plusieurs réponses possibles."
            choices={cfg.challenges}
            values={challenges}
            onToggle={v => toggle(challenges, setChallenges, v)}
          />

          <MultiChoice
            label="Qu’attendez-vous de Sojori ?"
            hint="Plusieurs réponses possibles."
            choices={cfg.expectations}
            values={expectations}
            onToggle={v => toggle(expectations, setExpectations, v)}
          />

          <SingleChoice
            label="Quand souhaitez-vous démarrer ?"
            choices={COMMON_TIMELINE}
            value={timeline}
            onChange={setTimeline}
          />

          {cfg.growth && (
            <SingleChoice
              label="Combien de biens en plus dans les douze mois ?"
              choices={cfg.growth}
              value={growth}
              onChange={setGrowth}
            />
          )}

          <div className="qf-sep" />

          <SingleChoice
            label="Comment nous avez-vous connus ?"
            choices={HEAR_ABOUT_US}
            value={hearAboutUs}
            onChange={setHearAboutUs}
          />

          <div className="qf-field">
            <div className="qf-label">Un code promo&nbsp;?</div>
            <input
              type="text"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              placeholder="Si vous en avez un"
              className="qf-input qf-input-narrow"
            />
          </div>

          {error && <div className="qf-error">{error}</div>}

          <div className="qf-actions">
            <button type="submit" className="btn btn-primary qf-submit" disabled={loading}>
              {loading ? '…' : submitLabel}
            </button>
            {onSkip && skipLabel && (
              <button type="button" onClick={onSkip} className="qf-skip">
                {skipLabel}
              </button>
            )}
          </div>

          <p className="qf-foot">
            Rien n&apos;est obligatoire. Ces réponses servent seulement à préparer la démonstration.
          </p>
        </>
      )}
    </form>
  );
}
