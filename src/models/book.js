const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    authors: {
      type: String,
      required: true
    },
    favorite: {
      type: String
    },
    fileCover: {
      type: String
    },
    fileName: {
      type: String
    }
  }
)

module.exports = mongoose.model('Book', BookSchema);