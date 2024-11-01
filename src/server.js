require("module-alias/register");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketConfig = require('@/config/socketIO');
const wsConfig = require('@/config/ws');

require('dotenv').config();

const route = require("@/routes/index");
const viewEngine = require("@/config/viewEngine");

const app = express();

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

viewEngine(app)

app.use(bodyParser.json());
app.use(express.json());
app.use('/', route);

socketConfig(app);
wsConfig(app);

app.listen(port, hostname, () => {
    console.log(`Server running at port ${port}`)
})