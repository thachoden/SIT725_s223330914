const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bookRoutes = require("./routes/book");
const PORT = 3000;
const URI = "mongodb://localhost:27017/bookDB";

//Connect DB
mongoose.connect(URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

//Default page
app.use(express.static(path.join(__dirname, "./public")));

//Route
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
