import express, { Request, Response } from "express";
const app = express();
const port = 3000;

// Middleware pour pouvoir analyser les format JSON
// En gros on peut parser les requete http contenant du JSON dans le body
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
