# Brief de handoff — à coller dans Claude Design  (v2 — dimensions fact-checkées)

> Copie-colle le bloc ci-dessous dans Claude Design.
> Objectif : élever tous les visuels sociaux Sojori à un niveau **premium et cohérent**,
> sur la nouvelle identité **GOLD**.
> Dimensions vérifiées sur les fichiers réels du repo (exports @2x conservés).

---

```
Tu es Claude Design. Mission : refaire/élever les visuels de communication de Sojori
(SaaS/PMS tout-en-un pour la location courte durée, pensé pour le Maroc) pour qu'ils
aient un rendu premium, cohérent, et prêts à publier sur Instagram + LinkedIn.

Contexte : le compte Instagram @sojoriapp a été entièrement vidé (relaunch propre).
On republiera TOUT en une fois quand tes visuels v2 seront prêts. Donc pas de
contrainte de « matcher l'existant » — tu élèves librement, tant que ça reste dans
l'identité ci-dessous.

═══════════════════════════════════════════════════════
1. IDENTITÉ DE MARQUE — « GOLD » (canonique)
═══════════════════════════════════════════════════════
Couleurs :
- Gold signature : #e6b022
- Dégradé gold : #f4cf5e → #e6b022 → #b8881a  (linear 135deg)
- Violet accent : #8b5cf6
- Cyan accent   : #06b6d4
- Encre / texte : #1a1a1a (titres), #4b4b4b (secondaire)
- Fonds clairs  : blanc → #FAFAFA, halos gold/violet/cyan très pâles

Logo : la marque « orchestre » Sojori (rond pointillé + note/mouvement doré) +
le mot-symbole « sojori » en minuscules. Fichier source dans le repo :
public/brand/sojori-email-logo.svg (et déclinaisons dans public/brand/).
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
2. CE QUI EXISTE DÉJÀ (à améliorer, pas repartir de zéro)
═══════════════════════════════════════════════════════
Repo sojori-website, dossier public/brand/social/ :

  insta/
    00-reel.mp4            reel d'orchestration — AUDIO DÉJÀ CORRIGÉ (-14 LUFS).
                           NE PAS retoucher la vidéo ni l'audio.
    01-hero.png … 09-cta.png   9 posts Instagram (voir dimensions §4)
    00-reel.txt, 01..09.txt    légendes jumelles + _TOUTES-LES-LEGENDES.txt
  Sojori_reel_cover.png    poster (image d'arrêt) du reel — À REFAIRE en v2
  Sojori_LinkedIn_cover_perso_*.png       bannière profil perso LinkedIn
  Sojori_LinkedIn_cover_entreprise_4200x700.png  bannière page entreprise LinkedIn
  Sojori_avatar_insta_linkedin_*.png      avatar
  linkedin/ …              variantes + textes de profil (FR/EN)

  (Le backup du reel est dans public/brand/social/_backups/ — n'y touche pas,
   il ne doit jamais retourner dans insta/.)

═══════════════════════════════════════════════════════
3. CE QUE JE VEUX QUE TU FASSES
═══════════════════════════════════════════════════════
A. Élever les 9 posts Instagram (format 4:5) : hiérarchie typo nette, un seul message
   dominant par post, compo aérée, halos gold/violet/cyan subtils, ombres douces,
   logo jamais coupé, contraste AA minimum (lisible sur mobile).

B. Poster du reel (Sojori_reel_cover.png) : version premium cohérente avec les posts.
   C'est l'image d'arrêt du reel → doit être parfaite et complète.

C. Bannières LinkedIn : perso + entreprise. Les deux expliquent d'un coup d'œil ce
   qu'est Sojori (orchestration des 6 briques). Sur l'entreprise, le hub Sojori doit
   être CENTRÉ et entièrement visible.

D. (Bonus) 3–5 covers de « Stories à la une » Instagram (icône + label gold).

═══════════════════════════════════════════════════════
4. DIMENSIONS EXACTES (vérifiées sur les fichiers réels — exports @2x, à conserver)
═══════════════════════════════════════════════════════
- 9 posts Instagram        → 2160 × 2700 px   (4:5 exporté @2x — PAS 1080×1350 ;
                             garde le @2x, plus net, Instagram redimensionne)
- Poster reel              → 1080 × 1920 px   (dimension nominale)
- Bannière LinkedIn perso  → 3168 × 792 px    (@2x de 1584×396)
- Bannière LinkedIn entreprise → 4200 × 700 px (dimension nominale, ratio 6:1)
- Avatar                   → 640 × 640 px      (@2x de 320)
- Stories à la une (bonus) → 1080 × 1920 px

Garde EXACTEMENT les mêmes noms de fichiers pour remplacer en place (ou suffixe -v2
si tu veux conserver les anciens).

═══════════════════════════════════════════════════════
5. LIVRABLES & CONTRAINTES
═══════════════════════════════════════════════════════
- PNG haute def, dimensions exactes ci-dessus, nommage clair et cohérent.
- Écrire/écraser dans public/brand/social/. Mettre TOUT le contenu en local (visuels
  + textes), rien qui vive seulement dans le chat.
- CRÉER le design system : le fichier sojori-design-system.md N'EXISTE PAS encore dans
  le repo → crée-le à la racine de sojori-website, documenté sur la palette GOLD
  ci-dessus (couleurs, dégradés, typo, logo, règles). (Ne cherche pas d'ancien orange
  à corriger dans le repo : il n'y en a pas.)
- Ne rien publier sur Instagram/LinkedIn. Ne pas toucher au code applicatif — seulement
  les assets de public/brand/ et le nouveau design system.
- Challenge-moi : si une compo ne marche pas ou si un message est faible, dis-le et
  propose mieux — pas de « oui oui » automatique.
```
