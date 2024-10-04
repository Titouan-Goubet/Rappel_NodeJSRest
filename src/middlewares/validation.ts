import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

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

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (error instanceof z.ZodError) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ error: error.errors });
        } else {
          res.status(400).json({ error: "Unknown error" });
        }
      } else {
        res.status(400).json({ error: "Unknown error" });
      }
    } else {
      res.status(400).json({ error: "Unknown error" });
    }
  }
};

const categorySchema = z.object({
  name: z.string().min(1).max(100),
});

const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  try {
    categorySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default validateCategory;
