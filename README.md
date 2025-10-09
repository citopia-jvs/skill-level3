# 🎂 Birthday Tracker App

Une application web moderne et accessible pour gérer vos informations personnelles et suivre votre prochain anniversaire.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)

## ✨ Fonctionnalités

### 📝 Gestion des informations
- **Formulaire auto-sauvegardé** : Vos données (prénom, nom, date de naissance) sont enregistrées automatiquement sans bouton de validation
- **Validation en temps réel** : Utilise React Hook Form et Zod pour une validation robuste
- **State management** : Zustand avec persistance localStorage

### 🎉 Suivi d'anniversaire
- **Calcul dynamique** : Affiche le nombre de jours restants avant votre prochain anniversaire
- **Message personnalisé** : Message spécial le jour de votre anniversaire
- **Avatar généré** : Image de profil dynamique basée sur vos données via l'API DummyJSON

### 🎨 Design moderne
- **Style Brutalist** : Ombres portées, bordures épaisses, design audacieux
- **Thème clair/sombre** : Basculez entre les modes avec persistance des préférences
- **Responsive** : Optimisé pour tous les écrans (mobile, tablette, desktop)
- **Accessibilité WCAG 2.2** : Cibles tactiles 44px, focus visible, support `prefers-reduced-motion`

### 🧭 Navigation
- **Routing** : React Router DOM avec 2 pages (Accueil, Informations)
- **Navigation sticky** : Barre de navigation qui reste visible au scroll
- **Indicateur de page active** : Style visuel clair sur la page courante

## 🚀 Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm 9.x ou supérieur

### Installation des dépendances

```bash
npm install
```

## 🛠️ Scripts disponibles

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvre l'application sur [http://localhost:5173](http://localhost:5173) avec Hot Module Replacement (HMR).

### Lancer les tests

```bash
npm run test
```

Exécute la suite de tests avec Vitest.

### Lancer les tests en mode watch

```bash
npm run test:watch
```

Les tests se relancent automatiquement à chaque modification.

### Build de production

```bash
npm run build
```

Génère une version optimisée dans le dossier `dist/`.

### Prévisualiser le build

```bash
npm run preview
```

Prévisualise le build de production localement.

### Linter

```bash
npm run lint
```

Vérifie la qualité du code avec ESLint.

## 📁 Structure du projet

```
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants React
│   │   ├── Layout/      # Navigation
│   │   └── UserForm/    # Formulaire utilisateur
│   ├── hooks/           # Custom hooks (useTheme, useBirthday)
│   ├── pages/           # Pages (Home, Informations)
│   ├── services/        # Services API
│   ├── stores/          # Zustand stores (userStore, themeStore)
│   ├── styles/          # Fichiers CSS
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── components/
│   │   └── pages/
│   ├── types/           # Types TypeScript
|   ├── tests/           # Tests unitaires
│   ├── App.tsx          # Composant racine
│   └── main.tsx         # Point d'entrée
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧪 Technologies utilisées

### Core
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide

### Routing & State
- **React Router DOM** - Gestion du routing
- **Zustand** - State management léger
- **Zustand Persist** - Persistance localStorage

### Formulaires & Validation
- **React Hook Form** - Gestion de formulaires performante
- **Zod** - Validation de schémas TypeScript-first

### API
- **DummyJSON API** - Génération d'images de profil dynamiques

### Tests
- **Vitest** - Framework de tests unitaires
- **React Testing Library** - Tests de composants React

## 🎨 Choix de design

### Palette de couleurs
- **Accent principal** : Orange chaleureux (`#c3762b` light, `#d8934b` dark)
- **Thème clair** : Fond blanc, texte sombre
- **Thème sombre** : Fond slate foncé, texte clair

### Typographie
- **Police** : Inter (Google Fonts)
- **Base** : 16-18px fluide
- **Titres** : 1.5rem à 2.75rem selon le niveau

### Style Brutalist
- Bordures épaisses (3px)
- Ombres portées décalées
- Animations au hover (translation + ombre)
- Contraste élevé

## ♿ Accessibilité

- ✅ Cibles tactiles minimum 44x44px (WCAG 2.5.5)
- ✅ Ratios de contraste conformes (WCAG 1.4.3)
- ✅ Focus rings visibles (WCAG 2.4.7)
- ✅ Support `prefers-reduced-motion`
- ✅ Support `prefers-contrast: high`
- ✅ Support `forced-colors` (Windows High Contrast)
- ✅ Navigation au clavier complète
- ✅ Labels et ARIA attributes appropriés

## 📱 Responsive

- **Mobile** : < 480px (design vertical, ombres réduites)
- **Tablet** : 481px - 768px (layout adaptatif)
- **Desktop** : > 768px (layout complet)
- **Large screens** : > 1400px (marges élargies)
