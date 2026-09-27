import { getLog } from "../lib/context";
import { server } from "../server";
import { sequelize } from "./sequelize";

async function shutdown(reason: string, err: unknown) {
  getLog().fatal({ err, reason }, 'shutting down');
  if (server) {
    server.close(() => process.exit(1));
  }
  await sequelize.close();
  setTimeout(() => process.exit(1), 10_000).unref();
}

export function registerProcessHandlers() {
  process.on('uncaughtException', (err) => shutdown('uncaughtException', err));
  process.on('unhandledRejection', (err) => shutdown('unhandledRejection', err));

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      getLog().warn(`Get signal ${signal}, stop working...`);
      if (server) {
        server.close(async () => {
          await sequelize.close();
          process.exit(0);
        });
      }
    });
  }
}

