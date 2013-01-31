var express = require('express');

var app     = express(),
    server  = require('http').createServer(app),
    ratchet = require('ratchetio'),
    stylus  = require('stylus'),
    email   = require('emailjs/email');

module.exports = app;

var email_username = process.env.EMAIL_USERNAME;
var email_password = process.env.EMAIL_PASSWORD;

app.sender = email.server.connect({
  user: email_username,
  password: email_password,
  host: "smtp.gmail.com",
  ssl: true
});

ratchet.init(process.env.RATCHET_TOKEN);
app.ratchet = ratchet;

ratchet.handleUncaughtExceptions(process.env.RATCHET_TOKEN);

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.use(stylus.middleware({
  src: __dirname + '/public/stylus'
  , dest: __dirname + '/public/css'
  , compress: true
}));

app.engine('jade', require('jade').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

require('./lib')(app);
require('./db')(app);
require('./routes')(app);

server.listen(process.env.PORT || 8000);

console.log('Server running at http://0.0.0.0:8000/');

