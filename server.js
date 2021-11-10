require('dotenv').config();
const express = require('express');
const cors = require('cors');
// import our library that we are going to use to interact (make queries and stuff) with our mongo db
const mongoose = require('mongoose');
const Book = require ('./bookmodel.js');
const app = express();
app.use(cors());



mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});
const PORT = process.env.PORT
app.get('/', (req, res) => res.send('hello'));
app.get('/books', handleBooks);
app.post('/books',handlePostBooks)

async function handleBooks (req,res){

try {
  let booksFromDB = await Book.find({});
  if (booksFromDB) {
  // if the cat cat reqest/query was successful send the cats
  res.status(200).send(booksFromDB);
  } else {
    res.status(404).send('no books for you');
  }

} catch (e) {
  console.error(e);
  res.status(500).send('server error')
}
}

async function handlePostBooks(req,res){
  try{
    let newBook = await Book.create(req.body)
    res.status(200).send(newBook);

  }catch(e){
    res.status(500).send('no book added')
  }
}


app.listen(PORT,() =>console.log(`im listening on ${PORT}`) )