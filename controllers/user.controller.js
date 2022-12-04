const User = require('../model/user')
const CustomError = require('../utils/customError')

exports.signup = async (req, res, next) => {
  console.log(req.body)
  const { name, email, password } = req.body

  if (!name) {
    return next(new CustomError('Name Required', 400))
  }
  if (!email) {
    return next(new CustomError('email Required', 400))
  }
  if (!password) {
    return next(new CustomError('password Required', 400))
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  user.password = undefined

  return res.status(200).json({ user, message: 'User Created' })
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email) {
    return next(new CustomError('email Required', 400))
  }

  if (!password) {
    return next(new CustomError('password Required', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(
      new CustomError('Email or password does not match or exist', 400)
    )
  }

  const ispassword = await user.isValidatedPassword(password)

  if (!ispassword) {
    return next(
      new CustomError('Email or password does not match or exist', 400)
    )
  }

  return res.status(200).json({ user, message: 'Successfully logged-in' })
}

exports.getAllUser = async (req, res, next) => {
  let users
  try {
    users = await User.find()
  } catch (err) {
    console.log(err)
  }
  if (!users.length) {
    return res.status(404).json({ message: 'No users found' })
  }

  return res.status(200).json({ success: true, users })
}
