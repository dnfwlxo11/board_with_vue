const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const board = require('./router/board');
const comment = require('./router/comment');
const config = require('./config/key');
const cors = require('cors');

const PORT = 3000;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})
app.use('/api/board', board);
app.use('/api/comment', comment);

app.listen(PORT, () => {
    console.log(`Server start!!\thttp://localhost:${PORT}`);
});