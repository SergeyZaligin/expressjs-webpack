const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const staticAsset = require('static-asset');
const favicon = require('serve-favicon');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

dotenv.config({
  path: path.join(__dirname, '.env'),
});

mongoose
    .connect(
        process.env.MONGO_URL, {
          useCreateIndex: true,
          useNewUrlParser: true,
        },
    )
    .then(() => {
      console.log('Connection mongodb success!!!');
    })
    .catch((error) => console.log(error));

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: `Ошибка - ${err.status || 500}`,
    meta: {
      description: `Ошибка - ${err.status || 500}`,
      keywords: `Ошибка - ${err.status || 500}`,
    },
  });
});

module.exports = app;
