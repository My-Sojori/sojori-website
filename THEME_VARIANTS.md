# Sojori Website - Theme Variants

Ce projet contient trois variantes de thème, toutes versionées avec Git pour un basculement facile.

## 🎨 Variantes Disponibles

### v1.0 - Dark Theme
- Background noir solide (#08080b)
- Cards avec glass effect sombre
- Bordures blanches subtiles
- Couleur jaune/or (#e6b022)

**Tag:** `v1.0-dark-theme`

### v1.1 - Transparent Theme
- Background transparent
- Glass cards ultra-légers avec accents dorés
- Bordures dorées (rgba(230,176,34,0.15))
- Blur effect plus prononcé (40px vs 20px)
- Grille avec teinte dorée
- Look plus moderne et aéré

**Tag:** `v1.1-transparent-theme`

### v2.0 - Orange Theme (Version Actuelle) 🍊 ✨
- **Background blanc éclatant** (#ffffff)
- **Couleur Sojori Orange** (#ff6b35) - vibrant et énergique
- Cards blanches avec bordures orange (2px)
- Texte sombre sur fond clair
- Boutons orange dégradés avec texte blanc
- Shadows orange pour effet glow
- **Très visible et moderne** ⭐

**Tag:** `v2.0-orange-theme`

## 🔄 Basculer Entre les Versions

### Version Orange (actuelle - recommandée) 🍊
```bash
git checkout v2.0-orange-theme
# ou simplement
git checkout main
```

### Revenir au Dark Theme
```bash
git checkout v1.0-dark-theme
```

### Revenir au Transparent Theme
```bash
git checkout v1.1-transparent-theme
```

### Voir les différences entre les versions
```bash
# Comparer dark vs orange
git diff v1.0-dark-theme v2.0-orange-theme -- app/globals.css

# Comparer transparent vs orange
git diff v1.1-transparent-theme v2.0-orange-theme -- app/globals.css
```

## 📝 Modifications Principales (v2.0 Orange Theme)

Les changements se trouvent principalement dans `/app/globals.css` :

1. **Couleur principale** : #ff6b35 (orange Sojori) au lieu de #e6b022 (or)
2. **Backgrounds** : blanc (#ffffff, #fafafa) au lieu de noir
3. **Texte** : sombre (#1a1a1a) au lieu de blanc
4. **Glass cards** : rgba(255,255,255,0.95) avec bordures orange 2px
5. **Boutons** : orange gradient avec texte blanc
6. **Grid & shadows** : teinte orange au lieu de dorée
7. **Badges** : fond orange avec bordures renforcées

## 💡 Recommandation

Le **🍊 Orange Theme** (v2.0) est **fortement recommandé** pour :
- ✅ Identité visuelle Sojori originale
- ✅ Visibilité maximale sur tous les écrans
- ✅ Look frais, moderne et énergique
- ✅ Contraste élevé (texte sombre sur fond blanc)
- ✅ Excellent pour conversions (CTA très visible)

Le **Transparent Theme** (v1.1) pour :
- Look premium et subtil
- Sites minimalistes
- Overlays et modals

Le **Dark Theme** (v1.0) pour :
- Applications internes
- Environnements sombres
- Look classique tech
