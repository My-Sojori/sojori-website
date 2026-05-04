# Sojori Website - Theme Variants

Ce projet contient deux variantes de thème, toutes deux versionées avec Git pour un basculement facile.

## 🎨 Variantes Disponibles

### v1.0 - Dark Theme (Version Originale)
- Background noir solide (#08080b)
- Cards avec glass effect sombre
- Bordures blanches subtiles
- Couleur jaune/or préservée

**Tag:** `v1.0-dark-theme`

### v1.1 - Transparent Theme (Version Actuelle) ✨
- Background transparent
- Glass cards ultra-légers avec accents dorés
- Bordures dorées (rgba(230,176,34,0.15))
- Blur effect plus prononcé (40px vs 20px)
- Grille avec teinte dorée
- Look plus moderne et aéré

**Tag:** `v1.1-transparent-theme`

## 🔄 Basculer Entre les Versions

### Revenir au Dark Theme
```bash
git checkout v1.0-dark-theme
# Le serveur dev se rechargera automatiquement
```

### Revenir au Transparent Theme
```bash
git checkout v1.1-transparent-theme
# ou simplement
git checkout main
```

### Voir les différences entre les versions
```bash
git diff v1.0-dark-theme v1.1-transparent-theme -- app/globals.css
```

## 📝 Modifications Principales

Les changements se trouvent principalement dans `/app/globals.css` :

1. **Backgrounds** : transparent au lieu de #08080b
2. **Glass cards** : rgba(255,255,255,0.02) avec bordures dorées
3. **Backdrop filter** : blur(40px) au lieu de blur(20px)
4. **Grid** : rgba(230,176,34,0.04) au lieu de rgba(255,255,255,0.025)
5. **Badges & buttons** : accents dorés plus prononcés

## 💡 Recommandation

Le **Transparent Theme** (v1.1) est recommandé pour :
- Look plus moderne et premium
- Meilleure mise en valeur des couleurs dorées
- Interface moins lourde visuellement
- Meilleure compatibilité avec futurs overlays/modals

Le **Dark Theme** (v1.0) peut être préféré pour :
- Sites avec beaucoup de contenu dense
- Meilleure lisibilité dans environnements sombres
- Look plus classique et solide
