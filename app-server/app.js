const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const app           = express();
const port          = process.env.PORT || 3000;
const path          = require('path');
const multer        = require('multer');
const dotenv        = require('dotenv');
const config        = require('./config/config');

const UPLOAD_PATH = 'uploads';

dotenv.config({path: '.env'})

/**
 * Load app modules and routes
 */
const AuthModule    = require('./config/AuthModule');
const TokenService  = require('./config/TokenService');
const authCtrl      = require('./controllers/AuthCtrl');

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

//Setup mongodb database with mongoose module
mongoose.connect(config.db,
{
    useNewUrlParser: true
})
.then(() => {
    console.log('Mongodb connection established!');
})
.catch(err => console.log(err));

app.use((req, res, next) => {
    const token = new TokenService(req.headers);
    
    req.isAuthenticated = token.isAuthenticated;
    req.tokenPayload    = token.getPayload();
    req.user            = {
        _id: req.tokenPayload._id
    };

    next();
});

app.post('/auth/facebook',
    authCtrl.facebookAuth, authCtrl.retrieveUser, authCtrl.generateToken, (req, res) => {
    res.json({token: req.genertedTokenn});
});

app.post('/user/new-user', (req, res) => {
    AuthModule.createUser(req.body).then(user => {
        res.status(200).send({user: user, status: true});
    })
})

app.post('/user/:id', 
authCtrl.facebookAuth, 
authCtrl.retrieveUser, 
(req, res, next) => {
    console.log(req.status);
})

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/images', (req, res, next) => {
    // use lean() to get a plain JS object
    // remove the version key from the response
    image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    })
});

app.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;
 
    image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});


app.get('/images', (req, res) => {
    res.send('images');
})

//Launch server
app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});


module.exports = app;