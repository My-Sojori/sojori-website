import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';

/**
 * Bloc « dans le flux » — replace une brique dans l'orchestration.
 *
 * 2026-09-12 : les 11 pages produit se lisaient comme des fiches de
 * modules indépendants, et le mot « orchestration » n'apparaissait sur
 * aucune. Un visiteur arrivant sur /teamflow voyait un outil de gestion
 * d'équipe — pas ce que l'orchestration déclenche quand un départ est
 * constaté. Ce bloc dit, en trois temps, ce qui précède la brique, ce
 * qu'elle fait, et ce qu'elle déclenche ensuite.
 *
 * C'est ce qui fait passer le site d'un catalogue à un moteur, et chaque
 * occurrence renvoie vers la page pilier /orchestration.
 */
export type FlowStep = { label: string; href?: string };

export function InFlow({
  domain,
  domainColor = '#e6b022',
  upstream,
  self,
  downstream,
}: {
  /** Le domaine orchestré auquel la brique appartient. */
  domain: string;
  domainColor?: string;
  /** Ce qui déclenche cette brique. */
  upstream: FlowStep[];
  /** Ce que fait la brique, en une phrase. */
  self: string;
  /** Ce que la brique déclenche à son tour. */
  downstream: FlowStep[];
}): ReactNode {
  const chip = (s: FlowStep, key: string) => {
    const inner = (
      <span
        style={{
          display: 'inline-block',
          fontSize: 13,
          padding: '5px 12px',
          borderRadius: 999,
          border: '1px solid var(--glass-border)',
          background: 'var(--bg)',
          color: s.href ? '#f4cf5e' : 'var(--text-3)',
          fontWeight: s.href ? 600 : 400,
          whiteSpace: 'nowrap',
        }}
      >
        {s.label}
      </span>
    );
    return s.href ? (
      <Link key={key} href={{ pathname: s.href as never, query: { source: 'in-flow' } }} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    ) : (
      <span key={key}>{inner}</span>
    );
  };

  return (
    <section style={{ padding: '36px 32px 44px', borderTop: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>
          ● Dans l&apos;orchestration
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: domainColor,
              border: `1px solid ${domainColor}55`,
              borderRadius: 6,
              padding: '3px 9px',
            }}
          >
            {domain}
          </span>
          <span style={{ fontSize: 15, color: 'var(--text-2)' }}>{self}</span>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', minWidth: 118, textTransform: 'uppercase', letterSpacing: 0.6 }}>
              Déclenché par
            </span>
            {upstream.map((s, i) => chip(s, `u${i}`))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', minWidth: 118, textTransform: 'uppercase', letterSpacing: 0.6 }}>
              Déclenche
            </span>
            {downstream.map((s, i) => chip(s, `d${i}`))}
          </div>
        </div>

        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 18, lineHeight: 1.65 }}>
          Cette brique n&apos;est pas un outil à piloter séparément : elle réagit aux
          événements réels du séjour.{' '}
          <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>
            Comprendre l&apos;orchestration →
          </Link>
        </p>
      </div>
    </section>
  );
}
