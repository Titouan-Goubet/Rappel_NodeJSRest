import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateProduct } from "../middlewares/validation";

const router = express.Router();

// Routes nécessitant une connexion (Un role admin par la suite)
router.post("/", authMiddleware, validateProduct, createProduct);
router.put("/:id", authMiddleware, validateProduct, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
