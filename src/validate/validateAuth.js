const { body } = require("express-validator");
const User = require("@/models/user");

const LoginValidate = [
  body("username").notEmpty().withMessage("Username khong duoc de trong"),
  body("password").notEmpty().withMessage("Password khong duoc de trong"),
];

const RegisterValidate = [
  body("email")
    .isEmail()
    .withMessage("Email khong hop le")
    .custom(async (value, { req }) => {
      const findEmail = await User.findOne({
        where: {
          email: value,
        },
      });
      if (findEmail) {
        throw new Error("Email da ton tai");
      }
      return true;
    }),
  body("username")
    .isLength({ min: 4 })
    .withMessage("Username phai co it nhat 4 ky tu")
    .custom(async (value, { req }) => {
      const findUsername = await User.findOne({
        where: {
          username: value,
        },
      });
      if (findUsername) {
        throw new Error("Username da ton tai");
      }
      return true;
    }),
  body("username")
    .isLength({ min: 4 })
    .withMessage("Username phai co it nhat 4 ky tu"),
  body("username")
    .isLength({ max: 50 })
    .withMessage("Username toi da 50 ky tu"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password phai co it nhat 8 ky tu"),
  body("password")
    .isLength({ max: 50 })
    .withMessage("Password cho phep toi da 50 ky tu"),
  body("re_password").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Mat khau xac nhan khong khop!");
    }
    return true;
  }),
];

const ChangePasswordValidate = [
  body("new_password")
    .isLength({ min: 8 })
    .withMessage("Password phai co it nhat 8 ky tu"),
  body("new_password")
    .isLength({ max: 50 })
    .withMessage("Password cho phep toi da 50 ky tu"),
  body("re_password").custom((value, { req }) => {
    if (value != req.body.new_password) {
      throw new Error("Mat khau xac nhan khong khop!");
    }
    return true;
  }),
];

module.exports = {
  LoginValidate,
  RegisterValidate,
  ChangePasswordValidate,
};
