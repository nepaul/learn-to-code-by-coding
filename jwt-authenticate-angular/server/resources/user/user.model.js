'use strict';


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
});

UserSchema.index({email: 1}, {unique: true});

UserSchema.statics.addUser = function (email, password) {
  return this.create({email: email, password: password});
};

UserSchema.statics.findByEmail = function (email, cb) {
  return this.findOne({email: email}, {email: 1, password: 1, _id: 1}, cb);
};

UserSchema.statics.findByUserID = function (ID, cb) {
  ID = mongoose.Types.ObjectId(ID);
  return this.findById(ID, {email: 1, password: 1}, cb)
};

UserSchema.statics.findUserProfileByID = function(ID, cb) {
  ID = mongoose.Types.ObjectId(ID);
  return this.findById(ID, {email: 1, _id: 0}, cb);
};

exports.UserModel = mongoose.model('User', UserSchema);
