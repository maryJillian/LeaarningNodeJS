require('./models/db');
const express = require('express');
const booksRouter = require('./routes/booksRoutes');
const apiBooksRouter = require('./routes/apiBooksRoutes');
require('dotenv').config();
const {PORT} = process.env || 8000
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  }));

app.use('/', booksRouter);

app.use('/api/books', apiBooksRouter);

app.use('/public', express.static(__dirname + '/public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.post('/api/user/login', (_, res) => {
  res.status(201).json({id: 1, mail: "test@mail.ru"});
});


app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`)
});

