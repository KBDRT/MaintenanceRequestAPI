import { parsed } from "./app.config.js";

const authConfig = {
  refreshToken:
  {
    secretKey: parsed.data?.JWT_REFRESH_TOKEN_KEY ?? "REF_SECRET_KEY",
    maxAge:  parsed.data?.JWT_REFRESH_TOKEN_MAX_AGE_MS ?? 604800000,
  },
  
  accessToken: {
    secretKey: parsed.data?.JWT_ACCESS_TOKEN_KEY ?? "ACC_SECRET_KEY",
    maxAge: parsed.data?.JWT_ACCESS_TOKEN_MAX_AGE_S ?? 900,
  },
  saltRounds: parsed.data?.JWT_SALT_ROUNDS ?? 10
};

export default authConfig;
