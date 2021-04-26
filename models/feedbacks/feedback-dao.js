const feedbackModel = require('./feedback-model')

const findAllFeedbacks = () =>
    feedbackModel.find()

const createFeedback = feedback =>
    feedbackModel.create(feedback)

const deleteFeedback = feedbackId =>
    feedbackModel.deleteOne({_id: feedbackId})

module.exports = {
    findAllFeedbacks,
    createFeedback,
    deleteFeedback
}