const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 50,
      immutable: true,
      match: /^[a-zA-Z0-9\-_]+$/,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s\-':.,&!?()]+$/,
    },
    author: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      match: /^[a-zA-Z\s\-'.]+$/,
    },
    year: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear() + 5, // Allow future publications up to 5 years
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer",
      },
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Thriller",
        "Biography",
        "History",
        "Self-Help",
        "Poetry",
        "Drama",
        "Adventure",
        "Horror",
        "Other",
      ],
    },
    summary: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
      min: 0,
      validate: [
        {
          validator: function (v) {
            return v !== null && v !== undefined;
          },
          message: "Price is required",
        },
        {
          validator: function (v) {
            if (v === null || v === undefined) return true;
            return parseFloat(v.toString()) >= 0;
          },
          message: "Price must be greater than or equal to 0",
        },
      ],
      get: (v) => v?.toString(),
    },
    currency: {
      type: String,
      required: true,
      default: "AUD",
    },
  },
  { strict: "throw"}
);

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
