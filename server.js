//Routing Library
var express = require('express');
var app = express();

//Logging
var morgan = require('morgan');
app.use(morgan('dev'));

//Path functions
var path = require('path');

//Session management
var session = require('express-session');
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60}
}));

//Body parsing for reqs
var bodyParser = require('body-parser');
app.use(bodyParser());

//Beautify console
var chalk = require('chalk');
var write = console.log;

//PostgreSQL 
var pgp = require('pg-promise')();
var config = {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    password: 'fsociety'
};
var pool = pgp(config);

//External Dependencies
var sessionManager = require('./session-manager.js');
var dashManager = require('./dash-manager.js');

//Routing
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'ui','index.html'));
});

app.get('/ui/:fileName', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

//login
app.post('/login', function(req, res){
    sessionManager.login(req,res,pool);
 });

//check-login
app.get('/check-login', function(req, res){
    sessionManager.checkLogin(req,res,pool);
 });

app.get('/get-user', function(req, res){
    dashManager.getUser(req,res,pool);
});


//logout
app.get('/logout', function(req, res){
sessionManager.logout(req,res,pool);
});

//get-room
app.get('/get-room/:input', function(req, res) {
    dashManager.getRoom(req, res, pool);
  });

//get-room
app.get('/get-mess/:input', function(req, res) {
    dashManager.getMess(req, res, pool);
  });

//Hashing 
//for backend use only
app.get('/hash/:input', function(req, res) {
    sessionManager.getHash(req, res);
  });

var port = 8085;
app.listen(port,function(){
    write(chalk.red.bold('Hostel Management System up and running on port:'),chalk.green.bold('8085'));
});

   

