const openSocket =  require('socket.io-client');
const socket = openSocket('http://localhost:5000/');

function connect(cb) {
  console.log("client connect func");
  socket.on('chat', (message) => {
    console.log("chat message on client", message)
    cb(message);
  })
}

export { connect }