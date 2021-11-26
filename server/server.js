// Initialisation express
const express = require("express");
// Import Body-parser
const bodyParser = require("body-parser");
// Import Cookie-parser
const cookieParser = require("cookie-parser");
// Variable d'environnement du port
const PORT = require("dotenv").config({ path: "./config/.env" });
// Import de la DB
require("./config/db");
// Import middleware
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const app = express();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Http autorized
const cors = require("cors");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Initialisation body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Initialisation cookie-parser
app.use(cookieParser());

// jwt middleware
app.get("*", checkUser); //* check toutes les routes
app.use("/jwtid", requireAuth, (req, res) => {
  // Connecter automatiquement l'utilisateur si il a un token
  res.status(200).send(res.locals.user._id);
});

// Routes
app.use("/api/user", userRoutes); //lors que nous sommes sur le chemin "./api/user" on appelle les routes "userRoutes"
app.use("/api/post", postRoutes);

// Installer le server sur le port (se place à la fin)
app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
