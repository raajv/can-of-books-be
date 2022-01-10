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
    image: 'https://doc-0c-4g-docs.googleusercontent.com/docs/securesc/l2mvegih28iol031ub3gvfqp83aqk2b3/sul9tbo7l40epjnueefvqdnsrs5n9h94/1641839850000/01977255101469335510/07424453969995856690/15DDsxx5L6EXkPxNf6ZA_8dLA-nq8nbhN?e=view&authuser=0',
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
    image : 'https://doc-08-44-docs.googleusercontent.com/docs/securesc/0dk2erq2chc534tbrccpb949fq6ftmok/m2a8jcbtbeo5ngpbn76lv6vmsic3elg0/1641840225000/01977255101469335510/01977255101469335510/14EkfXs2CAbm7To1SuPnryc4y87BjLpGH?e=view&authuser=0',
  description: 'The fascinating tale of a gujrati tomb raider in cambodia ',
  status: true,
  email : 'raaj.vardhan@gmail.com'
  });
  console.log('saved Alive in Cambodia');

  await Book.create({
    title:'Alive in Cambodia',
    image : 'https://doc-0s-44-docs.googleusercontent.com/docs/securesc/0dk2erq2chc534tbrccpb949fq6ftmok/m8qrrdma4ctua6deab9lih8mgnamtvlv/1641840225000/01977255101469335510/01977255101469335510/14E5BIgZ_cjRRFtaJ_iLWmi71HrLKhwGD?e=view&authuser=0',
  description: 'The fascinating tale of a gujrati tomb raider in cambodia ',
  status: true,
  email : 'raaj.vardhan@gmail.com'
  });
  console.log('saved Alive in Cambodia');

  await Book.create({
    title:'Alive in Cambodia',
    image : 'https://doc-0k-44-docs.googleusercontent.com/docs/securesc/0dk2erq2chc534tbrccpb949fq6ftmok/qj1pqcjh5rhd9c9rvag9cf6lho7c3fpb/1641840150000/01977255101469335510/01977255101469335510/14CRueJJZlzyzyYk5pidLowNfKSE9jj20?e=view&authuser=0',
  description: 'The fascinating tale of a gujrati tomb raider in cambodia ',
  status: true,
  email : 'raaj.vardhan@gmail.com'
  });
  console.log('saved Alive in Cambodia');

  await Book.create({
    title:'Alive in Cambodia',
    image : 'https://doc-0c-44-docs.googleusercontent.com/docs/securesc/0dk2erq2chc534tbrccpb949fq6ftmok/90f9ja3k8dkmgretapp23a55u0t651ri/1641840075000/01977255101469335510/01977255101469335510/1478uXxFxYuJMSU3ABpkctbbw3IKrMQ25?e=view&authuser=0&nonce=cotgir3lo8pqs&user=01977255101469335510&hash=d48p9lpqcutncgn0id5r4f16jfmn8c7n',
  description: 'The fascinating tale of a gujrati tomb raider in cambodia ',
  status: true,
  email : 'raaj.vardhan@gmail.com'
  });
  console.log('saved Alive in Cambodia');

  await Book.create({
    title:'Drive me to Hell',
    image: '',
  description: 'A tale of the driver and navigator',
  status: true,
  email : 'slayer.r1@gmail.com'
  });
  console.log('saved Drive me to Hell');

  mongoose.disconnect();
}

seed();