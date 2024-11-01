let router = require("express").Router();
// const { LoginValidate, RegisterValidate, ChangePasswordValidate } = require("@/validate/validateAuth");

const { AddContact, ListContact, DeleteContact } = require("@/controllers/contact.controller");
const authenticateJWT = require("@/middleware/auth");

router.get("/list", authenticateJWT, ListContact);
router.post("/add", authenticateJWT, AddContact);
router.post("/delete", authenticateJWT, DeleteContact);

module.exports = router;