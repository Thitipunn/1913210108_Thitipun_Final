var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var config = require('./config/index')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var brandRouter = require('./routes/brand');
var modelRouter = require('./routes/model');
var staffRouter = require('./routes/staff');

const errorHandle = require('./middleware/errorHandle');

var app = express();
mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/brand', brandRouter);
app.use('/model', modelRouter);
app.use('/staff', staffRouter);

app.use(errorHandle);
module.exports = app;
