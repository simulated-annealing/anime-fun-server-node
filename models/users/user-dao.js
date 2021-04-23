const userModel = require('./user-model')

const findAllUsers = () =>
    userModel.find()

const findUserById = userId =>
    userModel.findById(userId)

const findUserByName = username =>
    userModel.findOne({username})

const findUserByCredential = user =>
    userModel.findOne({username:user.username, password:user.password})

const createUser = user =>
    userModel.create(user)

const deleteUser = userId =>
    userModel.deleteOne({_id: userId})

module.exports = {
    findAllUsers,
    findUserById,
    findUserByName,
    findUserByCredential,
    createUser,
    deleteUser
}