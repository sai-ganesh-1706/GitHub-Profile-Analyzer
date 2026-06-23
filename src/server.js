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


// TESTING REVIEW AI

console.log("test");

const x = 1 / 0; // Potential division by zero

var userName = "admin"; // Use const instead of var

if (userName == "admin") { // Use === instead of ==
    console.log("Admin access");
}

function getData() {
    // Empty function
}

let password = "123456"; // Hardcoded credential

try {
} catch (e) {
    // Empty catch block
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(
    `Server running on port ${PORT}`
  );

  console.log(
    `Server running on port ${PORT}`
  );
});
