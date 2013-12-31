var User = require('../../models/user').User; 
/*
 * Users Routes
 */
exports.index = function(req, res) {
  User.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { Users: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the User the user wants to look up. 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading User." + err});
    } else {
      res.json(404, { message: "User not found."});
    }
  });
}

exports.create = function(req, res) {

  var User_name = req.body.User_name; // Name of User. 
  var password = req.body.User_password;  // Description of the User

  //User.findOne({ name: User_name }, function(err, doc) {  // This line is case sensitive.
  User.findOne({ name: { $regex: new RegExp(User_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newUser = new User(); 

      newUser.name = User_name; 
      newUser.password = password; 
      
      newUser.save(function(err) {

        if(!err) {
          res.json(201, {message: "User created with name: " + newUser.name });    
        } else {
          res.json(500, {message: "Could not create User. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a User with a name that already exists. 
      res.json(403, {message: "User with that name already exists, please update instead of create or create a new User with a different name."}); 

    } else {
      res.json(500, { message: err});
    } 
  });

}

exports.update = function(req, res) {
  
  var id = req.body.id; 
  var User_name = req.body.User_name;
  var User_description = req.body.User_description; 

  User.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = User_name; 
        doc.description = User_description; 
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "User updated: " + User_name});    
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
}

exports.delete = function(req, res) {

  var id = req.body.id; 
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "User removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find User."});
    } else {
      res.json(403, {message: "Could not delete User. " + err });
    }
  });
}


/*
mongodb://librapp:%#L1br4pp#%@ds047198.mongolab.com:47198/librapp

librapp
%#L1br4pp#%
*/