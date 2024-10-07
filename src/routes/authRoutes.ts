import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController";
import { validateLogin, validateRegister } from "../middlewares/validation";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
