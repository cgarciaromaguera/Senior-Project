const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)
        console.log("logging in")

        // create token
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    console.log(username)
    console.log(email)
    console.log(password)

    try {
        const user = await User.signup(username, email, password)
        
        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, token, success: true })
    } catch (error) {
        res.status(400).json({ error: error.message, success: false })
    }
}

module.exports = { signupUser, loginUser }