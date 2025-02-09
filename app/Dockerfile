# Utilisez une image de base avec Node.js
FROM node:20.16.0

# Copiez le contenu de votre projet dans le conteneur
WORKDIR /app

COPY package*.json .

# Installez les dépendances
RUN npm install
RUN npm i -g serve

# Copiez le reste du code de votre projet dans le conteneur
COPY . .

RUN npm run build

# Exposez le port utilisé par votre application
EXPOSE 3000

# Démarrez votre application
CMD ["serve", "-s", "dist"]
