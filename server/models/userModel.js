const mongoose = require("mongoose");

// User model
const Schema = mongoose.Schema

const userSchema = new Schema
({
        username: {
                type: String,
                required: true,
                trim: true, 
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
});

const User = mongoose.model("User", userSchema);
module.exports = User;