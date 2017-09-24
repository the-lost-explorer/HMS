var path = require('path');

//External Dependencies
var sessionManager = require('./session-manager.js');

exports.getUser = function(req, res, pool){
    sessionManager.checkLoginf(req, pool, function(isLogged){
      if(isLogged=="false")
        res.status(403).send("Login to get user details");
      else if(isLogged=="error")
        res.status(500).send("Error");
      else
        pool.one("SELECT * FROM hms.student_details WHERE regno = $1", [req.session.auth.regno])
        .then(function(results){
            res.status(200).send(results);
        })
        .catch(function(error){
          console.log(error.toString());
          res.status(500).send("Error");
        });
    });
  }


exports.getRoom = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      room = req.params.input;
      pool.one("SELECT * FROM hms.room WHERE room_id = $1", [room])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.getMess = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      mess = req.params.input;
      pool.one("SELECT * FROM hms.mess WHERE id = $1", [mess])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}
