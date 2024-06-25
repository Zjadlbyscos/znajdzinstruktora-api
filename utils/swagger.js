import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Znajdzinstruktora app",
      version: "1.0.0",
      description:
        "Znajdzinstruktora-api serves as the backbone for the ZnajdzInstruktora App, a platform dedicated to people who are looking for an ability to find a personal trainer. The API provides endpoints for user registration, login, and management, as well as for creating, updating, and deleting user profiles. The API also provides endpoints for creating, updating, and deleting user reviews. The API is secured with JWT authentication.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Znajdz Instruktora",
        email: "halo.znajdzinstruktora@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/api/*.js", "./schemas/*.js"],
};

// swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDocs(options);

export function swagger(app) {
  // Swagger page
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
