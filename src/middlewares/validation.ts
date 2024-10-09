import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

// Schéma de validation produit
const productSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  sku: z.string().min(1).max(100),
  inStock: z.boolean(),
  quantity: z.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  supplierId: z.string().uuid().optional(),
});

// Schéma de validation catégorie
const categorySchema = z.object({
  name: z.string().min(1).max(100),
});

// Schéma de validation inscription
const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
});

// Schéma de validation connexion
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const orderSchema = z.object({
  status: z
    .enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"])
    .optional(),
  items: z.array(orderItemSchema).nonempty(),
});

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    orderSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
