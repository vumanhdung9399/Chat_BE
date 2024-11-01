const jwt = require("jsonwebtoken");
const { error401 } = require("@/config/sendRes");
const { JWT_SECRET } = require("@/config/configJWT");
const User = require("@/models/user");

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        const userData = await User.findOne({ where: {username: user.username }});
        
        if (!userData) {
          return res.status(404).send("Khong tim thay nguoi dung");
        }
        req.user = userData;
        next();
      }
    });
  } else {
    res.status(401).json(error401());
  }
};

module.exports = authenticateJWT;
