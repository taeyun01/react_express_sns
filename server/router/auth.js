import express from "express";
import * as authController from "../controller/auth.js";
import validate from "../middleware/validator.js";
import {
  validateCredential,
  validateSignup,
} from "../middleware/validateAuth.js";

const router = express.Router();

router.post("/signup", validateSignup, validate, authController.signup);

router.post("/login", validateCredential, validate, authController.login);

export default router;
