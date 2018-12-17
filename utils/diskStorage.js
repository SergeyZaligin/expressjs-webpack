const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const mkdirp = require('mkdirp');

function getFilename(req, file, cb) {
  crypto.pseudoRandomBytes(16, function(err, raw) {
    cb(err, err ? undefined : raw.toString('hex'));
  });
}

function getDestination(req, file, cb) {
  cb(null, os.tmpdir());
}

function DiskStorage(opts) {
  this.getFilename = (opts.filename || getFilename);

  if (typeof opts.destination === 'string') {
    mkdirp.sync(opts.destination);
    this.getDestination = function($0, $1, cb) {
      cb(null, opts.destination);
    };
  } else {
    this.getDestination = (opts.destination || getDestination);
  }
  this.getSharp = opts.sharp;
}

DiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  const that = this;

  that.getDestination(req, file, function(err, destination) {
    if (err) return cb(err);

    that.getFilename(req, file, function(err, filename) {
      if (err) return cb(err);

      that.getSharp(req, file, function(err, resizer) {
        if (err) return cb(err);
        const finalPath = path.join(destination, filename);
        const outStream = fs.createWriteStream(finalPath);

        file.stream.pipe(resizer).pipe(outStream);
        outStream.on('error', cb);
        outStream.on('finish', function() {
          cb(null, {
            destination: destination,
            filename: filename,
            path: finalPath,
            size: outStream.bytesWritten,
          });
        });
      });

    });
  });
};

DiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  const path = file.path;

  delete file.destination;
  delete file.filename;
  delete file.path;

  fs.unlink(path, cb);
};

module.exports = function(opts) {
  return new DiskStorage(opts);
};
