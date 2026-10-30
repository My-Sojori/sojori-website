# Handoff Claude Code — Mise en place + publication du kit social v2 (GOLD)

> Objectif : intégrer les visuels v2 (identité GOLD) dans le repo, nettoyer les anciens,
> déployer, puis publier proprement sur Instagram @sojoriapp (compte vidé, relaunch).
> Les visuels ont été rendus en PNG haute résolution et vérifiés visuellement.
> Rien d'urgent — teste en DRY RUN avant toute publication.

Le package est dans le repo : **`sojori-social-v2.zip`** (à la racine de sojori-website).

---

## 1. Déballer le package (écrase les assets v2 en place)

```bash
cd ~/sojori-website
unzip -o sojori-social-v2.zip
# → écrit public/brand/social/{insta,linkedin,stories}/… + Sojori_reel_cover.png
#   + Sojori_avatar.png, et sojori-design-system.md à la racine du repo.
```

Contenu posé :
- `public/brand/social/insta/` : 9 posts v2 (01-hero, 02-insight, 03-briques,
  04-automatiser, 05-whatsapp, 06-booking-direct, 07-upsell, 08-resultat, 09-cta)
  en 2160×2700, + leurs légendes `.txt` jumelles + `_TOUTES-LES-LEGENDES.txt`.
- `public/brand/social/Sojori_reel_cover.png` (1080×1920) — poster du reel, HORS insta/.
- `public/brand/social/Sojori_avatar.png` (640×640).
- `public/brand/social/linkedin/Sojori_LinkedIn_cover_perso.png` (3168×792) +
  `Sojori_LinkedIn_cover_entreprise_4200x700.png` (4200×700, hub centré).
- `public/brand/social/stories/highlight-{automatiser,monetiser,whatsapp}.png` (1080×1920).
- `sojori-design-system.md` (racine) — design system GOLD canonique (nouveau).

## 2. Supprimer les anciens fichiers orphelins (slugs v1 ≠ v2)

⚠️ Le script de publication publie TOUS les `.png` de `insta/`. Il faut retirer les
anciens posts v1, sinon ils repartiraient. Les légendes v1 ne matchent plus non plus.

```bash
cd ~/sojori-website/public/brand/social

# anciens posts v1 (garder uniquement 00-reel.mp4 / 00-reel.txt dans insta/)
git rm -f insta/02-manifeste.png insta/02-manifeste.txt \
         insta/03-whatsapp.png  insta/03-whatsapp.txt \
         insta/04-stat.png      insta/04-stat.txt \
         insta/05-upsell.png    insta/05-upsell.txt \
         insta/06-booking.png   insta/06-booking.txt \
         insta/07-scale.png     insta/07-scale.txt \
         insta/08-local.png     insta/08-local.txt

# anciens visuels racine + linkedin remplacés par la v2
git rm -f Sojori_avatar_insta_linkedin_320x320.png \
         Sojori_LinkedIn_cover_perso_1584x396.png \
         Sojori_LinkedIn_cover_entreprise_4200x700.png \
         linkedin/Sojori_avatar_insta_linkedin_320x320.png \
         linkedin/Sojori_LinkedIn_cover_perso_1584x396.png

# (les .txt LinkedIn PROFIL-PERSO_* et PAGE-ENTREPRISE_* restent : contenu valide.)
```

Après ça, `insta/` doit contenir EXACTEMENT : `00-reel.mp4`, `00-reel.txt`,
les 9 paires `NN-slug.png` + `.txt` v2, et `_TOUTES-LES-LEGENDES.txt`. Vérifie :
```bash
ls insta/ | sort
```

## 3. Commit

```bash
cd ~/sojori-website
git add -A public/brand/social sojori-design-system.md
git status   # relis ce qui part
git commit -m "social v2 (GOLD): posts + reel cover + LinkedIn + stories + design system"
```

## 4. Déployer + vérifier les URLs publiques

Les médias sont récupérés par URL publique par l'API Instagram. Déploie
(sojori-website → business.sojori.com) puis vérifie quelques 200 :
```bash
curl -I https://business.sojori.com/brand/social/insta/01-hero.png
curl -I https://business.sojori.com/brand/social/insta/00-reel.mp4
curl -I https://business.sojori.com/brand/social/insta/09-cta.png
```
Si le déploiement n'est pas en place, dis-le moi avant d'aller plus loin.

## 5. DRY RUN

```bash
set -a; source .env; set +a      # IG_USER_ID / IG_ACCESS_TOKEN / IG_MEDIA_BASE_URL / INSTA_DIR
node publish_instagram.js         # n'publie RIEN, liste médias + légendes + URLs
```
Vérifie que la liste = le reel + 9 posts (pas de fichier parasite, pas de backup).

## 6. ⚠️ AVANT DE PUBLIER — le post 08-resultat

Le visuel **08-resultat** et sa légende contiennent des **placeholders `+__%` /
`[À COMPLÉTER]`** : chiffres à renseigner avec les données réelles de Tawfiq
(ex. Moncef : passage de 35 à ~100 biens à effectif constant ≈ +185 %).
NE PAS publier 08 tel quel. Trois options — demande à Tawfiq laquelle :
  (a) il fournit les 2 chiffres → je régénère le visuel (le HTML source est dans
      social-v2/visuals.html, frame `08-resultat`) + j'édite 08-resultat.txt, puis publie ;
  (b) on publie les 8 autres et on garde 08 pour plus tard (`--only` sans 08) ;
  (c) on retire 08 du set.

## 7. Publication (après feu vert de Tawfiq)

Espacer (2-3/jour max). Ordre conseillé : le reel d'abord, puis 01 → 09.
```bash
node publish_instagram.js --go --only=00-reel        # attendre status FINISHED
node publish_instagram.js --go --only=01-hero
# … etc., un par un
```

Bonus (optionnel) : pour que la vignette du reel dans le feed soit le poster designé,
tu peux ajouter au container REELS le paramètre `cover_url` pointant vers
`…/Sojori_reel_cover.png` (sinon Instagram prend une frame de la vidéo).

## Rappels
- Le backup du reel est dans `public/brand/social/_backups/` — ne jamais le remettre dans `insta/`.
- Token = mot de passe : `.env` gitignoré, jamais commité.
- Ne me réponds pas « ok ok » : signale toute URL non-200, tout fichier en trop, ou dimension suspecte.
