const express = require("express");
const app = express();
const db = require("./db.js");
require('dotenv').config();
const bodyParser = require("body-parser");
const passport = require('./auth');
app.use(bodyParser.json());


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.send("Welcome to our hotel!!!");
})

// Import the router files
const personRoutes = require("./routes/personRoute.js");
const menuRoutes = require("./routes/menuItemRoute.js");

app.use("/person", personRoutes);
app.use("/menu", localAuthMiddleware, menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is listening from port 3000!!!");
});
