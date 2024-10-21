const { DataTypes } = require('sequelize');
const sequelize = require("@/config/connectDBSequelize");

const RefreshToken = sequelize.define('refresh_tokens', {
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Tên bảng `users`
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
});

module.exports = RefreshToken;