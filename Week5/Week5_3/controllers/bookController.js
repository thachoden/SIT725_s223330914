const bookService = require("../services/bookService.js")

//Controller logic
exports.getAllBook = async (req, res) => {
  const allBooks = await bookService.getAllBooks();
  res.json(allBooks);
};

exports.getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};
