import { error } from "node:console";
import { getLog } from "../lib/context";
import { sequelize } from "./sequelize";

export async function waitForDatabase({ attempts = 10, baseDelayMs = 500 } = {}) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await sequelize.authenticate();
      getLog().info("Database connected.");
      return;
    } catch (err) {
      if (attempt === attempts) {
        getLog().error("Database connection problem. Server stopped!");
        process.exit(1);
      }
      const delay = baseDelayMs * attempt;
      getLog().warn(`Database unavailable (attempt ${attempt}/${attempts}), next atempt after ${delay} ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}