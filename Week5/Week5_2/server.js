const express = require("express");
const path = require("path");
const app = express();
const bookRoutes = require("./routes/book");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "./public")));

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
