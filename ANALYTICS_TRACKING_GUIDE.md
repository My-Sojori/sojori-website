# Tracking analytics — business.sojori.com

## Ce qui est en place

- **GA4** (`G-KCVTT735EZ`) — trafic, pages vues, sources, funnel démo. Compte : Analytics
  "Sojori", propriété "business.sojori.com". Gratuit, pas de export BigQuery activé.
- **Meta Pixel** (`1039671441788657`) — retargeting + conversions Ads. Vit sur le compte Ads
  "Sojori ADS" (`act_1340992357388311`).
- Les deux tournent en parallèle sur chaque page (`app/[locale]/layout.tsx`).

## Événements custom (funnel démo)

Définis dans `lib/analytics.ts`, déclenchés dans `app/[locale]/demo/page.tsx` :

| Événement | Déclenché quand | GA4 | Meta Pixel |
|---|---|---|---|
| Lead | Étape 1 soumise (email + tél + nb propriétés) | `generate_lead` | `Lead` |
| RDV pris | Créneau confirmé (étape 2 → 3), hors reschedule | `schedule` | `Schedule` |
| Qualifié | Questionnaire complet (étape 3 → 4) | `generate_lead` | `CompleteRegistration` |
| Clic CTA → /demo | N'importe quel clic sur un lien `/demo` (hero, nav, footer, mobile menu…) | `select_content` | — |

Chaque événement porte le paramètre `source` déjà encodé sur les `Link` existants
(`homepage-hero`, `homepage-cta`, `navbar-demo`, `mobile-menu`, `page-hero`, `footer-cta`,
etc.) — c'est ce qui permet de savoir **quel emplacement de CTA convertit le mieux**, pas
seulement combien de leads au total.

## UTM à utiliser sur les pubs Instagram et Facebook

Le Pixel Meta voit déjà tout ce qui vient de Meta Ads (peu importe l'UTM). Mais **GA4 ne
sait pas distinguer Instagram de Facebook sans UTM explicite** — sans ça, tout remonte sous
un seul canal "Meta / paid" indifférencié dans les rapports.

Format à utiliser sur **chaque lien de pub** (dans Meta Ads Manager, champ "URL du site
Web" de l'annonce) :

```
https://business.sojori.com/fr?utm_source={{PLATEFORME}}&utm_medium=paid_social&utm_campaign={{NOM_CAMPAGNE}}&utm_content={{VARIANTE_CREA}}
```

- `utm_source` → `instagram` ou `facebook` (jamais `meta` seul — sinon on reperd la
  distinction qu'on cherche justement à avoir)
- `utm_medium` → toujours `paid_social` (constant, sert à séparer payant/organique dans GA4)
- `utm_campaign` → nom court de la campagne, ex. `conciergeries-maroc-juillet`
- `utm_content` → optionnel, utile si tu testes 2 visuels/textes différents sur la même
  campagne, ex. `visuel-a` / `visuel-b`

Exemple concret pour la campagne "Sojori — Conciergeries Maroc" côté Instagram :

```
https://business.sojori.com/fr?utm_source=instagram&utm_medium=paid_social&utm_campaign=conciergeries-maroc&utm_content=post-6-briques
```

Meta Ads Manager peut générer ces paramètres automatiquement via les "Paramètres URL"
dynamiques de l'annonce (`{{campaign.name}}`, `{{placement}}`) au lieu de les taper à la
main — mais dans ce cas vérifier dans GA4 (Acquisition → Trafic en temps réel) que les
valeurs générées sont lisibles (pas des ID bruts).

## Où consulter les résultats

- **GA4** → analytics.google.com → propriété "business.sojori.com" → Rapports →
  Acquisition (source du trafic) / Engagement → Événements (funnel démo par étape).
- **Meta Ads Manager** → comptes `act_1340992357388311` (Sojori ADS) et `act_240940563743751`
  (perso, campagne Instagram en cours) → colonnes Résultats / CPA / CTR par campagne.
