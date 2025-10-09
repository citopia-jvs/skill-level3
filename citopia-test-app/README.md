# React + TypeScript + Vite

# Citopia Test App

## Description

Application React pour Citopia, développée en TypeScript avec Vite et permettant :

- la saisie d’informations utilisateur (nom, prénom, date de naissance),

- l’affichage d’une page d’accueil avec image dynamique générée selon les données utilisateur,

- un état centralisé via UserContext et une navigation entre pages avec React Router.

## Installation

```bash
# Clone du dépôt
git clone https://github.com/bcalas78/skill-level3.git
cd citopia-test-app

# Installation des dépendances
npm install
```

## Lancer l'application

Pour démarrer le serveur de développement avec Vite :

```bash
npm run dev
```

Puis ouvrir le navigateur à l’adresse indiquée (généralement http://localhost:5173).

## Build de production

Pour générer une version de production :

```bash
npm run build
```

Le fichier /dist contient les fichiers optimisés.

## Tests

### Lancer les tests unitaires avec Vitest

```bash
npm run test
```

### Couverture de code

```bash
npm run test:coverage
```

Le rapport des tests se trouvent dans coverage/index.html qu'il faut ouvrir dans un navigateur pour visualiser les résultats.

## Choix techniques justifiés

React + TypeScript : pour bénéficier de composants réutilisables et de typage statique.

Vite : pour un démarrage rapide et un hot reload performant.

Vitest : pour les tests unitaires, rapide et compatible avec Vite.

React Router DOM : pour gérer le routage entre les pages Accueil et Informations.

Context API : pour centraliser l’état utilisateur (nom, prénom, date de naissance) et le partager entre les composants.

CSS mobile-first : pour garantir une bonne expérience sur tous types d’écrans.

Composants réutilisables (Input, PageTitle) : pour standardiser l’affichage et simplifier la maintenance.

## Fonctionnalités

Navigation entre les pages Accueil et Informations.

Saisie des informations utilisateur avec validation (champs requis).

Calcul du nombre de jours avant le prochain anniversaire.

Affichage conditionnel et gestion du contexte utilisateur.

Composants réutilisables et stylisés de manière responsive.

Tests unitaires avec Vitest pour garantir le bon fonctionnement des composants et de la logique métier.

Bonus: intégration d'une météo en temps réel comme tout citoyen peut avoir envie de trouver sur les supports de ses collectivités locales.

# Auteur

Projet réalisé par Barbara Calas

dans le cadre du test technique Citopia "skill-level3".
