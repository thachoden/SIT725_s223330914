const bookService = require("../services/book.service.js");

const handleValidationError = (e,res) => {
  const causes = Object.keys(e.errors);
      let message = "";

      // Scan through each field causing error
      causes.forEach((field) => {
        const error = e.errors[field];

        // Customize message based on field
        switch (field) {
          case "id":
            message +=
              "[For id field]: Use alphanumeric, hyphens, underscores only, no space allow. ";
            break;
          case "author":
            message +=
              "[For author field]: Use only letters, spaces, hyphens, apostrophes, periods. ";
            break;
          case "title":
            message +=
              "[For title field]: Use alphanumeric, space and following symbols only: -':.,&!?() . ";
            break;
          case "genre":
            message +=
              "[For genre field]: Genre must be one of: Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Romance, Thriller, Biography, History, Self-Help, Poetry, Drama, Adventure, Horror, Other. ";
            break;
          default:
            message += `${field}: ${error.message} `;
        }
      });

      return res.status(400).json({
        success: false,
        message: message.trim(),
        cause: causes,
        error: Object.values(e.errors)
          .map((err) => err.message)
          .join(" "),
      });
}
const getAllBook = async (req, res) => {
  const allBooks = await bookService.getAllBooks();
  res.json(allBooks);
};

const getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      res.status(409).json({
        success: false,
        message: "Error adding book",
        error: e.message,
      });
    } else if (e.name === "ValidationError") {
      handleValidationError(e,res);
    } else if (e.name === "StrictModeError") {
      res.status(400).json({
        success: false,
        message: "Invalid field included.",
        error: e.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: e.message,
      });
    }
  }
};

const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await bookService.updateBook(id, req.body);
    if (response.notFound) {
      res.status(404).json({
        success: false,
        message: `Book with id: ${id} is not exist`,
      });
    } else if (response.warning) {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: response.data,
        warning: response.warning,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: response.data,
      });
    }
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      handleValidationError(e,res);
    } else if (e.name === "StrictModeError") {
      res.status(400).json({
        success: false,
        message: "Invalid field included.",
        error: e.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: e.message,
      });
    }
  }
};
module.exports = {
  getAllBook,
  getBookById,
  addBook,
  updateBook,
};
