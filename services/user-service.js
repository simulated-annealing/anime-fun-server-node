const userDao = require('../models/users/user-dao')

const findAllUsers = () =>
    userDao.findAllUsers()

const findUserById = userId =>
    userDao.findUserById(userId)

const findUserByCredential = user =>
    userDao.findUserByCredential(user)

const findUserByName = username =>
    userDao.findUserByName(username)

const createUser = user =>
    userDao.createUser(user)

const deleteUser = userId =>
    userDao.deleteUser(userId)

module.exports = {
    findAllUsers,
    findUserById,
    findUserByCredential,
    findUserByName,
    createUser,
    deleteUser
}