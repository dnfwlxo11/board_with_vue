const express = require('express');
const path = require('path');
const router = express.Router();

const { Board } = require('../models/Board');
const { Comment } = require('../models/Comment');

router.get('/getContent', (req, res) => {
    res.render('writing')
});

router.post('/addComment/:id', (req, res) => {
    const data = req.body;
    const date = new Date();
    data.date = date.toString().split('GMT')[0];

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

module.exports = router