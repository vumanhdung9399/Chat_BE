const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoute = require("./auth.routes");
const swaggerDocs = require("@/config/swagger");

const router = express.Router();

router.use('/', authRoute);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;