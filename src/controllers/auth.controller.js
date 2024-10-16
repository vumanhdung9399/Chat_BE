const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { error422, success200 } = require("@/config/sendRes");

const secretKey = "your_secret_key";
const { validationResult } = require("express-validator");
const User = require("@/models/user");

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

      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      res.json({ message: "Login successfull", token });
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

  //
};

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
};
