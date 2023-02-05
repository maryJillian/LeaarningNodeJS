const express = require('express');
const router = express.Router();

const {
  createComment
} = require('../controllers/commentsController');

router.post('/create', createComment);

module.exports = router;


