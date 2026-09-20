import { parsed } from "./app.config.js";

const authConfig = {
  secretKey: parsed.data?.JWT_SECRET_KEY ?? "REQUESTS_API_GgO1Bc2ux",
  maxAge: parsed.data?.JWT_MAX_AGE_MS,
};

export default authConfig;