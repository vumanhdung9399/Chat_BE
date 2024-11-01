const sequelize = require("@/config/connectDBSequelize");

const User = require("./user");
const Contact = require("./contact");
const UserContact = require("./userContact");

User.associate({ User, Contact, UserContact });
Contact.associate({ User, Contact, UserContact });

module.exports = {
  User,
  UserContact,
  Contact,
  sequelize
};