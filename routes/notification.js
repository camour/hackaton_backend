const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.post('/subscription', notificationController.handleWebClientSubscription);
router.get('/', notificationController.sendNotificationToWebClient);

module.exports = router;