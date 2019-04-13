const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    create: {
        type: Date,
        default: Date.now
    }
});

exports = mongoose.model('Image', ImageSchema);

