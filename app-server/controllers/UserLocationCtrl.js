require('../model/UserLocationModel');
const mongoose          =require('mongoose');
const UserLocation      =mongoose.model('UserLocation');

exports.new_location = (req, res) => {
    UserLocation.findOne({user: req.body.userid}, (err, location) => {
        if(!location)
        {   
            data = {
                user : req.body.userid,
                position:{
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                }
            }
            console.log("No user location yet");
            ul = new UserLocation(data).save()
            .then(() => {
                console.log("New Location save")
            })
            .catch(err => console.log(err));

        } else {
            console.log("User location found");
            location.updateOne({
                longitude: req.body.longitude,
                latitude: req.body.latitude
            })
            .then(() => {
                console.log("Location updated")
            })
            .catch(err => console.log(err))
        }
    })
}

