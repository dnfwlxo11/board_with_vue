const mongoose = require('mongoose');
const { Board } = require('./Board');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: {
        type: String
    },

    pass: {
        type: String
    },

    author: {
        type: String
    },

    date: {
        type: String
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment };