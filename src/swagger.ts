import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Web Applications - Assignment2 REST API",
            version: "1.0.0",
            description: "REST server including authentication, posts, comments and users management.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};