const jwt = require("jsonwebtoken");
const redis = require('redis');
const { error401 } = require("@/config/sendRes");
const secretkey = "your_secret_key";
const User = require("@/models/user");

const redisClient = redis.createClient({
  legacyMode: true,
  PORT: 6379
});

redisClient.connect().catch((err) => {console.log(err)});

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secretkey, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        const userData = await User.findOne({ username: user.username });
        if (!userData) {
          return res.status(404).send("Khong tim thay nguoi dung");
        }
        redisClient.hSet('onlineUsers', userData.id, Date.now());
        redisClient.hGetAll('onlineUsers', async (err, users) => {
          if (err) {
            console.log(2222, err);
          } else {
            console.log(3333, users);
          }
        })
        req.user = userData;
        next();
      }
    });
  } else {
    res.status(401).json(error401());
  }
};

module.exports = authenticateJWT;
