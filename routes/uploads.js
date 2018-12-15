const express = require('express');
const router = express.Router();

const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
});

// POST is add
router.post('/image', upload.single('file'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  next();
});


module.exports = router;
