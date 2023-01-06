const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://0.0.0.0:27017/BookDB',
  (error) => {
    if (!error) {
      console.log('MongoDB Connection Succeeded.')}
    else {
      console.log('Error in DB connection: ' + error)
    }
  });

require('./book');