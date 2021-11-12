const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const notificationsRoutes = require('./routes/notification');

// set CORS mecanism
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// parse request body since it contains JSON data
app.use(bodyParser.json());
app.use('/', notificationsRoutes);

module.exports = app;