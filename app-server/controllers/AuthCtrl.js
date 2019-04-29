
const AuthModule   = require('../config/AuthModule');
const TokenService = require('../config/TokenService');

module.exports = {
  facebookAuth,
  retrieveUser,
  generateToken
};

function facebookAuth(req, res, next) {

  req.authObject = req.body;
  next();
  // const options = {
  //     code: req.body.code,
  //     clientId: req.body.clientId,
  //     redirectUri: req.body.redirectUri
  // };

  // AuthModule.facebookAuthentication(options, (err, response) => {
  //     if(err) return res.status(401).json({err: 'Error during facebook oauth'});

  //     // for larger apps recommended to namespace req variables
  //     req.authObject = response;

  //     next();
  // });

}

// Here we will generate the user or retrieve existing one to pass for our token generator
function retrieveUser(req, res, next) {
  if(!req.authObject) return res.status(401).json({err: "Error while fetching user"});

  const userToRetrieve = req.authObject;

 AuthModule.createOrRetrieveUser(userToRetrieve, (err, user) => {
      if(err) return res.status(401).json({err: 'Error while fetching user'});

      // req.user = user;
      if(user) 
      {
        console.log(true);
        return res.status(200).json({user:user, status: true});
      } else {
        console.log(false);
        return res.status(200).json({user:user, status: false});
      }
  });
}
// The last Middleware in the chain
// reponsible for returning the generated token back to client
function generateToken(req, res, next) {
  console.log(req.user);
    TokenService.createToken({user: req.user}, (err, token) => {
        // if(err) return next({status: 401, err: 'User Validation failed'});
        if(err) console.log(err);
        req.genertedToken = token;
        next();
    });
}