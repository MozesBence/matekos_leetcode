const {useWayBackToken,deactivateToken} = require('../controllers/token_redeemController')
const express = require('express')
const router = express.Router();

router.post('/useWayBackToken',useWayBackToken)
router.put('/deactivate-token',deactivateToken)
module.exports = router;