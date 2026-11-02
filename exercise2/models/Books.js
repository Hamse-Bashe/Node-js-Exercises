const mongoose =require('mongoose');

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    genre: String
})

module.exports = mongoose.model('Books', booksSchema)