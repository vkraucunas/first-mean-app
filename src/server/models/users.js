var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcryptjs');
var config = require('../../_config');

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

// hash password before it gets saved
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  })
});

// compare password
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      return done(err);
    }
    done(err, match);
  })
}

var User = mongoose.model('user', UserSchema);

module.exports = User;