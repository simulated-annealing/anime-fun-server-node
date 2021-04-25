const activityModel = require('./activity-model')

const findAllActivities = () =>
    activityModel.find()

const findActivitiesForUser = username =>
    activityModel.find({username})

const createActivity = activity =>
    activityModel.create(activity)

const deleteActivity = activityId =>
    activityModel.deleteOne({_id: activityId})

module.exports = {
    findAllActivities,
    findActivitiesForUser,
    createActivity,
    deleteActivity
}