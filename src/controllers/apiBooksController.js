const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const getApiBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({message: 'Не удалось получить список книг, повторите попытку'});
  }
};

const getApiBook = async (req, res) => {
  try {
    const books = await Book.find({_id: req.params.id});
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({message: 'Книга не найдена'});
  }
};

const createApiBook = async (req, res) => {
  try {
    const books = await Book.create(req.body);
    res.status(201).json(books);
  } catch (error) {
    res.status(404).json({message: 'Не удалось создать книгу, повторите попытку'});
  }
};

const updateApiBook = async (req, res) => {
  try {
    const books = await Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({message: 'Книга не найдена'});
  }
};

const deleteApiBook = async (req, res) => {
  try {
    await Book.findByIdAndRemove({_id: req.params.id});
    res.status(200).json({message: 'Книга удалена'});
  } catch (error) {
    res.status(404).json({message: 'Книга не найдена'});
  }
};

module.exports = {
  getApiBooks,
  getApiBook,
  createApiBook,
  updateApiBook,
  deleteApiBook
}