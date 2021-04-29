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
                    action: 'SIGN_UP',
                    avatar: randomAvatar()
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
                user.dob = 'undisclosed information'
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

    app.get('/api/users/:username/avatar', (req, res) => {
        const username = req.params.username
        userDao.findUserByName(username).then(user => {
            if (!user) {
                res.send({avatar: 'https://i.pinimg.com/564x/08/98/40/089840829e7083a6021ce1b0c4e35a4b.jpg'})
                return;
            }
            res.send({avatar: user.avatar})
        })
    })

    app.put('/api/users/:username/avatar', (req, res) => {
        const username = req.params.username
        userDao.findUserByName(username).then(user => {
            if (!user || !req.session.profile || 
                req.session.profile.username !== user.username) {
                res.send('0')
                return
            }
            const avatar = randomAvatar()
            userDao.updateUserAvatar(username, avatar).then(() =>
                res.send({avatar}))
        })
    })

    const randomAvatar = () => {
        const avatars = ['https://i.pinimg.com/564x/db/18/3e/db183ec17b02f2a9c24236106566209e.jpg',
                        'https://i.pinimg.com/564x/62/b1/e1/62b1e11ae16f0cf424f2515e38972d87.jpg',
                        'https://i.pinimg.com/564x/3b/2b/57/3b2b57c30e0effd53fb8b95d91d366c9.jpg',
                        'https://i.pinimg.com/564x/f9/ec/ee/f9eceec88636932c381a60f218a13854.jpg',
                        'https://i.pinimg.com/564x/43/59/e5/4359e55b68ab1f922c598a01bd55fb88.jpg',
                        'https://i.pinimg.com/564x/e5/00/2b/e5002b2e845453cc493e296405a13dda.jpg',
                        'https://i.pinimg.com/564x/6a/38/aa/6a38aad060a2204fe4952d22bdc72e8d.jpg',
                        'https://i.pinimg.com/564x/05/9f/61/059f61fc8a4742c25e3ea953f95dd943.jpg',
                        'https://i.pinimg.com/236x/62/ac/c5/62acc565a2666213c71af181eaea31be.jpg',
                        'https://i.pinimg.com/564x/24/6f/8a/246f8add4f6b2322b2d7fa9eae8466e1.jpg',
                        'https://i.pinimg.com/564x/30/f5/6d/30f56d04cac04cfbc8140adf6d74f8c8.jpg',
                        'https://i.pinimg.com/564x/e4/26/c0/e426c010933714803220bf48712b6588.jpg',
                        'https://i.pinimg.com/564x/7c/f0/cf/7cf0cf14684cbd394665d6fdc390ee6f.jpg',
                        'https://i.pinimg.com/564x/28/fa/be/28fabe36a4806852342bdd4c70e43755.jpg',
                        'https://i.pinimg.com/564x/a4/b9/3f/a4b93fe383cd886fffdf0b31450d8e5b.jpg',
                        'https://i.pinimg.com/564x/9b/e7/83/9be7834bfbb40dae4802b095453990ea.jpg',
                        'https://i.pinimg.com/564x/f2/d2/e0/f2d2e0fdfab4901b3a8dc2777cd657a1.jpg',
                        'https://i.pinimg.com/564x/b6/f9/2c/b6f92c605760a6e452e15b0c1697aafc.jpg',
                        'https://i.pinimg.com/564x/16/f2/cd/16f2cdf927ef87cc01af3e62ab0a167b.jpg',
                        'https://i.pinimg.com/564x/d3/25/c9/d325c9ceaf7ec198837f30932211f022.jpg',
                        'https://i.pinimg.com/564x/76/c3/c1/76c3c18386719ed27a796db4839ec90f.jpg',
                        'https://i.pinimg.com/564x/dd/3b/98/dd3b98db24c3e7c1e891daefb7d54b2f.jpg',
                        'https://i.pinimg.com/564x/36/ff/c5/36ffc56d586b0f8e7e3bf9cb59ba5abf.jpg',
                        'https://i.pinimg.com/564x/e3/94/a8/e394a8874cb44ecba463efabb4d6c04d.jpg',
                        'https://i.pinimg.com/564x/3b/c2/c1/3bc2c1aaea6ba7ee46803d260dc6d335.jpg',
                        'https://i.pinimg.com/564x/5d/38/94/5d389432d37afcd10b02e29b0bd9ff0b.jpg',
                        'https://i.pinimg.com/564x/c5/2e/66/c52e66eb45b67d5ea806275d7d65a739.jpg',
                        'https://i.pinimg.com/564x/5a/37/2a/5a372ad49d4f3b61ea969cdc6a926274.jpg',
                        'https://i.pinimg.com/564x/08/98/40/089840829e7083a6021ce1b0c4e35a4b.jpg',
                        'https://i.pinimg.com/564x/91/95/7a/91957aca726d5548e902f2f85694fddd.jpg',
                        'https://i.pinimg.com/564x/a8/d9/de/a8d9de1bb9db572052f2750d42d1157f.jpg',
                        'https://i.pinimg.com/564x/de/54/40/de5440b1d15bb96016a0f39318d2e9a8.jpg']
        const rid = Math.floor(Math.random()*avatars.length)
        return avatars[rid]
    }
}