const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const { User, Match, ActiveUsers } = require('./app-models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/markergame', { useNewUrlParser: true });
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

io.set('origins', '*:*');
io.on('connection', (socket) => {
	console.log("Client Successfully Connected", socket.id);

	// io.emit('chat', "hello world");
	socket.on('login', async (userId) => {
		let activeUser;
		try {
			activeUser = await ActiveUsers.findOneAndUpdate({is_playing: false}, {is_playing: true});
		}
		catch (err) {
			console.log(err);
		};
		if (!activeUser) {
			try {
				await ActiveUsers.create({user_id: userId, socket_id: socket.id});
			}
			catch(err) {
				console.log(err);
			};
		} else {
			let newActiveUser, newMatch;
			try {
				newActiveUser = await ActiveUsers.create({user_id: userId, socket_id: socket.id, is_playing: true});
			}
			catch (err) {
				console.log(err);
			};
			try {
				newMatch = await Match.create({player_one: activeUser.user_id, player_two: newActiveUser.user_id,
					 is_live: true});
			}
			catch (err) {
				console.log(err);
			};
		};
		// const activeUser = {
		// 	user_id: userId,
		// 	socket_id: socket.id
		// }
	});
	socket.on('statechange', async (state) => {
		// console.log("Server ---> state change", state);
		socket.broadcast.emit('updatestatechange', state);
	});
	socket.on('disconnect', (msg) => {
		console.log("Socket disconnected", msg, "socket id", socket.id);
	});
});

app.put('/login', async (req, res) => {
	try {
		const user = await User.findOne({email: req.body.email, password: req.body.password});
		res.cookie('markeruserid', user._id);
		res.cookie('markerusername', user.name);
		res.status(200).send({user: user, status: 1});
	}
	catch (err) {
		console.log(err);
		res.status(500).send({error: err, status: 0});
	};
});

app.post('/signup', async (req, res) => {
	console.log("Signup body", req.body);
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