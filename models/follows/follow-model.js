const mongoose = require('mongoose')
const followSchema = require('./follow-schema')

const followModel = mongoose.model('FollowModel', followSchema)

module.exports = followModel