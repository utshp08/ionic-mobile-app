const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
const path = require('path');

// require('./model/user');
// const User = mongoose.model('User');

const  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'utspantonia@gmail.com',
  pass = process.env.MAILER_PASSWORD || 'ampogiko@10071414'
  nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('/templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));



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
mongoose.connect('mongodb://localhost:27017/ionic-app',
{
    useNewUrlParser: true
})
.then(() => {
    console.log('Mongodb connection established!');
})
.catch(err => console.log(err));



//Launch server
app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});
