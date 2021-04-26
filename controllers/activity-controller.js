const activityDao = require('../models/activities/activity-dao')

module.exports = app => {
    app.get('/api/activities/user/:username', (req, res) => {
        activityDao.findActivitiesForUser(req.params.username).then(activities =>
            res.send(activities.sort(act => -act.now).slice(0, 10)))
    })
            
    app.get('/api/activities', (req, res) => {
        activityDao.findAllActivities().then(activities =>
            res.send(activities.sort(act => -act.now).slice(0, 10)))
    })
}