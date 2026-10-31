function errorHandler(error, req, res, next) {
  const reportedStatus = error.statusCode || error.status;
  const statusCode = Number.isInteger(reportedStatus) && reportedStatus >= 400 && reportedStatus < 600
    ? reportedStatus
    : error.code === "23505"
      ? 409
      : 500;

  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : statusCode === 409
        ? "A user with this email already exists"
        : error.message || "Internal server error";

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
