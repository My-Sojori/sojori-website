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
  /** Le détail de ce qui est souscrit — recopié du devis à la signature. */
  lines?: Array<{
    designation: string;
    quantity: number;
    unitPriceMad: number;
    totalMad: number;
    resume?: string;
    inclus?: string[];
  }> | null;
  /** Ce que le gestionnaire gagne, à côté de ce qu'il paie. */
  revenusPartages?: Array<{ taux: string; label: string; resume: string }> | null;
};

/**
 * Les articles du contrat.
 *
 * Écrits ici et non en base : ce sont les conditions générales de Sojori, les
 * mêmes pour tous. Ce qui varie d'un client à l'autre — offre, volume,
 * montants — vient du contrat lui-même et s'affiche au-dessus.
 *
 * Rédigés pour être LUS. Un contrat que personne ne lit ne protège personne :
 * au premier désaccord, celui qui invoque une clause que l'autre n'a jamais
 * comprise a déjà perdu la relation, même s'il gagne le point.
 */
const ARTICLES: Array<{ titre: string; alineas: string[] }> = [
  {
    titre: 'Objet',
    alineas: [
      "Sojori met à disposition du Client une plateforme d'orchestration de l'hospitalité en mode logiciel-service : gestion locative, distribution sur les canaux de réservation, communication avec les voyageurs et les équipes, et les modules souscrits ci-dessus.",
      "L'accès se fait par navigateur web et par WhatsApp. Aucune installation ni maintenance n'incombe au Client.",
      "Le détail des fonctionnalités comprises figure au récapitulatif ci-dessus. Il fait partie du contrat.",
    ],
  },
  {
    titre: 'Mise en service',
    alineas: [
      "Les frais d'installation couvrent l'activation du compte, la connexion des canaux de distribution, la reprise des données existantes et la formation initiale des équipes.",
      "La mise en service se déroule à distance et prend de deux à six semaines selon le nombre de logements et la complexité des intégrations. Sojori n'est pas responsable des délais imputables à un tiers — un canal de réservation, un serrurier connecté, une banque.",
      "Les frais d'installation sont dus à la signature et ne sont pas remboursables.",
    ],
  },
  {
    titre: 'Facturation',
    alineas: [
      "La facturation commence au premier jour de la mise en service, ou dix jours après la signature si la mise en service n'a pas encore eu lieu du fait du Client.",
      "L'abonnement est facturé d'avance, à la même date chaque mois. Un logement ajouté en cours de mois est facturé au prorata sur la facture suivante ; un logement retiré est déduit de la même façon.",
      "Les montants sont exprimés en dirhams, hors taxes. La TVA applicable s'ajoute au taux en vigueur.",
      "En cas d'impayé, Sojori en informe le Client et dispose d'un délai de quinze jours avant toute suspension. La suspension ne supprime aucune donnée.",
    ],
  },
  {
    titre: 'Engagement et résiliation',
    alineas: [
      "La durée d'engagement figure au récapitulatif. À son terme, le contrat se renouvelle par tacite reconduction pour la même durée.",
      "Chaque partie peut résilier à tout moment moyennant un préavis écrit de trente jours avant la prochaine date de facturation. Aucun remboursement n'est dû pour un mois entamé.",
      "À la résiliation, le Client dispose de trente jours pour récupérer ses données dans un format exploitable. Passé ce délai, elles sont supprimées.",
    ],
  },
  {
    titre: 'Support et disponibilité',
    alineas: [
      "Le niveau de support correspond à l'offre souscrite et figure au récapitulatif.",
      "Sojori s'engage à une disponibilité de la plateforme de 99 % sur le mois, hors maintenances programmées annoncées au moins quarante-huit heures à l'avance.",
      "Les mises à jour de la plateforme sont comprises, sans supplément.",
    ],
  },
  {
    titre: 'Données et confidentialité',
    alineas: [
      "Le Client reste propriétaire de ses données — ses logements, ses réservations, ses voyageurs. Sojori les traite pour la seule exécution du présent contrat.",
      "Les conditions tarifaires du présent contrat sont confidentielles. Chaque partie s'abstient de les communiquer à un tiers, sauf obligation légale.",
      "Les conditions générales de Sojori complètent le présent contrat. En cas de contradiction, le présent contrat prévaut.",
    ],
  },
];

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

            {/*
              Le détail de ce qui est souscrit.

              Un contrat qui dit « Offre Confort, 14 875 MAD » engage sur un
              nom : trois mois plus tard, personne ne sait si TeamFlow en
              faisait partie. Le signataire doit lire ce qu'il achète AVANT de
              signer, pas le découvrir à la première facture.
            */}
            {contract.lines?.length ? (
              <div style={{ ...card, marginBottom: 16 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 16px' }}>
                  Le détail
                </h2>
                {contract.lines.map((l) => (
                  <div key={l.designation} style={{ padding: '14px 0', borderBottom: '1px solid #f5f0e6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#1c1917' }}>{l.designation}</span>
                      <span style={{ fontSize: 15, color: '#44403c', whiteSpace: 'nowrap' }}>{mad(l.totalMad)}</span>
                    </div>
                    {l.resume ? (
                      <p style={{ fontSize: 13.5, color: '#78716c', margin: '4px 0 0', lineHeight: 1.6 }}>{l.resume}</p>
                    ) : null}
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
              </div>
            ) : null}

            {/*
              Ce que le gestionnaire GAGNE.

              Écrit dans le contrat parce que c'est un engagement, pas un
              argument de vente : promettre 10 % à l'oral et ne rien signer est
              la meilleure façon de se fâcher au premier versement.
            */}
            {contract.revenusPartages?.length ? (
              <div style={{ ...card, marginBottom: 16 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 16px' }}>
                  Ce que vous gagnez
                </h2>
                {contract.revenusPartages.map((r) => (
                  <div key={r.label} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #f5f0e6' }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#b8881a', minWidth: 52 }}>{r.taux}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#1c1917' }}>{r.label}</div>
                      <p style={{ fontSize: 13.5, color: '#78716c', margin: '2px 0 0', lineHeight: 1.6 }}>{r.resume}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/*
              Les articles du contrat.

              Un récapitulatif de prix n'est pas un contrat : il ne dit ni ce
              que Sojori doit livrer, ni quand la facturation commence, ni
              comment on en sort. Le signataire s'engage alors sur un montant
              sans savoir sur quoi il s'engage — et au premier désaccord, il n'y
              a rien à relire.

              Six articles, dans l'ordre où les questions se posent : ce qu'on
              achète, ce qu'on paie, quand, ce qui se passe si ça se passe mal,
              et comment partir.
            */}
            <div style={{ ...card, marginBottom: 16 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 18px' }}>
                Conditions
              </h2>

              {ARTICLES.map((art, i) => (
                <div key={art.titre} style={{ marginBottom: i === ARTICLES.length - 1 ? 0 : 20 }}>
                  <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#1c1917', margin: '0 0 8px' }}>
                    {i + 1}. {art.titre}
                  </h3>
                  {art.alineas.map((al) => (
                    <p key={al} style={{ fontSize: 13.5, color: '#57534e', lineHeight: 1.75, margin: '0 0 8px' }}>
                      {al}
                    </p>
                  ))}
                </div>
              ))}
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
