// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response } from 'express';

const router = express.Router();

// Swagger configuration options
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        servers: [
            {
              url: "http://localhost:8080/",
              description: "Local server"
            },
            {
              url: "<your live url here>",
              description: "Live server"
            },
          ]
    },
    apis: [ './src/api/swagger-route.ts'], // Path to the API routes directory
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve,swaggerUi.setup(specs));
router.get('/api-docs', swaggerUi.setup(specs));

router.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
});

export default router;
