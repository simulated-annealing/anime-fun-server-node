const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content: String,
    createAt: String,
    username: String,
    animeId: String
}, {collection: 'comments'})

module.exports = commentSchema