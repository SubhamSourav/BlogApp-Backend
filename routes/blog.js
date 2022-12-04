const express = require('express')
const router = express.Router()

const {
  getAllBlog,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
} = require('../controllers/blog.controller')

router.route('/').get(getAllBlog).post(addBlog)
router.route('/:id').get(getById).delete(deleteBlog).put(updateBlog)
router.route('/user/:id').get(getByUserId)

module.exports = router
