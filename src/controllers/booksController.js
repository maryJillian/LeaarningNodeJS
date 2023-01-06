const {v4: uuidv4} = require('uuid');
const path = require('path');


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

const getBooks = (req, res) => {
  try {
    const {books} = store;
    res.render('book/index', {
      title: 'Список всех книг',
      books
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const getBook = (req, res) => {
  try {
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
  } catch (error) {
    res.redirect('/404');
  }
};

const createFormBook = (req, res) => {
  try {
    res.render('book/create', {
      title: 'Создание книги'
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const createBook = (req, res) => {
  try {
    const {books} = store;
    const {title, description, author} = req.body;
    const newBook = new Book(title, description, author);

    books.push(newBook);
    res.redirect('/index');
  } catch (error) {
    res.redirect('/404');
  }
};

const updateFormBook = (req, res) => {
  try {
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
  } catch (error) {
    res.redirect('/404');
  }
};

const updateBook = (req, res) => {
  try {
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
  } catch (error) {
    res.redirect('/404');
  }
};

const getFileBook = (req, res) => {
  try {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
      res.download(path.join(__dirname, `../public/books/${books[idx].fileBook}`));
    } else {
      res.status(404).json({message: 'Книга не найдена'});
    }
  } catch (error) {
    res.redirect('/404');
  }
};

const uploadFileBook = (req, res) => {
  try {
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
  } catch (error) {
    res.redirect('/404');
  }
};


module.exports = {
  getBooks,
  getBook,
  createFormBook,
  createBook,
  updateFormBook,
  updateBook,
  getFileBook,
  uploadFileBook
}