'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';

/**
 * Accepter une COMMANDE de son abonnement Sojori, par son lien (C4, Tawfiq 28/10/2026 : « je peux
 * passer d'un abonnement Google Workspace à un autre sans un autre contrat »). Le contrat signé ne
 * change pas : la commande dit ce qui change, le nouveau mensuel, le prorata du mois en cours et
 * les frais ; le client l'accepte avec son nom, l'heure et son adresse sont gardées.
 *
 * Tout vient de srv-crm : la page ne calcule aucun prix.
 */

const API = '/api/v1/public/sign';

type Commande = {
  reference: string;
  client: string;
  numero: number;
  statut: 'proposee' | 'acceptee' | 'annulee';
  calcul: {
    devise: string;
    mensuelAvant: number;
    mensuelApres: number;
    hausseMensuelle: number;
    baisseDifferee: boolean;
    fraisUniques: Array<{ libelle: string; montant: number }>;
    changements: string[];
  };
  prorata: { joursRestants: number; joursDuMois: number; montant: number; premierDuMoisSuivant: string };
  accepteeLe: string | null;
  accepteePar: string | null;
};

function montant(n: number, devise: string): string {
  if (devise !== 'EUR') return `${Math.round(n).toLocaleString('fr-FR')} MAD`;
  const centimes = Math.round(n * 100) % 100 !== 0;
  return `${n.toLocaleString('fr-FR', { minimumFractionDigits: centimes ? 2 : 0, maximumFractionDigits: centimes ? 2 : 0 })} €`;
}

/** « 1er décembre 2026 », « 15 novembre 2026 » (UTC : le Maroc est à GMT en 2026). */
const jour = (iso: string) =>
  new Date(iso)
    .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .replace(/^1 /, '1er ');

const carte: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(184,136,26,0.22)',
  borderRadius: 16,
  padding: '28px 24px',
  boxShadow: '0 14px 44px -18px rgba(26,21,32,0.1)',
  marginBottom: 16,
};

