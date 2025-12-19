const mongoose = require("mongoose");
const Book = require('./models/Book');
const URI = "mongodb://localhost:27017/bookDB";

mongoose.connect(URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

//Book List
const books = [
  {
    id: "b1",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy. The series portrays a fictional past, present, and future wherein Earth encounters an alien civilization from a nearby system of three Sun-like stars orbiting one another, a representative example of the three-body problem in orbital mechanics.",
    price: 15.99
  },
  {
    id: "b2",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester's secret and forging her own independence.",
    price: 24.99
  },
  {
    id: "b3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage.",
    price: 9.99
  },
  {
    id: "b4",
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss.",
    price: 19.99
  },
  {
    id: "b5",
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief.",
    price: 29.99
  }
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
