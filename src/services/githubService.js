const axios = require("axios");
const { saveProfile } = require("../models/profileModel");
//const redisClient = require("../config/redis");
const logger = require("../utils/logger");

const analyzeGithubProfile = async (username) => {
  try {

    // Check cache first
    //const cachedProfile = await redisClient.get(username);

    /*if (cachedProfile) {
      logger.info(`Cache HIT for ${username}`);

      return JSON.parse(cachedProfile);
    }

    logger.info(`Cache MISS for ${username}`);*/

    // Run both API calls in parallel
    const [userResponse, repoResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ]);

    const user = userResponse.data;
    const repos = repoResponse.data;

    let totalStars = 0;
    let totalForks = 0;
    let mostStarredRepo = "";
    let maxStars = 0;

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (repo.stargazers_count > maxStars) {
        maxStars = repo.stargazers_count;
        mostStarredRepo = repo.name;
      }
    });

    const githubScore =
      user.public_repos * 2 +
      user.followers * 5 +
      totalStars * 3;

    const profileData = {
      github_username: user.login,
      name: user.name,
      bio: user.bio,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      total_stars: totalStars,
      total_forks: totalForks,
      most_starred_repo: mostStarredRepo,
      github_score: githubScore,
      avatar_url: user.avatar_url,
      profile_url: user.html_url,
      account_created_at: new Date(user.created_at),
    };

    // Save in MySQL
    await saveProfile(profileData);

    /*// Cache for 1 hour
    await redisClient.set(
      username,
      JSON.stringify(profileData),
      {
        EX: 3600,
      }
    );*/

    logger.info(
      `Profile analyzed successfully: ${username}`
    );

    return profileData;

  } catch (error) {

    logger.error(
      `GitHub Analysis Failed for ${username}: ${error.message}`
    );

    throw error;
  }
};

module.exports = {
  analyzeGithubProfile,
};
