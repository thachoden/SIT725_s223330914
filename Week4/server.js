var express = require("express");
const mongoose = require("mongoose");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3000;

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

app.get("/api/book", async (req, res) => {
  const books = await Book.find({});
  res.json({ statusCode: 200, data: books, message: "Success" });
});


app.listen(port, () => {
  console.log("App listening to: " + port);
});
