import { Router } from "express";
import { getFullHealth, getHealth, who } from "../controllers/root.controller.js";

const rootRouter = Router();

rootRouter.get("/api/health", getFullHealth);
rootRouter.get("/healthz", getHealth);
rootRouter.get("/api/who", who);

export default rootRouter;