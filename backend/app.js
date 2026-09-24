var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/userRoutes');
var quizRouter = require('./routes/quizRoutes');

var app = express();
var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
  credentials: true, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", 
  allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}));

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Admin:251066@cluster0.jni4wi9.mongodb.net/QuizDB?appName=Cluster0';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Error while connectiong to the database"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: mongoDB})
}));


app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/users', usersRouter);
app.use('/quiz', quizRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.json({ message: err.message, error: res.locals.error });
});

module.exports = app;
