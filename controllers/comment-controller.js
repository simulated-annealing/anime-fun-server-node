const commentDao = require('../models/comments/comment-dao')
const activityDao = require('../models/activities/activity-dao')

module.exports = app => {
    app.post('/api/comments/anime/:animeId', (req, res) => {
        commentDao.createComment({
            content: req.body.content,
            username: req.session['profile'] ? req.session['profile'].username: 'anonymous user',
            animeId: req.body.animeId,
            createAt: new Date().toDateString()
        }).then(comment => {
            activityDao.createActivity({
                createAt:comment.createAt,
                username: comment.username,
                animeId: comment.animeId,
                action: 'POST_REVIEW'
            })
            res.send(comment)
        })
    })

    app.delete('/api/comments/:commentId', (req, res) => {
        if (!req.session.profile || req.session.profile.role !== 'ADMIN') {
            res.send("0")
            return
        }
        commentDao.deleteComment(req.params.commentId).then(() =>
            res.send("1"))
    })

    app.get('/api/comments/anime/:animeId', (req, res) => {
        commentDao.findCommentsForAnime(req.params.animeId).then(comments =>
            res.send(comments))
    })

    app.get('/api/comments/:commentId', (req, res) => {
        commentDao.findCommentById(req.params.commentId).then(comment =>
            res.send(comment))
    })

    app.get('/api/comments', (req, res) => {
        commentDao.findAllComments().then(comments =>
            res.send(comments))
    })
}