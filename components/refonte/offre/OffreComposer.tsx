'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { champsIdentite, erreursIdentite, paysInitial } from '@/lib/refonte/identiteDemande';
import { formaterNumero } from '@/lib/refonte/pays';
import { ChampPays } from '../ChampPays';
import { BandeauTest } from '../BandeauTest';
import { demoResponseErrorMessage, normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { trackDemoLead } from '@/lib/analytics';
import { enTetesDemande } from '@/lib/demoTest';
import {
  estChoisi, estExterne, estHotel, PAR_COMPTE, PRODUITS, PROFILS, QUANDS, QUANDS_FR, resume, segmentCrm,
  SELECTION_PAR_DEFAUT, SITES, UTILISATEURS, VALEURS_RAPIDES,
  type ProduitId, type QuandId, type Selection, type SiteId, type UtilisateurId,
} from '@/lib/refonte/offre';

const DEMO_API = '/api/v1/demo';

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

  // le formulaire en trois étapes (Tawfiq, 31/10/2026) : les quatre coordonnées d'abord (e-mail, nom, pays, téléphone, tous
  // obligatoires) ; puis « c'est envoyé » et trois questions facultatives ; puis le récapitulatif
  const [etape, setEtape] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [nom, setNom] = useState('');
  // le pays proposé suit la langue de la page ; l'indicatif du téléphone suit le pays (et se change à part)
  const [paysIso, setPaysIso] = useState(paysInitial(locale));
  const [dialIso, setDialIso] = useState(paysInitial(locale));
  const [tel, setTel] = useState('');
  const [tente, setTente] = useState(false);
  const [pmsNom, setPmsNom] = useState('');
  const [quand, setQuand] = useState<QuandId | null>(null);
  const [ville, setVille] = useState('');
  const [demande, setDemande] = useState<{ id: string; jeton: string } | null>(null);
  const [erreur, setErreur] = useState('');
  const [statut, setStatut] = useState<'libre' | 'envoi'>('libre');

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

  /** Le résumé de la sélection de la page : il part avec la demande, même si le visiteur passe l'étape 2. */
  const corpsSelection = () => ({
    numberOfProperties: String(s.n),
    expectations: resume(s),
    hearAboutUs: 'sojori.com · Votre offre',
    segment: segmentCrm(s.profil),
    currentPMS: externe ? (pmsNom.trim() ? pmsNom.trim().slice(0, 80) : 'Garde son PMS actuel') : 'Sojori',
  });

  /**
   * Étape 1 : les quatre coordonnées et l'accord, un seul clic. Deux appels : la demande (POST, avec les coordonnées),
   * puis la qualification (PATCH, avec la sélection de la page). Si le second échoue, la demande existe déjà : on le dit
   * et un nouveau clic ne refait que le PATCH.
   */
  const continuer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (statut === 'envoi') return;
    setTente(true);
    if (!ok1) return;
    setErreur('');
    setStatut('envoi');
    try {
      let courante = demande;
      if (!courante) {
        const r = await fetch(`${DEMO_API}/request`, {
          method: 'POST',
          headers: enTetesDemande({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ email: email.trim(), ...champsIdentite(ident, dialIso), consentementMessages: true, source: 'website-offre', langue: locale }),
        });
        const data = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string; qualificationToken?: string } };
        if (data.success !== true || !data.data?.id) throw new Error(demoResponseErrorMessage(data) || 'request');
        courante = { id: String(data.data.id), jeton: data.data.qualificationToken ?? '' };
        setDemande(courante);
        // Mode test (aperçus) : aucune conversion publicitaire.
        if (!(data.data as { test?: boolean } | undefined)?.test) trackDemoLead('website-offre');
      }
      try {
        const r2 = await fetch(`${DEMO_API}/request/${courante.id}/qualify`, {
          method: 'PATCH',
          headers: enTetesDemande({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ qualificationToken: courante.jeton, ...champsIdentite(ident, dialIso), ...corpsSelection() }),
        });
        const d2 = normalizeDemoBackendResponse(await r2.json().catch(() => ({}))) as { success?: boolean };
        if (d2.success !== true) throw new Error('qualify');
      } catch {
        setErreur(t('form.errors.partial'));
        return;
      }
      setEtape(2);
    } catch {
      setErreur(t('selection.errorGeneric'));
    } finally {
      setStatut('libre');
    }
  };

  /** Étape 2 : trois questions facultatives, envoyées en complément (ville, PMS gardé, démarrage). */
  const envoyer = async (passer: boolean) => {
    if (!demande || statut === 'envoi') return;
    setErreur('');
    if (passer || (!ville.trim() && !quand && !(externe && pmsNom.trim()))) { setEtape(3); return; }
    setStatut('envoi');
    try {
      const r = await fetch(`${DEMO_API}/request/${demande.id}/qualify`, {
        method: 'PATCH',
        headers: enTetesDemande({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          qualificationToken: demande.jeton,
          ...corpsSelection(),
          ...(quand ? { timeline: QUANDS_FR[quand] } : {}),
          ...(ville.trim() ? { cities: [ville.trim().slice(0, 60)] } : {}),
        }),
      });
      const data = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean };
      if (data.success !== true) throw new Error('qualify');
      setEtape(3);
    } catch {
      setErreur(t('selection.errorGeneric'));
    } finally {
      setStatut('libre');
    }
  };

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
      <aside id="contact" className="sj2-offre__selection" aria-label={t('selection.aria')}>
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
          <ol className="sj2-pas sj2-pas--3" aria-label={t('form.stepsAria')}>
            {(['email', 'reach', 'sent'] as const).map((k, i) => (
              <li key={k} aria-current={etape === i + 1 ? 'step' : undefined} className={etape >= i + 1 ? 'is-on' : ''}>
                <span className="sj2-pas__barre" aria-hidden="true" />
                <span>{i + 1} · {t(`form.step.${k}`)}</span>
              </li>
            ))}
          </ol>

          {etape === 1 && (
            <form onSubmit={continuer} noValidate className="sj2-form__champs">
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
              <button type="submit" className="sj2-btn sj2-btn--lg sj2-form__envoi" disabled={statut === 'envoi'}>
                {statut === 'envoi' ? t('selection.sending') : t('form.email.submit')}
              </button>
              <p className="sj2-form__note">{t('form.email.saved')}</p>
            </form>
          )}

          {etape === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); void envoyer(false); }} noValidate className="sj2-form__champs">
              <strong className="sj2-form__titre">{t('form.reach.title')}</strong>
              <p className="sj2-form__aide">{t('form.reach.lead')}</p>
              <label htmlFor="sj2-ville">{t('form.reach.city')}</label>
              <input id="sj2-ville" type="text" autoComplete="address-level2" value={ville} onChange={(e) => setVille(e.target.value)} />
              {externe && (
                <>
                  <label htmlFor="sj2-pms">{t('form.reach.pms')}</label>
                  <input id="sj2-pms" type="text" value={pmsNom} onChange={(e) => setPmsNom(e.target.value)} />
                </>
              )}
              <fieldset className="sj2-q">
                <legend>{t('form.reach.whenTitle')}</legend>
                <div className="sj2-chips2">
                  {QUANDS.map((x) => <button key={x} type="button" aria-pressed={quand === x} onClick={() => setQuand(quand === x ? null : x)}>{t(`form.reach.${x}`)}</button>)}
                </div>
              </fieldset>

              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              <button type="submit" className="sj2-btn sj2-btn--lg" disabled={statut === 'envoi'}>{statut === 'envoi' ? t('selection.sending') : t('form.reach.send')}</button>
              <button type="button" className="sj2-lien" onClick={() => void envoyer(true)} disabled={statut === 'envoi'}>{t('form.reach.skip')}</button>
              <p className="sj2-form__note">{t('form.reach.note')}</p>
            </form>
          )}

          {etape === 3 && (
            <div className="sj2-merci" role="status">
              <strong>{nom.trim() ? t('form.sent.thanksName', { name: nom.trim().split(' ')[0] }) : t('form.sent.thanks')}</strong>
              <ol className="sj2-merci__etapes">
                <li><span className="sj2-merci__n" aria-hidden="true">1</span><span>{t('form.sent.s1', { cas: cas })}</span></li>
                <li><span className="sj2-merci__n" aria-hidden="true">2</span><span>{t('form.sent.s2', { email: email.trim() })}</span></li>
                <li><span className="sj2-merci__n" aria-hidden="true">3</span><span>{t('form.sent.s3')}</span></li>
              </ol>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
