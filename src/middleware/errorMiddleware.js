// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
  });
};

module.exports = errorHandler;

