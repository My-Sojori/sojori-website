'use client';

import { useState } from 'react';
import { fichePrerempli, formaterMontant } from '@/lib/contratFichePrerempli';
import { textesPage } from '@/lib/contratPageTextes';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { SignaturePad } from './SignaturePad';

/**
 * Le contrat d'ABONNEMENT Sojori à lire et signer (C3, Tawfiq 28/10/2026) : les parties, le bon de
 * commande, les conditions générales dans la version figée à l'envoi, puis la fiche du client et sa
 * signature dessinée — le circuit interne de Sojori (« notre propre DocuSign »). Une fois signé, le
 * PDF signé par les deux parties, avec son certificat, se télécharge ici.
 *
 * Tout vient de srv-crm, figé : la page n'écrit aucune clause et ne calcule aucun prix.
 */

const API = '/api/v1/public/sign';

export type Abonnement = {
  titre: string;
  cgTitre: string;
  cgVersion: number;
  articles: Array<{ titre: string; texte: string }>;
  bonDeCommande: {
    numero: number;
    referenceDevis: string;
    formule: string;
    nombre: number;
    unite: string;
    lignes: Array<{ designation: string; quantite: number; prixUnitaire: number; montant: number; note?: string }>;
    fraisUniques: Array<{ libelle: string; montant: number }>;
    remise: { pct: number; motif: string; montant: number } | null;
    mensuelHt: number;
    fraisUniquesHt: number;
    tvaPct: number;
    devise: string;
  };
  vendeur: {
    raisonSociale: string;
    ice?: string;
    rc?: string;
    taxId?: string;
    adresse?: string;
    representant: { nom: string; fonction: string };
  };
  champsClient: Array<{ cle: string; libelle: string; requis: boolean }>;
  /** Ce que le CRM sait déjà du client : pré-remplit la fiche (jamais le nom ni la fonction du signataire). */
  champsInitiaux?: Record<string, string>;
  /** La langue du contrat figé (fr ou en) ; absente pour un contrat d'avant la règle : français. */
  langue?: 'fr' | 'en';
  /**
   * Le contrat déjà mis en texte par srv-crm dans sa langue (lignes du bon de commande traduites, mots du catalogue
   * connu) : la page préfère ces lignes à celles, brutes, du bon de commande.
   */
  rendu?: {
    synthese?: { offre?: string; nombre?: string };
    annexe?: { lignes?: Array<{ designation: string; note?: string }> };
  };
  /** Le contrat type validé dont il est tiré : sa page HTML complète, lue dans un cadre isolé. */
  contratType?: { famille: string; langue: string; version: number; titre: string; html: string } | null;
};

