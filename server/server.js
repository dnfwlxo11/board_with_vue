const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const board = require('./router/board');
const config = require('./config/key');

const { Board } = require('./models/Board');

const PORT = 3000;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    return res.redirect('/home?page=1&limit=5')
});

app.get('/home', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    Board.find({}, (err, items) => {
        if (req.query.limit ===  undefined) return res.render('index', { items, page: page, limit: 5, first: (page-1)*5, last: (page-1)*5+4});
        else return res.render('index', { items, page: page, limit: limit, first: (page-1)*limit, last:  (page-1)*5+(limit-1) });
    })
});

app.use('/api', board);

app.listen(PORT, () => {
    console.log(`Server start!!\thttp://localhost:${PORT}`);
});