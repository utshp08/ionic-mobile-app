const mongoose       =require('mongoose');
const Schema         =mongoose.Schema;

const UserLocationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    position: {
        longitude: {
            type: String
        },
        latitude: {
            type: String
        }
    }
})

module.exports = mongoose.model("UserLocation", UserLocationSchema);