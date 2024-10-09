import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";

const prisma = new PrismaClient();

// Inscription d'un utilisateur
// http://localhost:3000/api/auth/register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Cet email est déjà utilisé." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res
    .status(201)
    .json({ message: "Utilisateur créé avec succès.", userId: user.id });
});

// Connexion d'un utilisateur
// http://localhost:3000/api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verif email existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return (
      res
        .status(400)
        // On reste évasif pour ne pas se faire bruteforce les email
        .json({ message: "Email ou mot de passe incorrect." })
    );
  }

  // Verif mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Email ou mot de passe incorrect." });
  }

  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  // Le refresh token part en cookie http only et sera utilisé uniquement pour refresh l'access token, il ne sert pas a authentifier
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
  });

  res.json({ accessToken });
});

// Rafraichir le token d'accès via le refresh token
// // POST http://localhost:3000/api/auth/refresh-token
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    // On récupére alors le refreshToken dans les cookie http only et on vérifie sa validité
    const { refreshToken } = req.cookies;

    // Les cookies HTTP-only sont automatiquement envoyés par le navigateur avec chaque requête HTTP au domaine auquel ils appartiennent.

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token manquant." });
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ message: "Refresh token invalide." });
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: "Refresh token invalide." });
    }
  }
);

// Déconnexion d'un utilisateur
// POST http://localhost:3000/api/auth/logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null },
    });
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Déconnexion réussie." });
});
