CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    total_stars INT DEFAULT 0,
    total_forks INT DEFAULT 0,
    most_starred_repo VARCHAR(255),
    github_score INT DEFAULT 0,
    avatar_url TEXT,
    profile_url TEXT,
    account_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
