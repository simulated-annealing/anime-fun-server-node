const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    description: String,
    email: String,
    type: String,
    createAt: Number,
    username: String,
}, {collection: 'feedbacks'})

module.exports = feedbackSchema