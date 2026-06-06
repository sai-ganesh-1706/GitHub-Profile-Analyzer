const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GitHub Profile Analyzer API",
      version: "1.0.0",
      description:
        "API for analyzing GitHub profiles and storing insights",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;