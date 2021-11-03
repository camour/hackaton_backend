const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.post('/subscription', notificationController.handleWebClientSubscription);
//router.get('/onem2m', notificationController.sendNotificationToWebClient);
router.post('/onem2m', notificationController.sendNotificationToWebClient);

module.exports = router;