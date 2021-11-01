const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

router.post('/subscription', notificationController.handleSubscription);
router.get('/', notificationController.sendNotification);

module.exports = router;