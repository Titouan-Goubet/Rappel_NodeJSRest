import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
const app = express();
const port = 3000;

// Middleware pour pouvoir analyser les format JSON
// En gros on peut parser les requete http contenant du JSON dans le body
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
