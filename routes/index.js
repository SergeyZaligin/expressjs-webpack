const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/favicon.ico', (req, res) => res.status(204));

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
