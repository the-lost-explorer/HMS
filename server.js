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

app.get('/dashboard',function(req,res){
    var val = dashManager.getDash(req,res);
    if(val == 1){
        res.sendFile(path.join(__dirname,'ui','dashboard.html'));
    }else{
        res.sendFile(path.join(__dirname,'ui','dashboard-wr.html'));
    }
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

//get-userwr
app.get('/get-userwr/:input', function(req, res) {
    dashManager.getUserForWarden(req, res, pool);
  });

//post-broadcast-message
app.post('/bm', function(req, res){
dashManager.addBM(req,res,pool);
});

//parent-id
app.get('/pid', function(req, res){
    dashManager.getParentID(req,res,pool);
    });

//post-hostel-registration
app.post('/mhr', function(req, res){
    dashManager.addS(req,res,pool);
});

//update parent details
app.post('/up', function(req, res){
    dashManager.updateParent(req,res,pool);
});

//update student details
app.post('/us', function(req, res){
    dashManager.updateStudent(req,res,pool);
});

//leave-approval
app.post('/al', function(req, res){
    dashManager.approveLeave(req,res,pool);
});

//applying leave
app.post('/leave', function(req, res){
    dashManager.applyLeave(req,res,pool);
});

//getting broadcast messages
app.get('/broadcast', function(req, res){
    dashManager.getBM(req,res,pool);
});

//getting leave details
app.get('/get-leave', function(req, res){
    dashManager.getLeave(req,res,pool);
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

   

