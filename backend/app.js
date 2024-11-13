var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const promMid = require('express-prometheus-middleware');

const TimeResponse = require('./TimeResponse');

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/*', function(_, req, res, next) {
  if(req !== "mysecrettoken"){
    res.sendStatus(403)
  }
  else {
    next()
  }
})

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
}));

app.get('/time', (req, res) => {
  var timeResponse = new TimeResponse();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(timeResponse));  
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5001, () => {
	console.log("The application has started");
})

module.exports = app;
