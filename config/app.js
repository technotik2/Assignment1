
//3rd party modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');
//point mongoos eto database url
mongoose.connect(DB.URL, {UseNewUrlParser: true, UseUnifiedTopology: true});
let mongooseDB = mongoose.connection;
mongooseDB.on('error', console.error.bind(console, 'Connection Error: '));
mongooseDB.once('open', ()=>{
  console.log('Connected to db');


});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
//added static path to node_modules
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(express.static("public"));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});
app.use('/',(req,res,next) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
  res.render('Contact', { title: 'Contact' });
});

module.exports = app;
