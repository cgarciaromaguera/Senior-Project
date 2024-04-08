const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)
    
        // create token
        const token = createToken(user._id)

        res.status(200).json({ username, email: user.email, token, success:true })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message, success: false})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)
        
        // create token
        const token = createToken(user._id)

        res.status(200).json({ username, email, token, success: true })
    } catch (error) {
        res.status(400).json({ error: error.message, success: false })
    }
}

module.exports = { signupUser, loginUser }