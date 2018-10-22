const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('users', new Schema({
    name: String,
    player: String,
    playing: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}));

const Match = mongoose.model('matches', new Schema({
    match: [{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }]
}));

export { User, Match };