# Brief de handoff — à coller dans Claude Design

> Copie-colle le bloc ci-dessous dans Claude Design.
> Objectif : élever tous les visuels sociaux Sojori à un niveau **premium et cohérent**,
> sur la nouvelle identité **GOLD** (l'ancienne orange est à retirer partout).

---

```
Tu es Claude Design. Mission : refaire/élever les visuels de communication de Sojori
(SaaS/PMS tout-en-un pour la location courte durée, pensé pour le Maroc) pour qu'ils
aient un rendu premium, cohérent, et prêts à publier sur Instagram + LinkedIn.

═══════════════════════════════════════════════════════
1. IDENTITÉ DE MARQUE — NOUVELLE VERSION « GOLD » (canonique)
═══════════════════════════════════════════════════════
⚠️ IMPORTANT : la marque est passée de l'ORANGE (#FF6B35, ancienne identité) au GOLD.
Tout doit être en GOLD. S'il reste de l'orange quelque part, c'est à corriger.

Couleurs :
- Gold signature : #e6b022
- Dégradé gold : #f4cf5e → #e6b022 → #b8881a  (linear 135deg)
- Violet accent : #8b5cf6
- Cyan accent   : #06b6d4
- Encre / texte : #1a1a1a (titres), #4b4b4b (secondaire)
- Fonds clairs  : blanc → #FAFAFA, halos gold/violet/cyan très pâles

Logo : la marque « orchestre » Sojori (rond pointillé + note/mouvement doré) +
le mot-symbole « sojori » en minuscules. Fichier source dans le repo :
public/brand/sojori-email-logo.svg (et autres déclinaisons dans public/brand/).
Le logo doit TOUJOURS être entièrement visible (jamais rogné/coupé).

Typo : Inter (400/500/600/700). Titres serrés (letter-spacing -0.02em).

Positionnement / messages (à réutiliser, ne pas inventer d'autres promesses) :
- Grand message : « Un seul outil. Tout orchestré. »
- Sous-titre    : « Gérez plus de biens, gagnez plus par bien — sans agrandir l'équipe. »
- Insight clé   : « À Marrakech, la marge n'est plus dans la nuitée, elle est dans les
                    services. » (upsell / monétisation)
- Piliers : Automatiser (scaler sans embaucher) + Monétiser (upsells).
- Les 6 briques orchestrées : PMS · Channel Manager · WhatsApp Guest · Booking direct ·
  Upsell · Staff & Ménage.
- Ton : FR, premium mais concret, orienté résultat. Un seul angle par visuel.
- Toujours « paiement marocain » (jamais « CMI »).

═══════════════════════════════════════════════════════
2. CE QUI EXISTE DÉJÀ (à améliorer, pas à repartir de zéro)
═══════════════════════════════════════════════════════
Tout est dans le repo sojori-website, dossier public/brand/social/ :

  insta/
    00-reel.mp4            reel d'orchestration (animation, audio OK) — NE PAS retoucher la vidéo
    01-hero.png … 09-cta.png   9 posts Instagram (1080×1350)
    00-reel.txt, 01..09.txt    légendes jumelles + _TOUTES-LES-LEGENDES.txt
  Sojori_reel_cover.png    poster (image d'arrêt) du reel
  Sojori_LinkedIn_cover_perso_1584x396.png       bannière profil perso LinkedIn
  Sojori_LinkedIn_cover_entreprise_4200x700.png  bannière page entreprise LinkedIn
  Sojori_avatar_insta_linkedin_320x320.png       avatar
  linkedin/ …              variantes + textes de profil (FR/EN)

═══════════════════════════════════════════════════════
3. CE QUE JE VEUX QUE TU FASSES
═══════════════════════════════════════════════════════
A. Élever les 9 posts Instagram (1080×1350, format 4:5) :
   - hiérarchie typo nette, un seul message dominant par post
   - composition aérée, halos gold/violet/cyan subtils, ombres douces
   - jamais de logo coupé, marges de sécurité respectées
   - contraste AA minimum (texte lisible sur mobile)

B. Poster du reel (Sojori_reel_cover.png, 1080×1920) : version premium cohérente
   avec les posts, c'est l'image d'arrêt donc elle doit être parfaite et complète.

C. Bannières LinkedIn :
   - perso : 1584×396 (ratio 4:1)
   - entreprise : 4200×700 (ratio 6:1) — hub Sojori CENTRÉ et entièrement visible
   Les deux doivent expliquer d'un coup d'œil ce qu'est Sojori (orchestration des 6 briques).

D. (Bonus) 3–5 covers de « Stories à la une » Instagram (1080×1920, icône + label gold).

═══════════════════════════════════════════════════════
4. LIVRABLES & CONTRAINTES
═══════════════════════════════════════════════════════
- Formats PNG haute def, dimensions EXACTES ci-dessus, nommage clair et cohérent.
- Écrire/écraser les fichiers dans public/brand/social/ (garder les mêmes noms pour
  remplacer en place ; ajouter en -v2 si tu veux garder les anciens).
- Mettre TOUT le contenu en local dans le repo (visuels + textes), rien qui vive
  seulement dans le chat.
- Mettre à jour le design system : le doc actuel (sojori-design-system.md) décrit encore
  l'ANCIEN orange #FF6B35 → le réécrire sur la palette GOLD ci-dessus.
- Ne rien publier sur Instagram/LinkedIn. Ne pas toucher au code applicatif, seulement
  aux assets de public/brand/ et au design system.
- Challenge-moi : si une compo ne marche pas ou si un message est faible, dis-le et
  propose mieux — pas de « oui oui » automatique.
```
