const mongoose = require("mongoose");

// Define the MongoDB connection  URL

const mongoURL = "mongodb://localhost:27017/hotel";

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