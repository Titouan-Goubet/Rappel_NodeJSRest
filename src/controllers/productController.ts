import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId, ...productData } = req.body;

    // Vérifier si la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res
        .status(400)
        .json({ message: "La catégorie spécifiée n'existe pas." });
    }

    try {
      const product = await prisma.product.create({
        data: {
          ...productData,
          category: {
            connect: { id: categoryId },
          },
        },
        include: {
          category: true,
          supplier: true,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      if ((error as any).code === "P2002") {
        return res
          .status(400)
          .json({ message: "Un produit avec ce SKU existe déjà." });
      }
      throw error;
    }
  }
);

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.json(product);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send();
  }
);
