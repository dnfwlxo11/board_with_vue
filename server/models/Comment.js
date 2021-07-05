const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    title: {
        type: String
    },

    reply: {
        type: String
    },

    nickname: {
        type: string
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment };