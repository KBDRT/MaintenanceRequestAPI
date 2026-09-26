import { getLog } from "../lib/context";
import { server } from "../server";
import { sequelize } from "./sequelize";

export function shutdown(reason: string, err: unknown) {
  getLog().fatal({ err, reason }, 'shutting down');
  server.close(() => process.exit(1));
  sequelize.close();
  setTimeout(() => process.exit(1), 10_000).unref();
}

