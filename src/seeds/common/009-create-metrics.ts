import { randomInt } from "crypto";
import { Seeder } from "../../config/umzug.config.js";

export const examppleMetric = { 
  route: "/test/login",
  method: "GET",
  statusCode: 200,
  createdAt: new Date()
}

const METHODS = ["GET", "POST", "DELETE", "PATCH"];

const CODES = [200, 201, 401, 403, 404, 422, 500, 503];

export const up: Seeder = async ({ context: sequelize }) => {

  let metrics = [];
  for (let index = 0; index < 1000; index++) {
    const code = CODES[randomInt(0, CODES.length - 1)];
    const method = METHODS[randomInt(0, METHODS.length - 1)];
    const duration = randomInt(1, 1000);

    metrics.push({...examppleMetric, statusCode: code, method: method, durationMs: duration});
  }

  await sequelize.getQueryInterface().bulkInsert('HttpMetrics', metrics);
};

export const down: Seeder = async ({ context: sequelize }) => {
   await sequelize.getQueryInterface().bulkDelete('HttpMetrics', { route: examppleMetric.route });
};