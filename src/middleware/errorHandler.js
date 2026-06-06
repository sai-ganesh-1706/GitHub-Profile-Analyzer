const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.response?.status === 404) {
    return res.status(404).json({
      success: false,
      message: "GitHub user not found",
    });
  }

  if (err.response?.status === 403) {
    return res.status(429).json({
      success: false,
      message: "GitHub API rate limit exceeded",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
