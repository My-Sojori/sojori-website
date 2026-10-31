'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';

/**
 * Le devis par lien (Tawfiq, 29/10/2026 : « un devis, maintenant, ça va être un lien, comme le contrat »).
 *
 * **Aucun compte n'est demandé.** Le client arrive par le lien de son e-mail, lit le devis tel qu'il est parti, le
 * télécharge en PDF (généré à la demande, jamais joint à l'e-mail), l'imprime — ou le transmet à son chef : le lien
 * se partage tel quel. Il l'accepte ici d'un geste, avec son nom.
 *
 * L'impression a sa feuille de style : sans bandeau ni boutons, une page lisible, le logo et la référence en tête,
 * la validité visible.
 */

const API = '/api/v1/public/devis';

type Ligne = { designation: string; quantity: number; unitPriceMad: number; totalMad: number; resume?: string; inclus?: string[] };

type Devis = {
  vendeur: { tradeName: string; logoUrl: string | null; websiteUrl: string | null };
  reference: string;
  status: string;
  plan: string | null;
  unitsCount: number | null;
  uniteLabel: string | null;
  lines: Ligne[];
  setupFeeMad: number;
  discountMad: number;
  subtotalMad: number;
  vatMad: number;
  totalMad: number;
  prixTtc: boolean;
  devise?: 'EUR' | 'MAD';
  annualValue?: number;
  validUntil: string | null;
  sentAt: string | null;
  acceptedAt: string | null;
  expire: boolean;
  acceptable: boolean;
};

function montant(n: number | null | undefined, devise?: string): string {
  if (n === null || n === undefined) return '—';
  if (devise !== 'EUR') return `${Math.round(n).toLocaleString('fr-FR')} MAD`;
  const centimes = Math.round(n * 100) % 100 !== 0;
  return `${n.toLocaleString('fr-FR', { minimumFractionDigits: centimes ? 2 : 0, maximumFractionDigits: centimes ? 2 : 0 })} €`;
}

function jour(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
}

/** Feuille de style d'impression : ni bandeau, ni boutons, ni fond ; le devis seul, lisible. */
const IMPRESSION = `
@media print {
  .devis-hors-impression { display: none !important; }
  .devis-page { background: #fff !important; min-height: 0 !important; }
  .devis-carte { box-shadow: none !important; border: 1px solid #d6d3d1 !important; break-inside: avoid; }
  .devis-corps { padding: 0 !important; max-width: none !important; }
  @page { margin: 16mm; }
}
`;

function DevisContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') || '';

  const [loading, setLoading] = useState(true);
  const [devis, setDevis] = useState<Devis | null>(null);
  const [error, setError] = useState('');
  const [nom, setNom] = useState('');
  const [accepte, setAccepte] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  const load = useCallback(async () => {
    if (!token) {
      setError('Lien incomplet. Utilisez le lien reçu par e-mail.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API}?t=${encodeURIComponent(token)}`, { cache: 'no-store' });
      const parsed = normalizeDemoBackendResponse(await res.json()) as { success?: boolean; data?: Devis; error?: string };
      if (parsed.success && parsed.data) setDevis(parsed.data);
      else setError(parsed.error || 'Lien invalide ou expiré.');
    } catch {
      setError('Impossible de charger le devis.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const accepter = async () => {
    if (nom.trim().length < 3 || !accepte) return;
    setEnvoi(true);
    setError('');
    try {
      const res = await fetch(`${API}/accepter?t=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: nom.trim() }),
      });
      const parsed = normalizeDemoBackendResponse(await res.json()) as { success?: boolean; error?: string };
      if (parsed.success) await load();
      else setError(parsed.error || 'Acceptation impossible pour le moment.');
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setEnvoi(false);
    }
  };

  const card: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(184,136,26,0.22)',
    borderRadius: 16,
    padding: '28px 24px',
    boxShadow: '0 14px 44px -18px rgba(26,21,32,0.1)',
  };
  const titreSection: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#a8a29e',
    margin: '0 0 16px',
  };
  const bouton: React.CSSProperties = {
    padding: '12px 20px',
    fontSize: 14.5,
    fontWeight: 700,
    color: '#1c1917',
    background: '#fff',
    border: '1px solid #d6d3d1',
    borderRadius: 10,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    display: 'inline-block',
  };
  const peutAccepter = nom.trim().length >= 3 && accepte && !envoi;

  return (
    <div className="devis-page" style={{ minHeight: '100vh', background: '#faf8f3', position: 'relative' }}>
      <style>{IMPRESSION}</style>
      <div className="devis-hors-impression">
        <BackgroundEffects />
        <PageHeader />
      </div>

      <main className="devis-corps" style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px 80px', position: 'relative' }}>
        {loading && <p style={{ textAlign: 'center', color: '#78716c', fontSize: 15 }}>Chargement…</p>}

        {!loading && error && !devis && (
          <div style={card}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: '0 0 12px' }}>Lien invalide</h1>
            <p style={{ fontSize: 15, color: '#57534e', lineHeight: 1.6, margin: 0 }}>
              {error} Contactez-nous à{' '}
              <a href="mailto:contact@sojori.com" style={{ color: '#b8881a', fontWeight: 600 }}>
                contact@sojori.com
              </a>
              .
            </p>
          </div>
        )}

        {!loading && devis && (
          <>
            {/* En tête : le logo (ou le nom) du vendeur, la référence, la validité : visibles à l'impression. */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
              <div>
                {devis.vendeur.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={devis.vendeur.logoUrl} alt={devis.vendeur.tradeName} style={{ maxHeight: 44, maxWidth: 180 }} />
                ) : (
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#1c1917' }}>{devis.vendeur.tradeName || 'Sojori'}</span>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#78716c' }}>Devis</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#1c1917' }}>{devis.reference}</div>
              </div>
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>
              {devis.acceptedAt ? 'Devis accepté' : 'Votre devis'}
            </h1>
            <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 6px' }}>
              {devis.sentAt ? `Envoyé le ${jour(devis.sentAt)}.` : ''}
              {devis.validUntil ? ` Valable jusqu’au ${jour(devis.validUntil)}.` : ''}
            </p>
            {devis.expire && (
              <p style={{ fontSize: 14, color: '#c4483a', margin: '0 0 6px' }}>
                Ce lien a expiré. Contactez votre interlocuteur pour obtenir un nouveau devis.
              </p>
            )}

            {/* Les gestes : télécharger, imprimer. Hors impression. */}
            <div className="devis-hors-impression" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '16px 0 22px' }}>
              {!devis.expire && (
                <a href={`${API}/pdf?t=${encodeURIComponent(token)}`} style={bouton}>
                  Télécharger en PDF
                </a>
              )}
              <button type="button" onClick={() => window.print()} style={bouton}>
                Imprimer
              </button>
            </div>

            {/* Le détail : ce que le client achète, ligne par ligne. */}
            <div className="devis-carte" style={{ ...card, marginBottom: 16 }}>
              <h2 style={titreSection}>
                {devis.plan ? `Offre ${devis.plan}` : 'Le détail'}
                {devis.unitsCount ? ` · ${devis.unitsCount} ${devis.uniteLabel || 'logements'}` : ''}
              </h2>
              {devis.lines.map((l) => (
                <div key={l.designation} style={{ padding: '14px 0', borderBottom: '1px solid #f5f0e6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#1c1917' }}>
                      {l.designation}
                      {l.quantity > 1 ? ` (${l.quantity} × ${montant(l.unitPriceMad, devis.devise)})` : ''}
                    </span>
                    <span style={{ fontSize: 15, color: '#44403c', whiteSpace: 'nowrap' }}>{montant(l.totalMad, devis.devise)}</span>
                  </div>
                  {l.resume ? <p style={{ fontSize: 13.5, color: '#78716c', margin: '4px 0 0', lineHeight: 1.6 }}>{l.resume}</p> : null}
                  {l.inclus?.length ? (
                    <ul style={{ margin: '10px 0 0', paddingLeft: 18, listStyle: 'none' }}>
                      {l.inclus.map((item) => (
                        <li key={item} style={{ fontSize: 13.5, color: '#57534e', lineHeight: 1.85, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: -14, color: '#b8881a' }}>·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              {[
                devis.setupFeeMad > 0 ? ['Installation (une seule fois)', montant(devis.setupFeeMad, devis.devise)] : null,
                devis.discountMad > 0 ? ['Remise', `−${montant(devis.discountMad, devis.devise)}`] : null,
                [devis.prixTtc ? 'Total TTC' : 'Total HT', montant(devis.subtotalMad, devis.devise)],
                devis.vatMad > 0 ? ['TVA', montant(devis.vatMad, devis.devise)] : null,
              ]
                .filter((x): x is string[] => x !== null)
                .map(([label, valeur]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 15, borderBottom: '1px solid #f5f0e6' }}>
                    <span style={{ color: '#78716c' }}>{label}</span>
                    <span style={{ color: '#1c1917', fontWeight: 600 }}>{valeur}</span>
                  </div>
                ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, fontSize: 18, fontWeight: 800, color: '#1c1917' }}>
                <span>Total</span>
                <span>{montant(devis.totalMad, devis.devise)}</span>
              </div>
            </div>

            {/* Accepter : un nom et une case. Un devis déjà accepté montre sa date. */}
            {devis.acceptedAt ? (
              <div className="devis-carte" style={{ ...card, background: '#f0f9f7', borderColor: '#1e5b57' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1e5b57', margin: '0 0 8px' }}>
                  Accepté le {jour(devis.acceptedAt)}
                </p>
                <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: 0 }}>
                  Merci. Nous revenons vers vous avec la suite par e-mail. Une question ?{' '}
                  <a href="mailto:contact@sojori.com" style={{ color: '#b8881a', fontWeight: 600 }}>
                    contact@sojori.com
                  </a>
                </p>
              </div>
            ) : devis.acceptable ? (
              <div className="devis-carte devis-hors-impression" style={card}>
                <h2 style={titreSection}>Accepter ce devis</h2>
                <label style={{ display: 'block', fontSize: 14, color: '#57534e', marginBottom: 6 }}>Vos nom et prénom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Prénom Nom"
                  style={{ width: '100%', padding: '13px 14px', fontSize: 16, border: '1px solid #e7e5e4', borderRadius: 10, outline: 'none', marginBottom: 16, fontFamily: 'inherit' }}
                />
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#57534e', lineHeight: 1.55, marginBottom: 20, cursor: 'pointer' }}>
                  <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} style={{ marginTop: 3, width: 17, height: 17, cursor: 'pointer' }} />
                  <span>J’accepte ce devis, avec son détail et son total.</span>
                </label>
                {error && <p style={{ fontSize: 14, color: '#c4483a', margin: '0 0 14px' }}>{error}</p>}
                <button
                  type="button"
                  onClick={() => void accepter()}
                  disabled={!peutAccepter}
                  style={{
                    width: '100%',
                    padding: '15px 24px',
                    fontSize: 16,
                    fontWeight: 800,
                    color: peutAccepter ? '#1c1917' : '#a8a29e',
                    background: peutAccepter ? '#e6b022' : '#f5f0e6',
                    border: 'none',
                    borderRadius: 11,
                    cursor: peutAccepter ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit',
                  }}
                >
                  {envoi ? 'Envoi…' : 'Accepter le devis'}
                </button>
                <p style={{ fontSize: 12, color: '#a8a29e', textAlign: 'center', margin: '12px 0 0' }}>
                  Ce lien se partage tel quel pour que votre équipe lise le devis.
                </p>
              </div>
            ) : null}
          </>
        )}
      </main>

      <div className="devis-hors-impression">
        <PageFooter bande={false} />
      </div>
    </div>
  );
}

export default function DevisPage() {
  return (
    <Suspense fallback={null}>
      <DevisContent />
    </Suspense>
  );
}
