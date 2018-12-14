const express = require('express');
var router = express.Router();
const controller = require('../controllers/auth');
// const guardRouter = require('../middleware/guardRouter');

router.get('/login', controller.login);
router.post('/login', controller.checkLogin);
router.get('/logout', controller.logout);

router.get('/registration', controller.registration);
router.post('/registration', controller.signup);

module.exports = router;
