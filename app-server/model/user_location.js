const mongoose       =require('mongoose');
const Schema         =mongoose.Schema;

const UserLocationSchema = new Schema({
    position: {
        longhitude: {
            type: String
        },
        latitude: {
            type: String
        }
    },
    user_id: { type: mongoose.Schema.Types.ObjectId }
})

module.exports = mongoose.model("UserLocation", UserLocationSchema);