const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirm field is required.'],
    validate: {
      // This inly works on create() and save()
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
