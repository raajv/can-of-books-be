require('dotenv').config();
const express = require('express');
const cors = require('cors');
const verifyUser = require('./auth');
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
app.delete('/books/:id',handleDelBooks);
app.put('/books/:id',handlePutBooks);
app.get('/user', getUser);

function handleBooks (request,response){
verifyUser(request, async(err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      
      try {
        const email = user.email;
        let booksFromDB = await Book.find({email});
        if (booksFromDB) {
        response.status(200).send(booksFromDB);
        } else {
          response.status(404).send('no books for you');
        }
      } catch (e) {
        console.error(e);
        response.status(500).send('server error')
      }
    }
  })
};

async function handlePostBooks(req,res){
  const newBook = { ...req.body, email: req.query.email }
  
  try {
    const successfulBook = await Book.create(newBook);
    if (successfulBook) {
      res.status(201).send(successfulBook);
    } else {
      res.status(400).send('could not add book');
    }

  } catch (e) {
    console.log(e);
    res.status(500).send('server error');
  }
}

function handleDelBooks(req,res){
  verifyUser(request, async(err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      
      const id = req.params.id;
      const email = user.email;
    try {
        const delBook = await Book.findOne({ _id: id, email: email });
        if (!delBook) {
          res.status(400).send('could not delete book');
        } else {
          await Book.findByIdAndDelete(id);
          res.status(204).send('book gone ');
        }
      } catch (e) {
        console.log(e);
        res.status(500).send('server error');
      }
    }
  })
}


async function handlePutBooks(req, res) {
  /// user is going to send us their email(query) and id(param) new book state via req.body
  // findByIdAndUpdate takes some arguments
  // 1 - the id of the record you want to change
  // 2 - the data you want to replace
  // 3 - optional - make it completey replace the entry { new: true, overwrite: true }
  const id = req.params.id;
  const updatedData = { ...req.body, email: req.query.email }
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    // const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).send(updatedBook)
  } catch (e) {
    console.log(e);
    res.status(500).send('server error');
  }

}

function getUser(request, response) {

  verifyUser(request, (err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      response.send(user);
    }
  })
}

app.listen(PORT,() =>console.log(`im listening on ${PORT}`) )