const express = require('express')

const router = express.Router()
const { getAllUsers,createUser, loginUser } = require('../controllers/user')

router.get('/', getAllUsers)
router.post('/signup', createUser)
router.post('/login', loginUser)

module.exports = router