const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    ProfileURI: {
        type: mongoose.Schema.Types.ObjectId('Image'),
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