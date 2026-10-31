'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { chercher, ligneDe, nomDans } from '@/lib/refonte/pays';

type Textes = { search: string; none: string; close: string };

/**
 * Un choix de pays par la recherche (motif « combobox » : bouton, champ de recherche, liste d'options). On tape « mar »,
 * « fra », « +33 » ou « 212 » et la liste se réduit ; flèches, Entrée et Échap ; cibles de 44 px. Sur téléphone la liste
 * s'ouvre en feuille plein écran, la recherche en haut. `affichage` dit ce que montre le bouton : le nom du pays, ou
 * son indicatif (pour le téléphone).
 */
export function ChampPays({ id, valeur, onChoisir, locale, affichage, libelle, textes, invalide, decrit }: {
  id: string;
  valeur: string;
  onChoisir: (iso: string) => void;
  locale: string;
  affichage: 'pays' | 'indicatif';
  libelle: string;
  textes: Textes;
  invalide?: boolean;
  decrit?: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [q, setQ] = useState('');
  const [actif, setActif] = useState(0);
  const racine = useRef<HTMLDivElement>(null);
  const bouton = useRef<HTMLButtonElement>(null);
  const champ = useRef<HTMLInputElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const listeId = useId();

  const lignes = useMemo(() => (ouvert ? chercher(locale, q) : []), [ouvert, locale, q]);
  const courante = valeur ? ligneDe(valeur) : undefined;

  const fermer = (rendreLeFocus: boolean) => {
    setOuvert(false);
    setQ('');
    if (rendreLeFocus) bouton.current?.focus();
  };
  const ouvrir = () => {
    setActif(Math.max(0, chercher(locale, '').findIndex((r) => r.iso === valeur)));
    setOuvert(true);
  };
  const choisir = (iso: string) => { onChoisir(iso); fermer(true); };

  // le champ de recherche prend le focus ; un clic ailleurs ferme ; sur téléphone la page ne défile plus derrière la feuille
  useEffect(() => {
    if (!ouvert) return;
    champ.current?.focus();
    const dehors = (e: MouseEvent) => { if (!racine.current?.contains(e.target as Node)) fermer(false); };
    document.addEventListener('mousedown', dehors);
    let rm = false;
    try { rm = window.matchMedia('(max-width: 640px)').matches; } catch { /* sans effet */ }
    const avant = document.body.style.overflow;
    if (rm) document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('mousedown', dehors); document.body.style.overflow = avant; };
  }, [ouvert]);

  // l'option active reste visible dans la liste (défilement de la liste seule, jamais de la page)
  useEffect(() => {
    if (!ouvert) return;
    const ul = liste.current; const li = ul?.children[actif] as HTMLElement | undefined;
    if (!ul || !li) return;
    if (li.offsetTop < ul.scrollTop) ul.scrollTop = li.offsetTop;
    else if (li.offsetTop + li.offsetHeight > ul.scrollTop + ul.clientHeight) ul.scrollTop = li.offsetTop + li.offsetHeight - ul.clientHeight;
  }, [actif, ouvert, lignes]);

  const touche = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActif((a) => Math.min(lignes.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActif((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setActif(0); }
    else if (e.key === 'End') { e.preventDefault(); setActif(Math.max(0, lignes.length - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (lignes[actif]) choisir(lignes[actif].iso); }
    else if (e.key === 'Escape') { e.preventDefault(); fermer(true); }
    else if (e.key === 'Tab') fermer(false);
  };

  const texteBouton = courante ? (affichage === 'pays' ? nomDans(locale, courante) : courante.dial) : '';

  return (
    <div className={`sj2-combo sj2-combo--${affichage}${ouvert ? ' is-ouvert' : ''}`} ref={racine}>
      <button
        ref={bouton}
        id={id}
        type="button"
        role="combobox"
        className="sj2-combo__bouton"
        aria-haspopup="listbox"
        aria-expanded={ouvert}
        aria-controls={ouvert ? listeId : undefined}
        aria-label={affichage === 'indicatif' ? `${libelle} ${texteBouton}` : undefined}
        aria-invalid={invalide ? true : undefined}
        aria-describedby={decrit}
        onClick={() => (ouvert ? fermer(false) : ouvrir())}
        onKeyDown={(e) => { if (!ouvert && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); ouvrir(); } }}
      >
        <span aria-hidden="true">{courante?.emoji ?? '🌍'}</span>
        <span className="sj2-combo__texte">{texteBouton}</span>
        <span className="sj2-combo__fleche" aria-hidden="true">▾</span>
      </button>
      {ouvert && (
        <div className="sj2-combo__panneau" role="dialog" aria-label={libelle}>
          <div className="sj2-combo__tete">
            <input
              ref={champ}
              type="search"
              role="combobox"
              className="sj2-combo__recherche"
              aria-expanded="true"
              aria-controls={listeId}
              aria-autocomplete="list"
              aria-activedescendant={lignes[actif] ? `${listeId}-${lignes[actif].iso}` : undefined}
              aria-label={textes.search}
              placeholder={textes.search}
              autoComplete="off"
              value={q}
              onChange={(e) => { setQ(e.target.value); setActif(0); }}
              onKeyDown={touche}
            />
            <button type="button" className="sj2-combo__fermer" aria-label={textes.close} onClick={() => fermer(true)}>✕</button>
          </div>
          <ul ref={liste} id={listeId} role="listbox" aria-label={libelle} className="sj2-combo__liste">
            {lignes.map((r, k) => (
              <li
                key={r.iso}
                id={`${listeId}-${r.iso}`}
                role="option"
                aria-selected={r.iso === valeur}
                className={`sj2-combo__option${k === actif ? ' is-actif' : ''}`}
                onMouseMove={() => setActif(k)}
                onClick={() => choisir(r.iso)}
              >
                <span aria-hidden="true">{r.emoji}</span>
                <span className="sj2-combo__nom">{nomDans(locale, r)}</span>
                <span className="sj2-combo__dial" dir="ltr">{r.dial}</span>
              </li>
            ))}
            {lignes.length === 0 && <li className="sj2-combo__vide" role="presentation">{textes.none}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
