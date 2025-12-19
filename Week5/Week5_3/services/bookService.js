const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/bookDB";
const Book = require("../models/Book");

mongoose.connect(URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB from service!");
});

// Function to get all books
const getAllBooks = async () => {
  try {
    return await Book.find();
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw error;
  }
};

// Function to get book by ID
const getBookById = async (id) => {
  try {
    return await Book.findOne({ id: id });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

// Export functions
module.exports = {
  getAllBooks,
  getBookById,
};