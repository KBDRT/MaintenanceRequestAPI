import rateLimit from "express-rate-limit";
import appConfig from "./app.config.js";

export const globalLimiter = rateLimit({
  windowMs: appConfig.rateLimit.windowMs,
  max: appConfig.rateLimit.maxRequests, 
  message: {
    error: "Слишком много запросов с вашего IP",
  },
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});
