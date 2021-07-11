const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const boardSchema = Schema({
    seq: {
        type: Number,
        default: 1
    },

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
    },

    password: {
        type: String
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

boardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'seq',
    startAt: 1, //시작
    increment: 1 // 증가
});

const Board = mongoose.model('Board', boardSchema)

module.exports = { Board };