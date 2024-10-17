const jwt = require("jsonwebtoken");
const { error401 } = require("@/config/sendRes");
const secretkey = "your_secret_key";
const User = require("@/models/user");

const authenticateJWT = (req, res, next) => {
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

        req.user = userData;
        next();
      }
    });
  } else {
    res.status(401).json(error401());
  }
};

module.exports = authenticateJWT;
