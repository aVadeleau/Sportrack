var createError = require('http-errors');
const express = require('express');
const session=require('express-session');
const fileUpload= require('express-fileupload');
const bodyParser= require("body-parser");
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true, 
            maxAge: 1000* 60* 60 *2
  
   }
}));

//Enable files upload
app.use(fileUpload(
  {
    safeFileNames : true,
    preserveExtension : true 
  }
));

//Cookie parser
app.use(cookieParser());


app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded( { extended: false}));
app.use(bodyParser.json());


//Routes de l'application
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectRouter = require('./routes/connect');
var uploadRouter = require('./routes/upload');
var activitiesRouter = require('./routes/activities');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/connect',connectRouter);
app.use('/upload',uploadRouter);
app.use('/activities',activitiesRouter);

var users = require('./routes/users');
var connect= require('./routes/connect');
var upload = require('./routes/upload');
var activities = require('./routes/activities');

app.use('/users',users);
app.use('/connect',connect);
app.use('/upload',upload);
app.use('/activities',activities);


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
  res.render('error');
});

module.exports = app;
