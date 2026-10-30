# Sojori — Design System « GOLD »

Identité visuelle canonique pour tous les visuels de communication (produit, social, print).
Version 1.0 · juillet 2026.

---

## 1. Couleurs

| Rôle | Hex | Usage |
|------|-----|-------|
| **Gold signature** | `#e6b022` | Couleur de marque, accents, CTA |
| Gold clair | `#f4cf5e` | Haut de dégradé, halos |
| Gold profond | `#b8881a` | Bas de dégradé, texte sur fond clair |
| Violet accent | `#8b5cf6` | Brique « automatisation / IA », halos secondaires |
| Cyan accent | `#06b6d4` | Brique « data / channel », halos secondaires |
| Encre titres | `#1a1a1a` | Titres, texte fort |
| Encre secondaire | `#4b4b4b` | Sous-titres, corps |
| Blanc | `#ffffff` | Fond principal |
| Gris fond | `#fafafa` | Fond alterné |

### Dégradé gold canonique
```css
background: linear-gradient(135deg, #f4cf5e 0%, #e6b022 50%, #b8881a 100%);
```

### Halos (fonds clairs premium)
Cercles très flous (blur 80–140px), opacité 0.10–0.22, posés hors-cadre :
```css
/* halo gold */ background: radial-gradient(circle, rgba(230,176,34,0.22), transparent 70%);
/* halo violet */ radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%);
/* halo cyan */ radial-gradient(circle, rgba(6,182,212,0.16), transparent 70%);
```

---

## 2. Typographie

- **Famille** : Inter (400 / 500 / 600 / 700).
- **Titres** : 700, `letter-spacing: -0.02em`, line-height 1.05–1.1.
- **Sous-titres** : 500–600, encre secondaire.
- **Corps / labels** : 400–500.
- Un seul message dominant par visuel. Hiérarchie nette (titre ≫ sous-titre ≫ détail).

---

## 3. Logo

- Marque « orchestre » (rond pointillé + note/mouvement doré) + mot-symbole **sojori** en minuscules.
- Source : `public/brand/sojori-email-logo.svg` (+ déclinaisons dans `public/brand/`).
- **Toujours entièrement visible — jamais rogné ni coupé.**
- Zone de protection ≥ hauteur du rond autour du logo.
- Sur fond sombre : version claire ; sur fond clair : version encre/gold.

---

## 4. Les 6 briques orchestrées

`PMS` · `Channel Manager` · `WhatsApp Guest` · `Booking direct` · `Upsell` · `Staff & Ménage`

Représentées comme des nœuds autour du hub central Sojori (métaphore d'orchestration).
Chaque brique peut porter une couleur d'accent (gold / violet / cyan) mais le gold domine.

---

## 5. Messages (ne pas inventer d'autres promesses)

- **Grand message** : « Un seul outil. Tout orchestré. »
- **Sous-titre** : « Gérez plus de biens, gagnez plus par bien — sans agrandir l'équipe. »
- **Insight clé** : « À Marrakech, la marge n'est plus dans la nuitée, elle est dans les services. »
- **Piliers** : Automatiser (scaler sans embaucher) + Monétiser (upsells).
- **Ton** : FR, premium mais concret, orienté résultat. Un seul angle par visuel.
- Toujours **« paiement marocain »** (jamais « CMI »).

---

## 6. Style visuel

- Fonds clairs (blanc → #fafafa) avec halos gold/violet/cyan **subtils**.
- Ombres douces (`0 20px 60px -20px rgba(26,20,8,0.18)`), rayons généreux (20–32px).
- Compo aérée, beaucoup de respiration. Contraste **AA minimum** (lisible mobile).
- Éviter : dégradés criards plein cadre, emojis décoratifs, surcharge.

---

## 7. Dimensions d'export (social)

| Asset | Dimensions | Ratio |
|-------|-----------|-------|
| Posts Instagram | 2160 × 2700 (@2x de 1080×1350) | 4:5 |
| Poster reel | 1080 × 1920 | 9:16 |
| Bannière LinkedIn perso | 3168 × 792 (@2x de 1584×396) | 4:1 |
| Bannière LinkedIn entreprise | 4200 × 700 | 6:1 |
| Avatar | 640 × 640 | 1:1 |
| Stories à la une | 1080 × 1920 | 9:16 |

---

*Palette GOLD — référence unique. Tout nouveau visuel Sojori s'y conforme.*
