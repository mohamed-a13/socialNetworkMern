const UserModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

// // Show all users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); // find: chercher les donnees, select('-password'): tout selectionner sauf password
  res.status(200).json(users);
};

// Show user info
module.exports.userInfo = async (req, res) => {
  // Verify if id to exist
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("ID unknoxn: " + err);
  }).select("-password");
};

// Update user
module.exports.updateUser = async (req, res) => {
  // Verify if id to exist
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.params.id }, // Localise l'id
      {
        $set: {
          bio: req.body.bio, // Modification
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }, // Paramètres
      (err, data) => {
        if (!err) return res.send(data);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: err }); A controller
  }
};

// Delete User
module.exports.deleteUser = async (req, res) => {
  // Verify if id to exist
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown: " + req.params.id);
  }

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).send({ message: "Successfuly deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Follow User
module.exports.followUser = async (req, res) => {
  // Verify if id to exist
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  ) {
    return res
      .status(400)
      .send("ID unknown: " + req.params.id + req.body.idToFollow);
  }

  try {
    // add to the followers list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );

    // add to the following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, data) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    // res.status(500).json({ message: err }); A controller
  }
};

// UnFollow User
module.exports.unFollowUser = async (req, res) => {
  // Verify if id to exist
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  ) {
    return res
      .status(400)
      .send("ID unknown: " + req.params.id + req.body.idToFollow);
  }

  try {
    // add to the followers list
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );

    // add to the following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, data) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    // res.status(500).json({ message: err }); A controller
  }
};
