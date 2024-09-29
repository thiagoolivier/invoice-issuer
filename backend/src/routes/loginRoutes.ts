import { Router } from "express";
import { login, refresh, verify } from "../controllers/loginController";
import { validateLogin, validateVerify } from "../middlewares/validateLogin";

const router = Router();

router.post("/login", validateLogin, login);
router.post("/verify", validateVerify, verify);
router.post("/refresh", validateVerify, refresh); // Validates just as the "verify" logic

export default router;
