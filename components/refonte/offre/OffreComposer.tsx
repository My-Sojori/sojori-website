'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { champsIdentite, erreursIdentite, paysInitial } from '@/lib/refonte/identiteDemande';
import { formaterNumero } from '@/lib/refonte/pays';
import { ChampPays } from '../ChampPays';
import { BandeauTest } from '../BandeauTest';
import { demoResponseErrorMessage, normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { trackDemoLead } from '@/lib/analytics';
import { enTetesDemande } from '@/lib/demoTest';
import { useHydrate } from '@/lib/useHydrate';
import { garderDemande, LIBELLE_INTENTION, lireDemande, oublierDemande, type DemandeEnCours, type Intention } from '@/lib/refonte/demandeEnCours';
import {
  estChoisi, estExterne, estHotel, PAR_COMPTE, PRODUITS, PROFILS, resume, segmentCrm,
  type ProfilId,
  SELECTION_PAR_DEFAUT, SITES, UTILISATEURS, VALEURS_RAPIDES,
  type ProduitId, type Selection, type SiteId, type UtilisateurId,
} from '@/lib/refonte/offre';

const DEMO_API = '/api/v1/demo';

/** Le profil de composition le plus proche de ce que le visiteur a répondu sur /demo (villa, appartement, « Autre » : le bloc conciergerie). */
function profilDepuis(c: DemandeEnCours): ProfilId {
  const hotel = ['hotel', 'riad', 'guesthouse', 'resort', 'aparthotel'].includes(c.activiteId);
  const externe = Boolean(c.currentPMS) && c.currentPMS !== 'Sojori';
  return `${hotel ? 'hotel' : 'conc'}_${externe ? 'ext' : 'sojori'}` as ProfilId;
}

/** Un petit compteur − n + : 44 px de haut, annoncé par un nom. */
function Compteur({ n, onMoins, onPlus, moinsAria, plusAria }: { n: number; onMoins: () => void; onPlus: () => void; moinsAria: string; plusAria: string }) {
  return (
    <span className="sj2-compteur">
      <button type="button" aria-label={moinsAria} onClick={onMoins}>−</button>
      <span aria-live="polite">{n}</span>
      <button type="button" aria-label={plusAria} onClick={onPlus}>+</button>
    </span>
  );
}

export function OffreComposer() {
  const t = useTranslations('refonte.offre');
  const locale = useLocale();
  const [s, setS] = useState<Selection>(SELECTION_PAR_DEFAUT);
  const maj = (p: Partial<Selection>) => setS((x) => ({ ...x, ...p }));
  const externe = estExterne(s.profil);
  const hotel = estHotel(s.profil);
  const unite = hotel ? 'Chambres' : 'Biens';

  // Une demande, deux suites (Tawfiq, 31/10/2026) : si /demo a déjà créé la demande (jeton gardé dans la page), « Envoyer mon offre »
  // la complète ; sinon les quatre coordonnées (e-mail, nom, pays, téléphone, tous obligatoires) puis l'envoi. Aucune question après.
  const hydrate = useHydrate();
  const router = useRouter();
  const [etape, setEtape] = useState<1 | 3>(1);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [nom, setNom] = useState('');
  // le pays proposé suit la langue de la page ; l'indicatif du téléphone suit le pays (et se change à part)
  const [paysIso, setPaysIso] = useState(paysInitial(locale));
  const [dialIso, setDialIso] = useState(paysInitial(locale));
  const [tel, setTel] = useState('');
  const [tente, setTente] = useState(false);
  const [connue, setConnue] = useState<DemandeEnCours | null>(null);
  // le profil préselectionné d'après ce que le visiteur a répondu sur /demo : l'envoi n'écrase segment et PMS que s'il le change
  const [profilInitial, setProfilInitial] = useState<ProfilId | null>(null);
  const [demande, setDemande] = useState<{ id: string; jeton: string } | null>(null);
  const [rdvDemande, setRdvDemande] = useState(false);
  const [erreur, setErreur] = useState('');
  // téléphone : la barre « Votre sélection » reste en bas tant que le panneau de la demande n'est pas à l'écran
  const panneau = useRef<HTMLElement>(null);
  const [panneauVu, setPanneauVu] = useState(false);
  useEffect(() => {
    const el = panneau.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const o = new IntersectionObserver(([e]) => setPanneauVu(e.isIntersecting), { threshold: 0.15 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const [statut, setStatut] = useState<'libre' | 'envoi'>('libre');

  // la demande créée sur /demo (lue après l'hydratation) ; l'ancienne adresse /offre#contact mène à /demo
  useEffect(() => {
    const c = lireDemande();
    if (c) {
      setConnue(c);
      const p = profilDepuis(c);
      setProfilInitial(p);
      setS((x) => ({ ...x, profil: p }));
    }
    if (window.location.hash === '#contact') router.replace('/demo');
  }, [router]);

  const ident = { email, nom, paysIso, tel, consent };
  const textesPays = { search: t('form.reach.countrySearch'), none: t('form.reach.countryNone'), close: t('form.reach.countryClose') };
  const err = erreursIdentite(ident);
  const ok1 = Object.keys(err).length === 0;

  // les lignes de la sélection
  const lignes: { nom: string; detail: string }[] = [];
  PRODUITS.forEach((id) => {
    if (estChoisi(s, id)) lignes.push({ nom: t(`products.${id}.name`), detail: PAR_COMPTE.includes(id) ? t('products.forAccount') : t(`selection.detail${unite}`, { n: s.n }) });
  });
  UTILISATEURS.forEach((u) => {
    const q = s.sieges[u];
    if (q > 0 && (u !== 'studio' || q > 1)) lignes.push({ nom: t(`users.${u}.name`), detail: t('selection.detailSeat', { n: q, role: t(`users.${u}.role`) }) });
  });
  if (s.site !== 'none') lignes.push({ nom: t(`site.line${s.site === 'ai' ? 'Ai' : s.site === 'template' ? 'Template' : 'Custom'}`), detail: t('site.lineDetail') });
  if (s.onboarding) lignes.push({ nom: t('service.onboarding.name'), detail: t('service.onboarding.detail') });
  if (s.numeros > 0) lignes.push({ nom: t('service.branding.name'), detail: t('service.branding.detail', { n: s.numeros }) });
  if (s.connexion) lignes.push({ nom: t('service.connection.name'), detail: t('service.connection.detail') });

  // « conciergerie, 25 biens, Agent Opérations, WhatsApp Check-in » : le cas du visiteur, repris à l'étape « envoyé »
  const choisis = PRODUITS.filter((id) => estChoisi(s, id) && id !== 'pms').slice(0, 3).map((id) => t(`products.${id}.name`));
  const cas = [t(`profile.label.${hotel ? 'hotel' : 'conc'}`), t(`selection.detail${unite}`, { n: s.n }), ...choisis].join(', ');

  /**
   * Le résumé de la sélection : il part en UN seul `qualify` (le CRM remplace `expectations` à chaque appel), l'intention et le type
   * déclaré sur /demo en tête. Le segment et le PMS ne partent que si /offre les fixe (visite directe) ou si le visiteur a changé de
   * profil : sinon le CRM garde ce que /demo lui a déjà donné (« Autre : Auberge », PMS « Cloudbeds »…).
   */
  const corpsSelection = (intention: Intention, ancienne?: DemandeEnCours | null) => {
    const profilModifie = !ancienne || (profilInitial !== null && s.profil !== profilInitial);
    const type = ancienne?.typeLibelle ? [`Type déclaré : ${ancienne.typeLibelle}${ancienne.typeAutre ? ` — ${ancienne.typeAutre}` : ''}.`] : [];
    return {
      intent: intention,
      numberOfProperties: String(s.n),
      expectations: [LIBELLE_INTENTION[intention], ...type, resume(s)].join('\n'),
      hearAboutUs: 'sojori.com · Votre offre',
      ...(profilModifie ? { segment: segmentCrm(s.profil), currentPMS: externe ? 'Garde son PMS actuel' : 'Sojori' } : {}),
    };
  };

  /** `qualify` de la demande : succès, ou le code HTTP du refus (401/403/404 : jeton refusé ; autre : réseau ou serveur). */
  const patchQualify = async (d: { id: string; jeton: string }, corps: Record<string, unknown>) => {
    try {
      const r = await fetch(`${DEMO_API}/request/${d.id}/qualify`, { method: 'PATCH', headers: enTetesDemande({ 'Content-Type': 'application/json' }), body: JSON.stringify({ qualificationToken: d.jeton, ...corps }) });
      const x = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean };
      return { ok: x.success === true, statut: r.status };
    } catch { return { ok: false, statut: 0 }; }
  };

  /**
   * Sans demande préalable : les quatre coordonnées, un seul clic. Deux appels : la demande (POST, avec les coordonnées), puis la
   * qualification (PATCH, avec la sélection). Si seul le PATCH échoue, la demande de base est enregistrée : on le dit, et un
   * nouveau clic refait seulement le PATCH (jamais un second POST).
   */
  const continuer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (statut === 'envoi') return;
    setTente(true);
    if (!ok1) return;
    setErreur('');
    setStatut('envoi');
    try {
      let cour = demande;
      if (!cour) {
        const r = await fetch(`${DEMO_API}/request`, {
          method: 'POST',
          headers: enTetesDemande({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ email: email.trim(), ...champsIdentite(ident, dialIso), consentementMessages: true, source: 'website-offre', intent: 'offre', langue: locale }),
        });
        const data = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string; qualificationToken?: string } };
        if (data.success !== true || !data.data?.id) throw new Error(demoResponseErrorMessage(data) || 'request');
        cour = { id: String(data.data.id), jeton: data.data.qualificationToken ?? '' };
        setDemande(cour);
        // Mode test (aperçus) : aucune conversion publicitaire.
        if (!(data.data as { test?: boolean } | undefined)?.test) trackDemoLead('website-offre');
      }
      const q = await patchQualify(cour, { ...champsIdentite(ident, dialIso), ...corpsSelection('offre') });
      if (!q.ok) { setErreur(t('form.errors.partial')); return; }
      // le jeton reste dans la page jusqu'à la fin : « Demander aussi un rendez-vous » complète la même demande
      garderDemande({ id: cour.id, jeton: cour.jeton, prenom: nom.trim().split(/\s+/)[0] ?? '', activiteId: '', typeLibelle: '', segment: segmentCrm(s.profil), currentPMS: externe ? 'Garde son PMS actuel' : 'Sojori', typeAutre: '', dejaDemo: false });
      setEtape(3);
    } catch {
      setErreur(t('selection.errorGeneric'));
    } finally {
      setStatut('libre');
    }
  };

  /** La demande vient de /demo : « Envoyer mon offre » la complète, rien n'est redemandé. Jeton refusé : on redemande les coordonnées. */
  const envoyerConnue = async () => {
    if (!connue || statut === 'envoi') return;
    setErreur('');
    setStatut('envoi');
    const q = await patchQualify(connue, corpsSelection(connue.dejaDemo ? 'demo+offre' : 'offre', connue));
    setStatut('libre');
    if (q.ok) { oublierDemande(); setEtape(3); return; }
    if (q.statut === 401 || q.statut === 403 || q.statut === 404) {
      oublierDemande();
      setConnue(null);
      setErreur(t('form.known.expired'));
      return;
    }
    setErreur(t('selection.errorGeneric'));
  };

  /** Après l'envoi direct : le visiteur demande aussi un rendez-vous (même demande, intention « démo + offre »). */
  const demanderRdv = async () => {
    if (!demande || statut === 'envoi') return;
    setErreur('');
    setStatut('envoi');
    const q = await patchQualify(demande, corpsSelection('demo+offre'));
    setStatut('libre');
    if (!q.ok) { setErreur(t('selection.errorGeneric')); return; }
    oublierDemande();
    setRdvDemande(true);
  };

  // le rendez-vous est demandé (sur /demo avant, ou après l'envoi) : les textes parlent du créneau ; sinon de la proposition
  const avecRdv = Boolean(connue?.dejaDemo) || rdvDemande;

  const cartePressee = (actif: boolean) => (actif ? 'sj2-ligne is-on' : 'sj2-ligne');

  return (
    <div className="sj2-offre">
      <div className="sj2-offre__gauche">
        {/* 1 · vous êtes : le profil fixe le segment du CRM et le socle */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.socle')}</legend>
          <div role="group" aria-label={t('profile.aria')} className="sj2-grille2">
            {PROFILS.map((p) => (
              <button key={p} type="button" className="sj2-choix sj2-choix--profil" aria-pressed={s.profil === p} onClick={() => maj({ profil: p })}>
                <span className="sj2-choix__type">{t(`profile.${p}.type`)}</span>
                <strong>{t(`profile.${p}.socle`)}</strong>
                <span>{t(`profile.${p}.desc`)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* 2 · parc : biens pour une conciergerie, chambres pour un hôtel ou un riad */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.parc')}</legend>
          <div className="sj2-parc">
            <div className="sj2-parc__n"><span className="sj2-parc__chiffre">{s.n}</span><span>{t(`parc.unit${unite}`, { n: s.n })}</span></div>
            <input type="range" min={1} max={250} step={1} value={s.n} aria-label={t(`parc.sliderAria${unite}`)} onChange={(e) => maj({ n: Math.min(250, Math.max(1, parseInt(e.target.value, 10) || 1)) })} />
            <div role="group" aria-label={t('parc.quickAria')} className="sj2-rapides">
              {VALEURS_RAPIDES.map((v) => (
                <button key={v} type="button" aria-pressed={s.n === v} onClick={() => maj({ n: v })}>{v}</button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* 3 · agents et options */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.agents')}</legend>
          <div className="sj2-lignes">
            {PRODUITS.filter((id) => !(externe && id === 'pms')).map((id) => {
              const bloque = externe && id === 'dynamic_pricing';
              const actif = estChoisi(s, id);
              return (
                <button key={id} type="button" className={cartePressee(actif)} aria-pressed={actif} aria-disabled={bloque || undefined}
                  onClick={() => { if (!bloque) maj({ produits: { ...s.produits, [id]: !s.produits[id as ProduitId] } }); }}>
                  <span className="sj2-case" aria-hidden="true">{actif ? '✓' : ''}</span>
                  <span className="sj2-ligne__texte">
                    <strong>{t(`products.${id}.name`)}</strong>
                    <span>{bloque ? t('products.blocked') : t(`products.${id}.desc`)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 4 · utilisateurs */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.users')}</legend>
          <p className="sj2-offre__intro">{t('users.intro')}</p>
          <div className="sj2-grille2">
            {UTILISATEURS.map((u: UtilisateurId) => (
              <div key={u} className="sj2-siege">
                <span className="sj2-siege__texte"><strong>{t(`users.${u}.name`)}</strong><span>{t(`users.${u}.info`)}</span></span>
                <Compteur n={s.sieges[u]} moinsAria={t('users.remove', { role: t(`users.${u}.role`) })} plusAria={t('users.add', { role: t(`users.${u}.role`) })}
                  onMoins={() => maj({ sieges: { ...s.sieges, [u]: Math.max(0, s.sieges[u] - 1) } })}
                  onPlus={() => maj({ sieges: { ...s.sieges, [u]: s.sieges[u] + 1 } })} />
              </div>
            ))}
          </div>
        </fieldset>

        {/* 5 · site */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.site')}</legend>
          <div role="group" aria-label={t('site.aria')} className="sj2-grille4">
            {SITES.map((w: SiteId) => (
              <button key={w} type="button" className="sj2-choix" aria-pressed={s.site === w} onClick={() => maj({ site: w })}>
                <strong>{t(`site.${w}.name`)}</strong><span>{t(`site.${w}.desc`)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* 6 · mise en service */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.service')}</legend>
          <div className="sj2-grille3">
            <button type="button" className="sj2-choix" aria-pressed={s.onboarding} onClick={() => maj({ onboarding: !s.onboarding })}>
              <strong>{t('service.onboarding.name')}</strong><span>{t('service.onboarding.desc')}</span>
            </button>
            <div className="sj2-siege">
              <span className="sj2-siege__texte"><strong>{t('service.branding.name')}</strong><span>{t('service.branding.desc')}</span></span>
              <Compteur n={s.numeros} moinsAria={t('service.branding.remove')} plusAria={t('service.branding.add')}
                onMoins={() => maj({ numeros: Math.max(0, s.numeros - 1) })} onPlus={() => maj({ numeros: s.numeros + 1 })} />
            </div>
            <button type="button" className="sj2-choix" aria-pressed={s.connexion} onClick={() => maj({ connexion: !s.connexion })}>
              <strong>{t('service.connection.name')}</strong><span>{t('service.connection.desc')}</span>
            </button>
          </div>
        </fieldset>
      </div>

      {/* la sélection et le formulaire en trois étapes */}
      <aside ref={panneau} id="contact" className="sj2-offre__selection" aria-label={t('selection.aria')}>
        <div className="sj2-selection__tete">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('selection.eyebrow')}</span>
          <span className="sj2-selection__titre">{t(`selection.title${unite}`, { n: s.n })}</span>
          <span className="sj2-selection__sous">{externe ? t('selection.withOwn') : t('selection.withSojori')}</span>
        </div>

        {lignes.length > 0 ? (
          <ul className="sj2-selection__lignes">
            {lignes.map((l) => (
              <li key={l.nom}><span>{l.nom}</span><span>{l.detail}</span></li>
            ))}
          </ul>
        ) : <p className="sj2-selection__vide">{t('selection.empty')}</p>}

        <div className="sj2-form">
          <BandeauTest />
          {etape === 1 && connue && (
            <div className="sj2-form__champs">
              <strong className="sj2-form__titre">{t('form.known.title')}</strong>
              <p className="sj2-form__aide">{connue.prenom ? t('form.known.lead', { name: connue.prenom }) : t('form.known.leadNoName')}</p>
              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              <button type="button" className="sj2-btn sj2-btn--lg sj2-form__envoi" disabled={statut === 'envoi' || !hydrate} onClick={() => void envoyerConnue()}>
                {!hydrate ? t('form.pageLoading') : statut === 'envoi' ? t('selection.sending') : t('form.known.send')}
              </button>
            </div>
          )}

          {etape === 1 && !connue && (
            <form method="post" action="#" onSubmit={continuer} noValidate className="sj2-form__champs">
              <noscript><p className="sj2-erreur" role="alert">{t('form.noscript')}</p></noscript>
              <strong className="sj2-form__titre">{t('form.email.title')}</strong>
              <p className="sj2-form__aide">{t('form.email.lead')}</p>
              <label htmlFor="sj2-email">{t('form.email.label')}</label>
              <input id="sj2-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-invalid={tente && err.email ? true : undefined} aria-describedby={tente && err.email ? 'sj2-err-email' : undefined} />
              {tente && err.email && <p className="sj2-erreur sj2-erreur--champ" id="sj2-err-email">{t('form.errors.email')}</p>}
              <label htmlFor="sj2-nom">{t('form.reach.name')}</label>
              <input id="sj2-nom" type="text" autoComplete="name" value={nom} onChange={(e) => setNom(e.target.value)} required aria-invalid={tente && err.nom ? true : undefined} aria-describedby={tente && err.nom ? 'sj2-err-nom' : undefined} />
              {tente && err.nom && <p className="sj2-erreur sj2-erreur--champ" id="sj2-err-nom">{t('form.errors.name')}</p>}
              <label htmlFor="sj2-pays">{t('form.reach.country')}</label>
              <ChampPays id="sj2-pays" valeur={paysIso} locale={locale} affichage="pays" libelle={t('form.reach.country')} textes={textesPays}
                invalide={tente && err.pays} onChoisir={(iso) => { setPaysIso(iso); setDialIso(iso); setTel((v) => formaterNumero(v, iso)); }} />
              {tente && err.pays && <p className="sj2-erreur sj2-erreur--champ">{t('form.errors.country')}</p>}
              <label htmlFor="sj2-tel">{t('form.reach.phone')}</label>
              <div className="sj2-tel">
                <ChampPays id="sj2-dial" valeur={dialIso} locale={locale} affichage="indicatif" libelle={t('form.reach.dial')} textes={textesPays}
                  onChoisir={(iso) => { setDialIso(iso); setTel((v) => formaterNumero(v, iso)); }} />
                <input id="sj2-tel" type="tel" inputMode="tel" autoComplete="tel-national" value={tel} onChange={(e) => setTel(formaterNumero(e.target.value, dialIso))} required aria-invalid={tente && err.tel ? true : undefined} aria-describedby={tente && err.tel ? 'sj2-err-tel' : undefined} />
              </div>
              {tente && err.tel && <p className="sj2-erreur sj2-erreur--champ" id="sj2-err-tel">{t('form.errors.phone')}</p>}
              <label className="sj2-consent">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                <span>{t('form.email.consent')}</span>
              </label>
              {tente && err.consent && <p className="sj2-erreur sj2-erreur--champ">{t('form.errors.consent')}</p>}
              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              <button type="submit" className="sj2-btn sj2-btn--lg sj2-form__envoi" disabled={statut === 'envoi' || !hydrate}>
                {!hydrate ? t('form.pageLoading') : statut === 'envoi' ? t('selection.sending') : t('form.email.submit')}
              </button>
              <p className="sj2-form__note">{t('form.email.saved')}</p>
            </form>
          )}

          {etape === 3 && (
            <div className="sj2-merci" role="status">
              <strong>{(nom.trim().split(/\s+/)[0] || connue?.prenom || '') ? t('form.sent.thanksName', { name: nom.trim().split(/\s+/)[0] || connue?.prenom || '' }) : t('form.sent.thanks')}</strong>
              <ol className="sj2-merci__etapes">
                <li><span className="sj2-merci__n" aria-hidden="true">1</span><span>{t('form.sent.s1', { cas: cas })}</span></li>
                <li><span className="sj2-merci__n" aria-hidden="true">2</span><span>{avecRdv ? (email.trim() ? t('form.sent.s2', { email: email.trim() }) : t('form.sent.s2Generic')) : t('form.sent.s2Offer', { email: email.trim() })}</span></li>
                <li><span className="sj2-merci__n" aria-hidden="true">3</span><span>{avecRdv ? t('form.sent.s3') : t('form.sent.s3Offer')}</span></li>
              </ol>
              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              {rdvDemande && <p className="sj2-form__aide">{t('form.sent.meetingAsked')}</p>}
              {!rdvDemande && !connue?.dejaDemo && demande && (
                <div className="sj2-merci__plus">
                  <button type="button" className="sj2-btn sj2-btn--lg" disabled={statut === 'envoi' || !hydrate} onClick={() => void demanderRdv()}>
                    {statut === 'envoi' ? t('selection.sending') : t('form.sent.alsoMeeting')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
      {etape === 1 && !panneauVu && (
        <div className="sj2-barre-selection" role="region" aria-label={t('selection.aria')}>
          <span className="sj2-barre-selection__texte">
            <strong>{t('selection.aria')}</strong>
            <span>{t('selection.barCount', { n: lignes.length })}</span>
          </span>
          <button
            type="button"
            className="sj2-btn"
            disabled={statut === 'envoi' || !hydrate}
            onClick={() => { if (connue) void envoyerConnue(); else panneau.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
          >
            {connue ? t('form.known.send') : t('form.email.submit')}
          </button>
        </div>
      )}
    </div>
  );
}
