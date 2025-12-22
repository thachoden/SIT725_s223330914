const mongoose = require("mongoose");
const Book = require("./models/book.model");
const URI = "mongodb://localhost:27017/bookDB";

mongoose.connect(URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

//Book List
const books = [
  {
    id: "book-001",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    summary:
      "A classic American novel set in the Jazz Age that explores themes of wealth, love, and the American Dream through the story of Jay Gatsby and his obsession with Daisy Buchanan.",
    price: 19.99,
    currency: "AUD",
  },
];

const seedDatabase = async () => {
  try {
    await Book.deleteMany({});

    for (const item of books) {
      const sample = new Book(item);
      await sample.save();
      console.log("Sample project saved!");
    }

    console.log("Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
};

seedDatabase();
