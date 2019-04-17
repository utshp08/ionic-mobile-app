const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const SendOtp = require('sendotp');

app.use(cors());
app.use(function(req, res, next)
{
   /* Allow access from any requesting client */
   res.setHeader('Access-Control-Allow-Origin', '*');

   /* Allow access for any of the following Http request types */
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

   /* Set the Http request header */
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//load routes
const auth = require('./routes/auth/AuthRoutes');

app.use(auth);

//Setup mongodb database with mongoose module
//'mongodb+srv://utspantonia:secret123@cluster0-oguaj.mongodb.net/ifinder?retryWrites=true'
//mongodb://localhost:27017/ionic-app
mongoose.connect('mongodb+srv://utspantonia:secret123@cluster0-oguaj.mongodb.net/ifinder?retryWrites=true',
{
    useNewUrlParser: true
})
.then(() => {
    console.log('Mongodb connection established!');
})
.catch(err => console.log(err));

const sendOtp = new SendOtp('1184A80zLSlRvBLD5cb6406f');

app.post('/otp-idate', (req, res) => {
    
    if(req.receiver)
    {
        sendOtp.send(req.receiver, senderId, () => {
            res.send(`OTP has been sent to ${req.receiver}`)
        })
    }
})

app.set('view engine', 'html');


app.get('/otp', (req,res) => {
    res.render('/otp-idate');
})
// sendOtp.send(contactNumber, senderId, otp, callback); //otp is optional if not sent it'll be generated automatically
// sendOtp.retry(contactNumber, retryVoice, callback);
// sendOtp.verify(contactNumber, otpToVerify, callback);

//Launch server
app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});
