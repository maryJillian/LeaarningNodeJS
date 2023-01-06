const express = require('express');
const router = express.Router();
const upload = require('../middleware/file');
const {
  getBooks, getBook, createFormBook,
  createBook, updateFormBook, updateBook,
  getFileBook, uploadFileBook
} = require('../controllers/booksController');


router.get('/index', getBooks);

router.get('/view/:id', getBook);

router.get('/create', createFormBook);

router.post('/create', createBook);

router.get('/update/:id', updateFormBook);

router.post('/update/:id', updateBook);

router.get('/:id/download', getFileBook);

router.post('/', upload.single('fileBook'), uploadFileBook);


module.exports = router;


