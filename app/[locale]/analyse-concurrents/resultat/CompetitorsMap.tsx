'use client';

import { useMemo, useState } from 'react';

/**
 * Carte de positionnement des concurrents — rendu SVG léger (pas de Leaflet/clé API,
 * critique sur mobile 97% du trafic). Projette lat/lng en repère local centré sur
 * le bien du client (approximation plane valable à l'échelle d'un quartier).
 * Couleur du pin = performance (revenu 12 mois) ; taille = ADR.
 */

type Pin = {
  id: string;
  name: string | null;
  lat: number | null | undefined;
  lng: number | null | undefined;
  adrMad: number | null;
  occupancy: number | null;
  revenueTtmMad?: number | null;
  distanceMeters?: number | null;
  isYou?: boolean;
};

const GOLD = '#e6b022';

function perfColor(rank: number, total: number): string {
  // rank 0 = meilleur revenu → dégradé vert(fort) → rouge(faible)
  if (total <= 1) return GOLD;
  const t = rank / (total - 1); // 0..1
  const hue = 145 - t * 145; // 145 (vert) → 0 (rouge)
  return `hsl(${Math.round(hue)}, 62%, 52%)`;
}

export function CompetitorsMap({
  you,
  competitors,
}: {
  you: Pin;
  competitors: Pin[];
}) {
  const [hover, setHover] = useState<string | null>(null);

  const geo = useMemo(() => {
    const yLat = you.lat;
    const yLng = you.lng;
    if (yLat == null || yLng == null) return null;

    const pts = competitors
      .filter((c) => c.lat != null && c.lng != null)
      .map((c) => {
        // projection plane locale (mètres relatifs au bien)
        const dLatM = ((c.lat as number) - yLat) * 111_320;
        const dLngM = ((c.lng as number) - yLng) * 111_320 * Math.cos((yLat * Math.PI) / 180);
        return { ...c, x: dLngM, y: -dLatM }; // y inversé (nord vers le haut)
      });
    if (!pts.length) return null;

    const maxAbs = Math.max(
      500,
      ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))),
    );

    // classement performance (revenu) pour la couleur
    const byRevenue = [...pts].sort(
      (a, b) => (b.revenueTtmMad ?? 0) - (a.revenueTtmMad ?? 0),
    );
    const rankOf = new Map(byRevenue.map((p, i) => [p.id, i]));

    return { pts, maxAbs, rankOf, total: pts.length };
  }, [you, competitors]);

  if (!geo) return null;

  const SIZE = 340;
  const R = SIZE / 2;
  const scale = (R - 30) / geo.maxAbs;

  // anneaux de distance (en mètres) proportionnels
  const rings = [0.25, 0.5, 0.75, 1].map((f) => ({
    r: (R - 30) * f,
    label: `${Math.round((geo.maxAbs * f) / 100) / 10} km`,
  }));

  const hovered = hover ? geo.pts.find((p) => p.id === hover) : null;

  return (
    <div style={{ marginTop: 26 }}>
      <h2 style={{ fontSize: 18, marginBottom: 6 }}>Carte · positionnement</h2>
      <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 14 }}>
        Votre bien au centre · couleur = performance (revenu) · taille = prix moyen
      </p>
      <div
        className="glass"
        style={{
          borderRadius: 14,
          padding: 16,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          style={{ maxWidth: 380, aspectRatio: '1', touchAction: 'none' }}
        >
          {/* anneaux */}
          {rings.map((ring, i) => (
            <g key={i}>
              <circle
                cx={R}
                cy={R}
                r={ring.r}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
              <text
                x={R + 4}
                y={R - ring.r + 12}
                fontSize={9}
                fill="rgba(255,255,255,0.35)"
                fontFamily="monospace"
              >
                {ring.label}
              </text>
            </g>
          ))}

          {/* concurrents */}
          {geo.pts.map((p) => {
            const cx = R + p.x * scale;
            const cy = R + p.y * scale;
            const rank = geo.rankOf.get(p.id) ?? 0;
            const color = perfColor(rank, geo.total);
            const adr = p.adrMad ?? 0;
            const size = Math.max(5, Math.min(12, 5 + adr / 400));
            const isHover = hover === p.id;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHover ? size + 3 : size}
                  fill={color}
                  stroke="#0b0b10"
                  strokeWidth={1.5}
                  opacity={hover && !isHover ? 0.45 : 0.95}
                />
              </g>
            );
          })}

          {/* votre bien — étoile dorée au centre */}
          <g>
            <circle cx={R} cy={R} r={13} fill={GOLD} opacity={0.25} />
            <text
              x={R}
              y={R + 7}
              textAnchor="middle"
              fontSize={20}
              fill={GOLD}
              style={{ filter: 'drop-shadow(0 0 4px rgba(230,176,34,0.8))' }}
            >
              ★
            </text>
          </g>
        </svg>

        {/* légende / infobulle */}
        <div style={{ minWidth: 180, flex: '1 1 180px', fontSize: 13 }}>
          {hovered ? (
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {hovered.name || 'Concurrent'}
              </div>
              <div style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                {hovered.adrMad != null && <>Prix moyen : <b>{hovered.adrMad.toLocaleString('fr-FR')} MAD</b><br /></>}
                {hovered.occupancy != null && <>Occupation : <b>{Math.round(hovered.occupancy * 100)}%</b><br /></>}
                {hovered.revenueTtmMad != null && <>Revenu 12 m : <b>{hovered.revenueTtmMad.toLocaleString('fr-FR')} MAD</b><br /></>}
                {hovered.distanceMeters != null && (
                  <>Distance : <b>{hovered.distanceMeters < 1000 ? `${Math.round(hovered.distanceMeters)} m` : `${(hovered.distanceMeters / 1000).toFixed(1)} km`}</b></>
                )}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-3)', lineHeight: 1.7 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: GOLD }}>★</span> Votre bien
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: 'hsl(145,62%,52%)', display: 'inline-block' }} />
                Meilleure performance
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: 'hsl(0,62%,52%)', display: 'inline-block' }} />
                Performance plus faible
              </div>
              <div style={{ marginTop: 10, fontSize: 12 }}>Survolez un point pour le détail.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
