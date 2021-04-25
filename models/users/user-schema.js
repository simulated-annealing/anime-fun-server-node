const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    username: String,
    password: String,
    description: String,
    createAt: String,
    role: {type: String, enum: ['USER', 'ADMIN']},
    favorites: [String],
    comments: [{
        type: String,
        ref: 'CommentModel'
    }]
}, {collection: 'users'})

module.exports = userScheme