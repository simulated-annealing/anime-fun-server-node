const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    now: Number,
    createAt: String,
    username: String,
    animeId: String,
    action:{
        type: String,
        enum: ['POST_REVIEW', 'ADD_FAVORATE', 'SIGN_UP', 'SIGN_IN']
    }
}, {collection: 'activities'})

module.exports = activitySchema