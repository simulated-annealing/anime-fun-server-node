const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    createAt: String,
    username: String,
    animeId: String,
    action:{
        type: String,
        enum: ['POST_REVIEW', 'ADD_FAVORATE', 'SIGN_UP']
    }
}, {collection: 'activities'})

module.exports = activitySchema