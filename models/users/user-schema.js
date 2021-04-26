const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    username: String,
    password: String,
    description: String,
    createAt: String,
    email: String,
    phone: String,
    role: {type: String, enum: ['USER', 'ADMIN']},
    favorites: [String],
    comments: [{
        type: String,
        ref: 'CommentModel'
    }],
    watchlist: [String]
}, {collection: 'users'})

module.exports = userScheme