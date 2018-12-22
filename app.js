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
const wrtcRouter = require('./routes/wrtc');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const uploadsRouter = require('./routes/uploads');

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
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  httpOnly: false,
  store: new MongoStore({
    url: process.env.MONGO_URL,
  }),
}));


app.use('/', indexRouter);
app.use('/wrtc', wrtcRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/uploads', uploadsRouter);

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
