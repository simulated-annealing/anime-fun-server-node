const mongoose = require('mongoose')
const feedbackSchema = require('./feedback-schema')

const feedbackModel = mongoose.model('FeedbackModel', feedbackSchema)

module.exports = feedbackModel