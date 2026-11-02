const express = require('express');
const router = express.Router();
const { getBooks, addBook, getOneBook, updateBook, deleteBook } = require('../controllers/booksController');

router.get('/', getBooks)
router.post('/add', addBook)
router.get('/:id', getOneBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router;