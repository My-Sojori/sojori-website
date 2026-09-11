# Stratégie Go-To-Market — Lead magnet « Analyse Concurrentielle Airbnb »

> Document vivant. Structure la réflexion AVANT de scaler la pub.
> Dernière mise à jour : 2026-07-25

---

## 1. Le problème constaté (pourquoi ce doc existe)

La pub fonctionne (CTR 2%+, CPC 0,006€, 1 464 clics pour 8€) **mais 0 lead sur 278 arrivées réelles** :
- Les gens ne comprennent pas, dès le 1er écran, que **c'est pour Airbnb**.
- Durée moyenne ~9s, rebond ~100%, 1 seul `form_start`.
- **Le blocage n'est pas la pub, c'est le message + la friction du formulaire.**

Conclusion : avant de dépenser plus, il faut **clarifier À QUI on parle et CE QU'ILS GAGNENT**. D'où ce travail persona + marché.

---

## 2. Dimensionnement du marché (Airbnb Maroc)

*Sources : AirDNA, AirROI, Airbtics (2026). Chiffres à affiner.*

| Ville | Annonces actives (approx.) | Occupation | ADR |
|---|---|---|---|
| **Marrakech** | ~9 500–22 000 selon la source | ~49–62% | ~137$ / 850 MAD |
| **Casablanca** | ~1 800 | ~34% | ~75$ (marché plutôt longue durée) |
| Agadir, Tanger, Rabat, Essaouira | clusters secondaires | variable | variable |
| **National (STR total)** | **~65 000–80 000 annonces** | — | — |

**Lecture business :**
- Le cœur du marché Airbnb = **Marrakech** (de loin le plus gros, le plus rentable).
- Agadir / Essaouira / Tanger / Rabat = marchés secondaires réels.
- Casablanca = surtout longue durée → **secondaire pour l'Airbnb** (à ne pas sur-cibler).
- **TAM réaliste** (proprios individuels adressables) : plusieurs dizaines de milliers d'annonces, mais beaucoup gérées par la même personne / des conciergeries. Le nombre de **décideurs uniques** (proprios + gérants) est plus petit — probablement quelques milliers de comptes actifs "sérieux".

**→ Implication ciblage pub :** concentrer sur **Marrakech en priorité**, puis Agadir/Tanger/Rabat/Essaouira. Casa en dernier.

---

## 3. Personas

### 🎯 Persona A — LE PROPRIÉTAIRE (cible prioritaire = futur ambassadeur)
- **Qui :** possède 1-3 biens à Marrakech/Agadir mis sur Airbnb. Souvent absentéiste (habite Casa, Rabat, ou à l'étranger — MRE).
- **Douleur :** ne sait pas s'il gagne "ce qu'il devrait", suspecte de laisser de l'argent sur la table, n'a pas le temps de suivre le marché.
- **Motivation :** maximiser le revenu de SON patrimoine, sans forcément tout gérer.
- **Déclencheur :** "Est-ce que mon bien pourrait gagner plus ?" → **l'estimation gain + comparaison concurrents parle DIRECTEMENT à lui.**
- **Pourquoi prioritaire :** c'est le décideur, il a l'argent, et satisfait il **recommande** (ambassadeur). C'est aussi le client final de Sojori.
- **Message qui marche :** « Propriétaire d'un Airbnb ? Découvrez combien votre bien devrait gagner — et où vous vous situez face à vos 20 concurrents. »

### Persona B — LE HOST / GESTIONNAIRE
- **Qui :** gère activement 1 à quelques annonces (proprio-gérant, ou petit co-hôte).
- **Douleur :** optimiser prix/occupation, gagner du temps.
- **Message :** « Vous gérez un Airbnb ? Voyez votre positionnement marché en 30s. »

### Persona C — LA CONCIERGERIE (NE PAS FÂCHER — partenaire potentiel, pas cible directe)
- **Qui :** Morokeys, BnB Maroc, Kridarek, Welbnb, Yo Maroc, Immobilio, Agence BNB, La Conciergerie Rabat, PackBNB… (voir §5).
- **Position Sojori :** ce sont des **concurrents ET des partenaires/revendeurs possibles**. Le message proprio ne doit pas les attaquer. Idéalement, l'outil peut AUSSI leur servir (analyser les biens de leurs clients).
- **Message inclusif :** l'analyse est utile "que vous gériez vous-même ou via une conciergerie".

---

## 4. Ce qu'il faut changer sur la landing (issu du terrain)

1. **1er écran fixe** : « Host Airbnb ? » / « Propriétaire d'un Airbnb ? » en TRÈS grand + bénéfice clair ("estimez votre gain vs vos 20 concurrents, gratuit, 30s").
2. **Dire explicitement Airbnb** (les testeurs ne comprenaient pas la cible).
3. **Animation de démarrage plus longue / visible** sur la landing.
4. **2 variantes de message** (A/B) : proprio (gain/patrimoine) vs host (performance/gestion).
5. **Réduire la friction du formulaire** (email d'abord, ou analyse d'abord puis email pour le résultat).

---

## 5. Conciergeries Maroc identifiées (à qualifier dans Attio)

| Nom | Ville(s) | Site | Statut vis-à-vis Sojori |
|---|---|---|---|
| Morokeys | Marrakech | morokeys.com | concurrent/partenaire |
| BnB Maroc | Casablanca | bnbmaroc.ma | concurrent/partenaire |
| Kridarek | Maroc (national) | kridarek.com | concurrent (se dit n°1) |
| Welbnb | Marrakech | welbnb.com | concurrent/partenaire |
| Yo Maroc | Marrakech | yomaroc.com | concurrent/partenaire |
| Immobilio / IMMOINVEST | Casa, Rabat, Marrakech | immobilio.ma | concurrent/partenaire |
| Agence BNB | Rabat | agencebnb.ma | concurrent/partenaire |
| La Conciergerie Rabat | Rabat | laconciergerierabat.com | concurrent/partenaire |
| PackBNB | Rabat | packbnb.com | concurrent (se dit n°1 Rabat) |

*→ À créer comme records dans Attio (objet dédié) pour suivi partenariat/veille concurrentielle.*

---

## 6. Prochaines étapes (ordre de priorité)

1. **[Landing]** Refonte 1er écran + 2 variantes message (→ brief Claude Design).
2. **[Friction]** Simplifier le formulaire.
3. **[Ciblage pub]** Prioriser Marrakech > Agadir/Tanger/Rabat/Essaouira > Casa.
4. **[Attio]** Lister les conciergeries comme prospects/partenaires + qualifier les leads proprios entrants.
5. **[Mesure]** Suivre le CPL par persona/ville une fois les leads qui arrivent.

---
*Sources marché : [AirDNA Marrakesh](https://www.airdna.co/vacation-rental-data/app/ma/default/marrakesh/overview), [AirROI](https://www.airroi.com/airbnb-data/morocco/marrakech-safi/marrakesh), [Airbtics Morocco](https://airbtics.com/best-airbnb-markets-morocco).*
