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
  { id: 'all', l: 'Toutes', n: 64 },
  { id: 'ota', l: 'OTA & Channels', n: 14, c: '#FF5A5F' },
  { id: 'pay', l: 'Paiements', n: 8, c: '#10b981' },
  { id: 'msg', l: 'Messagerie', n: 6, c: '#25D366' },
  { id: 'lock', l: 'Serrures', n: 9, c: '#a78bfa' },
  { id: 'clean', l: 'Ménage', n: 5, c: '#06b6d4' },
  { id: 'acct', l: 'Compta', n: 7, c: '#f59e0b' },
  { id: 'mkt', l: 'Marketing', n: 6, c: '#ec4899' },
  { id: 'data', l: 'Data & API', n: 9, c: '#8b5cf6' },
];

const INTEGRATIONS: Integration[] = [
  // OTA
  { n: 'Airbnb', cat: 'ota', s: 'Sync 2-way', logo: 'A', color: '#FF5A5F', popular: true },
  { n: 'Booking.com', cat: 'ota', s: 'Sync 2-way', logo: 'B', color: '#003580', popular: true },
  { n: 'Vrbo / Expedia', cat: 'ota', s: 'Sync 2-way', logo: 'V', color: '#0066cc', popular: true },
  { n: 'Google VR', cat: 'ota', s: 'Distribution', logo: 'G', color: '#4285F4' },
  { n: 'Hostelworld', cat: 'ota', s: 'Sync', logo: 'H', color: '#FFB400' },
  { n: 'Agoda', cat: 'ota', s: 'Sync', logo: 'A', color: '#FF9900' },
  { n: 'Trip.com', cat: 'ota', s: 'Sync', logo: 'T', color: '#287dfa' },
  { n: 'HomeToGo', cat: 'ota', s: 'Distribution', logo: 'H', color: '#5b6cf2' },

  // Paiements
  { n: 'Stripe', cat: 'pay', s: 'Paiements & payouts', logo: 'S', color: '#635BFF', popular: true },
  { n: 'Adyen', cat: 'pay', s: 'Paiements enterprise', logo: 'A', color: '#0abf53' },
  { n: 'PayPal', cat: 'pay', s: 'Paiements', logo: 'P', color: '#003087' },
  { n: 'Lyf Pay', cat: 'pay', s: 'Paiements MA', logo: 'L', color: '#e22d58' },
  { n: 'CMI', cat: 'pay', s: 'Cartes locales MA', logo: 'C', color: '#0a47a4' },

  // Messagerie
  { n: 'WhatsApp Business', cat: 'msg', s: 'Channel + Bot', logo: 'W', color: '#25D366', popular: true },
  { n: 'Instagram DM', cat: 'msg', s: 'Channel', logo: 'I', color: '#E1306C' },
  { n: 'Messenger', cat: 'msg', s: 'Channel', logo: 'M', color: '#0084FF' },
  { n: 'Telegram', cat: 'msg', s: 'Channel', logo: 'T', color: '#0088cc' },
  { n: 'SMS / Twilio', cat: 'msg', s: 'SMS auto', logo: 'T', color: '#F22F46' },

  // Serrures
  { n: 'Igloohome', cat: 'lock', s: 'Codes auto', logo: 'I', color: '#0066ff', popular: true },
  { n: 'Nuki', cat: 'lock', s: 'Smart lock', logo: 'N', color: '#33CCBE' },
  { n: 'August', cat: 'lock', s: 'Smart lock', logo: 'A', color: '#3498db' },
  { n: 'TTLock', cat: 'lock', s: 'Codes temps', logo: 'T', color: '#ff6b35' },
  { n: 'KeyNest', cat: 'lock', s: 'Dépôt clés', logo: 'K', color: '#1e3a8a' },

  // Ménage
  { n: 'Properly', cat: 'clean', s: 'Checklists ménage', logo: 'P', color: '#0ea5e9' },
  { n: 'Breezeway', cat: 'clean', s: 'Operations', logo: 'B', color: '#16a34a' },
  { n: 'TurnoverBnB', cat: 'clean', s: 'Marketplace ménage', logo: 'T', color: '#06b6d4' },

  // Compta
  { n: 'QuickBooks', cat: 'acct', s: 'Compta auto', logo: 'Q', color: '#2CA01C' },
  { n: 'Xero', cat: 'acct', s: 'Compta auto', logo: 'X', color: '#13B5EA' },
  { n: 'Pennylane', cat: 'acct', s: 'Compta FR', logo: 'P', color: '#5046E5' },
  { n: 'Sage', cat: 'acct', s: 'Compta', logo: 'S', color: '#00DC00' },

  // Marketing
  { n: 'Mailchimp', cat: 'mkt', s: 'Email marketing', logo: 'M', color: '#FFE01B' },
  { n: 'Klaviyo', cat: 'mkt', s: 'CRM email', logo: 'K', color: '#000' },
  { n: 'Sojern', cat: 'mkt', s: 'Display ads', logo: 'S', color: '#FF6B00' },
  { n: 'Google Ads', cat: 'mkt', s: 'SEM', logo: 'G', color: '#4285F4' },

  // Data
  { n: 'Zapier', cat: 'data', s: '5000+ apps', logo: 'Z', color: '#FF4A00', popular: true },
  { n: 'Make.com', cat: 'data', s: 'Automation', logo: 'M', color: '#6D00CC' },
  { n: 'Webhooks', cat: 'data', s: 'Custom triggers', logo: '⚡', color: '#f4cf5e' },
  { n: 'REST API', cat: 'data', s: 'Full access', logo: '{}', color: '#8b5cf6' },
  { n: 'Looker Studio', cat: 'data', s: 'BI', logo: 'L', color: '#4285F4' },
  { n: 'Slack', cat: 'data', s: 'Notifs équipe', logo: 'S', color: '#4A154B' },
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
          badge="🔌 60+ intégrations · OAuth en 2 clics"
          title={<>Sojori se connecte<br />à <span className="gradient-text">votre stack.</span></>}
          subtitle="OTA, paiements, serrures, ménage, compta, marketing, data. OAuth sécurisé, pas de code à écrire. Si ce n'est pas dans la liste, on a une API et un Zapier."
          cta1="Voir tous les connecteurs"
          cta2="Demander un connecteur"
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
    "property_id": "riad-elfenn",
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
          { k: '60+', l: 'intégrations natives' },
          { k: '2 clics', l: 'OAuth setup' },
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
