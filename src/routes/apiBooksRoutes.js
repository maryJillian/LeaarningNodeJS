const express = require('express');
const router = express.Router();

const {
  getApiBooks, getApiBook, updateApiBook,
  createApiBook, deleteApiBook
} = require('../controllers/apiBooksController');

router.get('/', getApiBooks);

router.get('/:id', getApiBook);

router.post('/', createApiBook);

router.put('/:id', updateApiBook);

router.delete('/:id', deleteApiBook);


module.exports = router;