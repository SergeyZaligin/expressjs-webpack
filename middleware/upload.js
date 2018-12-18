const multer = require('multer');
const moment = require('moment');
const diskStorage = require('../utils/diskStorage');
const Sharp = require('sharp');

const storage = diskStorage({
  destination(req, file, cb) {
    if (req.body.isThumbnail) {
      cb(null, 'uploads/article/thumbnail/');
    } else if (!req.body.isThumbnail) {
      cb(null, 'uploads/article/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    cb(null, `${date}-${file.originalname}`);
  },
  sharp(req, file, cb) {
    const resizer = Sharp()
        .resize(1024, 768)
        .max()
        .withoutEnlargement()
        .toFormat('jpg')
        .jpeg({
          quality: 40,
          progressive: true,
        });
    cb(null, resizer);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});
