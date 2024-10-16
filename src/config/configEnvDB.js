require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.PORT,
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.PORT,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_prod",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
