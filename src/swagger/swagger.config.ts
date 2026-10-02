import swaggerJsdoc from 'swagger-jsdoc';

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
  apis: ['./src/swagger/paths/*.ts', './src/swagger/schemas/*.ts'],
};

export const specs = swaggerJsdoc(options); 