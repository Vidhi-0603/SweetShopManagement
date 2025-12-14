const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error("🔥 Error:", err.message);

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;