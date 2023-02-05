require('./config/db');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');
const booksRouter = require('./routes/booksRoutes');
const apiBooksRouter = require('./routes/apiBooksRoutes');
const apiUsersRouter = require('./routes/apiUsersRoutes');
const commentsRouter = require('./routes/commentsRoutes');
require('dotenv').config();
const {PORT} = process.env || 8000
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

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
app.use('/comments', commentsRouter);

app.use('/public', express.static(__dirname + '/public'));

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.post('/api/user/login', (_, res) => {
  res.status(201).json({id: 1, mail: "test@mail.ru"});
});

io.on('connection', (socket) => {
  const {id} = socket;
  console.log('connection' + id);

  const {roomName} = socket.handshake.query;
  // console.log('roomName' + roomName);
  socket.join(roomName);
  socket.on('message-to-room', (message) => {

    let currentComment = {
      id_book: roomName,
      id_user: message.user,
      message: message.text
    }
    const comment = Comment.create(currentComment);

    message.type = `roomName: ${roomName}`;
    socket.to(roomName).emit('message-to-room', message);
    socket.emit('message-to-room', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnect' + id);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`)
});

