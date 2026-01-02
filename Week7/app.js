const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const http = require("http").createServer(app); // Create HTTP server from app
const io = require("socket.io")(http); // Pass http server to socket.io
// Serve static files from /public
app.use(express.static("public"));

io.on("connection", (socket) => {
  let time = 0;
  console.log("a user connected");
  socket.on("message", (msg) => {
    console.log("Received message:", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    time += 1;
    socket.emit("number", time);
  }, 1000);
});

http.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
