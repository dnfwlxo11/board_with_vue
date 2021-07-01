const express = require('express');
const path = require('path');
const router = express.Router();

const { Board } = require('../models/Board');

router.get('/newContent', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/html/writing.html'))
});

router.post('/newContent', (req, res, next) => {
    const data = req.body;
    const date = new Date();
    data.date = date;

    const board = new Board(data);

    board.save((err) => {
        if (err) {
            console.log('글 저장 중 에러 발생')
            res.redirect('/');
        } else {
            res.redirect('/');
        } 
    });
});

router.get('/updateContent', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/public/html/index.html'))
})

module.exports = router