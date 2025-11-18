const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
// In-memory array to store quotes

// GET endpoint to retrieve a random quote
// Usage example: http://localhost:3000/add

app.get ("/add", (req,res) => {
    const num1 = parseFloat(req.query.number1);
    const num2 = parseFloat(req.query.number2);

    const total = num1 + num2;
res.send(`The total is ${total}`);
})

app.listen(3000, () => {
  console.log(`Server is listening on ${port}`);
});
