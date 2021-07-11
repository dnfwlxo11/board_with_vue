const express = require('express')
const router = express.Router();
const mysql = require('mysql2/promise');
const Query = require('./queries/boardQuery')


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 13000,
    database: 'boards'
}

const pool = mysql.createPool(dbConfig);

router.get('/updateContent', (req, res) => {
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const [rows, fields] = await conn.query(Query.selectContents());

            conn.release();
            res.send(rows);
        } catch (err) {
            console.log(err)
            conn.release();
            res.send({ success: false, err })
        }
    }

    result();
}),

router.post('/newContent', (req, res) => {
    console.log(req.body)
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const [rows, fields] = await conn.query(Query.insertContent(req.body));

            conn.release();
            res.send({ success: true});
        } catch (err) {
            console.log(err)
            conn.release();
            res.send({ success: false, err })
        }
        
    }

    result();
})

router.get('/loadContent/:id', (req, res) => {
    console.log(req.params)
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const [rows, fields] = await conn.query(Query.selectContent(req.params));

            const item = JSON.parse(JSON.stringify(rows[0]));
            conn.release();
            res.send({ success: true, item });
        } catch (err) {
            console.log(err)
            conn.release();
            res.send({ success: false, err })
        }
    }

    result();
})

router.post('/deleteContent/:id', (req, res) => {
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const result = await conn.query(Query.deleteContent(req.params));

            conn.release();
            res.send({ success: true });
        } catch (err) {
            console.log(err)
            conn.release();
            res.send({ success: false, err })
        }
    }

    result();
})

module.exports = router;