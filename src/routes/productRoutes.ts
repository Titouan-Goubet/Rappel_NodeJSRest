import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import { validateProduct } from "../middlewares/validation";

const router = express.Router();

router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;
