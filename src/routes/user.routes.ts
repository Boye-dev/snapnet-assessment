import {
  createUserValidation,
  refreshTokenValidation,
  loginUserValidation,
} from "./../validations/user.validation";
import { Router } from "express";
import { createUser, login, refresh } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authenticatedMiddleWare";

const router = Router();

router.route("/").post(createUserValidation(), createUser);

router.post("/login", loginUserValidation(), login);

router.post("/refresh", refreshTokenValidation(), refresh);

export default router;
