module.exports.signUpErrors = (err) => {
  // Declare des variables vides
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    // On verifie si l'erreur contient pseudo
    errors.pseudo = "Pseudo incorrect ou déjà pris";
  }

  if (err.message.includes("email")) {
    errors.email = "Email incorrect ou déjà pris";
  }

  if (err.message.includes("password")) {
    errors.password = "Le mot de passe doit faire 8 caractères";
  }

  if (err.code == 11000) {
    errors = "Pseudo ou email déjà utilisé";
  }

  return errors;
};

module.exports.loginErrors = (err) => {
  // Declare des variables vides
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) {
    errors.email = "Email ou password incorrect";
  }

  if (err.message.includes("password")) {
    errors.password = "Email ou password incorrect";
  }
  // A controller
  return errors;
};

// Errors upload
module.exports.errorsUpload = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file")) {
    errors.format = "Format incompatible";
  }

  if (err.message.includes("max size")) {
    errors.maxSize = "Size incompatible";
  }

  return errors;
};
