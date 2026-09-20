import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/logout').post(logout);

export default authRouter;