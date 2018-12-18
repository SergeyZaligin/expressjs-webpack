const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/image', upload.upload('uploads/'), function(req, res, next) {
  res.status(200).json({
    message: 'Картинка загружена на сервер в папку uploads.',
  });
});

module.exports = router;
