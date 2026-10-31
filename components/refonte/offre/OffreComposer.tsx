'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { PHONE_DIAL_ROWS } from '@/lib/phoneDialCodesData';
import { PAYS_DEMO } from '@/lib/demoQualification';
import { demoResponseErrorMessage, normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { trackDemoLead } from '@/lib/analytics';
import {
  BIENTOT, estChoisi, OUTILS, OUTILS_FR, PAR_COMPTE, PRIORITES, PRIORITES_FR, PRODUITS, QUANDS, QUANDS_FR, resume,
  SEGMENTS, SELECTION_PAR_DEFAUT, SITES, UTILISATEURS, VALEURS_RAPIDES,
  type BientotId, type OutilId, type PrioriteId, type ProduitId, type QuandId, type SegmentId, type Selection, type SiteId, type UtilisateurId,
} from '@/lib/refonte/offre';

const DEMO_API = '/api/v1/demo';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const externe = s.mode === 'externe';

  // le formulaire en trois étapes (Tawfiq, 31/10/2026) : l'e-mail d'abord, puis la préparation de la démo (facultative), puis « envoyé »
  const [etape, setEtape] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [nom, setNom] = useState('');
  const [pays, setPays] = useState('');
  const [paysAutre, setPaysAutre] = useState('');
  const [iso, setIso] = useState('MA');
  const [tel, setTel] = useState('');
  const [segment, setSegment] = useState<SegmentId | null>(null);
  const [outil, setOutil] = useState<OutilId | null>(null);
  const [pmsNom, setPmsNom] = useState('');
  const [prios, setPrios] = useState<PrioriteId[]>([]);
  const [quand, setQuand] = useState<QuandId | null>(null);
  const [ville, setVille] = useState('');
  const [demande, setDemande] = useState<{ id: string; jeton: string } | null>(null);
  const [erreur, setErreur] = useState('');
  const [statut, setStatut] = useState<'libre' | 'envoi'>('libre');

  // +212 par défaut ; +33 pour un navigateur en fr-FR sur la page française.
  useEffect(() => {
    try { if (locale === 'fr' && /^fr-FR/i.test(navigator.language)) setIso('FR'); } catch { /* garde le Maroc */ }
  }, [locale]);

  const dial = PHONE_DIAL_ROWS.find((r) => r.iso === iso)?.dial ?? '+212';
  const nomPays = useMemo(() => {
    let noms: Intl.DisplayNames | null = null;
    try { noms = new Intl.DisplayNames([locale], { type: 'region' }); } catch { /* repli : le nom français */ }
    return (code: string, repli: string) => { try { return noms?.of(code) ?? repli; } catch { return repli; } };
  }, [locale]);

  const emailOk = EMAIL.test(email.trim());
  const ok1 = emailOk && consent;
  const reponses = [segment, outil, prios.length ? 'p' : null, quand, tel.replace(/\D/g, '').length >= 8 ? 't' : null].filter(Boolean).length;

  // les lignes de la sélection
  const lignes: { nom: string; detail: string }[] = [];
  PRODUITS.forEach((id) => {
    if (estChoisi(s, id)) lignes.push({ nom: t(`products.${id}.name`), detail: PAR_COMPTE.includes(id) ? t('products.forAccount') : t('selection.detailQty', { n: s.n }) });
  });
  UTILISATEURS.forEach((u) => {
    const q = s.sieges[u];
    if (q > 0 && (u !== 'studio' || q > 1)) lignes.push({ nom: t(`users.${u}.name`), detail: t('selection.detailSeat', { n: q, role: t(`users.${u}.role`) }) });
  });
  if (s.site !== 'none') lignes.push({ nom: t(`site.line${s.site === 'ai' ? 'Ai' : s.site === 'template' ? 'Template' : 'Custom'}`), detail: t('site.lineDetail') });
  if (s.onboarding) lignes.push({ nom: t('service.onboarding.name'), detail: t('service.onboarding.detail') });
  if (s.numeros > 0) lignes.push({ nom: t('service.branding.name'), detail: t('service.branding.detail', { n: s.numeros }) });
  if (s.connexion) lignes.push({ nom: t('service.connection.name'), detail: t('service.connection.detail') });
  BIENTOT.forEach((b) => { if (s.bientot[b]) lignes.push({ nom: t(`soon.${b}.name`), detail: t('soon.detail') }); });

  /** Étape 1 : l'e-mail et l'accord seuls. La demande existe dès ici. */
  const continuer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok1 || statut === 'envoi') return;
    setErreur('');
    if (demande) { setEtape(2); return; }
    setStatut('envoi');
    try {
      const r = await fetch(`${DEMO_API}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consentementMessages: true, source: 'website-offre', langue: locale }),
      });
      const data = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string; qualificationToken?: string } };
      if (data.success !== true || !data.data?.id) throw new Error(demoResponseErrorMessage(data) || 'request');
      setDemande({ id: String(data.data.id), jeton: data.data.qualificationToken ?? '' });
      trackDemoLead('website-offre');
      setEtape(2);
    } catch {
      setErreur(t('selection.errorGeneric'));
    } finally {
      setStatut('libre');
    }
  };

  /**
   * Étape 2 : tout est facultatif. Le résumé des choix de la page part toujours (expectations), même si le visiteur
   * passe l'étape ; le reste n'est envoyé que s'il est renseigné.
   */
  const envoyer = async (passer: boolean) => {
    if (!demande || statut === 'envoi') return;
    setErreur('');
    setStatut('envoi');
    const paysFinal = pays === 'Autre' ? paysAutre.trim().slice(0, 60) : pays;
    const chiffres = tel.replace(/\D/g, '').replace(/^0+/, '');
    try {
      const r = await fetch(`${DEMO_API}/request/${demande.id}/qualify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualificationToken: demande.jeton,
          numberOfProperties: String(s.n),
          expectations: resume(s),
          hearAboutUs: 'sojori.com · Votre offre',
          currentPMS: outil ? (outil === 'pms' && pmsNom.trim() ? pmsNom.trim() : OUTILS_FR[outil]) : (externe ? 'Garde son PMS actuel' : 'PMS Sojori'),
          ...(passer ? {} : {
            ...(nom.trim() ? { fullName: nom.trim() } : {}),
            ...(paysFinal ? { country: paysFinal } : {}),
            ...(chiffres.length >= 8 ? { phone: chiffres, countryCode: dial } : {}),
            ...(segment ? { segment } : {}),
            ...(prios.length ? { biggestChallenges: prios.map((x) => PRIORITES_FR[x]).join(' · ') } : {}),
            ...(quand ? { timeline: QUANDS_FR[quand] } : {}),
            ...(ville.trim() ? { cities: [ville.trim().slice(0, 60)] } : {}),
          }),
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
        {/* 1 · socle */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.socle')}</legend>
          <div role="group" aria-label={t('mode.aria')} className="sj2-grille2">
            {(['sojori', 'externe'] as const).map((m) => (
              <button key={m} type="button" className="sj2-choix" aria-pressed={s.mode === m} onClick={() => maj({ mode: m })}>
                <strong>{t(`mode.${m === 'sojori' ? 'sojori' : 'own'}.title`)}</strong>
                <span>{t(`mode.${m === 'sojori' ? 'sojori' : 'own'}.desc`)}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* 2 · parc */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.parc')}</legend>
          <div className="sj2-parc">
            <div className="sj2-parc__n"><span className="sj2-parc__chiffre">{s.n}</span><span>{s.n > 1 ? t('parc.unitMany') : t('parc.unitOne')}</span></div>
            <input type="range" min={1} max={250} step={1} value={s.n} aria-label={t('parc.sliderAria')} onChange={(e) => maj({ n: Math.min(250, Math.max(1, parseInt(e.target.value, 10) || 1)) })} />
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

        {/* 7 · bientôt */}
        <fieldset className="sj2-etape-offre">
          <legend className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('steps.soon')}</legend>
          <p className="sj2-offre__intro">{t('soon.intro')}</p>
          <div className="sj2-grille3">
            {BIENTOT.map((b: BientotId) => {
              const a = !!s.bientot[b];
              return (
                <button key={b} type="button" className="sj2-choix sj2-choix--soon" aria-pressed={a} onClick={() => maj({ bientot: { ...s.bientot, [b]: !a } })}>
                  <strong>{t(`soon.${b}.name`)}</strong><span>{t(`soon.${b}.desc`)}</span>
                  <em>{a ? t('soon.interestedOn') : t('soon.interested')}</em>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* la sélection et le formulaire en trois étapes */}
      <aside id="contact" className="sj2-offre__selection" aria-label={t('selection.aria')}>
        <div className="sj2-selection__tete">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('selection.eyebrow')}</span>
          <span className="sj2-selection__titre">{t('selection.title', { n: s.n })}</span>
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
          <ol className="sj2-pas sj2-pas--3" aria-label={t('form.stepsAria')}>
            {(['email', 'prepare', 'sent'] as const).map((k, i) => (
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
              <input id="sj2-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label className="sj2-consent">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>{t('form.email.consent')}</span>
              </label>
              {!ok1 && <p className="sj2-form__aide" id="sj2-aide1">{t('form.email.help')}</p>}
              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              <button type="submit" className="sj2-btn sj2-btn--lg" disabled={!ok1 || statut === 'envoi'} aria-describedby={!ok1 ? 'sj2-aide1' : undefined}>
                {statut === 'envoi' ? t('selection.sending') : t('form.email.submit')}
              </button>
              <p className="sj2-form__note">{t('form.email.saved')}</p>
            </form>
          )}

          {etape === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); void envoyer(false); }} noValidate className="sj2-form__champs">
              <strong className="sj2-form__titre">{t('form.prepare.title')}</strong>
              <p className="sj2-form__aide">{t('form.prepare.lead')}</p>
              <label htmlFor="sj2-nom">{t('form.prepare.name')}</label>
              <input id="sj2-nom" type="text" autoComplete="name" value={nom} onChange={(e) => setNom(e.target.value)} />
              <label htmlFor="sj2-pays">{t('form.prepare.country')}</label>
              <select id="sj2-pays" value={pays} onChange={(e) => {
                const v = e.target.value; setPays(v);
                const p = PAYS_DEMO.find((x) => x.id === v);
                if (p?.iso) setIso(p.iso);
              }}>
                <option value="" />
                {PAYS_DEMO.map((p) => <option key={p.id} value={p.id}>{p.iso ? nomPays(p.iso, p.label) : t('form.prepare.otherCountry')}</option>)}
              </select>
              {pays === 'Autre' && (
                <input type="text" aria-label={t('form.prepare.countryOther')} placeholder={t('form.prepare.countryOther')} value={paysAutre} onChange={(e) => setPaysAutre(e.target.value)} />
              )}
              <label htmlFor="sj2-tel">{t('form.prepare.phone')} <em className="sj2-hint">· {t('form.prepare.phoneHint')}</em></label>
              <div className="sj2-tel">
                <select aria-label={t('form.prepare.dial')} value={iso} onChange={(e) => setIso(e.target.value)}>
                  {PHONE_DIAL_ROWS.map((r) => <option key={r.iso} value={r.iso}>{t('form.prepare.dialOption', { dial: r.dial, country: nomPays(r.iso, r.nameFr) })}</option>)}
                </select>
                <input id="sj2-tel" type="tel" inputMode="tel" autoComplete="tel-national" value={tel} onChange={(e) => setTel(e.target.value)} />
              </div>

              <fieldset className="sj2-q">
                <legend>{t('form.segment.title')}</legend>
                <div className="sj2-chips2">
                  {SEGMENTS.map((x) => <button key={x} type="button" aria-pressed={segment === x} onClick={() => setSegment(segment === x ? null : x)}>{t(`form.segment.${x}`)}</button>)}
                </div>
              </fieldset>
              <fieldset className="sj2-q">
                <legend>{t('form.tool.title')}</legend>
                <div className="sj2-chips2">
                  {OUTILS.map((x) => <button key={x} type="button" aria-pressed={outil === x} onClick={() => setOutil(outil === x ? null : x)}>{t(`form.tool.${x}`)}</button>)}
                </div>
                {outil === 'pms' && (
                  <input id="sj2-pms" type="text" aria-label={t('form.tool.pmsName')} placeholder={t('form.tool.pmsName')} value={pmsNom} onChange={(e) => setPmsNom(e.target.value)} />
                )}
              </fieldset>
              <fieldset className="sj2-q">
                <legend>{t('form.priorities.title')} <em className="sj2-hint">· {t('form.priorities.hint')}</em></legend>
                <div className="sj2-chips2">
                  {PRIORITES.map((x) => {
                    const on = prios.includes(x);
                    return <button key={x} type="button" aria-pressed={on} aria-disabled={(!on && prios.length >= 2) || undefined}
                      onClick={() => setPrios((p) => (p.includes(x) ? p.filter((y) => y !== x) : p.length >= 2 ? p : [...p, x]))}>{t(`form.priorities.${x}`)}</button>;
                  })}
                </div>
              </fieldset>
              <fieldset className="sj2-q">
                <legend>{t('form.when.title')}</legend>
                <div className="sj2-chips2">
                  {QUANDS.map((x) => <button key={x} type="button" aria-pressed={quand === x} onClick={() => setQuand(quand === x ? null : x)}>{t(`form.when.${x}`)}</button>)}
                </div>
              </fieldset>
              <label htmlFor="sj2-ville">{t('form.prepare.city')}</label>
              <input id="sj2-ville" type="text" autoComplete="address-level2" value={ville} onChange={(e) => setVille(e.target.value)} />

              {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
              <button type="submit" className="sj2-btn sj2-btn--lg" disabled={statut === 'envoi'}>{statut === 'envoi' ? t('selection.sending') : t('form.prepare.send')}</button>
              <button type="button" className="sj2-lien" onClick={() => void envoyer(true)} disabled={statut === 'envoi'}>{t('form.prepare.skip')}</button>
              <p className="sj2-form__note">{t('form.prepare.noCommitment')}</p>
            </form>
          )}

          {etape === 3 && (
            <div className="sj2-merci" role="status">
              <strong>{t('form.sent.title')}</strong>
              <ol className="sj2-merci__etapes">
                {(['s1', 's2', 's3'] as const).map((k, i) => (
                  <li key={k}><span className="sj2-merci__n" aria-hidden="true">{i + 1}</span><span>{t(`form.sent.${k}`, { email: email.trim() })}</span></li>
                ))}
              </ol>
              {reponses < 4 && (
                <div className="sj2-merci__plus">
                  <p>{t('form.sent.more')}</p>
                  <button type="button" className="sj2-btn sj2-btn--ghost sj2-btn--sm" onClick={() => setEtape(2)}>{t('form.sent.complete')}</button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
