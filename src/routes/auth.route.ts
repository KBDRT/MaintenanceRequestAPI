import { Router } from "express";
import { login, logout, register, refresh, me } from "../controllers/auth.controller.js";
import { authenticate } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/refresh').post(refresh);
authRouter.route('/logout').post(logout);
authRouter.route('/me').get(authenticate, me);

export default authRouter;