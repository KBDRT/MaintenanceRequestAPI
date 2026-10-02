import { parsed } from "./app.config.js";

const authConfig = {
  refreshSecretKey: parsed.data?.JWT_REFRESH_TOKEN_KEY ?? "REF_SECRET_KEY",
  accessSecretKey: parsed.data?.JWT_ACCESS_TOKEN_KEY ?? "ACC_SECRET_KEY",
  maxAge: parsed.data?.JWT_MAX_AGE_MS,
  saltRounds: parsed.data?.JWT_SALT_ROUNDS ?? 10
};

export default authConfig;
