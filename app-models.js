const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('users', new Schema({
    name: {
		type: String,
		required: [true, 'Name is required']
	},
    email: {
		type: String,
		required: [ true, 'Email is required' ],
		unique: [ true, 'Email already exist' ],
		validate: {
			validator: (v) => {
				if(v.length>0) 
					return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v);
				else
					return true;
			},
			"message": "{VALUE} is not a valid email"
		}
	},
	password: { 
		type: String, 
		required: [ true, 'Password is required' ], 
		validate: {
			validator: (v) => {
				if (v.length<4) return false;
				else return true;
			},
			"message": "Password length must be atleast 4 characters"
		}
	},
    created_at: {
        type: Date,
        default: new Date()
    }
}));

const Match = mongoose.model('matches', new Schema({
    player_one: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    player_two: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    player_one_team: String,
    player_two_team: String,
    is_live: Boolean,
    winner: String,
    created_at: {
        type: Date,
        default: new Date()
    }
}));

module.exports = { User, Match };