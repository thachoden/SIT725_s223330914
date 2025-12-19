const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true, index: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
  summary: { type: String, require: true },
  price: {
    type: mongoose.Decimal128,
    require: true,
    get: (v) => v?.toString(),
  },
  currency: { type: String, require: true, default: "AUD" },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
