require('./config/db');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');
const booksRouter = require('./routes/booksRoutes');
const apiBooksRouter = require('./routes/apiBooksRoutes');
const apiUsersRouter = require('./routes/apiUsersRoutes');
require('dotenv').config();
const {PORT} = process.env || 8000
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  }));

app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', booksRouter);

app.use('/api/books', apiBooksRouter);

app.use('/api/user', apiUsersRouter);

app.use('/public', express.static(__dirname + '/public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.post('/api/user/login', (_, res) => {
  res.status(201).json({id: 1, mail: "test@mail.ru"});
});


app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`)
});

