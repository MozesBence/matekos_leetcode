const express = require('express');
const router = express.Router();
const settingsConfirmController = require('../controllers/settingsConfrimController');

router.get('/get-confirm-code', settingsConfirmController.sendConfirmCode);

router.patch('/set-settings', settingsConfirmController.setSettings);

module.exports = router;
