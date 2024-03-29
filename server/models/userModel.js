const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')

// User model
const Schema = mongoose.Schema

const userSchema = new Schema
({
        username: {
                type: String,
                required: true,
                trim: true, 
                unique: true
        },
        email: {
                type: String,
                required: true,
                trim: true,
                unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
}, {timestamps: true});

// static signup method
userSchema.statics.signup = async function(username, email, password) {
        if (!email || !password) {
                console.log("All fields must be filled")
                throw Error('All fields must be filled')
        }
        else if (!validator.isEmail(email)) {
                console.log('Email is not valid')
                throw Error('Email is not valid')
        }
        // else if (!validator.isStrongPassword(password)) {
        //         console.log('Password not strong enough')
        //         throw Error('Password not strong enough')
        // }

        const emailExists = await this.findOne({ email })
        const usernameExists = await this.findOne({ username })

        if (emailExists) {
                throw Error('Email already in use')
        }
        if (usernameExists) {
                throw Error('Username already in use')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ username, email, password: hash})

        return user
}

// static login method
userSchema.statics.login = async function(username, password) {
        console.log(username, password)
        if (!username || !password) {
                throw Error('All fields must be filled')
        }

        const user = await this.findOne({ username })
       
        if (!user) {
                throw Error('Incorrect username')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
                throw Error('Incorrect password')
        }

        return user
}

const User = mongoose.model("User", userSchema);
module.exports = User;