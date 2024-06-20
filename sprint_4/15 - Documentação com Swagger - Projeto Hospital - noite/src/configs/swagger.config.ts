import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Router } from "express";

const option: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Projeto Hospital",
      version: "1.0.0",
      description: "Alguma descrição do projeto",
    },
  },
  apis: ["./src/api/**/*.swagger.yaml"],
};

const swaggerSpec = swaggerJSDoc(option);

export const swaggerRouter = Router();

swaggerRouter.use("", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
