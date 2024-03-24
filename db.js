const mongoose = require("mongoose");
require('dotenv').config();

// Define the MongoDB connection  URL

const mongoURL = process.env.MONGODB_URL_LOCAL;
//const mongoURL = process.env.MONGODB_URL;
// Setup MongoDB Connection

mongoose.connect(mongoURL);

// Get the default connection
// Mongose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connected successfully..");
});

db.on("error", (err) => {
  console.log("MongoDB connection error : ".err);
});

db.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});


module.exports = db;