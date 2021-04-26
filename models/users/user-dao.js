const userModel = require('./user-model')

const findAllUsers = () =>
    userModel.find()

const findUserByName = username =>
    userModel.findOne({username})

const findUserByCredential = user =>
    userModel.findOne({username:user.username, password:user.password})

const createUser = user =>
    userModel.create(user)

const updateUser = user =>
    userModel.updateOne({username: user.username}, user)

const deleteUser = userId =>
    userModel.deleteOne({_id: userId})

module.exports = {
    findAllUsers,
    findUserByName,
    findUserByCredential,
    createUser,
    updateUser,
    deleteUser
}