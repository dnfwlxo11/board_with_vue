const express = require('express')
const router = express.Router();

const mysql = require('mysql2/promise');
const Query = require('./queries/commentQuery')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 13000,
    database: 'boards'
}

const pool = mysql.createPool(dbConfig);

router.get('/getComments/:id', (req, res) => {
    console.log(req.params)
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const [rows, fields] = await conn.query(Query.selectComments(req.params));

            const item = [];

            rows.forEach((element, index) => {
                item.push(JSON.parse(JSON.stringify(rows[index])));
            })

            conn.release();
            
            res.send(item);
        } catch (err) {
            console.log(err)
            conn.release();
            res.send({ success: false, err })
        }
    }

    result();
}),

router.post('/addComment/:id', (req, res) => {
    console.log(req.body)
    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const [rows, fields] = await conn.query(Query.insertComment(req.body));

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

router.post('/deleteComment/:id', (req, res) => {
    console.log(req.body, req.params)

    const result = async () => {
        const conn = await pool.getConnection();

        try {
            const resulted = await conn.query(Query.deleteComment(req.body));

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