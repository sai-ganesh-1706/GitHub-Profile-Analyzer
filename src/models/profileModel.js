const pool = require("../config/db");

const saveProfile = async (profile) => {
  const query = `
    INSERT INTO github_profiles (
      github_username,
      name,
      bio,
      public_repos,
      followers,
      following,
      total_stars,
      total_forks,
      most_starred_repo,
      github_score,
      avatar_url,
      profile_url,
      account_created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      total_stars = VALUES(total_stars),
      total_forks = VALUES(total_forks),
      most_starred_repo = VALUES(most_starred_repo),
      github_score = VALUES(github_score),
      avatar_url = VALUES(avatar_url),
      profile_url = VALUES(profile_url),
      account_created_at = VALUES(account_created_at)
  `;

  await pool.query(query, [
    profile.github_username,
    profile.name,
    profile.bio,
    profile.public_repos,
    profile.followers,
    profile.following,
    profile.total_stars,
    profile.total_forks,
    profile.most_starred_repo,
    profile.github_score,
    profile.avatar_url,
    profile.profile_url,
    profile.account_created_at,
  ]);
};

const getAllProfiles = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM github_profiles ORDER BY analyzed_at DESC"
  );

  return rows;
};

const getProfileByUsername = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM github_profiles WHERE github_username = ?",
    [username]
  );

  return rows[0];
};
const getStats = async () => {
  const [rows] = await pool.query(`
    SELECT
      COUNT(*) AS totalProfiles,
      ROUND(AVG(followers), 2) AS averageFollowers,
      MAX(github_score) AS topGithubScore,
      SUM(public_repos) AS totalRepositories
    FROM github_profiles
  `);

  return rows[0];
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
  getStats,
};
