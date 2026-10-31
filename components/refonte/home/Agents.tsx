import { useTranslations } from 'next-intl';
import { Tabs } from '../Tabs';
import { GainNote, GainValue } from './Gains';

const IDS = ['booking', 'service', 'operations', 'pricing', 'assistant', 'studio', 'site', 'commercial', 'prospecting', 'marketingFinance', 'calls'] as const;
const STATUT: Record<string, 'available' | 'included'> = { studio: 'included' };
const HEURES: Record<string, 'guest' | 'field'> = { service: 'guest', operations: 'field' };

export function Agents() {
  const t = useTranslations('refonte.home.agents');
  const has = (k: string) => t.has(k as never);

  const panels = IDS.map((id) => {
    const p = `list.${id}`;
    const statut = t(`status.${STATUT[id] ?? 'available'}`);
    const points = t.raw(`${p}.points`) as string[];
    const talks = t.raw(`${p}.talks`) as string[];
    const valeur = HEURES[id]
      ? <GainValue k={`${p}.kpiValue`} kind={HEURES[id]} />
      : t(`${p}.kpiValue`);
    return (
      <article key={id} className="sj2-agent">
        <div className="sj2-agent__tete">
          <h3 className="sj2-agent__nom">{t(`${p}.name`)}</h3>
          <span className="sj2-pill sj2-pill--mono">{statut.toUpperCase()}</span>
        </div>
        <p className="sj2-agent__resume">{t(`${p}.resume`)}</p>
        <ul className="sj2-agent__points">
          {points.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="sj2-promesse">
          <div className="sj2-promesse__kpi">
            <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('labels.promise')}</span>
            <span className="sj2-promesse__v">{valeur}</span>
            <span className="sj2-promesse__t">{t(`${p}.kpiText`)}</span>
          </div>
          <p className="sj2-promesse__texte">{t(`${p}.promise`)}</p>
        </div>
        <div className="sj2-agent__bas">
          <div className="sj2-agent__chat">
            <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('labels.example')}</span>
            <span className="sj2-bubble sj2-bubble--q">{t(`${p}.q`)}</span>
            <span className="sj2-bubble sj2-bubble--r">{t(`${p}.r`)}</span>
          </div>
          <div className="sj2-agent__parle">
            <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('labels.talksTo')}</span>
            <div className="sj2-chips">{talks.map((w) => <span key={w} className="sj2-chip">{t(`labels.who.${w}`)}</span>)}</div>
            <p className="sj2-agent__note">{has(`${p}.note`) ? t(`${p}.note`) : t('defaultNote')}</p>
          </div>
        </div>
      </article>
    );
  });

  return (
    <section id="agents" className="sj2-section sj2-wrap" aria-labelledby="sj2-agents-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-agents-h" className="sj2-h2">{t('title')}</h2>
        <p className="sj2-lead">{t('lead')}</p>
      </div>
      <div className="sj2-kpis">
        <div className="sj2-kpi"><span className="sj2-kpi__v"><GainValue k="kpi.valueHours" kind="guest" /></span><span className="sj2-kpi__t">{t('kpi.guest')}</span></div>
        <div className="sj2-kpi"><span className="sj2-kpi__v"><GainValue k="kpi.valueHours" kind="field" /></span><span className="sj2-kpi__t">{t('kpi.field')}</span></div>
        <div className="sj2-kpi"><span className="sj2-kpi__v">{t('kpi.valueFast')}</span><span className="sj2-kpi__t">{t('kpi.fast')}</span></div>
        <div className="sj2-kpi"><span className="sj2-kpi__v">{t('kpi.valueShare')}</span><span className="sj2-kpi__t">{t('kpi.share')}</span></div>
      </div>
      <p className="sj2-kpis__note"><GainNote /></p>
      <Tabs
        label={t('chooseAria')}
        items={IDS.map((id) => ({ id, title: t(`list.${id}.name`), sub: t(`status.${STATUT[id] ?? 'available'}`) }))}
        panels={panels}
      />
    </section>
  );
}
