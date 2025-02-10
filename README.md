## Citopia-JVS Test - Application Full Stack

### **Lien vers l'application déployée**

L'application est déployée et accessible via ce lien : [Citopia-JVS](https://skill-level3-7m8e0iqas-sergueis-projects-5c54ca99.vercel.app/)

---

### **Frontend (Vite, React, Redux, Yarn)**

C'est une application conçue pour illustrer une **expérience utilisateur fluide et réactive** en s'appuyant sur un **système multi-agent supervisé**.

Le **frontend** repose sur **React, Redux, et TypeScript**, garantissant une gestion d'état efficace et une architecture évolutive. Grâce à **Vite**, le projet bénéficie d'un **hot reloading instantané** et de performances accrues.

#### **Points forts du Frontend :**

- **Développement ultra-rapide avec Vite**, réduisant les temps de compilation.
- **Code robuste et maintenable grâce à TypeScript**.
- **Gestion d'état avancée avec Redux**, assurant une synchronisation fluide.
- **UI dynamique et interactive avec React**, optimisée pour une expérience utilisateur engageante.
- **Intégration fluide avec des APIs REST**, notamment **DummyJSON API**, pour récupérer des données et générer des contenus dynamiques.
- **Optimisation des performances avec lazy loading et code splitting**.
- **Animations et transitions élégantes**.
- **Accessibilité et personnalisation des thèmes**, offrant une expérience inclusive.
- **Optimisations de performance pour une exécution fluide et efficace**.
- **Déploiement rapide et efficace sur Vercel et Render avec Redis pour le caching**.

---

### **Backend (NestJS, Langchain, Langraph, Tavily API, Mistral API) - Optionnel et Innovant**

Le **backend** est conçu avec **NestJS et TypeScript**, et intègre des technologies avancées comme **Langchain et Langraph** pour orchestrer les workflows multi-agents, ainsi que **Tavily API et Mistral API** pour enrichir les capacités de traitement des données.

#### **Caractéristiques principales du Backend :**

- **API REST modulaire avec NestJS**, facilitant l’échange de données.
- **Orchestration avancée des agents avec Langchain et Langraph**.
- **Intégration des APIs Tavily et Mistral** pour enrichir l’analyse et l’interprétation des données.
- **Gestion optimisée des interactions avec un superviseur dédié**.
- **Déploiement sur Render**, assurant scalabilité et fiabilité.

---

### **Installation et exécution locale**

#### **Prérequis**

Avant de lancer l'application en local, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **Yarn** (pour la gestion des dépendances du frontend)
- **NPM** (pour la gestion des dépendances du backend)
- **Docker** (optionnel, pour la base de données locale)
- **Clés API** pour Tavily API et Mistral API (à configurer dans les fichiers `.env`)

#### **Clonage du projet**

```bash
git clone https://github.com/votre-url-de-repository.git
cd citopia-project
```

#### **Installation et démarrage du frontend (Yarn)**

```bash
cd frontend
yarn install
yarn dev
```

L'application frontend sera accessible à : `http://localhost:5173`

##### **Hot Reloading pour le frontend**

- **Vite** permet un hot reloading instantané en surveillant les fichiers sources et en rechargeant uniquement les composants modifiés.
- **React Fast Refresh** assure une mise à jour immédiate des changements dans le code sans perte d’état.
- **Utilisation recommandée** : Lors du développement, toute modification dans les fichiers `.tsx` ou `.js` est appliquée en temps réel dans le navigateur sans nécessiter de rechargement manuel.

#### **Installation et démarrage du backend (NPM)**

```bash
cd backend
npm install
npm run start:dev
```

L'API backend sera disponible à : `http://localhost:3001`

##### **Hot Reloading pour le backend**

- **NestJS** utilise **nodemon** pour surveiller les modifications et redémarrer automatiquement le serveur.
- **Installation supplémentaire si nécessaire** :

```bash
npm install -g nodemon
```

- **Commande pour un rechargement instantané** :

```bash
npm run start:dev
```

- **Avantages** : Développement rapide sans interruption du serveur.

#### **Configuration des variables d'environnement**

Ajoutez les fichiers `.env` aux répertoires `frontend` et `backend`.

##### **.env pour le Frontend :**

```bash
VITE_BACKEND_URL=http://localhost:3001
```

##### **.env pour le Backend :**

```bash
TAVILY_API_KEY=votre_clé_api_tavily
MISTRAL_API_KEY=votre_clé_api_mistral
```

---

### **Test Technique Citopia-JVS**

Ce test technique a été conçu pour évaluer la capacité à :

- **Développer une application complète en React et Redux**.
- **Créer une gestion dynamique des données utilisateur via une intégration API**.
- **Exploiter pleinement DummyJSON API pour générer du contenu dynamique et interactif**.
- **Structurer un projet de manière propre et évolutive**.
- **Respecter les meilleures pratiques de développement et de gestion Git**.

J’ai choisi d’intégrer une approche backend optionnelle pour démontrer une vision plus étendue du projet et explorer des perspectives intéressantes. Ce choix traduit un **investissement personnel pour enrichir et structurer l’application**, tout en conservant la clarté et la maintenabilité du code.

### **Réflexion sur l'expérience de développement**

J’ai pris énormément de plaisir à travailler sur cette tâche. Elle était **stimulante, élégante et enrichissante**, offrant une belle opportunité de faire preuve de **créativité tout en respectant des critères stricts de développement de haut niveau et de bonnes pratiques de développement**. L'intégration de **DummyJSON API** a été particulièrement intéressante pour démontrer une **approche dynamique et réactive des données utilisateur**. Cette expérience a renforcé mon engagement à produire un code **structuré, performant et maintenable**, en alliant **innovation et rigueur technique**.

