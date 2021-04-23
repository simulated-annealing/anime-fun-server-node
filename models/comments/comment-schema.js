const mongoose = require('mongoose')

const commentScheme = mongoose.Schema({
    content: String,
    createAt: String,
    username: String,
    animeId: String
}, {collection: 'comments'})

module.exports = commentScheme