import { Router } from "express";
import { getHealth } from "../controllers/root.controller.js";

const rootRouter = Router();

rootRouter.get("/health", getHealth);

export default rootRouter;