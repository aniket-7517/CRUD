const express = require('express');

const mongoose = require('mongoose')

const bodyParser = require('body-parser');

const studentRouter = require('./Router/student.router');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/student', studentRouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(3050, () => {
    console.log('Port No. 3050');
});

mongoose.connect('mongodb://127.0.0.1:27017/Backend').then(res => {
    console.log('DB connected');
});