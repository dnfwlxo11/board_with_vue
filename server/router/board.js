const express = require('express');
const path = require('path');
const router = express.Router();

const { Board } = require('../models/Board');

router.get('/newContent', (req, res) => {
    res.render('writing')
});

router.post('/newContent', (req, res, next) => {
    const data = req.body;
    const date = new Date();
    data.date = date.toString().split('GMT')[0];

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
    Board.findOne({ seq: req.params.id }, (err, item) => {
        if (err) { 
            res.render('error');
        } else {
            res.render('content', { success: true, seq: item.seq, title: item.title, nickname: item.nickname, content: item.content, data: item.date });
        }
    })
})

router.get('/deleteContent/:id', (req, res) => {
    Board.deleteOne({ seq: req.params.id }, (err) => {
        if (err) { 
            console.log('에러 발생') 
            return res.json({ success: false, err }); 
        } else {
            return res.json({ success: true }); 
        }
    })
})

module.exports = router