const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.set('origins', '*:*');
io.on('connection', async (socket) => {
	console.log("Client Successfully Connected");

	// io.emit('chat', "hello world");
	socket.on('statechange', async (state) => {
		// console.log("Server ---> state change", state);
		socket.broadcast.emit('updatestatechange', state);
	});
});


server.listen(5000, () => {
	console.log("Backend Server is running on http://localhost:5000");
});