import appConfig from "./config/app.config.js";
import app from "./app.js";
import { getLog } from "./lib/context.js";
import { waitForDatabase } from "./infrastructure/db-wait-connection.js";
import { shutdown } from "./infrastructure/proccess-handle.js";
import { sequelize } from "./infrastructure/sequelize.js";

export const server = app.listen(appConfig.port, async() => {
  await waitForDatabase();
  getLog().info(`SERVER STARTS ON PORT: ${appConfig.port}.`);
  getLog().info(`MODE: ${appConfig.nodeEnv}`);
  getLog().info(`API: /api`);
});

process.on('uncaughtException', (err) => shutdown('uncaughtException', err));
process.on('unhandledRejection', (err) => shutdown('unhandledRejection', err));

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    getLog().warn(`Get signal ${signal}, stop working...`);
    server.close(async () => {
      sequelize.close();
      process.exit(0);
    });
  });
}