import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

// Route pour créer une catégorie
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

// Route pour récupérer toutes les catégories
export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
  }
);

// Route pour supprimer une catégorie
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await prisma.category.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Catégorie supprimée avec succès", category });
  }
);
