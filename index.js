const express = require('express');
const app = express();
const dotenv = require('dotenv').config(); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRouter = require('./routes/comment_routes');

const postRouter = require('./routes/post_routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/comments', commentRouter);

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
});
db.once('open', () => {
    console.log('Connected to Mongo! Database name: web_app_assignment1');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});