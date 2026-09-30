import { getLog } from "../lib/context.js";
import { server } from "../server.js";
import { sequelize } from "./sequelize.js";

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
    process.on(signal, () => {
      getLog().warn(`Get signal ${signal}, stop working...`);
      if (server) {
        server.close(async () => {
          await sequelize.close();
          process.exit(0);
        });
      }
      else {
        process.exit(0);
      }
    });
  }
}

