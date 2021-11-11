const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

// the different routes accessible from our web client
router.post('/login', notificationController.login);
router.post('/logout', notificationController.logout);
router.post('/subscription', notificationController.handleWebClientSubscription);

//when our gateway node wants to get us notified about a new data
router.use('/onem2m', notificationController.sendNotificationToWebClient);

module.exports = router;