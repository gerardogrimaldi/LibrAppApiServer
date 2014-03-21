var user = require('../../models/user').user; 
/*
 * Users Routes
 */
exports.index = function(req, res) {
  user.find({}, function(err, docs) {
    if(!err) {
      res.json(200, docs );  
    } else {
      res.json(500, { message: err });
    }
  });
};

exports.login = function(req, res) {
  user.findOne({ name: { $regex: new RegExp(name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
  if(!err && !doc) {
    if (doc.name == req.body.name && doc.password == req.body.password){
      res.json(201, {message: "User " + doc.name + " Autenticated "  });    
    } else if(!doc) {
      res.json(401, {message: "User or password invalid for the user " + req.body.name });    
    } else if(!err) {
        res.json(201, {message: "Error: " + err });    
    } else {
      res.json(500, {message: "Could not create User. Error: " + err});
    }
  }});
};


exports.show = function(req, res) {
  var id = req.params.id; // The id of the User the user wants to look up. 
  user.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading User." + err});
    } else {
      res.json(404, { message: "User not found."});
    }
  });
};

exports.create = function(req, res) {
    var name = req.body.name; 
    var password = req.body.password;  
    var email = req.body.email;
    //user.findOne({ name: name }, function(err, doc) {  // This line is case sensitive.
    user.findOne({ name: { $regex: new RegExp(name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      var newUser = new user(); 
      newUser.name = name; 
      newUser.password = password; 
      newUser.email = email;
      
      newUser.save(function(err) {

        if(!err) {
          res.json(201, {message: "User created with name: " + newUser.name });    
        } else {
          res.json(500, {message: "Could not create User. Error: " + err});
        }

      });

    } else if(!err) {
      // User is trying to create a User with a name that already exists. 
      res.json(403, { message: "User with that name already exists, please update instead of create or create a new User with a different name."}); 
    } else {
      res.json(500, { message: err});
    } 
  });
};

exports.update = function(req, res) {
    var id = req.params.id;
    //var id = req.body._id; 
    var name = req.body.name; 
    var password = req.body.password;  
    var email = req.body.email;
    user.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = name; 
        doc.email = email; 
        doc.password = password; 
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "User updated: " + name});    
          } else {
            res.json(500, {message: "Could not update User. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find User."});
      } else {
        res.json(500, { message: "Could not update User." + err});
      }
    }); 
};

exports.delete = function(req, res) {
    //var id = req.body._id; 
    var id = req.params.id;
    user.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "User removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find User."});
    } else {
      res.json(403, {message: "Could not delete User. " + err });
    }
  });
};