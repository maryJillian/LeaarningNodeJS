const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(404).json({message: 'Не удалось добавить комментарий, повторите попытку'});
  }
};

module.exports = {
  createComment
}