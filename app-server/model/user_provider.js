const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProviderSchema = new mongoose.Schema(
    {
        user_id: { type: String, unique: true },
        provider: String,
        provider_uid: String,
        birthday: Date
    }, { timestamps: true });

module.exports = mongoose.model('UserProvider', userProviderSchema);