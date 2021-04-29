const followDao = require('../models/follows/follow-dao')

module.exports = app => {
    app.post('/api/follows', (req, res) => {
        if (!req.session.profile || req.session.profile.username !== req.body.follower) {
            res.send('0')
            return
        }
        followDao.findFollowByUser(req.body.follower, req.body.followee).then(follows => {
            if (follows.length > 0) {
                res.send(follows[0])
                return
            }
            followDao.createFollow({
                ...req.body,
                createAt: Date.now()
            }).then(follow => {res.send(follow)})
        })
    })

    app.delete('/api/follows/:followId', (req, res) => {
        //const followId = new ObjectId(req.params.followId)
        const followId = req.params.followId
        followDao.findFollowById(followId).then(follow => {
            if (!follow || !req.session.profile ||
                req.session.profile.username !== follow.follower) {
                res.send("0")
                return
            }
            followDao.deleteFollow(followId).then(() =>
                res.send("1")
            )
        })
    })

    app.get('/api/follows/followers/:username', (req, res) => {
        followDao.findFollowers(req.params.username).then(follows =>
            res.send(follows))
    })

    app.get('/api/follows/followees/:username', (req, res) => {
        followDao.findFollowees(req.params.username).then(follows =>
            res.send(follows))
    })

    app.get('/api/follows', (req, res) => {
        followDao.findAllFollows().then(follows =>
            res.send(follows))
    })
}