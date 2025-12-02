var express = require("express");
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3000;

app.get("/book1", (req, res) => {
  res.sendFile(__dirname + "/public/book1.html");
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
