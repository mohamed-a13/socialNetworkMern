const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

// Tester si l'utilisateur est toujours connecter à travers le site
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      // decodedToken: reponse decodé
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// Checker si l'utilisateur a un token lors qui rentre dans l'application
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      // decodedToken: reponse decodé
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log("No token in auth");
  }
};
