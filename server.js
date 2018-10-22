const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const { User, Match } = require('./app-models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/markergame', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

io.set('origins', '*:*');
io.on('connection', async (socket) => {
	console.log("Client Successfully Connected");

	// io.emit('chat', "hello world");
	socket.on('statechange', async (state) => {
		// console.log("Server ---> state change", state);
		socket.broadcast.emit('updatestatechange', state);
	});
});

app.post('/login', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.cookie('markeruserid', user._id);
		res.cookie('markerusername', user.name);
		res.status(200).send({user: user, status: 1});
	}
	catch (err) {
		console.log(err);
		res.status(500).send({error: err, status: 0});
	};
});

server.listen(5000, () => {
	console.log("Backend Server is running on http://localhost:5000");
});