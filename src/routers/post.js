const express = require('express')
const { createPost, deletePost } = require('../controllers/post')
const { checkRolePost } = require('../utils/authenticate')

const router = express.Router()

router.post('/', createPost)
router.delete('/:id', checkRolePost('ADMIN'), deletePost)

module.exports = router
