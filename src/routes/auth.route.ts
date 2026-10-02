import { Router } from "express";
import { login, logout, register, refresh, me } from "../controllers/auth.controller.js";
import { authenticate } from '../middlewares/auth.middleware.js';
import { loginLimitter } from './../config/login-rate-limit.config.js';
import { validate } from "../middlewares/validator.middleware.js";
import { registerUserSchema } from "../validators/schemas/users/register-user.schema.js";
import { loginUserSchema } from "../validators/schemas/users/login-user.schema.js";

const authRouter = Router();

authRouter.route('/register').post(validate({body: registerUserSchema}), register);
authRouter.route('/login').post(loginLimitter, validate({body: loginUserSchema}), login);
authRouter.route('/refresh').post(refresh);
authRouter.route('/logout').post(logout);
authRouter.route('/me').get(authenticate, me);

export default authRouter;