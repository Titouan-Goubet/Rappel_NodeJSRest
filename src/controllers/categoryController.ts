import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const existingCategory = await prisma.category.findUnique({
        where: { name },
      });

      if (existingCategory) {
        return res.status(400).json({ error: "Cette catégorie existe déjà." });
      }

      const category = await prisma.category.create({
        data: { name },
      });

      res.status(201).json(category);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res
          .status(400)
          .json({ error: "Erreur de la base de données Prisma" });
      }

      console.error(error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }
);
