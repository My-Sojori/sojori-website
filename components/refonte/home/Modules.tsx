import { useTranslations } from 'next-intl';
import { SojoriMark } from '@/components/Logo';
import { Tabs } from '../Tabs';
import { RapportBulle } from '../RapportAdmin';

const IDS = ['checkin', 'stay', 'concierge', 'staff', 'admin', 'owner'] as const;
const POUR: Record<string, 'traveler' | 'staff' | 'admin' | 'owner'> = { checkin: 'traveler', stay: 'traveler', concierge: 'traveler', staff: 'staff', admin: 'admin', owner: 'owner' };

export function Modules() {
  const t = useTranslations('refonte.home.modules');
  const panels = IDS.map((id) => {
    const p = `list.${id}`;
    const points = t.raw(`${p}.points`) as string[];
    const agents = t.raw(`${p}.agents`) as string[];
    const chat = t.raw(`${p}.chat`) as { from: 'sojori' | 'guest'; text: string }[];
    return (
      <article key={id} className="sj2-module">
        <div className="sj2-module__texte">
          <span className="sj2-eyebrow sj2-eyebrow--sm">{t(`for.${POUR[id]}`)}</span>
          <h3 className="sj2-agent__nom">{t(`${p}.name`)}</h3>
          <p className="sj2-agent__resume">{t(`${p}.resume`)}</p>
          <ul className="sj2-coches">
            {points.map((x) => <li key={x}><span aria-hidden="true" className="sj2-coche">✓</span><span>{x}</span></li>)}
          </ul>
          <div className="sj2-chips">
            <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('wiredTo')}</span>
            {agents.map((a) => <span key={a} className="sj2-pill">{a}</span>)}
          </div>
        </div>
        <figure className={`sj2-phone${id === 'admin' ? ' sj2-phone--court' : ''}`} aria-label={t('chatAria')}>
          <div className="sj2-phone__tete">
            <span className="sj2-phone__avatar"><SojoriMark size={20} /></span>
            <span className="sj2-phone__nom"><strong>{t('brand')}</strong><span>{t(`${p}.status`)}</span></span>
          </div>
          <div className="sj2-phone__fil">
            {id === 'admin' && <RapportBulle theme="night" variant="court" />}
            {chat.map((b, k) => <span key={k} className={`sj2-bubble sj2-bubble--${b.from === 'sojori' ? 'q' : 'r'}`}>{b.text}</span>)}
          </div>
        </figure>
      </article>
    );
  });

  return (
    <section id="whatsapp" className="sj2-section sj2-wrap" aria-labelledby="sj2-modules-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-modules-h" className="sj2-h2">{t('title')}</h2>
        <p className="sj2-lead">{t('lead')}</p>
      </div>
      <Tabs
        className="sj2-tabs--modules"
        label={t('chooseAria')}
        items={IDS.map((id) => ({ id, title: t(`list.${id}.name`), sub: t(`for.${POUR[id]}`) }))}
        panels={panels}
      />
      <p className="sj2-modules__note">{t('note')}</p>
    </section>
  );
}
