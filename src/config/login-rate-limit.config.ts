import rateLimit from "express-rate-limit";

export const loginLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, 
  message: {
    error: "Слишком много попыток входа, повторите позже",
  },
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
});
