import express from "express";
import { createCategory } from "../controllers/categoryController";
import { validateCategory } from "../middlewares/validation";

const router = express.Router();

router.post("/", validateCategory, createCategory);

export default router;
