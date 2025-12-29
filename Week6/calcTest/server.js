const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/multiply", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Input must be a number");
  }
  const result = a*b;
  res.send(`Result:${result}`);
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
