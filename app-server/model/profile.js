const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    AvatarUrl: {
        type: String,
        required: false
    },
    Age: {
        type: Number,
        required: false
    },
    Gender: {
        type: String,
        required: false
    },
    Interest: {
        type: String,
        required: false
    },
    User: {
        type: mongoose.Schema.Types.ObjectId("User")
    }
    
    
});

module.exports = mongoose.model("Profile", ProfileSchema);