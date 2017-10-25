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

exports.getUserForWarden = function(req,res,pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login first!");
    else if(isLogged=="error")
      res.status(500).send("Error in authentication.");
    else
      regno = req.params.input;
      pool.one("SELECT * FROM hms.student_details WHERE regno = $1", [regno])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.addBM = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login first!");
    else if(isLogged=="error")
      res.status(500).send("Error in authentication.");
    else
      var message = req.body.message;
      console.log(message);
      pool.tx(t => {
        const q = t.one("INSERT INTO hms.bm(regno,message) VALUES($1,$2) RETURNING id",[req.session.auth.regno,message]);
        // returning a promise that determines a successful transaction:
        return t.batch([q]); // all of the queries are to be resolved;
    })
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.addS = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login first!");
    else if(isLogged=="error")
      res.status(500).send("Error in authentication.");
    else
      var regno = req.body.regno;
      var hb = req.body.hb;
      var messid = req.body.messid;
      var roomid = req.body.roomid;
      var roomno = req.body.roomno;
      pool.tx(t => {
        const q = t.one("UPDATE hms.student SET hostel_block = $1, mess_id = $2,room_id = $3,room_no = $4 WHERE regno = $5 RETURNING regno",[hb,messid,roomid,roomno,regno]);
        return t.batch([q]); 
    })
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}