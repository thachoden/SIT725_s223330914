const bookService = require("../services/bookService.js")

//Controller logic
exports.getAllBook = (req, res) => {
  const allBooks = bookService.getAllBooks();
  res.json(allBooks);
};

exports.getBookById = (req, res) => {
  const book = bookService.getBookById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};