function CommandeContent() {
  const t = useSearchParams().get('t') || '';
  const [charge, setCharge] = useState(true);
  const [cmd, setCmd] = useState<Commande | null>(null);
  const [erreur, setErreur] = useState('');
  const [nom, setNom] = useState('');
  const [accepte, setAccepte] = useState(false);
  const [enCours, setEnCours] = useState(false);

  // Relu après l'acceptation : le compteur relance la lecture.
  const [version, setVersion] = useState(0);

  // Lecture au déclencheur (ouverture du lien, acceptation) ; sans jeton, rien à lire.
  useEffect(() => {
    if (!t) return;
    let actif = true;
    fetch(`${API}/commande?t=${encodeURIComponent(t)}`)
      .then((res) => res.json())
      .then((brut) => {
        if (!actif) return;
        const r = normalizeDemoBackendResponse(brut) as { success?: boolean; data?: Commande; error?: string };
        if (r.success && r.data) setCmd(r.data);
        else setErreur(r.error || 'Lien invalide ou expiré.');
      })
      .catch(() => {
        if (actif) setErreur('Impossible de charger la commande.');
      })
      .finally(() => {
        if (actif) setCharge(false);
      });
    return () => {
      actif = false;
    };
  }, [t, version]);
  const lienManquant = !t;

  const accepter = async () => {
    if (nom.trim().length < 3 || !accepte) return;
    setEnCours(true);
    setErreur('');
    try {
      const r = normalizeDemoBackendResponse(
        await (
          await fetch(`${API}/commande/accepter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: t, nom: nom.trim() }),
          })
        ).json(),
      ) as { success?: boolean; error?: string };
      if (r.success) setVersion((v) => v + 1);
      else setErreur(r.error || 'Acceptation impossible.');
    } catch {
      setErreur('Erreur réseau. Réessayez.');
    } finally {
      setEnCours(false);
    }
  };

  const c = cmd?.calcul;
  const m = (n: number) => montant(n, c?.devise ?? 'EUR');
  const pret = nom.trim().length >= 3 && accepte;

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f3', position: 'relative' }}>
      <BackgroundEffects />
      <PageHeader />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px', position: 'relative' }}>
        {charge && !lienManquant && <p style={{ textAlign: 'center', color: '#78716c', fontSize: 15 }}>Chargement…</p>}

        {(lienManquant || (!charge && !cmd)) && (
          <div style={carte}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: '0 0 12px' }}>Lien invalide</h1>
            <p style={{ fontSize: 15, color: '#57534e', lineHeight: 1.6, margin: 0 }}>
              {lienManquant ? 'Lien incomplet. Utilisez le lien reçu par e-mail.' : erreur} Contactez-nous à{' '}
              <a href="mailto:contact@sojori.com" style={{ color: '#b8881a', fontWeight: 600 }}>
                contact@sojori.com
              </a>
              .
            </p>
          </div>
        )}

        {cmd && c && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>
              {cmd.statut === 'acceptee' ? 'Commande acceptée' : `Votre commande n° ${cmd.numero}`}
            </h1>
            <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 24px' }}>
              Contrat {cmd.reference}
              {cmd.client ? ` · ${cmd.client}` : ''} · sans nouveau contrat
            </p>

            <div style={carte}>
              <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a8a29e', margin: '0 0 14px' }}>
                Ce qui change
              </h2>
              <ul style={{ margin: '0 0 14px', paddingLeft: 20 }}>
                {c.changements.map((x) => (
                  <li key={x} style={{ fontSize: 15, color: '#1c1917', lineHeight: 1.8 }}>
                    {x}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f5f0e6', fontSize: 15 }}>
                <span style={{ color: '#78716c' }}>Abonnement mensuel</span>
                <span style={{ color: '#1c1917', fontWeight: 700 }}>
                  {m(c.mensuelAvant)} → {m(c.mensuelApres)} HT
                </span>
              </div>
              {c.hausseMensuelle > 0 && (
                <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: '8px 0 0' }}>
                  {cmd.statut === 'acceptee' ? 'Mois en cours' : 'Acceptée aujourd’hui, le mois en cours'} : {m(cmd.prorata.montant)} HT de plus (
                  {cmd.prorata.joursRestants} jours sur {cmd.prorata.joursDuMois}).
                </p>
              )}
              {c.baisseDifferee && (
                <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: '8px 0 0' }}>
                  Les retraits prennent effet le {jour(cmd.prorata.premierDuMoisSuivant)}, sans remboursement du mois en cours.
                </p>
              )}
              {c.fraisUniques.map((f) => (
                <p key={f.libelle} style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: '8px 0 0' }}>
                  {f.libelle} : {m(f.montant)} HT, une seule fois.
                </p>
              ))}
              <p style={{ fontSize: 13, color: '#78716c', margin: '12px 0 0' }}>TVA en sus. Les conditions générales de votre contrat s’appliquent.</p>
            </div>

            {cmd.statut === 'acceptee' ? (
              <div style={{ ...carte, background: '#f0f9f7', borderColor: '#1e5b57' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1e5b57', margin: 0 }}>
                  Acceptée{cmd.accepteePar ? ` par ${cmd.accepteePar}` : ''}
                  {cmd.accepteeLe ? `, le ${jour(cmd.accepteeLe)}` : ''}. Merci.
                </p>
              </div>
            ) : (
              <div style={carte}>
                <label style={{ display: 'block', fontSize: 14, color: '#57534e', marginBottom: 6 }}>Vos nom et prénom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Prénom Nom"
                  style={{ width: '100%', padding: '13px 14px', fontSize: 16, border: '1px solid #e7e5e4', borderRadius: 10, outline: 'none', marginBottom: 16, fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#57534e', lineHeight: 1.55, marginBottom: 20, cursor: 'pointer' }}>
                  <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} style={{ marginTop: 3, width: 17, height: 17, cursor: 'pointer' }} />
                  <span>J’accepte cette commande. Mon acceptation est enregistrée avec sa date, son heure et mon adresse IP.</span>
                </label>
                {erreur && <p style={{ fontSize: 14, color: '#c4483a', margin: '0 0 14px' }}>{erreur}</p>}
                <button
                  type="button"
                  onClick={() => void accepter()}
                  disabled={enCours || !pret}
                  style={{
                    width: '100%',
                    padding: '15px 24px',
                    fontSize: 16,
                    fontWeight: 800,
                    color: pret ? '#1c1917' : '#a8a29e',
                    background: pret ? '#e6b022' : '#f5f0e6',
                    border: 'none',
                    borderRadius: 11,
                    cursor: enCours || !pret ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {enCours ? 'Enregistrement…' : 'Accepter la commande'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <PageFooter bande={false} />
    </div>
  );
}

export default function CommandePage() {
  return (
    <Suspense fallback={null}>
      <CommandeContent />
    </Suspense>
  );
}
