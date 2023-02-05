const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id_book: {
      type: String,
      required: true
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('Comment', CommentSchema);