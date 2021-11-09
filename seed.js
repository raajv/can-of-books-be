const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./bookmodel.js');

// write a function:
// connects to the db
// adds some cats(records)
// disconnects from the db

// call the function

// remember the db methods are async

async function seed() {
  mongoose.connect(process.env.DB_URL);

  const myBook = new Book({
    title:'Crouching Tiger',
  description: 'The regal Bengal Tiger fighting to survive',
  status: true,
  email : 'raaj.vardhan@gmail.com'
});
  await myBook.save(function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('saved my Book, Crouching Tiger');
    }
  })

  // alternatively
  await Book.create({
    title:'Alive in Cambodia',
  description: 'The fascinating tale of a gujrati tomb raider in cambodia ',
  status: true,
  email : 'slayer.r1@gmail.com'
  });
  console.log('saved Alive in Cambodia');

  await Book.create({
    title:'Drive me to Hell',
  description: 'A tale of the driver and navigator',
  status: true,
  email : 'slayer.r1@gmail.com'
  });
  console.log('saved Drive me to Hell');

  mongoose.disconnect();
}

seed();