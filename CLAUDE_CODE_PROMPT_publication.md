# Prompt de handoff — à coller dans Claude Code

> Copie-colle le bloc ci-dessous dans Claude Code (ouvert dans le repo `sojori-website`).
> Il pilote la publication du kit social Sojori sur Instagram @sojoriapp via l'API Meta.
> Le détail technique complet est dans `INSTAGRAM_PUBLISHING_SETUP.md`.

---

```
Contexte : repo sojori-website. On veut publier le kit social Sojori sur Instagram
@sojoriapp via l'API Meta. Rien d'urgent, la page n'est pas encore utilisée par le
public — on prend le temps de bien faire et on teste en DRY RUN d'abord.

Tout est déjà préparé dans le repo :
- Script : publish_instagram.js (racine)
- Guide complet : INSTAGRAM_PUBLISHING_SETUP.md (lis-le en entier avant de commencer)
- Médias + légendes : public/brand/social/insta/
    · 00-reel.mp4 (reel avec musique) + 00-reel.txt (légende)
    · 01-hero.png … 09-cta.png (9 posts) + 01-hero.txt … 09-cta.txt (légendes)
- Poster du reel : public/brand/social/Sojori_reel_cover.png (NE PAS publier — c'est
  juste l'image d'arrêt)

Ce que je veux que tu fasses :

1. Lis INSTAGRAM_PUBLISHING_SETUP.md et confirme-moi que les prérequis Meta sont OK
   (app créée, permission instagram_business_content_publish, @sojoriapp testeur
   accepté). Si un prérequis manque, dis-moi précisément quoi faire côté interface Meta.

2. Crée un fichier .env à la racine (à partir de .env.example) avec :
      IG_USER_ID=...
      IG_ACCESS_TOKEN=...
      IG_MEDIA_BASE_URL=https://business.sojori.com/brand/social/insta
      INSTA_DIR=./public/brand/social/insta
   → IMPORTANT SÉCURITÉ : ajoute .env au .gitignore, ne committe JAMAIS le token,
     ne le colle nulle part. Je te fournirai IG_USER_ID et IG_ACCESS_TOKEN
     directement dans le terminal, pas dans le code.

3. Les médias sont récupérés par URL publique. Vérifie que le site est déployé et que
   les fichiers répondent en 200, ex :
      curl -I https://business.sojori.com/brand/social/insta/01-hero.png
      curl -I https://business.sojori.com/brand/social/insta/00-reel.mp4
   Si le site n'est pas encore déployé sur business.sojori.com, dis-le moi — on
   déploiera d'abord, ou on basculera sur un hébergement temporaire (bucket public).

4. Lance un DRY RUN et montre-moi la liste des médias + légendes + URLs :
      set -a; source .env; set +a
      node publish_instagram.js
   NE PUBLIE RIEN à ce stade. Attends ma validation.

5. Après ma validation, publie de façon espacée (2-3 posts/jour max, pas les 10 d'un
   coup). Ordre : le reel d'abord, puis 01-hero → 09-cta. Utilise --only= pour publier
   pièce par pièce :
      node publish_instagram.js --go --only=00-reel
   Attends que le reel soit bien publié (status FINISHED) avant d'enchaîner.

Attention :
- attention on utilise business.sojori.com PAS sojori.com pour les URLs des médias.
- token = mot de passe : .env gitignoré, jamais commité.
- ne me réponds pas juste "ok ok" : challenge si quelque chose cloche (URL non
  publique, prérequis manquant, format média invalide).
```
