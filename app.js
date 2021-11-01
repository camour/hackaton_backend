const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const notificationsRoutes = require('./routes/notification');

// parse request body since it contains JSON data
app.use(bodyParser.json());

app.use('/', notificationsRoutes);

module.exports = app;