const Books = require("../models/Books");

exports.getBooks = async (req, res) => {
  const books = await Books.find();
  res.json(books);
};

exports.addBook = async (req, res) => {
  const bookData = req.body;
  if (!bookData.title) return res.status(400).send("Book title is required");
  if (!bookData.author) return res.status(400).send("Book author is required");
  const newBook = new Books(bookData);
  const savedBook = await newBook.save();

  res.status(201).json(savedBook);
};

exports.getOneBook = async (req, res) => {
  const book = await Books.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found.");

  res.send(book);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) return res.status(404).send("Book not found.");

    res.json(updatedBook);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) return res.status(404).send("Book not found.");

    res.send(`Book with id: ${id} is deleted.`);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

