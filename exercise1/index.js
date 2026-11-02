const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const booksRouter = require('./routes/books')


app.use(express.json());
app.use('/books', booksRouter)



// database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
