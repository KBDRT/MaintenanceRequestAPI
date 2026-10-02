import { Router } from "express";
import { getFullHealth, getHealth, monitoringAlert, response5xx } from "../controllers/root.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkAccess } from "../middlewares/access.middleware.js";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "../swagger/swagger.config.js";

const rootRouter = Router();

rootRouter.get("/api/health/ready", getFullHealth);
rootRouter.get("/health/live", getHealth);
rootRouter.post("/monitoring", monitoringAlert);

rootRouter.route('/api/test500')
  .get(authenticate, checkAccess([]), response5xx)

export default rootRouter;