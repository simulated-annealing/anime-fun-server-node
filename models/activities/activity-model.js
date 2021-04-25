const mongoose = require('mongoose')
const activitySchema = require('./activity-schema')

const activityModel = mongoose.model('ActivityModel', activitySchema)

module.exports = activityModel