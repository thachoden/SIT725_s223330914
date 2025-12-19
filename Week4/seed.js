const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bookDB");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

const BookSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  href: String,
  description: String,
});
const Book = mongoose.model("Book", BookSchema);

const cardList = [
  {
    title: "H.P AND THE PHILOSOPHER'S STONE",
    image: "images/book1.jpeg",
    link: "About this book",
    href: "#",
    description: "Demo desciption about book 1",
  },
  {
    title: "H.P AND THE PRISONER OF AZKABAN",
    image: "images/book2.jpeg",
    link: "About this book",
    href: "#",
    description: "Demo desciption about book 2",
  },
  {
    title: "H.P AND THE ORDER OF PHOENIX",
    image: "images/book3.png",
    link: "About this book",
    href: "#",
    description: "Demo desciption about book 3",
  },
];

const seedDatabase = async () => {
  try {
    await Book.deleteMany({});

    for (const item of cardList) {
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