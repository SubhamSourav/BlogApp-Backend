const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
    maxlength: [40, 'Name should be under 40 characters'],
  },
  email: {
    type: String,
    required: [true, 'please provide a email'],
    validate: [validator.isEmail, 'please enter email in correct format'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [6, 'PW should be atleast 6 char'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isValidatedPassword = async function (usersendpassword) {
  return await bcrypt.compare(usersendpassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
