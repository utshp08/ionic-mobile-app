require('../model/user_location');
const mongoose          =require('mongoose');
const UserLocation      =mongoose.model('UserLocation');

exports.newLocation = (req, res) => {
    console.log(req.body._id)
    UserLocation.findById(req.body._id, (err, location) => {
        if(!location)
        {
            newLocation = new UserLocation({
                position : {
                    longitude : req.longitude,
                    latitude : req.latitude
                }
            })
            .save()
            .then(() => {
                console.log("New Location save")
            })
            .catch(err => console.log(err));

        } else {
            newLocation = new UserLocation({
                position : {
                    longitude : req.longitude,
                    latitude : req.latitude
                }
            })
            .update()
            .then(() => {
                console.log("Location updated")
            })
        }
    })
}

