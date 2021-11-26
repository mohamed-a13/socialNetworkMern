const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true, //Nom de pseudo unique
      trim: true, //Retire les espaces
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [isEmail], //bibliotheque validator
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024,
      maxlength: 8,
      minlength: 8,
    },
    picture: {
      type: String,
      default: "./upload/profil/random-user.png",
    },
    bio: {
      type: String,
      maxlength: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//Crypter le mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login, verif password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Email ou password incorrect");
    }
  } else {
    throw Error("Email ou password incorrect");
  }
};

module.exports = UserModel = mongoose.model("user", userSchema);