/** Un texte d'article en paragraphes ; une ligne « - … » devient une puce (même règle que le PDF). */
function paragraphes(texte: string): Array<{ puces: boolean; lignes: string[] }> {
  return texte
    .split(/\n\s*\n/)
    .map((p) => p.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((p) => p.length)
    .map((lignes) =>
      lignes.every((l) => l.startsWith('- '))
        ? { puces: true, lignes: lignes.map((l) => l.slice(2)) }
        : { puces: false, lignes: [lignes.join(' ')] },
    );
}

const carte: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(184,136,26,0.22)',
  borderRadius: 16,
  padding: '28px 24px',
  boxShadow: '0 14px 44px -18px rgba(26,21,32,0.1)',
  marginBottom: 16,
};
const titreCarte: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#a8a29e',
  margin: '0 0 16px',
};
const champ: React.CSSProperties = {
  width: '100%',
  padding: '12px 13px',
  fontSize: 15.5,
  border: '1px solid #e7e5e4',
  borderRadius: 10,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

export function ContratAbonnement({
  token,
  reference,
  abonnement,
  signe,
  signePar,
  onSigne,
}: {
  token: string;
  reference: string;
  abonnement: Abonnement;
  signe: boolean;
  signePar: string | null;
  onSigne: () => Promise<void>;
}) {
  const a = abonnement;
  const b = a.bonDeCommande;
  const v = a.vendeur;
  const montant = (n: number, devise: string) => formaterMontant(n, devise, a.langue);
  const tx = textesPage(a.langue);
  const htmlContrat = a.contratType?.html?.trim() || '';
  const lignesRendues = a.rendu?.annexe?.lignes ?? [];
  const [fiche, setFiche] = useState<Record<string, string>>(() => fichePrerempli(a.champsClient, a.champsInitiaux));
  const [png, setPng] = useState<string | null>(null);
  const [accepte, setAccepte] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState('');

  const manquant = a.champsClient.find((c) => c.requis && !fiche[c.cle]?.trim());
  const pret = !manquant && !!png && accepte;

  const signer = async () => {
    if (!pret) return;
    setEnCours(true);
    setErreur('');
    try {
      const res = await fetch(`${API}/contract/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          signedByName: (fiche.representant ?? '').trim(),
          client: fiche,
          signaturePng: png,
        }),
      });
      const r = normalizeDemoBackendResponse(await res.json()) as { success?: boolean; error?: string };
      if (r.success) await onSigne();
      else setErreur(r.error || tx.erreurSignature);
    } catch {
      setErreur(tx.erreurReseau);
    } finally {
      setEnCours(false);
    }
  };

  const sojori = [
    v.raisonSociale,
    v.rc ? tx.rc(v.rc) : '',
    v.ice ? tx.ice(v.ice) : '',
    v.adresse ? tx.siegeSojori(v.adresse) : '',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: '0 0 6px' }}>
        {signe ? tx.signe : a.titre}
      </h1>
      <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 24px' }}>
        {tx.reference(reference, a.cgVersion)}
      </p>

      {htmlContrat ? (
        <div style={carte} data-testid="contrat-type-html">
          <h2 style={titreCarte}>{tx.contratComplet}</h2>
          {/* La page du contrat type, rendue par srv-crm : lecture seule, aucun script, aucune navigation. */}
          <iframe
            title={a.contratType?.titre || a.titre}
            sandbox=""
            srcDoc={htmlContrat}
            style={{ width: '100%', height: 720, border: '1px solid #e7e5e4', borderRadius: 10, background: '#fff' }}
          />
        </div>
      ) : (
        <>
      <div style={carte}>
        <h2 style={titreCarte}>{tx.parties}</h2>
        <p style={{ fontSize: 14.5, color: '#44403c', lineHeight: 1.65, margin: '0 0 10px' }}>
          <strong>Sojori</strong> — {tx.sojoriLigne(sojori, v.representant.nom, v.representant.fonction)}
        </p>
        <p style={{ fontSize: 14.5, color: '#44403c', lineHeight: 1.65, margin: 0 }}>
          <strong>{tx.clientLabel}</strong> — {signe ? signePar ?? '' : tx.clientInfos}
        </p>
      </div>

      <div style={carte}>
        <h2 style={titreCarte}>{tx.bonDeCommande(b.numero)}</h2>
        <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 12px' }}>
          {tx.resume(a.rendu?.synthese?.offre ?? b.formule, a.rendu?.synthese?.nombre ?? `${b.nombre} ${b.unite}`, b.devise === 'EUR' ? 'EUR' : 'MAD')}
        </p>
        {b.lignes.map((l, i) => (
          <div key={l.designation} style={{ padding: '10px 0', borderBottom: '1px solid #f5f0e6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
              <span style={{ fontSize: 14.5, color: '#1c1917' }}>{lignesRendues[i]?.designation ?? l.designation}</span>
              <span style={{ fontSize: 14.5, color: '#44403c', whiteSpace: 'nowrap' }}>{montant(l.montant, b.devise)}</span>
            </div>
            <div style={{ fontSize: 12.5, color: '#78716c', marginTop: 2 }}>
              {l.quantite} × {montant(l.prixUnitaire, b.devise)}
              {l.note ? ` · ${lignesRendues[i]?.note ?? l.note}` : ''}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, fontSize: 16.5, fontWeight: 800, color: '#1c1917' }}>
          <span>{tx.totalMensuel}</span>
          <span>{montant(b.mensuelHt, b.devise)}</span>
        </div>
        {b.fraisUniques.map((f) => (
          <div key={f.libelle} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, fontSize: 14.5, color: '#44403c' }}>
            <span>{tx.uneSeuleFois(f.libelle)}</span>
            <span>{f.montant > 0 ? montant(f.montant, b.devise) : tx.offert}</span>
          </div>
        ))}
        {b.remise ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, fontSize: 14.5, color: '#44403c' }}>
            <span>{tx.remise(b.remise.pct)}</span>
            <span>- {montant(b.remise.montant, b.devise)}</span>
          </div>
        ) : null}
        <p style={{ fontSize: 13, color: '#78716c', margin: '12px 0 0' }}>
          {tx.conditions(b.tvaPct)}
        </p>
      </div>

      <div style={carte}>
        <h2 style={titreCarte}>{a.cgTitre}</h2>
        {a.articles.map((art, i) => (
          <div key={art.titre} style={{ marginBottom: i === a.articles.length - 1 ? 0 : 18 }}>
            <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#1c1917', margin: '0 0 6px' }}>
              {i + 1}. {art.titre}
            </h3>
            {paragraphes(art.texte).map((p, j) =>
              p.puces ? (
                <ul key={j} style={{ margin: '0 0 8px', paddingLeft: 20 }}>
                  {p.lignes.map((l) => (
                    <li key={l} style={{ fontSize: 13.5, color: '#57534e', lineHeight: 1.7 }}>
                      {l}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={j} style={{ fontSize: 13.5, color: '#57534e', lineHeight: 1.75, margin: '0 0 8px' }}>
                  {p.lignes[0]}
                </p>
              ),
            )}
          </div>
        ))}
      </div>
        </>
      )}

      {signe ? (
        <div style={{ ...carte, background: '#f0f9f7', borderColor: '#1e5b57' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1e5b57', margin: '0 0 8px' }}>
            {tx.signeParLabel(signePar)}
          </p>
          <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.6, margin: '0 0 14px' }}>
            {tx.merci}
          </p>
          <a
            href={`${API}/contract/pdf?t=${encodeURIComponent(token)}`}
            style={{ display: 'inline-block', padding: '12px 20px', background: '#e6b022', color: '#1c1917', fontWeight: 800, borderRadius: 11, textDecoration: 'none' }}
          >
            {tx.telecharger}
          </a>
        </div>
      ) : (
        <div style={carte}>
          <h2 style={titreCarte}>{tx.vosInfos}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {a.champsClient.map((c) => (
              <label key={c.cle} style={{ display: 'block', fontSize: 13, color: '#57534e' }}>
                {c.libelle.replace('de l’agence', 'de votre société')}
                {c.requis ? ' *' : ''}
                <input
                  type={c.cle === 'email' ? 'email' : 'text'}
                  value={fiche[c.cle] ?? ''}
                  onChange={(e) => setFiche((f) => ({ ...f, [c.cle]: e.target.value }))}
                  style={{ ...champ, marginTop: 5 }}
                />
              </label>
            ))}
          </div>

          <h2 style={{ ...titreCarte, margin: '24px 0 10px' }}>{tx.votreSignature}</h2>
          <SignaturePad onChange={setPng} />

          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#57534e', lineHeight: 1.55, margin: '18px 0 18px', cursor: 'pointer' }}>
            <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} style={{ marginTop: 3, width: 17, height: 17, cursor: 'pointer' }} />
            <span>
              {tx.consentement}
            </span>
          </label>

          {manquant ? (
            <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 12px' }}>{tx.aRemplir(manquant.libelle.replace('de l’agence', 'de votre société').toLocaleLowerCase(tx.locale))}</p>
          ) : !png ? (
            <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 12px' }}>{tx.dessinez}</p>
          ) : null}
          {erreur && <p style={{ fontSize: 14, color: '#c4483a', margin: '0 0 14px' }}>{erreur}</p>}

          <button
            type="button"
            onClick={() => void signer()}
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
            {enCours ? tx.signatureEnCours : tx.signer}
          </button>
          <p style={{ fontSize: 12, color: '#a8a29e', textAlign: 'center', margin: '12px 0 0' }}>
            {tx.lienPersonnel}
          </p>
        </div>
      )}
    </>
  );
}
