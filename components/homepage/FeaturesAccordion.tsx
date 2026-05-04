"use client";

import { useState } from 'react';
import { Check, SectionHead } from '../SharedComponents';

export function FeaturesAccordion() {
  const [open, setOpen] = useState(2);
  const features = [
    {
      icon: '🖥️',
      title: 'Dashboard App',
      items: ['Sidebar navigation unifiée', 'KPI cards temps réel', 'Activity feed live', 'Arrivées du jour', 'Dark + light mode'],
      link: '/dashboard-app',
    },
    {
      icon: '📡',
      title: 'Channel Manager',
      items: ['18 OTAs sync en temps réel', 'iCal 2-way sync', 'Anti-overbooking garanti', 'Reporting unifié', '99.97% uptime API'],
      link: '/channel-manager',
    },
    {
      icon: '💬',
      title: 'WhatsApp Bot AI',
      items: ['IA disponible 24/7 sur WhatsApp', '12 langues natives', 'Check-in autonome (QR + GPS)', 'Upsell intelligent contextuel', '87% résolu sans humain'],
      link: '/whatsapp',
    },
    {
      icon: '📈',
      title: 'Dynamic Pricing',
      items: ['47 signaux analysés par jour', 'Sync 18 OTAs simultanée', '+32% revenu net moyen', 'Calendar pricing temps réel', 'Audit pricing gratuit'],
      link: '/dynamic-pricing',
    },
    {
      icon: '👤',
      title: 'Owner Portal',
      items: ['App mobile native iOS/Android', 'Dashboard revenus temps réel', 'Statements PDF automatiques', 'Virements sous 48h', '12 langues traduites'],
      link: '/owner-portal',
    },
    {
      icon: '👥',
      title: 'TeamFlow (Staff Management)',
      items: [
        'Assignation auto selon disponibilité',
        'Notifications in-app + WhatsApp',
        'Photos check pré/post ménage',
        'Tracking temps réel',
        "KPIs par membre d'équipe",
      ],
      link: undefined,
    },
  ];

  return (
    <section style={{ padding: '110px 32px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <SectionHead
          badge="Fonctionnalités"
          title="Tout ce que vous attendez. Et tout ce que les autres n'ont pas."
          subtitle="Six modules natifs. Pensés pour fonctionner ensemble, jamais l'un sans l'autre."
        />
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="glass"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  borderColor: isOpen ? 'rgba(230,176,34,0.4)' : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '20px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    color: '#fff',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{f.title}</span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                      color: isOpen ? '#1a1408' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 28px 24px 68px', animation: 'fade-up 0.4s ease' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                      {f.items.map((it) => (
                        <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-2)' }}>
                          <Check />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    {f.link ? (
                      <a
                        href={f.link}
                        style={{
                          color: 'var(--primary)',
                          textDecoration: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          marginTop: 16,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 14px',
                          borderRadius: 7,
                          background: 'rgba(244,207,94,0.1)',
                          border: '1px solid rgba(244,207,94,0.3)',
                        }}
                      >
                        Découvrir cette page →
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-3)', fontSize: 13, fontWeight: 500, marginTop: 16, display: 'inline-block', fontStyle: 'italic' }}>
                        Page dédiée à venir
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
