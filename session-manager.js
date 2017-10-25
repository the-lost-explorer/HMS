/**
author @Amey Parundekar
This file manages the session actions
It contains the following features:
  getHash with any string input
  checkLogin with auth cookie
  login with user ID and password
  logout with auth cookie
*/

var crypto = require('crypto');
var path = require('path');

//Cryptography
function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$').toString('hex');
}

exports.hash = function(input, salt){
    return hash(input, salt);
}

exports.getHash = function(req, res){
    var input = req.params.input;
    var salt = crypto.randomBytes(128).toString('hex');
    var hashedString = hash(input, salt);
    res.send(hashedString);
  }

  
//Check Login
function isLogged(req,pool,callback){
    if(req.session && req.session.auth && req.session.auth.regno){
        pool.one('SELECT * FROM hms.users WHERE regno= $1',[req.session.auth.regno])
            .then(function(data){
                if(callback){callback(data.regno);}
            })
            .catch(function(error){
                console.log(error + 'isLogged');
                if(callback){callback("error");}
            });
    }else{
        if(callback){callback("false");}
    }
}

//Check login true
exports.checkLogin = function(req, res, pool){
    isLogged(req, pool, function(result){
      if(result=="false"){
        res.status(403).send("false");
      }else if(result=="error"){
        res.status(500).send("error");
      }else{
        res.send(result);
      }
    });
  }

//Login 
exports.login = function(req,res,pool){
    var regno = req.body.regno;
    var password = req.body.password;
    pool.one('SELECT * FROM hms.users WHERE regno = $1',[regno])
    .then(function(data){
        var dbString = data.password;
        console.log(dbString);
        var salt = dbString.split('$')[2];
        var hashedPassword = hash(password,salt);
        if(hashedPassword == dbString){
            req.session.auth = {regno: data.regno};
            console.log(data.regno + 'successfully logged in!');
            res.status(200).send('Credentials Correct!');
        }else{
            res.status(403).send('User/Password is inavlid');
        }
    })
    .catch(function(error){
        console.log(error.toString());
        res.status(500).send(error.toString());
    })
}

//Check login false
exports.checkLoginf = function(req, pool, callback){
    isLogged(req, pool, function(result){
      if(result=="false"){
        callback("false");
      }else if(result=="error"){
        callback("error");
      }else{
        callback(result);
      }
    });
  }

//Logout
exports.logout = function(req, res, pool){
    isLogged(req, pool, function(result){
      if(result=="false"){
        res.status(403).send("First log in to logout!");
      }else if(result=="error"){
        res.status(500).send("Error in loggin out!");
      }else{
        var username = req.session.auth.userId;
        delete req.session.auth;
        res.status(200).send("Logged out - " + username + "!");
      }
    });
  }
