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

// Route pour mettre à jour une catégorie
export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
      });

      res.json(updatedCategory);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res
            .status(400)
            .json({ error: "Une catégorie avec ce nom existe déjà." });
        }
      }
      throw error;
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

// Route pour récupérer une catégorie spécifique
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id },
    include: { products: true }, // Inclure les produits associés si nécessaire
  });

  if (!category) {
    return res.status(404).json({ error: "Catégorie non trouvée." });
  }

  res.json(category);
});

// Route pour supprimer une catégorie
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await prisma.category.delete({
        where: { id },
      });

      res
        .status(200)
        .json({ message: "Catégorie supprimée avec succès", category });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return res.status(404).json({ error: "Catégorie non trouvée." });
        }
      }
      throw error;
    }
  }
);
