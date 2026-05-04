import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export const metadata: Metadata = {
  title: 'Sojori — Security & Compliance',
  description: 'Sécurité et conformité RGPD. Encryption, SOC 2, ISO 27001, hébergement européen, audits réguliers.',
};

interface Cert {
  l: string;
  s: string;
  c: string;
  d: string;
}

interface SectionItem {
  l: string;
  d: string;
}

interface Section {
  id: string;
  icon: string;
  t: string;
  items: SectionItem[];
}

interface Layer {
  l: string;
  s: string;
  items: string[];
}

const CERTS: Cert[] = [
  { l: 'RGPD', s: 'EU-conforme', c: '#003399', d: 'Hébergement EU, DPO désigné' },
  { l: 'SOC 2', s: 'Type II', c: '#0066cc', d: 'Audit annuel indépendant' },
  { l: 'ISO 27001', s: 'En cours', c: '#2563eb', d: 'Certification 2026' },
  { l: 'PCI DSS', s: 'Stripe-relayé', c: '#635BFF', d: 'Aucune carte stockée' },
  { l: 'PSD2 / SCA', s: 'Conforme', c: '#10b981', d: 'Strong Customer Auth' },
  { l: 'CNIL', s: 'Déclaré', c: '#ef4444', d: 'France · 2024' },
];

const SECTIONS: Section[] = [
  {
    id: 'data',
    icon: '🔐',
    t: 'Données chiffrées',
    items: [
      { l: 'TLS 1.3 en transit', d: 'Toutes les communications client/serveur' },
      { l: 'AES-256 au repos', d: 'Base de données + backups' },
      { l: 'Hébergement Frankfurt', d: 'AWS eu-central-1, données EU exclusivement' },
      { l: 'Backups journaliers', d: 'Rétention 30 jours, restauration <4h' },
    ]
  },
  {
    id: 'access',
    icon: '🔑',
    t: "Accès & authentification",
    items: [
      { l: 'SSO SAML / OIDC', d: 'Plan Scale · Okta, Google Workspace, Azure AD' },
      { l: '2FA obligatoire', d: 'TOTP ou WebAuthn pour admins' },
      { l: 'Rôles granulaires', d: 'Owner, Manager, Staff, Cleaner, Read-only' },
      { l: 'Audit log immuable', d: 'Toutes les actions tracées 12 mois' },
    ]
  },
  {
    id: 'rgpd',
    icon: '🇪🇺',
    t: 'RGPD voyageurs',
    items: [
      { l: 'Consentement explicite', d: 'Collecte minimale, opt-in clair' },
      { l: "Droit à l'oubli", d: 'Suppression voyageur en 1 clic, propagée OTA' },
      { l: 'Export données', d: 'JSON ou PDF sur demande, sous 72h' },
      { l: 'DPA signable', d: 'Data Processing Agreement standard' },
    ]
  },
  {
    id: 'travel',
    icon: '🧳',
    t: 'Compliance hébergement',
    items: [
      { l: 'Taxe de séjour auto', d: 'Calculée par ville, déclarée auto MA/FR/PT' },
      { l: 'Registre voyageurs', d: 'Police FR (cerfa), e-Arrival PT' },
      { l: 'Vérification ID', d: 'KYC voyageur optionnel via Onfido' },
      { l: 'Caution gérée', d: 'Pré-autorisation Stripe, libération auto' },
    ]
  },
];

interface PillProps {
  c: string;
  t: Cert;
}

function Pill({ c, t }: PillProps) {
  return (
    <div style={{
      padding: '20px 18px',
      borderRadius: 14,
      textAlign: 'center',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--glass-border)',
      borderTop: `3px solid ${c}`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{t.l}</div>
      <div style={{
        fontSize: 11,
        color: c,
        fontWeight: 700,
        marginTop: 4,
        letterSpacing: 0.5,
        fontFamily: 'Geist Mono'
      }}>
        {t.s}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 8, lineHeight: 1.5 }}>{t.d}</div>
    </div>
  );
}

