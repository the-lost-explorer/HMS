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

exports.updateParent = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login first!");
    else if(isLogged=="error")
      res.status(500).send("Error in authentication.");
    else
      // var key = req.body.keys;
      // var value = req.body.values;
      // console.log(key,value);
      var updateParentcontent = "";
      Object.keys(req.body).forEach(function(key) {
        if(updateParentcontent == "" && key != "" && req.body[key] != "")
        updateParentcontent = key + "=" + " '" + req.body[key] +"'";
        else if(updateParentcontent != "" && key != "" && req.body[key] != "")
        updateParentcontent = updateParentcontent + ", " + key + "=" +" '" +req.body[key] + "'";
      });
      console.log(updateParentcontent);
      pool.tx(t => {
        var updateParent = "UPDATE hms.parent SET ";
        var updateParentID = " WHERE id = (SELECT parent_id FROM hms.student WHERE regno = $1) RETURNING id";
        var parentQuery = updateParent+updateParentcontent+updateParentID;
        const q = t.one(parentQuery,[req.session.auth.regno]);
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

exports.getParentID = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      console.log(req.session.auth.regno);
      pool.one("SELECT parent_id FROM hms.student WHERE regno = $1", [req.session.auth.regno])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.updateStudent = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      var updateStudentcontent = "";
      Object.keys(req.body).forEach(function(key) {
        if(updateStudentcontent == "" && key != "" && req.body[key] != "")
        updateStudentcontent = key + "=" + " '" + req.body[key] +"'";
        else if(updateStudentcontent != "" && key != "" && req.body[key] != "")
        updateStudentcontent = updateStudentcontent + ", " + key + "=" +" '" +req.body[key] + "'";
      });
      var updateStudent = "UPDATE hms.student SET ";
      pool.one(updateStudent+updateStudentcontent+" WHERE regno = $1 RETURNING regno",[req.session.auth.regno])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.applyLeave = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      var intime = req.body.intime;
      var outtime = req.body.outtime;
      var place = req.body.place;
      pool.one("INSERT INTO hms.leave(regno, in_time, out_time,place) VALUES($1,$2,$3,$4) RETURNING regno", [req.session.auth.regno,intime,outtime, place])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.getBM = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      console.log(req.session.auth.regno);
      pool.any("SELECT warden.name,bm.message,bm.time FROM hms.warden warden, hms.bm bm WHERE warden.regno = bm.regno")
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.getLeave = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      console.log(req.session.auth.regno);
      pool.any("SELECT * FROM hms.leave")
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });
}

exports.approveLeave = function(req, res, pool){
  sessionManager.checkLoginf(req, pool, function(isLogged){
    if(isLogged=="false")
      res.status(403).send("Login to get user details");
    else if(isLogged=="error")
      res.status(500).send("Error");
    else
      console.log(req.session.auth.regno);
      var lid = req.body.id; 
      console.log(lid);
      pool.any("UPDATE hms.leave SET approval = 'true' WHERE id =$1",[lid])
      .then(function(results){
          res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error.toString());
        res.status(500).send("Error");
      });
  });

}


exports.getDash = function(req,res){
  console.log(req.session.auth.regno);
  if(req.session.auth.regno.slice(0,2) != 'WR'){
    return 1;
  }else{
    return 0;
  }
}