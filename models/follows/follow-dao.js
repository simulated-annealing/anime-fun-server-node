const followModel = require('./follow-model')

const findAllFollows = () =>
    followModel.find()

const findFollowers = username =>
    followModel.find({followee: username})

const findFollowees = username =>
    followModel.find({follower: username})

const findFollowById = followId =>
    followModel.findById(followId)

const findFollowByUser = (follower, followee) =>
    followModel.find({follower, followee})

const createFollow = follow =>
    followModel.create(follow)

const deleteFollow = followId =>
    followModel.deleteOne({_id: followId})

module.exports = {
    findAllFollows,
    findFollowers,
    findFollowees,
    findFollowById,
    findFollowByUser,
    createFollow,
    deleteFollow
}