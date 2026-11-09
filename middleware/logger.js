const logger = (req, res, next) => {
  const startTime = new Date().toISOString();
  console.log(`[${startTime}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;