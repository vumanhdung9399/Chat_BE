"use strict"
const { DataTypes } = require("sequelize");
const sequelize = require("@/config/connectDBSequelize");

const User = sequelize.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        is_reported: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "users"
    }
);

module.exports = User;