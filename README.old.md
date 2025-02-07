# Test technique Citopia
## Objectif
- Le test doit être réalisé en utilisant ce dépôt comme base.
- Les travaux devront être testables sans aucune modification à apporter au code ou au paramétrage, et si besoin, en suivant une documentation pas-à-pas.
- Utilisez tous les outils nécessaires pour compléter les tâches.
- Portez une attention particulière à l'historique Git, comme s'il s'agissait d'une situation réelle en projet.

## Finalisation de l'exercice
- Créez une pull request sur le dépôt avec votre travail.
- Le travail doit être testable et documenté.

## Contraintes
### Dans cet exercice, vous devrez utiliser :
- React
- TypeScript

### En option :
- Ajouter une feature qui vous semble interressante
- Utiliser Redux Saga.

## Exercices à réaliser

### R1 : Création de l'application
Créez une application fictive comportant les pages suivantes : Accueil, Informations.

- La page d'accueil devra afficher le contenu défini en R4.
- La page Informations devra afficher le contenu défini en R2.
- L'application devra intégrer une navigation permettant de passer d'une page à l'autre.
- L'application doit pouvoir être facilement lancée en mode développement (avec Hot Reloading) et compilée simplement pour une mise en production.

### R2 : Création d'un formulaire utilisateur
Ajoutez un formulaire sur la page Informations comportant les champs suivants :

- Nom
- Prénom
- Date de naissance

### R3 : Mise à jour automatique des données
Les modifications effectuées dans le formulaire doivent être enregistrées dans un état local sans cliquer sur un bouton "Enregistrer".
Pour ce faire veillez utiliser une solution de *state-management*

### R4 : Affichage dynamique sur la page d'accueil
Sur la page d'accueil :

- Faites un appel à l'API DummyJSON (https://dummyjson.com/docs) pour générer une image dynamique basée sur les données utilisateur (prénom et nom).
- L'image sera a afficher au dessus de la phrase : "Votre anniversaire est dans *X* jours" avec *X* le nombre de jours avant la date d'anniversaire spécifiée dans la partie Informations.
- Attention aux champs qui ne seraient pas encore définis

## Points d'attention
- Organisez votre code pour qu’il soit lisible et maintenable.
- Fournissez une documentation claire sur la manière d'exécuter, tester et déployer le projet.
- Adoptez les bonnes pratiques Git : commits clairs, messages explicites, etc.
- Bonus
  - Ajoutez des tests unitaires ou d’intégration (exemple : Jest, React Testing Library).
