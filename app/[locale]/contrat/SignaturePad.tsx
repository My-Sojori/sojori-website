'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Le cadre où le client DESSINE sa signature, au doigt ou à la souris (C3 du contrat d'abonnement,
 * 28/10/2026) : le circuit de signature interne de Sojori, pas un service externe. Rend un PNG
 * (`data:image/png;base64,…`) que srv-crm vérifie (PNG réel, 150 Ko au plus) et grave dans le
 * contrat signé ; `null` tant que le cadre est vide.
 */
const LARGEUR = 600;
const HAUTEUR = 200;

export function SignaturePad({ onChange }: { onChange: (png: string | null) => void }) {
  const toile = useRef<HTMLCanvasElement | null>(null);
  const trace = useRef(false);
  const dessine = useRef(false);

  const contexte = () => {
    const c = toile.current?.getContext('2d');
    if (!c) return null;
    c.lineWidth = 2.4;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = '#1c1917';
    return c;
  };

  /** Le point du pointeur, dans le repère de la toile (elle est affichée plus petite sur mobile). */
  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * LARGEUR,
      y: ((e.clientY - r.top) / r.height) * HAUTEUR,
    };
  };

  const effacer = useCallback(() => {
    const c = toile.current?.getContext('2d');
    c?.clearRect(0, 0, LARGEUR, HAUTEUR);
    dessine.current = false;
    onChange(null);
  }, [onChange]);

  useEffect(() => {
    // Un fond blanc : un PNG transparent s'imprime mal sur certains lecteurs de PDF.
    const c = toile.current?.getContext('2d');
    if (c) {
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, LARGEUR, HAUTEUR);
    }
  }, []);

  return (
    <div>
      <canvas
        ref={toile}
        width={LARGEUR}
        height={HAUTEUR}
        aria-label="Cadre de signature"
        style={{
          width: '100%',
          maxWidth: LARGEUR,
          aspectRatio: `${LARGEUR} / ${HAUTEUR}`,
          border: '1px dashed #d6d3d1',
          borderRadius: 10,
          background: '#fff',
          touchAction: 'none',
          cursor: 'crosshair',
          display: 'block',
        }}
        onPointerDown={(e) => {
          const c = contexte();
          if (!c) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          trace.current = true;
          const p = point(e);
          c.beginPath();
          c.moveTo(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!trace.current) return;
          const c = contexte();
          if (!c) return;
          const p = point(e);
          c.lineTo(p.x, p.y);
          c.stroke();
          dessine.current = true;
        }}
        onPointerUp={() => {
          if (!trace.current) return;
          trace.current = false;
          if (dessine.current && toile.current) onChange(toile.current.toDataURL('image/png'));
        }}
        onPointerLeave={() => {
          if (!trace.current) return;
          trace.current = false;
          if (dessine.current && toile.current) onChange(toile.current.toDataURL('image/png'));
        }}
      />
      <button
        type="button"
        onClick={() => {
          effacer();
          const c = toile.current?.getContext('2d');
          if (c) {
            c.fillStyle = '#ffffff';
            c.fillRect(0, 0, LARGEUR, HAUTEUR);
          }
        }}
        style={{
          marginTop: 8,
          background: 'none',
          border: 'none',
          color: '#b8881a',
          fontWeight: 600,
          fontSize: 13.5,
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'inherit',
        }}
      >
        Effacer et recommencer
      </button>
    </div>
  );
}
