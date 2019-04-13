const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const multer = require('multer');

const UPLOAD_PATH = 'uploads';
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})

upload = multer({ storage: storage});


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

require('./model/Image');
const image = mongoose.model('Image');

app.post('/images', upload.single('image'), (req, res, next) => {
  // Create a new image model and fill the properties
  let newImage = new image();
  newImage.filename = req.file.filename;
  newImage.originalName = req.file.originalname;
  newImage.desc = req.body.desc
  newImage.save(err => {
      if (err) {
          return res.sendStatus(400);
      }
      res.status(201).send({ newImage });
      console.log(req.file)
  });
});

app.get('/images', (req, res) => {
    res.send('images');
})
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



//Launch server
app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});
