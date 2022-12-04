const mongoose = require('mongoose')
const User = require('../model/user')
const Blog = require('../model/blog')
const customError = require('../utils/customError')

exports.getAllBlog = async (req, res, next) => {
  let blogs

  try {
    blogs = await Blog.find().populate('user')
  } catch (err) {
    console.log(err)
  }

  if (!blogs) {
    return res.status(404).json({ message: 'No Blogs found' })
  }

  return res.status(200).json({ success: true, blogs })
}

exports.addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body

  let existingUser
  try {
    existingUser = await User.findById(user)
  } catch (err) {
    return console.log(err)
  }
  if (!existingUser) {
    return res.status(400).json({ message: 'Unable TO FInd User By This ID' })
  }

  let blog

  try {
    blog = await Blog.create({
      title,
      description,
      image,
      user,
    })
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({ blog })
}

exports.updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogId = req.params.id
  let blog
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    })
  } catch (error) {
    console.log(error)
  }
  if (!blog) {
    return res.status(500).json({ message: 'Unable to update blog' })
  }

  return res.status(200).json({ blog })
}

exports.getById = async (req, res, next) => {
  const { id } = req.params
  let blog
  try {
    blog = await Blog.findById(id)
  } catch (error) {
    console.log(error)
  }

  if (!blog) {
    return res.status(400).json({ message: 'No blog found' })
  }

  return res.status(200).json({ blog })
}

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params
  let blog
  try {
    blog = await Blog.findByIdAndRemove(id)
  } catch (error) {
    console.log(error)
  }

  if (!blog) {
    return res.status(400).json({ message: 'No blog found' })
  }

  return res.status(200).json({ message: 'Deleted Successfully' })
}

exports.getByUserId = async (req, res, next) => {
  const { id } = req.params

  const blogs = await Blog.find({ user: id })

  if (!blogs) {
    return res.status(400).json({ message: 'No blogs found' })
  }

  return res.status(200).json({
    user: blogs,
  })
}
