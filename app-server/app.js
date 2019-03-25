const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.port || 5000;

const SECRET_KEY = "secretkey123";

require('./model/user');
const User = mongoose.model('User');

app.use(cors());

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

app.use(router);

//setup routes
router.get('/', (req, res) => {
    res.send('asdasd');
})

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) res.status(500).send(err);
        if(!user)
        {
            res.status(404).send("No user found.");
        }
        else 
        {
            bcrypt.compare(req.body.password, user.password)
            .then(result => {
                if(result)
                {
                    const  expiresIn  =  24  *  60  *  60;
                    const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                            expiresIn:  expiresIn
                    });
                    res.status(200).send({"user" : user, "access_token" : accessToken, "expires_in" : expiresIn});
                }
            })
        }
    })
});

router.get('/login', (req, res) => {
    console.log(req.body);
});

router.post('/register', (req, res) => {
    newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    .save()
    .then(user => {
        console.log('New user saved!');
        res.status(200).send({"user": user});
    })
    .catch(err => res.status(404).send(err));
});

router.get('/register', (req, res) => {
    console.log(req.body);
});

//Setup mongodb database with mongoose module
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
