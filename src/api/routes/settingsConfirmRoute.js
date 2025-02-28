const express = require('express');
const router = express.Router();
const settingsConfirmController = require('../controllers/settingsConfrimController');

const profileAuth = require("../middlewares/profileAuth");

router.get('/get-confirm-code', settingsConfirmController.sendConfirmCode);

router.patch('/set-settings', settingsConfirmController.setSettings);

router.get('/get-all-reports', [ profileAuth.verifyToken ], settingsConfirmController.getAllReports);

router.post('/close-report', [ profileAuth.verifyToken ], settingsConfirmController.closeReport);

router.get('/get-all-notif',  settingsConfirmController.getAllNotif);

router.get('/get-all-users', [ profileAuth.verifyToken ],  settingsConfirmController.getAllUser);

module.exports = router;
