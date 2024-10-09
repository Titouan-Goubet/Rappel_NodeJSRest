import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

// Créer une commande
// POST http://localhost:3000/api/orders
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { status, items } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        status: status || "PENDING",
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.productId } },
          })),
        },
      },
      include: {
        items: true,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    if ((error as any).code === "P2025") {
      res
        .status(400)
        .json({
          message: "Un ou plusieurs produits spécifiés n'existent pas.",
        });
    } else {
      throw error;
    }
  }
});

// Récupérer les commandes
// GET http://localhost:3000/api/orders
export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(orders);
  }
);

// Récupérer une commande par son ID
// GET http://localhost:3000/api/orders/:id
export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) {
    res.status(404);
    throw new Error("Commande non trouvée");
  }
  res.json(order);
});

// Mettre à jour une commande
// PUT http://localhost:3000/api/orders/:id
export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: true,
    },
  });
  res.json(order);
});

// Supprimer une commande
// DELETE http://localhost:3000/api/orders/:id
export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.order.delete({
    where: { id },
  });
  res.status(204).send();
});