export default function SecurityPage() {
  const layers: Layer[] = [
    { l: 'Edge', s: '#06b6d4', items: ['Cloudflare WAF', 'DDoS protection', 'Rate limiting per IP'] },
    { l: 'Application', s: '#f59e0b', items: ['OAuth 2.0 + 2FA', 'CSP strict, CSRF tokens', 'Validation input · OWASP top 10'] },
    { l: 'Data', s: '#10b981', items: ['AES-256 au repos', 'TLS 1.3 en transit', 'Secrets · AWS KMS · rotation 90j'] },
    { l: 'Infrastructure', s: '#a78bfa', items: ['AWS Frankfurt EU', "VPC privé · pas d'IP publique", 'Backups chiffrés · Glacier 7 ans'] },
  ];

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Security & Compliance" />
        <PageHero
          badge="🛡️ Sécurité · RGPD · Compliance"
          title={<>Vos données. <span className="gradient-text">Sous clé.</span><br />Vos voyageurs. En conformité.</>}
          subtitle="Hébergement EU, chiffrement AES-256, audit log, RGPD natif. Taxe de séjour, registres voyageurs, déclarations police — automatisés FR/MA/PT."
          cta1="Télécharger DPA"
          cta2="Voir audit SOC 2"
        />

        {/* Certifs grid */}
        <section style={{ padding: '20px 32px 60px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 24 }}>
              ● Certifications & conformité
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {CERTS.map(c => <Pill key={c.l} t={c} c={c.c} />)}
            </div>
          </div>
        </section>

        {/* 4 sections */}
        <section style={{ padding: '40px 32px' }}>
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 22
          }}>
            {SECTIONS.map(s => (
              <div key={s.id} className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.t}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {s.items.map(it => (
                    <div key={it.l} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', flexShrink: 0, fontSize: 16, marginTop: -2 }}>✓</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>{it.l}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.5 }}>{it.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture diagram */}
        <section style={{ padding: '70px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>
              ● Infrastructure
            </div>
            <h2 style={{ textAlign: 'center', fontSize: 36, marginBottom: 40 }}>
              Architecture <span className="gradient-text">défense en profondeur</span>
            </h2>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: 16,
              padding: 32
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {layers.map(layer => (
                  <div
                    key={layer.l}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr',
                      gap: 24,
                      alignItems: 'center',
                      padding: '14px 0',
                      borderBottom: '1px dashed rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: layer.s,
                        boxShadow: `0 0 10px ${layer.s}`
                      }}></span>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: 'Geist Mono',
                        letterSpacing: 0.5
                      }}>
                        {layer.l}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {layer.items.map(i => (
                        <span
                          key={i}
                          style={{
                            padding: '5px 11px',
                            fontSize: 12,
                            color: 'var(--text-2)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 6
                          }}
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Disclosure */}
        <section style={{ padding: '60px 32px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
              ● Responsible disclosure
            </div>
            <h2 style={{ fontSize: 32, marginBottom: 14 }}>
              Vous trouvez une faille ? <span className="gradient-text">Parlons-en.</span>
            </h2>
            <p style={{ color: 'var(--text-3)', fontSize: 14, lineHeight: 1.7, marginBottom: 22 }}>
              Notre programme bug bounty récompense les chercheurs en sécurité. Réponse sous 24h, fix sous 7 jours pour les critiques.
            </p>
            <a href="mailto:security@sojori.com" className="btn btn-primary">security@sojori.com</a>
          </div>
        </section>

        <StatsBar stats={[
          { k: 'AES-256', l: 'chiffrement' },
          { k: 'EU only', l: 'hébergement' },
          { k: '99.95%', l: 'uptime SLA' },
          { k: '<4h', l: 'restauration backup' }
        ]} />

        <FinalCTA
          title={<>Sécurité de niveau <span className="gradient-text">enterprise.</span></>}
          subtitle="DPA, SOC 2 report, architecture review — tout est disponible sur demande pour votre équipe légale."
        />

        <PageFooter />
      </div>
    </>
  );
}
