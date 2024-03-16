const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  const { title, author, quantity } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      quantity,
    });

    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllBook = async (_, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipRows = (page - 1) * limit;

  try {
    const books = await Book.find().skip(skipRows).limit(limit);
    res.status(200).send({ allBooks: books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  const id = req.query.id;
  const { title, author, quantity } = req.body;

  try {
    let book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.quantity = quantity;

    await book.save();
    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getBook = async (req, res) => {
  const id = req.query.id;

  const book = await Book.findById(id);
  res.send({ book: book });
};

exports.deleteBook = async (req, res) => {
  const id = req.query.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
