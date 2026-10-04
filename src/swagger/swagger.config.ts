import swaggerJsdoc from 'swagger-jsdoc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extension = __filename.endsWith(".ts") ? "ts" : "js";

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MaintenanceRequest API',
      version: "1.0.0",
      description: 'Документация для REST API «Сервис учёта заявок на обслуживание оборудования»',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Access-токен в заголовке `Authorization: Bearer <token>`"
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: "Refresh-токен в HttpOnly cookie `refreshToken`"
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: extension == 'js' ? [
    './dist/swagger/paths/*.yaml',
    './dist/swagger/schemas/*.yaml',
  ] : [
    './src/swagger/paths/*.yaml',
    './src/swagger/schemas/*.yaml',
  ],
};

export const specs = swaggerJsdoc(options); 