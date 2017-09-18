//External Libraries
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
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

//Use
app.use(morgan('combined'));
app.use(bodyParser());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60}
}));


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'ui','index.html'));
});

app.get('/ui/:fileName', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

//Test function for database connectivity
function getUser(res){
    pool.any("SELECT * FROM hms.users")
    .then(function(result){
        res.status(200).send(result);
    })
    .catch(function(err){
        res.status(500).send(err);
    });
}

app.get('/test',function(req,res){
    getUser(res);
});

//login
app.post('/login', function(req, res){
    sessionManager.login(req,res,pool);
 });

//Hashing
app.get('/hash/:input', function(req, res) {
    sessionManager.getHash(req, res);
  });

var port = 8085;
app.listen(port,function(){
    console.log("HMS is up and running!");    
});

   

