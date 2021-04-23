const commentModel = require('./comment-model')

const findAllComments = () =>
    commentModel.find()

const findCommentById = userId =>
    commentModel.findById(userId)

const findCommentsForAnime = animeId =>
    commentModel.find({animeId})

const createComment = comment =>
    commentModel.create(comment)

const deleteComment = commentId =>
    commentModel.deleteOne({_id: commentId})

module.exports = {
    findAllComments,
    findCommentById,
    findCommentsForAnime,
    createComment,
    deleteComment
}