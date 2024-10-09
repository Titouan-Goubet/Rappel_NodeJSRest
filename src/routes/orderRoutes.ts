import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Connexion requise (+ Role admin / Privilége)
router.post("/", authMiddleware, createOrder);

// Commande pour récuperer toutes les commandes (Roles admin a prévoir)
router.get("/", authMiddleware, getAllOrders);

export default router;
