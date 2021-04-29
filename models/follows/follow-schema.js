const mongoose = require('mongoose')

const followSchema = mongoose.Schema({
    follower: String,
    followee: String,
    createAt: String
}, {collection: 'follows'})

module.exports = followSchema