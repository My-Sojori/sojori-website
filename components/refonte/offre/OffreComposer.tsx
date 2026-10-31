'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { PHONE_DIAL_ROWS } from '@/lib/phoneDialCodesData';
import { demoResponseErrorMessage, normalizeDemoBackendResponse } from '@/lib/demoApiResponse';
import { trackDemoLead } from '@/lib/analytics';
import {
  BIENTOT, estChoisi, PAR_COMPTE, PRODUITS, resume, SELECTION_PAR_DEFAUT, SITES, UTILISATEURS, VALEURS_RAPIDES,
  type BientotId, type ProduitId, type Selection, type SiteId, type UtilisateurId,
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

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [iso, setIso] = useState('MA');
  const [tel, setTel] = useState('');
  const [consent, setConsent] = useState(false);
  const [erreur, setErreur] = useState('');
  const [statut, setStatut] = useState<'libre' | 'envoi' | 'ok'>('libre');

  const dial = PHONE_DIAL_ROWS.find((r) => r.iso === iso)?.dial ?? '+212';

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

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (statut === 'envoi') return;
    if (!nom.trim()) { setErreur(t('selection.errorName')); return; }
    if (!EMAIL.test(email.trim())) { setErreur(t('selection.errorEmail')); return; }
    if (!consent) { setErreur(t('selection.errorConsent')); return; }
    setErreur('');
    setStatut('envoi');
    try {
      const r = await fetch(`${DEMO_API}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          fullName: nom.trim(),
          phone: tel.replace(/\D/g, ''),
          countryCode: dial,
          numberOfProperties: String(s.n),
          consentementMessages: true,
          source: 'website-offre',
          langue: locale,
        }),
      });
      const data = normalizeDemoBackendResponse(await r.json().catch(() => ({}))) as { success?: boolean; data?: { id?: string; qualificationToken?: string } };
      if (data.success !== true || !data.data?.id) throw new Error(demoResponseErrorMessage(data) || 'request');
      // Les choix partent avec la demande, dans « attentes » (le conseiller les lit). Si ce second envoi échoue,
      // la demande existe déjà : on ne bloque pas le visiteur.
      try {
        await fetch(`${DEMO_API}/request/${data.data.id}/qualify`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qualificationToken: data.data.qualificationToken ?? '',
            fullName: nom.trim(),
            numberOfProperties: String(s.n),
            currentPMS: externe ? 'Garde son PMS actuel' : 'PMS Sojori',
            expectations: resume(s),
            hearAboutUs: 'sojori.com · Votre offre',
          }),
        });
      } catch { /* voir plus haut */ }
      trackDemoLead('website-offre');
      setStatut('ok');
    } catch {
      setErreur(t('selection.errorGeneric'));
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

      {/* la sélection et le formulaire */}
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

        {statut === 'ok' ? (
          <div className="sj2-merci" role="status">
            <strong>{t('selection.successTitle')}</strong>
            <p>{t('selection.successText')}</p>
            <button type="button" className="sj2-btn sj2-btn--ghost sj2-btn--sm" onClick={() => setStatut('libre')}>{t('selection.again')}</button>
          </div>
        ) : (
          <form className="sj2-form" onSubmit={envoyer} noValidate>
            <label htmlFor="sj2-nom">{t('selection.name')}</label>
            <input id="sj2-nom" type="text" autoComplete="name" value={nom} onChange={(e) => setNom(e.target.value)} required aria-invalid={erreur === t('selection.errorName') || undefined} />
            <label htmlFor="sj2-email">{t('selection.email')}</label>
            <input id="sj2-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="sj2-tel">{t('selection.phone')}</label>
            <div className="sj2-tel">
              <select aria-label={t('selection.dial')} value={iso} onChange={(e) => setIso(e.target.value)}>
                {PHONE_DIAL_ROWS.map((r) => <option key={r.iso} value={r.iso}>{r.emoji} {r.dial} ({r.iso})</option>)}
              </select>
              <input id="sj2-tel" type="tel" inputMode="tel" autoComplete="tel-national" value={tel} onChange={(e) => setTel(e.target.value)} />
            </div>
            <label className="sj2-consent">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>{t('selection.consent')}</span>
            </label>
            {erreur && <p className="sj2-erreur" role="alert">{erreur}</p>}
            <button type="submit" className="sj2-btn sj2-btn--lg" disabled={statut === 'envoi'}>{statut === 'envoi' ? t('selection.sending') : t('selection.submit')}</button>
            <p className="sj2-form__note">{t('selection.slot')}</p>
            <p className="sj2-form__note">{t('selection.note')}</p>
          </form>
        )}
      </aside>
    </div>
  );
}
