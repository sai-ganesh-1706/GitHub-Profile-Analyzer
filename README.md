# GitHub Profile Analyzer API

A backend service built with Node.js, Express.js, MySQL, and GitHub API that analyzes GitHub profiles, generates useful insights, and stores the results in a MySQL database.

## Live Demo

Base URL:

https://github-profile-analyzer-production-f4df.up.railway.app

Swagger Documentation:

https://github-profile-analyzer-production-f4df.up.railway.app/api-docs

---

## Features

- Fetch GitHub public profile data using username
- Analyze repositories and generate insights
- Store analyzed profiles in MySQL
- Retrieve all analyzed profiles
- Retrieve a single analyzed profile
- Calculate custom GitHub Score
- Error handling and logging using Winston
- API Rate Limiting using Express Rate Limit
- Swagger API Documentation
- Railway Deployment
- Environment Variable Configuration

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Swagger
- Winston Logger
- Railway

---

## Project Structure

```text
src/
│
├── config/
│   ├── db.js
│   └── swagger.js
│
├── controllers/
│   └── githubController.js
│
├── middleware/
│   ├── errorHandler.js
│   └── rateLimiter.js
│
├── models/
│   └── profileModel.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── utils/
│   └── logger.js
│
└── server.js
```

---

## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    total_stars INT,
    total_forks INT,
    most_starred_repo VARCHAR(255),
    github_score INT,
    avatar_url TEXT,
    profile_url TEXT,
    account_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=github_analyzer

GITHUB_TOKEN=your_github_token

API_URL=http://localhost:5000
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repo-url>
```

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
npm run dev
```

Server will run at:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/github/:username
```

Example:

```http
POST /api/github/octocat
```

Response:

```json
{
  "github_username": "octocat",
  "name": "The Octocat",
  "public_repos": 8,
  "followers": 22847,
  "total_stars": 21491,
  "github_score": 178724
}
```

---

### Get All Profiles

```http
GET /api/github
```

---

### Get Single Profile

```http
GET /api/github/:username
```

---

### Get Analytics

```http
GET /api/github/stats
```

Returns:

- Total Profiles Analyzed
- Average Followers
- Average GitHub Score
- Most Popular Profile

---

## GitHub Score Formula

```text
GitHub Score =
(public_repos × 2)
+ (followers × 5)
+ (total_stars × 3)
```

---

## Error Handling

The API handles:

- Invalid usernames
- GitHub API errors
- Database errors
- Rate limit exceeded errors
- Internal server errors

Example:

```json
{
  "success": false,
  "message": "GitHub API rate limit exceeded"
}
```

---

## Logging

Winston Logger is used for:

- API requests
- Successful profile analysis
- Database operations
- Error tracking

---

## Deployment

### Backend

Railway

### Database

Railway MySQL

---

## Author

Bangaru Sai Ganesh

B.Tech CSE, IIIT Sri City

GitHub:
https://github.com/sai-ganesh-1706