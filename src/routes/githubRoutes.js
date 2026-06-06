const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getProfiles,
  getProfile,
  getAnalytics,
} = require("../controllers/githubController");

/**
 * @swagger
 * /api/github/stats:
 *   get:
 *     summary: Get analytics of stored GitHub profiles
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 */
router.get("/stats", getAnalytics);
/**
 * @swagger
 * /api/github/{username}:
 *   post:
 *     summary: Analyze a GitHub profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile analyzed successfully
 */
router.post("/:username", analyzeProfile);

/**
 * @swagger
 * /api/github:
 *   get:
 *     summary: Get all analyzed GitHub profiles
 *     responses:
 *       200:
 *         description: Profiles fetched successfully
 */
router.get("/", getProfiles);

/**
 * @swagger
 * /api/github/{username}:
 *   get:
 *     summary: Get a single GitHub profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get("/:username", getProfile);

module.exports = router;
