const express = require('express')

// controller functions
const { signupUser, loginUser, purchaseStock } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// purchase route
router.post('/purchase', purchaseStock)

module.exports = router