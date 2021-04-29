const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    description: String,
    createAt: String,
    avatar: String,
    email: String,
    phone: String,
    authorization: {type: String, enum: ['SUPER', 'NORMAL']},
    exp: Number,
    dob: String,
    role: {type: String, enum: ['USER', 'ADMIN']},
    favorites: [String],
    comments: [{
        type: String,
        ref: 'CommentModel'
    }],
    watchlist: [String]
}, {collection: 'users'})

module.exports = userSchema