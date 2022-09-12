const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email field must be a valid email.'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password field is required.'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirm field is required.'],
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
