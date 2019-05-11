const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: { type: String, unique: true },
    picture: {
        type: String
    },
    gender:  {
        type:String
    },
    birthday:  {
        type: Date
    },
    provider: {
        id:{
            type:String
        },
        type: {
            type:String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);