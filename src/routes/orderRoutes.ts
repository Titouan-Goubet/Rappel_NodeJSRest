// src/routes/orderRoutes.ts
import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.post("/", asyncHandler(createOrder));
router.get("/", asyncHandler(getAllOrders));

export default router;
