const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true},
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 }
});

module.exports = mongoose.model('User', UserSchema);
