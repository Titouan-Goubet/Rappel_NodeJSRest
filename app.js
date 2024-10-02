const express = require("express");
const app = express();
const port = 3000;
const { ConnectToDatabase, connectToDatabase } = require("./config/database");

// Middleware pour pouvoir analyser les format JSON
// En gros on peut parser les requete http contenant du JSON dans le body
app.use(express.json());

// Connexion a notre bddmysql
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
