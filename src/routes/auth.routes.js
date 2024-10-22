let router = require("express").Router();
const { LoginValidate, RegisterValidate, ChangePasswordValidate } = require("@/validate/validateAuth");

const { Login, Register, GetUser, RefreshToken, Logout, ChangePassword } = require("@/controllers/auth.controller");
const authenticateJWT = require("@/middleware/auth");

router.post("/login", LoginValidate, Login);
router.post("/register", RegisterValidate, Register);
router.post("/refresh-token", RefreshToken);
router.post("/logout", authenticateJWT, Logout);
router.post("/change-password", authenticateJWT, ChangePasswordValidate, ChangePassword);
router.get("/user", authenticateJWT, GetUser);

module.exports = router;