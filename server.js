require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require ('./bookmodel.js');
const app = express();
app.use(cors());
app.use(express.json())



mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});
const PORT = process.env.PORT
app.get('/', (req, res) => res.send('hello'));
app.get('/books', handleBooks);
app.post('/books',handlePostBooks);
app.delete('/books',handleDelBooks);

async function handleBooks (req,res){

try {
  const email = req.query.email;
  let booksFromDB = await Book.find({email});
  if (booksFromDB) {
  res.status(200).send(booksFromDB);
  } else {
    res.status(404).send('no books for you');
  }
} catch (e) {
  console.error(e);
  res.status(500).send('server error')
}
};

async function handlePostBooks(req,res){
  try{
    let newBook = await Book.create(req.body)
    res.status(200).send(newBook);
}catch(e){
    res.status(500).send('no book added')
  }
}

async function handleDelBooks(req,res){
const id = req.params.id;
const email = req.params.email;

const delBook= await Book.findOne({_id: id , email: email});
if(!delBook){
  res.status(400).send('no book to del')
}else{
  await Book.findByIdAndDelete(id);
  res.status(200).send('bye book')
}
}


app.listen(PORT,() =>console.log(`im listening on ${PORT}`) )