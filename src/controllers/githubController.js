const {
  analyzeGithubProfile,
} = require("../services/githubService");

const {
  getAllProfiles,
  getProfileByUsername,
  getStats,
} = require("../models/profileModel");

const logger = require("../utils/logger");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await analyzeGithubProfile(username);

    logger.info(
      `Profile analyzed successfully: ${username}`
    );

    return res.status(200).json({
      success: true,
      message: "Profile analyzed successfully",
      data,
    });

  } catch (error) {

    logger.error(
      `Analyze Profile Error: ${error.message}`
    );

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    if (error.response?.status === 403) {
      return res.status(429).json({
        success: false,
        message: "GitHub API rate limit exceeded",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfiles = async (req, res) => {
  try {

    const profiles = await getAllProfiles();

    logger.info(
      `Fetched ${profiles.length} profiles`
    );

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {

    logger.error(
      `Get Profiles Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {

    const { username } = req.params;

    const profile =
      await getProfileByUsername(username);

    if (!profile) {

      logger.warn(
        `Profile not found in DB: ${username}`
      );

      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    logger.info(
      `Profile fetched successfully: ${username}`
    );

    return res.status(200).json({
      success: true,
      data: profile,
    });

  } catch (error) {

    logger.error(
      `Get Profile Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAnalytics = async (req, res) => {
  try {

    const stats = await getStats();

    logger.info("Analytics fetched successfully");

    return res.status(200).json({
      success: true,
      data: stats,
    });

  } catch (error) {

    logger.error(
      `Analytics Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  analyzeProfile,
  getProfiles,
  getProfile,
  getAnalytics,
};
