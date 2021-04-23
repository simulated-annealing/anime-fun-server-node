const userService = require('../services/user-service')

module.exports = app => {
    app.post('/api/users', (req, res) => {
        const user = req.body
        userService.findUserByName(user.username).then(acturalUser => {
            if (acturalUser) {
                console.log('already signed up')
                res.send('0')
                return
            }
            userService.createUser(user).then(newUser => {
                req.session['profile'] = newUser
                console.log('send new user ', newUser)
                res.send(newUser)
            })
        })
    })

    app.delete('/api/users/:userId(.+)', (req, res) => {
        userService.deleteUser(req.params.userId).then(() =>
            res.status(200).send())
    })

    app.get('/api/users', (req, res) => {
        userService.findAllUsers().then(users =>
            res.send(users))
    })

    app.get('/api/users/:userId(.+)', (req, res) => {
        userService.findUserById(req.params.userId).then(user =>
            res.send(user))
    })

    app.get('/api/users/profile', (req, res) => {
        const currentUser = req.session['profile']
        res.send(currentUser)
    })

    app.post('/api/users/login', (req, res) => {
        userService.findUserByCredential(req.body).then(user => {
            if (user) {
                req.session['profile'] = user
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
}