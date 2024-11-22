let router = require("express").Router();
// const { LoginValidate, RegisterValidate, ChangePasswordValidate } = require("@/validate/validateAuth");

const { AddContact, ListContact, ListContactWaitConf, ListContactSend, DeleteContact, ApproveContact } = require("@/controllers/contact.controller");
const authenticateJWT = require("@/middleware/auth");

router.get("/list", authenticateJWT, ListContact);
router.get("/list-wait-conf", authenticateJWT, ListContactWaitConf);
router.get("/list-send", authenticateJWT, ListContactSend);
router.post("/add", authenticateJWT, AddContact);
router.post("/delete", authenticateJWT, DeleteContact);
router.post("/approve-friend", authenticateJWT, ApproveContact);

module.exports = router;