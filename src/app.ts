import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
const app = express();
const port = 3000;

// Rate limiter pour empécher un éventuel bruteforce d'un utilisateur malveillant
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const corsOptions = {
  origin: "http://localhost:5173", // Autorisation de mon futur front end React
  optionsSuccessStatus: 200,
};

app.disable("x-powered-by");
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use(morgan("dev"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
