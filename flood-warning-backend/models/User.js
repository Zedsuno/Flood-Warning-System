// Defines the schema for users, including username, email, and password.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a new UserSchema using Mongoose
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, );

// Create a new UserSchema method to hash the password before saving it in the database
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    console.log('Hashing password for user:', this.username);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed password:', this.password);
  }
  next();
});

// compare password 
UserSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('Comparing password for user:', this.username);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log(`Password match for user ${this.username}:`, isMatch);
  return isMatch;
};

// kept the data in to the collection login 
const User = mongoose.model('User', UserSchema, 'login');


module.exports = User;
