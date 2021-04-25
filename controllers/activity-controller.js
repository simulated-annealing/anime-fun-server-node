const activityDao = require('../models/activities/activity-dao')

module.exports = app => {
    app.get('/api/activities/user/:username', (req, res) => {
        activityDao.findActivitiesForUser(req.params.username).then(activities =>
            res.send(activities))
    })
            
    app.get('/api/activities', (req, res) => {
        activityDao.findAllActivities().then(activities =>
            res.send(activities))
    })
}