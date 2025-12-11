var express = require("express");
const mongoose = require("mongoose");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3001;

mongoose.connect("mongodb://localhost:27017/bookDB");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  href: String,
  description: String,
});
const Project = mongoose.model("Project", ProjectSchema);

//Uncomment and run the following part ONLY ON FIRST RUN.

const cardList = [
  {
    title: "H.P AND THE PHILOSOPHER'S STONE",
    image: "images/book1.jpeg",
    link: "About this book",
    href: "book1",
    description: "Demo desciption about book 1",
  },
  {
    title: "H.P AND THE PRISONER OF AZKABAN",
    image: "images/book2.jpeg",
    link: "About this book",
    href: "book2",
    description: "Demo desciption about book 2",
  },
  {
    title: "H.P AND THE ORDER OF PHOENIX",
    image: "images/book3.png",
    link: "About this book",
    href: "book3",
    description: "Demo desciption about book 3",
  },
];

const sampleData = (list) => {
  list.forEach((item) => {
    const sample = new Project({
      title : item.title,
      image: item.image,
      link: item.link,
      href: item.href,
      description: item.description
    })
    sample.save().then(() => console.log("Sample project saved!"));
  });
}
sampleData(cardList);

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find({});
  res.json({ statusCode: 200, data: projects, message: "Success" });
});

app.get("/book1", (req, res) => {
  res.sendFile(__dirname + "/public/book1.html");
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
