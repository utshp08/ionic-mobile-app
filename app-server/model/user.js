const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    id:String,
    name: String,
    email: { type: String, unique: true },
    picture: String,
    gender: String,
    birthday: Date,
    provider: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);