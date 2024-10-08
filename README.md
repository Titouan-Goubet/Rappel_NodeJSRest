# Rappel Node.js REST API

Ce projet est une session d'**entraînement** pour la création d'API REST avec **Node.js** et **Express**. Il s'agit d'un guide pratique pour se familiariser à nouveau avec les bases du développement d'API en utilisant Node.js, Express, Prisma (pour l'ORM), Docker (pour la gestion de la base de données) et Zod pour la validation des données.

## Objectif

L'objectif principal de ce projet est de s'entraîner et de renforcer les compétences en développement backend, en mettant l'accent sur :

- La structuration d'une API REST robuste avec Node.js et Express.
- L'utilisation de Prisma comme ORM pour simplifier les interactions avec la base de données.
- La mise en place de Docker pour isoler et gérer efficacement une base de données MySQL.
- L'implémentation d'une gestion d'erreurs solide et l'application de bonnes pratiques de sécurité.
- L'utilisation de Zod pour une validation des données fiable et typesafe.

## Fonctionnalités

- **Serveur Express** avec gestion des routes pour des opérations CRUD (Create, Read, Update, Delete).
- **Connexion à une base de données MySQL** gérée via Docker.
- Utilisation de **Prisma** comme ORM pour interagir de manière efficace avec la base de données MySQL.
- Gestion des erreurs et validation des données via des middlewares utilisant Zod.
- Configuration de l'application avec des **variables d'environnement** (fichier `.env`).
- Développement facilité grâce au suivi automatique des changements dans le code avec **Nodemon**.
- Authentification des utilisateurs avec gestion des tokens.

## Installation

### Prérequis

- **Node.js** installé (v14 ou plus recommandé).
- **Docker** et **Docker Compose** pour la gestion de la base de données.
- **Git** pour cloner le projet.

### Étapes

1. **Cloner le projet** :

```shellscript
git clone git@github.com:Titouan-Goubet/Rappel_NodeJSRest.git
cd Rappel_NodeJSRest
```

2. **Installer les dépendances** :

```shellscript
npm install
```

3. **Configurer les variables d'environnement** :

4. Copier le fichier `.env.example` et le renommer en `.env` :

```shellscript
cp .env.example .env
```

5. Ouvrir le fichier `.env` et compléter les champs avec vos informations spécifiques.

6. **Lancer Docker** pour la base de données :

```shellscript
docker-compose up -d
```

7. **Initialiser la base de données avec Prisma** :

```shellscript
npx prisma migrate dev
```

8. **Lancer le serveur** en mode développement :

```shellscript
npm run dev
```

Le serveur sera accessible à l'adresse `http://localhost:3000`.

## Utilisation

Pour tester l'API, vous pouvez utiliser **Postman** ou tout autre outil similaire. Voici les principaux endpoints disponibles :

### Authentification

- `POST /api/auth/register` - Créer un nouveau compte utilisateur
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter
- `POST /api/auth/refresh-token` - Rafraîchir le token d'authentification

### Produits

- `GET /api/products` - Récupérer tous les produits
- `POST /api/products` - Créer un nouveau produit
- `GET /api/products/:id` - Récupérer un produit par son ID
- `PUT /api/products/:id` - Mettre à jour un produit existant
- `DELETE /api/products/:id` - Supprimer un produit

### Catégories

- `GET /api/categories` - Récupérer toutes les catégories
- `POST /api/categories` - Créer une nouvelle catégorie
- `GET /api/categories/:id` - Récupérer une catégorie par son ID
- `PUT /api/categories/:id` - Mettre à jour une catégorie existante
- `DELETE /api/categories/:id` - Supprimer une catégorie

Une documentation plus détaillée de l'API via Swagger est prévue pour une future mise à jour, ce qui facilitera grandement l'exploration et l'utilisation de tous les endpoints disponibles.

## Structure du projet

```plaintext
Rappel_NodeJSRest/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── categoryController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── categoryRoutes.js
│   ├── services/
│   │   └── prisma.js
│   └── app.js
│
├── prisma/
│   └── schema.prisma
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express** : Framework web minimaliste pour Node.js.
- **Prisma** : ORM moderne pour simplifier les interactions avec la base de données.
- **MySQL** : Système de gestion de base de données relationnelle.
- **Docker** : Pour la conteneurisation de la base de données.
- **Zod** : Bibliothèque de validation de schéma pour TypeScript.
- **Nodemon** : Outil qui permet le redémarrage automatique du serveur lors des modifications du code.
- **JSON Web Tokens (JWT)** : Pour l'authentification et la gestion des sessions.

## Auteur

- [Titouan](https://github.com/Titouan-Goubet)
