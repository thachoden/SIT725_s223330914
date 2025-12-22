const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/bookDB";
const Book = require("../models/book.model");

mongoose.connect(URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB from service!");
});

// Function to get all books
const getAllBooks = async () => {
  try {
    return await Book.find();
  } catch (e) {
    throw e;
  }
};

// Function to get book by ID
const getBookById = async (id) => {
  try {
    return await Book.findOne({ id: id });
  } catch (e) {
    throw e;
  }
};

//Function to add book
const addBook = async (data) => {
  try {
    const sample = new Book(data);
    const savedBook = await sample.save();
    return savedBook;
  } catch (e) {
    throw e;
  }
};

//Function to update book by ID
const updateBook = async (id,data) => {
  try {
    let warning = null;
    if (data.id !== undefined) {
      warning = "Warning: The 'id' field is immutable and will be ignored";
      delete data.id;
    }

    const updatedBook = await Book.findOneAndUpdate({id: id}, data, {
      new: true,
      runValidators: true,
    });
    if(!updatedBook) {
      return {
        success: false,
        notFound: true,
        data: null,
        error: `Book with id '${id}' not found`
      };
    }
    return {
      success: true,
      data: updatedBook,
      warning: warning,
    };
  } catch (e) {
    throw e;
  }
};
// Export functions
module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
};
