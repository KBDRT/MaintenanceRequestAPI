import swaggerJsdoc from 'swagger-jsdoc';

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MaintenanceRequest API',
      version: "1.0.0",
      description: 'Документация для REST API «Сервис учёта заявок на обслуживание оборудования»',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:3000/api',
    //     description: 'Development server',
    //   },
    // ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/swagger/paths/*.ts', './src/swagger/schemas/*.ts'],
};

export const specs = swaggerJsdoc(options); 