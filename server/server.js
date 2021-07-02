const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const board = require('./router/board');
const config = require('./config/key');
// const error = require('./controllers/errorControllers');

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
    return res.render('index')
});

app.use('/api', board);

app.listen(PORT, () => {
    console.log(`Server start!!\thttp://localhost:${PORT}`);
});