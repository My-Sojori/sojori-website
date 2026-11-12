/**
 * Les mots propres à la page de signature du contrat d'abonnement, dans la langue du contrat figé
 * (`abonnement.langue`, posée par srv-crm : français au Maroc, anglais ailleurs). Le texte du contrat lui-même
 * (articles, parties, annexe) vient de srv-crm déjà dans cette langue ; ici, seulement le cadre de la page.
 * Langue absente (contrat d'avant la règle) : le français d'avant.
 */
export type LangueContrat = 'fr' | 'en';

export const langueDePage = (l?: string | null): LangueContrat => (l === 'en' ? 'en' : 'fr');

export type TextesPage = {
  locale: string;
  signe: string;
  reference: (ref: string, version: number) => string;
  parties: string;
  sojoriLigne: (sojori: string, nom: string, fonction: string) => string;
  clientLabel: string;
  clientInfos: string;
  bonDeCommande: (n: number) => string;
  resume: (formule: string, nombreUnite: string, devise: 'EUR' | 'MAD') => string;
  totalMensuel: string;
  uneSeuleFois: (libelle: string) => string;
  offert: string;
  remise: (pct: number) => string;
  conditions: (tva: number) => string;
  siegeSojori: (adresse: string) => string;
  rc: (v: string) => string;
  ice: (v: string) => string;
  contratComplet: string;
  signeParLabel: (par: string | null) => string;
  merci: string;
  telecharger: string;
  vosInfos: string;
  votreSignature: string;
  consentement: string;
  aRemplir: (libelle: string) => string;
  dessinez: string;
  signer: string;
  signatureEnCours: string;
  lienPersonnel: string;
  erreurSignature: string;
  erreurReseau: string;
};

const FR: TextesPage = {
  locale: 'fr-FR',
  signe: 'Contrat signé',
  reference: (r, v) => `Référence ${r} · conditions générales, version ${v}`,
  parties: 'Les parties',
  sojoriLigne: (s, n, f) => `${s}, représentée par ${n || '…'}, ${f || '…'}.`,
  clientLabel: 'Le Client',
  clientInfos: 'les informations que vous remplissez ci-dessous.',
  bonDeCommande: (n) => `Bon de commande n° ${n}`,
  resume: (f, nu, d) => `Formule ${f} · ${nu} · prix hors taxes, en ${d === 'EUR' ? 'euros' : 'dirhams'}`,
  totalMensuel: 'Total mensuel HT',
  uneSeuleFois: (l) => `${l} — une seule fois`,
  offert: 'Offert',
  remise: (p) => `Remise${p ? ` (${p} %)` : ''}`,
  conditions: (t) =>
    `TVA ${t} % en sus. Mensuel, sans engagement. Vous ajoutez ou changez d’options à tout moment, sans nouveau contrat.`,
  siegeSojori: (a) => `siège : ${a}`,
  rc: (v) => `RC n° ${v}`,
  ice: (v) => `ICE n° ${v}`,
  contratComplet: 'Le contrat',
  signeParLabel: (p) => `Signé${p ? ` par ${p}` : ''}, contre-signé par Sojori`,
  merci: 'Merci. Votre exemplaire signé par les deux parties, avec son certificat de signature :',
  telecharger: 'Télécharger le contrat signé (PDF)',
  vosInfos: 'Vos informations',
  votreSignature: 'Votre signature',
  consentement:
    'J’ai lu le bon de commande et les conditions générales, et je les accepte. Ma signature électronique est enregistrée avec sa date, son heure et mon adresse IP.',
  aRemplir: (l) => `À remplir : ${l}.`,
  dessinez: 'Dessinez votre signature dans le cadre.',
  signer: 'Signer le contrat',
  signatureEnCours: 'Signature en cours…',
  lienPersonnel: 'Lien personnel — ne le transférez pas.',
  erreurSignature: 'Signature impossible.',
  erreurReseau: 'Erreur réseau. Réessayez.',
};

const EN: TextesPage = {
  locale: 'en-GB',
  signe: 'Contract signed',
  reference: (r, v) => `Reference ${r} · general terms and conditions, version ${v}`,
  parties: 'The parties',
  sojoriLigne: (s, n, f) => `${s}, represented by ${n || '…'}, ${f || '…'}.`,
  clientLabel: 'The Customer',
  clientInfos: 'the details you fill in below.',
  bonDeCommande: (n) => `Order form No. ${n}`,
  resume: (f, nu, d) => `Plan ${f} · ${nu} · prices exclusive of VAT, in ${d === 'EUR' ? 'euros' : 'dirhams'}`,
  totalMensuel: 'Total monthly, excl. VAT',
  uneSeuleFois: (l) => `${l} — one-off`,
  offert: 'Free',
  remise: (p) => `Discount${p ? ` (${p}%)` : ''}`,
  conditions: (t) =>
    `VAT ${t}% in addition. Monthly, with no commitment. You can add or change options at any time, without a new contract.`,
  siegeSojori: (a) => `registered office: ${a}`,
  rc: (v) => `RC No. ${v}`,
  ice: (v) => `ICE No. ${v}`,
  contratComplet: 'The contract',
  signeParLabel: (p) => `Signed${p ? ` by ${p}` : ''}, countersigned by Sojori`,
  merci: 'Thank you. Your copy signed by both parties, with its signature certificate:',
  telecharger: 'Download the signed contract (PDF)',
  vosInfos: 'Your details',
  votreSignature: 'Your signature',
  consentement:
    'I have read the order form and the general terms and conditions, and I accept them. My electronic signature is recorded with its date, time and my IP address.',
  aRemplir: (l) => `To fill in: ${l}.`,
  dessinez: 'Draw your signature in the box.',
  signer: 'Sign the contract',
  signatureEnCours: 'Signing…',
  lienPersonnel: 'Personal link — please do not forward it.',
  erreurSignature: 'Signing is not possible.',
  erreurReseau: 'Network error. Please try again.',
};

export const textesPage = (l?: string | null): TextesPage => (langueDePage(l) === 'en' ? EN : FR);
