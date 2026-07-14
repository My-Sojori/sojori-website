# Handoff — Publication Instagram (@sojoriapp) via l'API

> Objectif : publier le reel + les 9 posts marketing sur Instagram @sojoriapp, de façon fiable et sécurisée, via le script `publish_instagram.js`.
> **Rien d'urgent** : la page n'est pas encore utilisée par le public → prendre le temps de bien faire, tester en dry run d'abord.
> Ce document est un guide d'exécution pour Claude Code. Les étapes marquées 🧑 **HUMAIN** doivent être faites par Tawfiq (interface Meta) ; les autres, Claude Code peut les exécuter.

---

## 1. Ce qui est déjà en place
- **Script** : `publish_instagram.js` (racine du repo). Lit le token depuis une variable d'env (jamais en dur), parcourt le dossier des médias, publie images + reel avec les légendes.
- **Médias + légendes** : `public/brand/social/insta/`
  - `Sojori_reel_orchestration_1080x1920.mp4` (reel)
  - `01-hero.png` … `09-cta.png` (9 posts)
  - `00-reel.txt`, `01-hero.txt` … `09-cta.txt` (légendes jumelles) + `_TOUTES-LES-LEGENDES.txt`
- L'API Instagram récupère chaque média **par URL publique** → les fichiers doivent être servis en HTTPS (voir §4).

## 2. Prérequis (état attendu)
- Node 18+ (fetch intégré).
- 🧑 **HUMAIN** : @sojoriapp = compte Instagram **professionnel** (Business/Creator).
- 🧑 **HUMAIN** : app Meta « Sojori Social » créée, cas d'usage **« Gérer les messages et les contenus sur Instagram »**.
- 🧑 **HUMAIN** : permission **`instagram_business_content_publish`** ajoutée (Autorisations et fonctionnalités).
- 🧑 **HUMAIN** : @sojoriapp ajouté comme **testeur Instagram** de l'app, invitation **acceptée** (instagram.com/accounts/manage_access/).

## 3. Token & secrets (🧑 HUMAIN génère, Claude Code configure)
1. 🧑 Générer le token : page **Configuration de l'API** de l'app → « 2. Générez des tokens d'accès » → « Ajouter un compte » → @sojoriapp → autoriser. Noter **le token** et **l'Instagram user ID**.
2. Claude Code : créer un fichier **`.env`** à la racine (voir `.env.example`) :
   ```
   IG_USER_ID=xxxxxxxxxxxx
   IG_ACCESS_TOKEN=xxxxxxxxxxxx
   IG_MEDIA_BASE_URL=https://business.sojori.com/brand/social/insta
   INSTA_DIR=./public/brand/social/insta
   ```
3. **Sécurité (impératif)** : ajouter `.env` au `.gitignore`. Ne JAMAIS committer le token ni la clé secrète. Ne jamais les coller dans un chat.
4. Le token « Instagram Login » dure ~60 jours. Prévoir de le régénérer avant expiration.

## 4. URL publique des médias (à résoudre avant `--go`)
L'API n'accepte pas d'upload direct : elle lit `image_url` / `video_url`. Deux options :
- **Option A (recommandée) — via le site déployé** : les médias sont déjà dans `public/brand/social/insta/`. Une fois `sojori-website` déployé (Vercel/Netlify/…), ils sont servis à `https://business.sojori.com/brand/social/insta/<fichier>`. Mettre ce domaine dans `IG_MEDIA_BASE_URL`.
  - Claude Code : vérifier qu'une URL répond en 200, ex. `curl -I https://business.sojori.com/brand/social/insta/01-hero.png`.
- **Option B — hébergement séparé** : uploader le dossier sur un bucket public (S3/Cloudflare R2/Cloudinary) et pointer `IG_MEDIA_BASE_URL` dessus. Utile si le site n'est pas encore déployé.

## 5. Exécution (Claude Code)
```bash
cd ~/sojori-website
# charger les variables (si .env) :
set -a; source .env; set +a

# 1) DRY RUN — ne publie rien, affiche fichiers + légendes + URLs
node publish_instagram.js

# 2) vérifier que les URLs listées s'ouvrent bien (200)
# 3) publication réelle
node publish_instagram.js --go
# ou un seul :
node publish_instagram.js --go --only=01-hero
```

## 6. Plan de publication (contenu)
- Ordre conseillé : **le reel d'abord**, puis `01-hero` → `09-cta`.
- **Espacement** : quelques posts par jour (2-3 max), pas les 10 d'un coup — évite le côté spam et le flag Instagram.
- Idéal : programmer sur ~1-2 semaines. (Le script publie immédiatement ; pour du planifié, soit lancer `--only=` jour par jour, soit brancher un cron/scheduler — à décider avec Tawfiq.)

## 7. Dépannage
- `Insufficient developer role` → le compte n'est pas testeur / invitation pas acceptée (§2).
- `media_url`/`video_url` unreachable → l'URL n'est pas publique/200 (§4).
- `OAuthException` / token invalide/expiré → régénérer le token (§3), mettre à jour `.env`.
- Reel qui reste en traitement → normal, le script attend `status_code=FINISHED` (jusqu'à ~2-3 min).
- Rate limit → espacer les publications.

## 8. Rappels de sécurité
- Token = mot de passe. `.env` gitignoré, jamais commité, jamais collé dans un chat.
- Si un token a été exposé : le révoquer (Instagram → Apps et sites web → retirer l'accès) et en régénérer un.
