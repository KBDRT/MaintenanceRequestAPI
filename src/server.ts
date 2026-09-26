import appConfig from "./config/app.config.js";
import app from "./app.js";
import { getLog } from "./lib/context.js";

const server = app.listen(appConfig.port, () => {
  getLog().info(`SERVER STARTS ON PORT: ${appConfig.port}.`);
  getLog().info(`MODE: ${appConfig.nodeEnv}`);
  getLog().info(`API: /api`);
});

function shutdown(reason: string, err: unknown) {
  getLog().fatal({ err, reason }, 'shutting down');
  server.close(() => process.exit(1));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('uncaughtException', (err) => shutdown('uncaughtException', err));
process.on('unhandledRejection', (err) => shutdown('unhandledRejection', err));