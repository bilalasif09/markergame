const openSocket =  require('socket.io-client');
const socket = openSocket('http://localhost:5000/');

function connect(cb) {
  console.log("client connect func");
  // socket.emit('statechange', {});
  // socket.on('chat', (message) => {
  //   console.log("chat message on client", message)
  //   cb(message);
  // });
  // socket.on('updatestatechange', (state) => {
  //   console.log("updated state change", state);
  //   cb(state);
  // });
};
function stateChange(state, callback) {
  console.log("Client --> state change", state);
  socket.emit('statechange', state);

  socket.on('updatestatechange', (state) => {
    console.log("state change client", state);
    callback(state);
  });
};

export { connect, stateChange }