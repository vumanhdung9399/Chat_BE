let router = require("express").Router();
const { LoginValidate, RegisterValidate } = require("@/validate/validateAuth");

const { Login, Register, GetUser, RefreshToken, Logout } = require("@/controllers/auth.controller");
const authenticateJWT = require("@/middleware/auth");

router.post("/login", LoginValidate, Login);
router.post("/register", RegisterValidate, Register);
router.post("/refresh-token", RefreshToken);
router.post("/logout", authenticateJWT, Logout)
router.get("/user", authenticateJWT, GetUser);

module.exports = router;