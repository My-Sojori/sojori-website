"use client";

import { useId } from 'react';

export function SojoriMark({ size = 36 }: { size?: number }) {
  const id = useId();

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4cf5e" />
          <stop offset="50%" stopColor="#e6b022" />
          <stop offset="100%" stopColor="#b8881a" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="17" stroke={`url(#${id})`} strokeWidth="2" fill="none" strokeDasharray="3 4" opacity="0.5" />
      <circle cx="20" cy="20" r="11" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M 12 26 Q 20 26 20 20 Q 20 14 28 14" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="20" r="2.5" fill="#f4cf5e" />
    </svg>
  );
}

export function SojoriLogo({ size = 36, withWordmark = true, color }: { size?: number; withWordmark?: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <SojoriMark size={size} />
      {withWordmark && (
        <span style={{ fontWeight: 800, fontSize: size * 0.55, letterSpacing: '-0.03em', color }}>
          sojori
        </span>
      )}
    </div>
  );
}
