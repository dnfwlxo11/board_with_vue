const express = require('express');
const path = require('path');
const router = express.Router();

const { Board } = require('../models/Board');

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

router.get('/newContent', (req, res) => {
    res.render('writing')
});

router.post('/newContent', (req, res, next) => {
    const data = req.body;
    data.date = setDate();

    const board = new Board(data);

    board.save((err) => {
        if (err) {
            console.log('글 저장 중 에러 발생')
            res.json({ success: false, err });
        } else {
            res.json({ success: true });
        }
    });
});

router.get('/updateContent', (req, res) => {
    Board.find({}, (err, contents) => {
        return res.json({ contents });
    });
})

router.get('/loadContent/:id', (req, res) => {
    Board.findOne({ seq: req.params.id })
        .populate('comments')
        .exec((err, item) => {
            if (err) {
                res.json({ success: false, err });
            } else {
                res.json({ success: true, item });
            }
        })
})

router.post('/deleteContent/:id', (req, res) => {
    Board.findOne({ seq: req.params.id }, (err, content) => {
        if (err) {
            return res.json({ success: false, msg: err });
        } else if (content.password != req.body.pass) {
            return res.json({ success: false, msg: '비밀번호가 다릅니다.' });
        } else {
            Board.deleteOne({ seq: req.params.id }, (err) => {
                if (err) {
                    return res.json({ success: false, msg: err });
                } else {
                    return res.json({ success: true });
                }
            })
        }
    })
})

module.exports = router