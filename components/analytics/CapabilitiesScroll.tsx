"use client";

import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

interface Capability {
  i: string;
  t: string;
  d: string;
}

export function CapabilitiesScroll({ capabilities }: { capabilities: Capability[] }) {
  return (
    <ScrollPaginationDots itemCount={capabilities.length} gap={16} peekCarousel>
      {capabilities.map((c) => (
        <div key={c.t} data-carousel-slide className="card" style={{ padding: 22, flexShrink: 0 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
        </div>
      ))}
    </ScrollPaginationDots>
  );
}
