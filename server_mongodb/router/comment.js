const express = require('express');
const path = require('path');
const router = express.Router();

const { Board } = require('../models/Board');
const { Comment } = require('../models/Comment');

function setDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}/${month >= 10 ? month : '0' + month}/${day >= 10 ? day : '0' + day}-${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`;
}

router.post('/addComment/:id', (req, res) => {
    const data = req.body;
    data.date = setDate();

    const comment = new Comment(data);

    comment.save((err) => {
        if (err) {
            return res.json({ success: false, err });
        } else {
            Board.findOne({ seq: req.params.id })
                .populate('comments')
                .exec((err, item) => {
                    if (err) {
                        console.log('글 저장 중 에러 발생')
                        return res.json({ success: false, err });
                    } else {
                        item.comments.push(comment);
                        item.save();
                        return res.json({ success: true });
                    }
                })
        }
    });
})

router.post('/deleteComment/:id', (req, res) => {
    Comment.findOne({ _id: req.body._id}, (err, item) => {
        if (err) {
            console.log('댓글 삭제 중 에러 발생')
            return res.json({ success: false, err });
        } else {
            if (item.pass == req.body.pass) {
                Board.findOneAndUpdate({ seq: req.params.id })
                .populate('comments')
                .exec((err, item) => {
                    item.comments.remove(req.body._id);
                    item.save();
                })
                item.remove();
                return res.json({ success: true });
            } else {
                return res.json({ success: false, msg: '비밀번호가 다릅니다.' });
            }
        }
    });
})

module.exports = router