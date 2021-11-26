const mongoose = require("mongoose");
// Variable d'environnement du port
const PORT = require("dotenv").config({ path: "./config/.env" });

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERS +
      "@cluster0.ckcrd.mongodb.net/socialnetwork",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
