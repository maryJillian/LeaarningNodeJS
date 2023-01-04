# LearningNodeJS

db.books.insertMany([
{
  title: 'War and Peace',
  description: 'Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes.',
  authors: 'Lev Nikolaevich Tolstoy'
},
{
  title: 'The Nutcracker',
  description: 'On Christmas Eve in Victorian London, Benjamin Stahlbaum gives his children Louise, Clara, and Fritz the presents his wife Marie had set aside for them before she died.',
  authors: 'Ernst Theodor Wilhelm Hoffmann'
}
]);


db.books.find({title: 'War and Peace'});


db.books.updateOne(
{_id: '1fdgsghd457hfdh4g'},
{
  $set: {
    description: 'Benjamin becomes angry at Clara for refusing to dance with him, and they insult each other. Clara finds a string with her name on it, signifying her gift, and follows it into a forest in a parallel world where she sees a key.',
    authors: 'Wilhelm Hoffmann'
  }
}
)
