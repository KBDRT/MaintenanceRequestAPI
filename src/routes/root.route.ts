import { Router } from "express";
import { getFullHealth, getHealth, monitoringAlert, response5xx } from "../controllers/root.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkAccess } from "../middlewares/access.middleware.js";

const rootRouter = Router();

rootRouter.get("/api/health", getFullHealth);
rootRouter.get("/healthz", getHealth);
rootRouter.post("/api/monitoring", monitoringAlert);

rootRouter.route('/api/test5xx')
  .get(authenticate, checkAccess([]), response5xx)

export default rootRouter;