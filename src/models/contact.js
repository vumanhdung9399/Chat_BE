// // models/Contact.js
const { DataTypes } = require("sequelize");
const sequelize = require("@/config/connectDBSequelize");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(14),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "contacts",
  }
);

Contact.associate = (models) => {
  Contact.belongsToMany(models.User, {
    through: models.UserContact,
    foreignKey: "contact_id",
    otherKey: "users_id",
  });
};

module.exports = Contact;