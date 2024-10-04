import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  }
);

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
  }
);
