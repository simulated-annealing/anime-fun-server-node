const userDao = require('../models/users/user-dao')
const activityDao = require('../models/activities/activity-dao')

module.exports = app => {
    app.post('/api/users', (req, res) => {
        const user = req.body
        userDao.findUserByName(user.username).then(acturalUser => {
            if (acturalUser) {
                res.send('0')
                return
            }
            userDao.createUser({
                ...user,
                createAt: new Date().toDateString()
            }).then(newUser => {
                activityDao.createActivity({
                    now: Date.now(),
                    createAt: newUser.createAt,
                    username: newUser.username,
                    action: 'SIGN_UP'
                })
                req.session['profile'] = newUser
                res.send(newUser)
            })
        })
    })

    app.delete('/api/users/:userId', (req, res) => {
        userDao.deleteUser(req.params.userId).then(() =>
            res.send())
    })

    app.put('/api/users', (req, res) => {
        userDao.findUserByName(req.body.username).then(user => {
            if (!user || !req.session.profile || 
                req.session.profile.username !== user.username) {
                res.send('0')
                return
            }
            userDao.updateUser(req.body).then(() =>
                userDao.findUserByName(user.username).then(user => {
                    req.session.profile = user
                    res.send(user)
            }))
        })
        
    })

    app.get('/api/users', (req, res) => {
        userDao.findAllUsers().then(users =>
            res.send(users))
    })

    app.get('/api/users/:username', (req, res) => {
        userDao.findUserByName(req.params.username).then(user => {
            if (!user) {
                res.send('0')
                return
            }
            if (!req.session.profile || req.session.profile.username !== user.username) {
                user.email = 'undisclosed information'
                user.phone = 'undisclosed information'
            }
            res.send(user)
        })
    })

    app.get('/api/users/profile', (req, res) => {
        const currentUser = req.session['profile']
        res.send(currentUser)
    })

    app.post('/api/users/login', (req, res) => {
        userDao.findUserByCredential(req.body).then(user => {
            if (user) {
                req.session['profile'] = user
                activityDao.createActivity({
                    now: Date.now(),
                    createAt: user.createAt,
                    username: user.username,
                    action: 'SIGN_IN'
                })
                res.send(user)
                return
            }
            res.send('0')
        })
    })

    app.get('/api/users/logout', (req, res) => {
        req.session['profile'] = null
        res.send()
    })

    app.put('/api/users/favorites/:animeId', (req, res) => {
        if (!req.session.profile) {
            res.send('0')
            return
        }
        const animeId = req.params.animeId
        const username = req.session.profile.username
        userDao.findUserByName(username).then(user => {
            const idx = user.favorites.indexOf(animeId)
            if (idx < 0) {
                user.favorites.push(animeId)
                userDao.updateUser(user).then(() => res.send(user))
                return
            }
            res.send(user)
        })
    })

    app.delete('/api/users/favorites/:animeId', (req, res) => {
        if (!req.session.profile) {
            res.send('0')
            return
        }
        const animeId = req.params.animeId
        const username = req.session.profile.username
        userDao.findUserByName(username).then(user => {
            const idx = user.favorites.indexOf(animeId)
            if (idx >= 0) {
                user.favorites.splice(idx, 1)
                userDao.updateUser(user).then(() => res.send(user))
                return
            }
            res.send(user)
        })
    })

    app.put('/api/users/watchlist/:animeId', (req, res) => {
        if (!req.session.profile) {
            res.send('0')
            return
        }
        const animeId = req.params.animeId
        const username = req.session.profile.username
        userDao.findUserByName(username).then(user => {
            const idx = user.watchlist.indexOf(animeId)
            if (idx < 0) {
                user.watchlist.push(animeId)
                userDao.updateUser(user).then(() => res.send(user))
                return
            }
            res.send(user)
        })
    })

    app.delete('/api/users/watchlist/:animeId', (req, res) => {
        if (!req.session.profile) {
            res.send('0')
            return
        }
        const animeId = req.params.animeId
        const username = req.session.profile.username
        userDao.findUserByName(username).then(user => {
            const idx = user.watchlist.indexOf(animeId)
            if (idx >= 0) {
                user.watchlist.splice(idx, 1)
                userDao.updateUser(user).then(() => res.send(user))
                return
            }
            res.send(user)
        })
    })
}