const express = require('express');
const booksController = require('./controller/booksController')
require('dotenv').config();
const {PORT} = process.env || 8000
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  }));

app.use('/api/books', booksController);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`)
});


app.post('/api/user/login', (_, res) => {
  res.status(201).json({id: 1, mail: "test@mail.ru"});
});