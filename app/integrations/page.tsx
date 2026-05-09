"use client";

import { Metadata } from 'next';
import { useState } from 'react';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

interface Category {
  id: string;
  l: string;
  n: number;
  c?: string;
}

interface Integration {
  n: string;
  cat: string;
  s: string;
  logo: string;
  color: string;
  popular?: boolean;
}

const CATEGORIES: Category[] = [
  { id: 'all', l: 'Toutes', n: 17 },
  { id: 'core', l: 'Intégrations natives', n: 6, c: '#f4cf5e' },
  { id: 'msg', l: 'Messagerie', n: 3, c: '#25D366' },
  { id: 'pay', l: 'Paiements', n: 1, c: '#10b981' },
  { id: 'data', l: 'Automation & API', n: 3, c: '#8b5cf6' },
  { id: 'ai', l: 'IA & Analytics', n: 4, c: '#ec4899' },
];

const INTEGRATIONS: Integration[] = [
  // Intégrations natives (vraies)
  { n: 'Rentals United', cat: 'core', s: 'Channel distribution', logo: 'R', color: '#6c5ce7', popular: true },
  { n: 'Channex', cat: 'core', s: 'Channel Manager API', logo: 'C', color: '#0052cc', popular: true },
  { n: 'Minut', cat: 'core', s: 'Noise & occupancy sensors', logo: 'M', color: '#00c9a7', popular: true },
  { n: 'Chekin', cat: 'core', s: 'Online check-in', logo: 'C', color: '#0ea5e9', popular: true },
  { n: 'TTLock', cat: 'core', s: 'Smart locks & codes', logo: 'T', color: '#ff6b35', popular: true },
  { n: 'Hostaway', cat: 'core', s: 'PMS integration', logo: 'H', color: '#4a90e2' },

  // Messagerie
  { n: 'WhatsApp Business', cat: 'msg', s: 'Channel + Bot IA', logo: 'W', color: '#25D366', popular: true },
  { n: 'SMS / Twilio', cat: 'msg', s: 'SMS automatiques', logo: 'T', color: '#F22F46' },
  { n: 'Email', cat: 'msg', s: 'Email transactionnel', logo: '✉', color: '#6366f1' },

  // Paiements
  { n: 'Stripe', cat: 'pay', s: 'Paiements en ligne', logo: 'S', color: '#635BFF', popular: true },

  // Automation & API
  { n: 'Zapier', cat: 'data', s: '5000+ apps no-code', logo: 'Z', color: '#FF4A00', popular: true },
  { n: 'Make.com', cat: 'data', s: 'Automation avancée', logo: 'M', color: '#6D00CC' },
  { n: 'REST API', cat: 'data', s: 'API complète', logo: '{}', color: '#8b5cf6', popular: true },

  // IA & Analytics
  { n: 'OpenAI GPT-4', cat: 'ai', s: 'Chatbot multilingue', logo: '🤖', color: '#10a37f', popular: true },
  { n: 'Anthropic Claude', cat: 'ai', s: 'IA conversationnelle', logo: 'C', color: '#D97757', popular: true },
  { n: 'Google Gemini', cat: 'ai', s: 'IA multimodale', logo: 'G', color: '#4285F4' },
  { n: 'Google Analytics', cat: 'ai', s: 'Web analytics', logo: 'G', color: '#4285F4' },
];

interface CardProps {
  i: Integration;
}

function Card({ i }: CardProps) {
  return (
    <div className="card" style={{ padding: 18, position: 'relative' }}>
      {i.popular && (
        <div style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: 9,
          padding: '2px 6px',
          background: 'rgba(244,207,94,0.18)',
          color: '#f4cf5e',
          borderRadius: 4,
          fontWeight: 700,
          letterSpacing: 0.5
        }}>
          ★ POPULAIRE
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: i.color,
          color: '#fff',
          fontSize: 18,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {i.logo}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text-1)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {i.n}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{i.s}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, fontSize: 10, color: 'var(--text-3)' }}>
        <span style={{ color: '#10b981' }}>● Connecté</span>
        <span>·</span>
        <span style={{ fontFamily: 'Geist Mono' }}>2-click setup</span>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.cat === cat);

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Integrations" />
        <PageHero
          badge="🔌 API-first · Extensible à l'infini"
          title={<>Sojori s'intègre<br />à <span className="gradient-text">votre écosystème.</span></>}
          subtitle="Intégrations natives avec Rentals United, Minut, Chekin, TTLock, Hostaway. Connectez le reste via API REST, Webhooks ou Zapier (5000+ apps). Pas de vendor lock-in."
          cta1="Voir l'API"
          cta2="Demander une intégration"
        />

        <section style={{ padding: '20px 32px 40px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: cat === c.id ? 'rgba(244,207,94,0.14)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid',
                    borderColor: cat === c.id ? 'rgba(244,207,94,0.4)' : 'var(--glass-border)',
                    color: cat === c.id ? '#f4cf5e' : 'var(--text-2)',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  {c.c && <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.c }}></span>}
                  {c.l} <span style={{ opacity: 0.6, fontFamily: 'Geist Mono', fontSize: 10 }}>{c.n}</span>
                </button>
              ))}
            </div>
            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {list.map(i => <Card key={i.n} i={i} />)}
            </div>
          </div>
        </section>

        {/* API CTA */}
        <section style={{ padding: '70px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 50,
            alignItems: 'center'
          }}>
            <div>
              <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
                ● API & Webhooks
              </div>
              <h2 style={{ fontSize: 36, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Pas dans la liste ? <span className="gradient-text">Construisez-le.</span>
              </h2>
              <p style={{ color: 'var(--text-3)', lineHeight: 1.7, fontSize: 15, marginBottom: 24 }}>
                API REST documentée, OAuth 2.0, webhooks sur 40+ événements, SDK Node/Python. Et si vous préférez no-code : Zapier et Make.com.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="#" className="btn btn-primary">Lire les docs API →</a>
                <a href="#" className="btn btn-ghost">Voir Zapier</a>
              </div>
            </div>
            <div style={{
              background: '#0a0a10',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              overflow: 'hidden',
              fontFamily: 'Geist Mono',
              fontSize: 12
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '8px 14px',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                gap: 6,
                alignItems: 'center'
              }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ marginLeft: 10, color: 'var(--text-3)', fontSize: 11 }}>POST /v1/bookings</span>
              </div>
              <pre style={{ padding: 18, margin: 0, color: 'var(--text-2)', lineHeight: 1.6 }}>
{`curl -X POST \\
  https://api.sojori.com/v1/bookings \\
  -H "Authorization: Bearer $KEY" \\
  -d '{
    "property_id": "villa-belvedere",
    "guest": { "email": "..." },
    "check_in": "2025-04-12",
    "nights": 3
  }'

`}<span style={{ color: '#10b981' }}>{`# → 201 Created`}</span>{`
{
  "id": "bk_8xQ2mP",
  "status": "confirmed",
  "auto_actions": ["welcome_msg", "key_code"]
}`}
              </pre>
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: '3', l: 'intégrations natives' },
          { k: 'API-first', l: 'architecture ouverte' },
          { k: '40+', l: 'webhooks events' },
          { k: '5000+', l: 'apps via Zapier' }
        ]} />

        <FinalCTA
          title={<>Connectez votre stack. <span className="gradient-text">En 5 minutes.</span></>}
          subtitle="OTA, paiements, serrures — branchez tout, configurez une fois, oubliez."
        />

        <PageFooter />
      </div>
    </>
  );
}
