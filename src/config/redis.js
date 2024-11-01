const Redis = require("ioredis");

const redisClient = new Redis({
  legacyMode: true,
  disableOfflineQueue: true,
  PORT: 6379,
});

module.exports = redisClient;