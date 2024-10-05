import { PrismaClient } from "@prisma/client";
import express from "express";
import request from "supertest";
import { createProduct, getProducts } from "../controllers/productController";

// Mock Prisma
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      product: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
      category: {
        findUnique: jest.fn(),
      },
    })),
  };
});

// Mock asyncHandler
jest.mock("../utils/asyncHandler", () => (fn: any) => fn);

const app = express();
app.use(express.json());
app.post("/api/products", createProduct);
app.get("/api/products", getProducts);

describe("Product Controller", () => {
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = new PrismaClient();
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const productData = {
        name: "Test Product",
        price: 9.99,
        description: "A test product",
        categoryId: "123",
        sku: "TEST-SKU-001",
        inStock: true,
        quantity: 10,
      };

      mockPrisma.category.findUnique.mockResolvedValue({
        id: "123",
        name: "Test Category",
      });
      mockPrisma.product.create.mockResolvedValue({
        id: "1",
        ...productData,
        category: { id: "123", name: "Test Category" },
        supplier: null,
      });

      const response = await request(app)
        .post("/api/products")
        .send(productData)
        .expect(201);

      expect(response.body).toEqual({
        id: "1",
        ...productData,
        category: { id: "123", name: "Test Category" },
        supplier: null,
      });
      expect(mockPrisma.product.create).toHaveBeenCalledWith({
        data: {
          ...productData,
          category: {
            connect: { id: "123" },
          },
        },
        include: {
          category: true,
          supplier: true,
        },
      });
    }, 10000);

    it("should return 400 if category doesn't exist", async () => {
      const productData = {
        name: "Test Product",
        price: 9.99,
        description: "A test product",
        categoryId: "123",
      };

      mockPrisma.category.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post("/api/products")
        .send(productData)
        .expect(400);

      expect(response.body).toEqual({
        message: "La catégorie spécifiée n'existe pas.",
      });
    }, 10000);
  });

  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const mockProducts = [
        { id: "1", name: "Product 1", price: 9.99 },
        { id: "2", name: "Product 2", price: 19.99 },
      ];

      mockPrisma.product.findMany.mockResolvedValue(mockProducts);

      const response = await request(app).get("/api/products").expect(200);

      expect(response.body).toEqual(mockProducts);
      expect(mockPrisma.product.findMany).toHaveBeenCalled();
    }, 10000);
  });
});
