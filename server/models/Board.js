const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },

    content: {
        type: String
    },

    nickname: {
        type: String
    },

    date: {
        type: String
    }
})

const Board = mongoose.model('Board', boardSchema)

module.exports = { Board };