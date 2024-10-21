const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} = require("@/config/configJWT");

const { error422, success200, error500 } = require("@/config/sendRes");

const { validationResult } = require("express-validator");
const User = require("@/models/user");
const RefreshTokenModel = require("@/models/refreshToken");

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(error422(errors.array()));
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        username,
      };

      const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
      });

      await RefreshTokenModel.create({
        users_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      res.status(200).json(success200(data));
    } else {
      res.status(401).json({ message: "Tai khoan hoac mat khau khong dung" });
    }
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(error422(errors.array()));
  }

  const { username, password, email } = req.body;

  const user = await User.create({
    username,
    password,
    email,
  });
  if (user) {
    res.status(200).json(success200());
  } else {
    res.status(500).json(error500());
  }
};

const RefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const tokenRecord = await RefreshTokenModel.findOne({
    where: { token: refreshToken },
  });

  if (!tokenRecord || tokenRecord.expires_at < new Date()) {
    return res.sendStatus(403).json({ message: "Refresh token khong hop le hoac da het han" });
  }

  const payload = {
    id: tokenRecord.user_id,
  };

  const data = {
    accessToken: jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
  };

  res.status(200).json(success200(data));
};

const Logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        const userData = await User.findOne({ username: user.username });
        if (!userData) {
          return res.status(404).send("Khong tim thay nguoi dung");
        }
        await RefreshTokenModel.destroy({ where: { users_id: userData.id } })
        return res.status(200).json(success200(null, 'Dang xuat thanh cong'))
      }
    });
  }
}

const GetUser = (req, res) => {
  if (req.user) {
    res.status(200).json(success200(req.user));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  Login,
  Register,
  GetUser,
  RefreshToken,
  Logout
};
