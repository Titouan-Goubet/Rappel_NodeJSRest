import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateCategory } from "../middlewares/validation";

const router = express.Router();

router.post("/", authMiddleware, validateCategory, createCategory);
router.put("/", authMiddleware, updateCategory);
router.delete("/", authMiddleware, deleteCategory);

router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;
