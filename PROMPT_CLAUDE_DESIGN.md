# Brief Design - Sojori Website V2

## 🎯 Contexte du Projet

Tu as créé la version initiale de ce site Next.js pour **Sojori** - une plateforme PMS + AI pour locations courte durée.

Le site actuel fonctionne bien (design dark premium), mais j'ai besoin que tu l'améliores avec une nouvelle direction artistique.

---

## 🎨 Demande Spécifique

### Objectif
Transformer le design actuel (dark theme) en un design **LUMINEUX et MODERNE** qui :

1. **Évoque l'Intelligence Artificielle** (notre signature produit)
   - Sans tomber dans le dark/noir
   - Utiliser violet/bleu de manière subtile et élégante

2. **S'harmonise parfaitement avec le logo jaune Sojori**
   - Couleur principale : `#e6b022` (jaune or premium)
   - Le jaune doit rester central (métaphore du chef d'orchestre)

3. **Reste premium et professionnel**
   - Public cible : gestionnaires de locations, hôteliers, property managers
   - Inspiration : Stripe, Linear, Vercel (mais avec notre identité AI)

---

## 🎨 Palette de Couleurs Actuelle

```css
/* Brand Colors */
--primary: #e6b022;          /* Jaune Sojori - Orchestration */
--secondary: #8b5cf6;        /* Violet - AI/Intelligence */
--accent: #06b6d4;           /* Cyan - Automation */

/* Current Theme: DARK */
--bg-0: #08080b;             /* Background principal */
--text: #ffffff;             /* Texte blanc */
```

---

## ✨ Ce que je veux

### Background
- **Base lumineuse** (blanc/crème très clair)
- **Gradients subtils** qui évoquent l'AI :
  - Violet ultra-léger (intelligence artificielle)
  - Bleu tech subtil (automation)
  - Jaune doux (orchestration)
- **Animations douces** qui donnent vie sans être distrayantes
- **Grid ou pattern discret** (optionnel)

### Palette à proposer
- Backgrounds clairs harmonieux avec le jaune
- Couleurs AI (violet/bleu) déclinées en versions ultra-claires pour backgrounds
- Texte sombre sur fond clair (bon contraste)
- Système de couleurs cohérent

### Composants à adapter
- **Header** : Actuellement dark → Version claire avec glassmorphism
- **Hero section** : Texte + gradient animé
- **Cards/Glass effect** : Effet verre sur fond clair
- **Buttons** : Bouton primaire jaune premium + ghost buttons
- **Footer** : Version claire élégante

---

## 📁 Fichiers à Modifier

### Fichier principal : `app/globals.css`
```css
@import "tailwindcss";

/* Sojori Design System - Global tokens */
:root {
  /* Brand Colors */
  --primary: #e6b022;
  --secondary: #8b5cf6;
  --accent: #06b6d4;

  /* Backgrounds (dark theme) - À TRANSFORMER EN LIGHT */
  --bg-0: #08080b;
  --bg-1: #0f0f14;
  --bg-2: #16161e;

  /* Text - À INVERSER pour light theme */
  --text: #ffffff;
  --text-2: rgba(255,255,255,0.72);
  /* ... */
}

/* Background effects - À REPENSER POUR LIGHT THEME */
.bg-stage {
  background:
    radial-gradient(50% 40% at 18% 12%, rgba(230,176,34,0.12) 0%, transparent 60%),
    radial-gradient(45% 40% at 88% 24%, rgba(139,92,246,0.10) 0%, transparent 60%),
    linear-gradient(180deg, #08080b 0%, #0a0a10 60%, #08080b 100%);
}
```

### Composants à adapter
- `components/SharedComponents.tsx` (Header + Footer)
- Styles des cards, badges, buttons

---

## 🎯 Livrables Attendus

1. **Nouvelle palette complète** en CSS variables
   - Backgrounds light (3-4 variantes)
   - Couleurs AI en déclinaisons claires
   - Textes (dark on light)
   - Glass/borders adaptés

2. **CSS pour backgrounds** avec animations
   - `.bg-stage` version light
   - `.bg-grid` si pertinent
   - Gradients subtils et élégants

3. **Styles des composants clés**
   - `.glass` effect sur fond clair
   - `.btn-primary` et `.btn-ghost`
   - `.badge` avec effet AI
   - `.gradient-text` (jaune → violet → bleu)

4. **Header & Footer** styles
   - Background glassmorphism clair
   - Bon contraste texte/fond

---

## ⚠️ Contraintes Importantes

- ✅ **Garder la structure HTML existante** (Next.js App Router)
- ✅ **Utiliser les CSS variables** (facilite les ajustements)
- ✅ **Mobile-first** (responsive)
- ✅ **Performance** (pas d'images lourdes en background)
- ❌ **PAS de dark mode** pour l'instant (focus sur light theme parfait)

---

## 💡 Inspiration (optionnel)

Si tu as besoin d'inspiration :
- **Stripe** : Backgrounds subtils, élégance
- **Linear** : Gradients tech, violet/bleu
- **Vercel** : Minimalisme, noir/blanc/accents
- **OpenAI** : Violet AI, moderne
- **Anthropic Claude** : Orange/beige chauds, élégant

**Mais avec notre identité Jaune Sojori + Violet AI !**

---

## 📝 Notes

- Le site actuel est sur `http://localhost:3001`
- Framework : Next.js 16 + Tailwind CSS
- Le brief produit complet est dans `/Users/gouacht/Downloads/Sojori/BRIEF-COMPLET-CLAUDE-DESIGN-FINAL.md`

---

## ✨ Question pour toi Claude Design

**Peux-tu me proposer :**

1. Une palette de couleurs complète (CSS variables)
2. Le nouveau CSS pour `globals.css` avec backgrounds light + animations
3. Les styles adaptés pour Header, Footer, Cards, Buttons
4. 2-3 variantes de background si tu as plusieurs idées

Je vais ensuite donner ton code à Claude Code qui l'intégrera au projet et testera que tout fonctionne !

Merci ! 🚀
