'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';

/**
 * Signature d'un contrat Sojori, par son jeton.
 *
 * **Aucun compte n'est demandé.** Le signataire arrive par un lien reçu par
 * courriel ; lui faire créer un compte pour signer ferait perdre des contrats
 * à la dernière étape, celle où tout est déjà négocié.
 *
 * Le nom saisi EST la signature. Il est enregistré avec l'horodatage et
 * l'adresse d'origine — sans trace, une signature contestée serait
 * indéfendable.
 */

const API = '/api/v1/public/sign';

type Contract = {
  reference: string;
  status: string;
  plan: string | null;
  unitsCount: number | null;
  monthlyMad: number;
  setupFeeMad: number;
  annualValueMad: number;
  commitmentMonths: number;
  signedAt: string | null;
  signedByName: string | null;
};

const PLAN_LABELS: Record<string, string> = {
  base: 'Base',
  confort: 'Confort',
  premium: 'Premium',
};

function mad(n?: number | null): string {
  if (!n) return '—';
  return `${Math.round(n).toLocaleString('fr-FR')} MAD`;
}

function ContratContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') || '';

  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const load = useCallback(async () => {
    if (!token) {
      setError('Lien incomplet. Utilisez le lien reçu par e-mail.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API}/contract?t=${encodeURIComponent(token)}`);
      const parsed = normalizeDemoBackendResponse(await res.json()) as {
        success?: boolean;
        data?: Contract;
        error?: string;
      };
      if (parsed.success && parsed.data) {
        setContract(parsed.data);
        // Un contrat déjà signé n'est pas une erreur : on montre l'attestation
        // plutôt qu'un message d'échec, au cas où le client rouvre son lien.
        if (parsed.data.signedAt) setSigned(true);
      } else {
        setError(parsed.error || 'Lien invalide ou expiré.');
      }
    } catch {
      setError('Impossible de charger le contrat.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const sign = async () => {
    if (name.trim().length < 3 || !accepted) return;
    setSigning(true);
    setError('');
    try {
      const res = await fetch(`${API}/contract/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, signedByName: name.trim() }),
      });
      const parsed = normalizeDemoBackendResponse(await res.json()) as {
        success?: boolean;
        error?: string;
      };
      if (parsed.success) {
        setSigned(true);
        await load();
      } else {
        setError(parsed.error || 'Signature impossible.');
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setSigning(false);
    }
  };

  const card: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(184,136,26,0.22)',
    borderRadius: 16,
    padding: '28px 24px',
    boxShadow: '0 14px 44px -18px rgba(26,21,32,0.1)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f3', position: 'relative' }}>
      <BackgroundEffects />
      <PageHeader />

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px', position: 'relative' }}>
        {loading && (
          <p style={{ textAlign: 'center', color: '#78716c', fontSize: 15 }}>Chargement…</p>
        )}

        {!loading && error && !contract && (
          <div style={card}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: '0 0 12px' }}>
              Lien invalide
            </h1>
            <p style={{ fontSize: 15, color: '#57534e', lineHeight: 1.6, margin: 0 }}>
              {error} Contactez-nous à{' '}
              <a href="mailto:contact@sojori.com" style={{ color: '#b8881a', fontWeight: 600 }}>
                contact@sojori.com
              </a>
              .
            </p>
          </div>
        )}

        {!loading && contract && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>
              {signed ? 'Contrat signé' : 'Votre contrat Sojori'}
            </h1>
            <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 24px' }}>
              Référence {contract.reference}
            </p>

            <div style={{ ...card, marginBottom: 16 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 16px' }}>
                Ce que vous souscrivez
              </h2>

              {[
                ['Offre', contract.plan ? PLAN_LABELS[contract.plan] ?? contract.plan : '—'],
                ['Logements', contract.unitsCount ? String(contract.unitsCount) : '—'],
                ['Abonnement mensuel', mad(contract.monthlyMad)],
                ['Frais d’installation', `${mad(contract.setupFeeMad)} — une seule fois`],
                [
                  'Engagement',
                  contract.commitmentMonths > 0
                    ? `${contract.commitmentMonths} mois`
                    : 'Sans engagement',
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid #f5f0e6',
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: '#78716c' }}>{label}</span>
                  <span style={{ color: '#1c1917', fontWeight: 600 }}>{value}</span>
                </div>
              ))}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  fontSize: 17,
                  fontWeight: 800,
                  color: '#1c1917',
                }}
              >
                <span>Total annuel</span>
                <span>{mad(contract.annualValueMad)}</span>
              </div>
            </div>

            {signed ? (
              <div style={{ ...card, background: '#f0f9f7', borderColor: '#1e5b57' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1e5b57', margin: '0 0 8px' }}>
                  Signé{contract.signedByName ? ` par ${contract.signedByName}` : ''}
                </p>
                <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: 0 }}>
                  Merci. Nous vous envoyons le lien de paiement par e-mail, puis nous activons
                  votre compte. Une question ?{' '}
                  <a href="mailto:contact@sojori.com" style={{ color: '#b8881a', fontWeight: 600 }}>
                    contact@sojori.com
                  </a>
                </p>
              </div>
            ) : (
              <div style={card}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 16px' }}>
                  Signature
                </h2>

                <label style={{ display: 'block', fontSize: 14, color: '#57534e', marginBottom: 6 }}>
                  Vos nom et prénom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prénom Nom"
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    fontSize: 16,
                    border: '1px solid #e7e5e4',
                    borderRadius: 10,
                    outline: 'none',
                    marginBottom: 16,
                    fontFamily: 'inherit',
                  }}
                />

                <label
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    fontSize: 14,
                    color: '#57534e',
                    lineHeight: 1.55,
                    marginBottom: 20,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    style={{ marginTop: 3, width: 17, height: 17, cursor: 'pointer' }}
                  />
                  <span>
                    J’accepte les conditions de ce contrat. Ma saisie vaut signature
                    électronique, avec sa date et son heure.
                  </span>
                </label>

                {error && (
                  <p style={{ fontSize: 14, color: '#c4483a', margin: '0 0 14px' }}>{error}</p>
                )}

                <button
                  type="button"
                  onClick={() => void sign()}
                  disabled={signing || name.trim().length < 3 || !accepted}
                  style={{
                    width: '100%',
                    padding: '15px 24px',
                    fontSize: 16,
                    fontWeight: 800,
                    color: name.trim().length >= 3 && accepted ? '#1c1917' : '#a8a29e',
                    background: name.trim().length >= 3 && accepted ? '#e6b022' : '#f5f0e6',
                    border: 'none',
                    borderRadius: 11,
                    cursor: signing || name.trim().length < 3 || !accepted ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background .16s ease',
                  }}
                >
                  {signing ? 'Signature en cours…' : 'Signer le contrat'}
                </button>

                <p style={{ fontSize: 12, color: '#a8a29e', textAlign: 'center', margin: '12px 0 0' }}>
                  Lien personnel — ne le transférez pas.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <PageFooter />
    </div>
  );
}

export default function ContratPage() {
  return (
    <Suspense fallback={null}>
      <ContratContent />
    </Suspense>
  );
}
