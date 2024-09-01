const express = require('express')
const { createUser, deleteUser, getUsers } = require('../controllers/user')
const { checkRoleUser } = require('../utils/authenticate')

const router = express.Router()

router.post('/', createUser)
router.get('/', checkRoleUser('ADMIN'), getUsers)
router.delete('/:id', checkRoleUser('ADMIN'), deleteUser)

module.exports = router
