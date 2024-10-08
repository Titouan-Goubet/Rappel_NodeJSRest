require("dotenv").config(); // Charge les variables d'environnement depuis .env
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // Pas de validation de dialecte, utilisation directe de la variable d'environnement
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
    await sequelize.sync({ force: true });
    console.log("La base de données est synchronisée.");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
  }
};

module.exports = {
  connectToDatabase,
  sequelize,
};
