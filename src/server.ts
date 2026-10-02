import { registerProcessHandlers } from "./infrastructure/errors-handle.js";
import appConfig from "./config/app.config.js";
import app from "./app.js";
import { getLog } from "./lib/context.js";
import { waitForDatabase } from "./infrastructure/db-wait-connection.js";
import { Server } from "node:http";
import { sequelize } from "./infrastructure/sequelize.js";

registerProcessHandlers();

export let server: Server | undefined;

(async () => {
  await waitForDatabase();

  // sequelize.sync({force: true});

  server = app.listen(appConfig.port, async() => {
    getLog().info(`SERVER STARTS ON PORT: ${appConfig.port}.`);
    getLog().info(`MODE: ${appConfig.nodeEnv}`);
    getLog().info(`API: /api`);
    
  });

  server.keepAliveTimeout = 65_000;
})();