const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/image', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  console.log(req.body);
  res.status(200).json({
    message: 'Картинка загружена на сервер в папку uploads.',
  });
});

module.exports = router;
