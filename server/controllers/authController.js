const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { signUpErrors, loginErrors } = require("../utils/errorUtils");
// const TOKEN8SECRET = require("dotenv").config({ path: "./config/.env" });

// Expire
const maxAge = 3 * 24 * 60 * 60 * 1000;
// Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id }); //Recupere l'id
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge }); //nom du cookie, token, caracteristique
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = loginErrors(err);
    res.status(200).send({ errors }); // A controller
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
