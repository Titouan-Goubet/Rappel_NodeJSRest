import { PrismaClient } from "@prisma/client";
import express from "express";
import request from "supertest";
import { createProduct, getProducts } from "../controllers/productController";

// Mock Prisma
jest.mock("@prisma/client");

const app = express();
app.use(express.json());
app.post("/api/products", createProduct);
app.get("/api/products", getProducts);

describe("Product Controller", () => {
  let mockPrismaCreate: jest.Mock;
  let mockPrismaFindMany: jest.Mock;

  beforeEach(() => {
    mockPrismaCreate = jest.fn();
    mockPrismaFindMany = jest.fn();
    (PrismaClient as jest.Mock).mockImplementation(() => ({
      product: {
        create: mockPrismaCreate,
        findMany: mockPrismaFindMany,
      },
    }));
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const productData = {
        name: "Test Product",
        price: 9.99,
        description: "A test product",
        categoryId: "123",
      };

      mockPrismaCreate.mockResolvedValue({ id: "1", ...productData });

      const response = await request(app)
        .post("/api/products")
        .send(productData)
        .expect(201);

      expect(response.body).toEqual({ id: "1", ...productData });
      expect(mockPrismaCreate).toHaveBeenCalledWith({ data: productData });
    });
  });

  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const mockProducts = [
        { id: "1", name: "Product 1", price: 9.99 },
        { id: "2", name: "Product 2", price: 19.99 },
      ];

      mockPrismaFindMany.mockResolvedValue(mockProducts);

      const response = await request(app).get("/api/products").expect(200);

      expect(response.body).toEqual(mockProducts);
      expect(mockPrismaFindMany).toHaveBeenCalled();
    });
  });
});
