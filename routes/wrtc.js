const express = require('express');
const router = express.Router();
const controller = require('../controllers/wrtc');

/* GET home page. */
router.get('/', controller.wrtc);

module.exports = router;
