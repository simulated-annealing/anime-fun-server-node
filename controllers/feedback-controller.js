const feedbackDao = require('../models/feedbacks/feedback-dao')
const author = require('../configures/authorization')

module.exports = app => {
    app.post('/api/feedbacks', (req, res) => {
        const fb = req.body
        feedbackDao.createFeedback({
            ...fb,
            createAt: Date.now()
        }).then(feedback => res.send(feedback))
    })

    app.delete('/api/feedbacks/:feedbackId', (req, res) => {
        if (!req.session.profile || req.session.profile.role !== 'ADMIN') {
            res.send("0")
            return
        }
        feedbackDao.deleteFeedback(req.params.feedbackId).then(() =>
            res.send("1"))
    })

    app.get('/api/feedbacks', (req, res) => {
        if (!req.session.profile || req.session.profile.role !== 'ADMIN'
            || !(req.session.profile.authorization&author.VIEW_FEEDBACK)) {
            res.send("0")
            return
        }
        feedbackDao.findAllFeedbacks().then(feedbacks =>
            res.send(feedbacks))
    })
}