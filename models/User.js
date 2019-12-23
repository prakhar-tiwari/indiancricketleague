const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    contactNumber: String,
    favouriteTeam: {
        type: mongoose.Types.ObjectId,
        ref: 'matches'
    }
});

module.exports = mongoose.model('User', userSchema);