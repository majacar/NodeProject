/**
 * User Model
 * @type {exports}
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  biography: String,
  fullBiography: String,
}, { versionKey: false, timestamps: true });

User.path('email').validate(function (email) {
  return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}, 'This email address is not valid');

User.path('email').validate(function (email, done) {
  this.model('User').count({ email: email }, function (err, count) {
    if (err) {
      return done(err);
    }

    done(!count);
  });
}, 'This email address is already registered');

User.path('username').validate(function (username, done) {
  this.model('User').count({ username: username }, function (err, count) {
    if (err) {
      return done(err);
    }

    done(!count);
  });
}, 'This username is already registered');

User.plugin(random);

User.index({ username: 'text', fullName: 'text', genres: 'text', skills: 'text' });

module.exports = mongoose.model('User', User);
