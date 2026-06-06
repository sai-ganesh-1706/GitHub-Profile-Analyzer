require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const githubRoutes = require("./routes/githubRoutes");
const githubLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");
//const { connectRedis } = require("./config/redis");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());
//connectRedis();

app.use("/api/github", githubLimiter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "Database Connected Successfully",
      result: rows,
    });

  } catch (error) {

    logger.error(
      `Database Connection Error: ${error.message}`
    );

    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    });
  }
});

app.use("/api/github", githubRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(
    `Server running on port ${PORT}`
  );

  console.log(
    `Server running on port ${PORT}`
  );
});
