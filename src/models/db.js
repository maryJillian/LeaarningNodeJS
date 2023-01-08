const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const DB_HOST = process.env.DB_HOST || 'mongodb://0.0.0.0:27017/BookDB';

mongoose.connect(DB_HOST,
  (error) => {
    if (!error) {
      console.log('MongoDB Connection Succeeded.')
    } else {
      console.log('Error in DB connection: ' + error)
    }
  });

require('./book');