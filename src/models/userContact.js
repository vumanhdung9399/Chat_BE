// // models/UserContact.js
const { DataTypes } = require("sequelize");
const sequelize = require("@/config/connectDBSequelize");

const UserContact = sequelize.define(
  "UserContact",
  {
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    friend: {
      type: DataTypes.ENUM("friend", "wait_conf"),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "user_contact",
  }
);

module.exports = UserContact;
