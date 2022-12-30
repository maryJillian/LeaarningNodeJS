const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const path = require('path');
const upload = require('../middleware/file');

const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'localhost';
const client = redis.createClient({url: REDIS_URL});

(async () => {
  await client.connect();
})();


class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    fileBook,
    id = uuidv4(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

const store = {
  books: []
};

router.get('/index', (req, res) => {
  const {books} = store;
  res.render('book/index', {
    title: 'Список всех книг',
    books
  });
});

router.get('/counter/:id', async (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    const count = await client.incr(id);
    res.json({message: 'Counter', count});
  } else {
    res.status(500).json({message: 'error'});
  }
});

router.get('/view/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.render('book/view', {
      title: 'Информация по конкретной книге',
      book: books[idx]
    });
  } else {
    res.redirect('/404');
  }
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Создание книги'
  });
});

router.post('/create', (req, res) => {
  const {books} = store;
  const {title, description, author} = req.body;
  const newBook = new Book(title, description, author);

  books.push(newBook);
  res.redirect('/index');
});

router.get('/update/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.render('book/update', {
      title: 'Обновление книги',
      book: books[idx]
    });
  } else {
    res.redirect('/404');
  }
});

router.post('/update/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const {title, description, author} = req.body;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      author
    };
    res.redirect(`/view/${id}`);
  } else {
    res.redirect('/404');
  }
});

router.get('/', (req, res) => {
  const {books} = store;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});


router.get('/:id/download', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.download(path.join(__dirname, `../public/books/${books[idx].fileBook}`));
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});

router.post('/', upload.single('fileBook'), (req, res) => {
  const {books} = store;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  let fileBook = '';

  if (req.file) {
    fileBook = req.file?.filename;
  }

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );
  books.push(newBook);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const {books} = store;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }
    res.json(books[idx]);
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});

router.delete('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json({message: 'Ok'});
  } else {
    res.status(404).json({message: 'Книга не найдена'});
  }
});


module.exports = router;


