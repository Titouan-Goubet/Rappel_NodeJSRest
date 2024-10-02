# Rappel Node.js REST API

Ce projet est une session de **rappel** sur la création d'API REST avec **Node.js** et **Express**. Il s'agit d'un guide pratique pour se familiariser à nouveau avec les bases du développement d'API en utilisant Node.js, Express, Sequelize (pour l'ORM), et Docker (pour la gestion de la base de données).

## Fonctionnalités

- **Serveur Express** avec gestion des routes pour des opérations CRUD (Create, Read, Update, Delete).
- **Connexion à une base de données MySQL** gérée via Docker.
- Utilisation de **Sequelize** pour interagir avec la base de données MySQL.
- Gestion des erreurs et validation via des middlewares.
- Configuration de l'application avec des **variables d'environnement** (fichier `.env`).
- Suivi automatique des changements dans le projet grâce à **Nodemon**.

## Installation

### Prérequis

- **Node.js** installé (v12 ou plus recommandé).
- **Docker** et **Docker Compose** pour la gestion de la base de données.
- **Git** pour cloner le projet.

### Étapes

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/ton-utilisateur/rappel-nodejs-rest.git
   cd rappel-nodejs-rest
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :

   - Crée un fichier `.env` à la racine du projet avec les informations suivantes :
     ```
     DB_NAME=nom_de_la_bdd
     DB_USER=utilisateur_bdd
     DB_PASSWORD=motdepasse_bdd
     DB_HOST=127.0.0.1
     DB_DIALECT=mysql
     ```

4. **Lancer Docker** pour la base de données :

   ```bash
   docker-compose up -d
   ```

5. **Lancer le serveur** en mode développement :

   ```bash
   npm run dev
   ```

   Le serveur sera disponible à l'adresse `http://localhost:3000`.

## Utilisation

Tu peux tester l'API en utilisant **Postman** ou tout autre outil d'API pour envoyer des requêtes aux endpoints suivants :

- `GET /products` - Récupérer tous les produits
- `POST /products` - Créer un nouveau produit
- `GET /products/:id` - Récupérer un produit par son ID
- `PUT /products/:id` - Mettre à jour un produit existant
- `DELETE /products/:id` - Supprimer un produit

## Objectif

Cette session de rappel a pour objectif de réviser les concepts suivants :

- Structurer une API REST avec Node.js et Express.
- Utiliser un ORM (Sequelize) pour simplifier les interactions avec une base de données.
- Utiliser Docker pour isoler et gérer une base de données MySQL.
- Mettre en place une gestion d'erreurs robuste et utiliser des bonnes pratiques pour la sécurité (comme les variables d'environnement).

## Technologies utilisées

- **Node.js** : Environnement JavaScript côté serveur.
- **Express** : Framework minimaliste pour créer des API.
- **Sequelize** : ORM pour interagir avec des bases de données SQL.
- **MySQL** : Base de données relationnelle utilisée dans Docker.
- **Nodemon** : Redémarrage automatique du serveur lors des modifications du code.
- **Postman** : Pour tester l'API.

## Auteurs

- [Titouan](https://github.com/ton-utilisateur)
