var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
    name          : { type: String, required: true, trim: true, index: { unique: true } }
  , description   : { type: String, required: true }
  , password   	  : { type: String, required: true }
  , date_created  : { type: Date,   required: true, default: Date.now }
});

var user = mongoose.model('users', userSchema);

module.exports = {
  User: user
};