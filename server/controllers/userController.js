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
    
        // create token
        const token = createToken(user._id)

        res.status(200).json({ username, email: user.email, money: user.money, stocks: user.stocks, token, success:true })
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

        res.status(200).json({ username, email, money: user.money, stocks: user.stocks, token, success: true })
    } catch (error) {
        res.status(400).json({ error: error.message, success: false })
    }
}

const purchaseStock = async (req, res) => {
    const { _id, stock, spent, shares } = req.body

    let user = await User.findOne({ _id: _id })

    // if (user.stocks.get(stock.ticker)) {
    //     const oldShares = user.stocks.get(stock.ticker)[1]

    //     console.log("input shares", shares)
    //     console.log("old shares", oldShares)
    //     const newShares = parseFloat(oldShares) + parseFloat(shares)
    //     console.log("new shares", newShares)

    //     user = await User.findOneAndUpdate(
    //         { _id: _id },
    //         { $inc: { money: -spent },
    //           $set: { [`stocks.${stock.ticker}`]: [stock, newShares]  }},
    //         { new: true})
    // }
    // else {
        user = await User.findOneAndUpdate(
            { _id: _id }, 
            { $inc: { money: -spent },
            $set: { [`stocks.${stock.ticker}`]: [stock, shares] }}, 
            { new: true })
    //}

    res.status(200).json({ money: user.money, stocks: user.stocks })
}

const sellStock = async (req, res) => {
    const { _id, stock, change, shares } = req.body

    let user = await User.findOneAndUpdate(
        { _id: _id }, 
        { $inc: { money: change } ,
          $set: { [`stocks.${stock.ticker}`]: [stock, shares]}}, 
        { new: true }
    )

    if (user.stocks.get(stock.ticker)[1] <= 0) {
        user = await User.findOneAndUpdate(
            { _id: _id },
            { $unset: { [`stocks.${stock.ticker}`]: [null, 0]}},
            { new: true }
        )
    }

    res.status(200).json({ money: user.money, stocks: user.stocks })
}

module.exports = { signupUser, loginUser, purchaseStock, sellStock }