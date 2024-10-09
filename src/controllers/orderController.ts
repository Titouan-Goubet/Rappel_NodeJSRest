import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Créer une commande
// POST http://localhost:3000/api/orders
export const createOrder = async (req: Request, res: Response) => {
  const { status, items } = req.body;
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
};

// Récupérer les commandes
// GET http://localhost:3000/api/orders
export const getAllOrders = async (req: Request, res: Response) => {
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
};
