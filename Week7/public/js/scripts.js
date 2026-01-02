// Connect to the server socket
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  // Listen to 'number' event from server and update the page
  socket.on('number', (msg) => {
    msg = "Login time: " + msg + " s";
    document.getElementById('number').innerText = msg ;
  });

  // Handle form submission
  const form = document.querySelector('#message-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const message = document.getElementById('message').value;
    console.log('Captured message:', message);

    // Emit the message to the server via socket.io
    socket.emit('message', message);

    form.reset();
  });
});
