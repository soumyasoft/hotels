const express = require("express");
const app = express();
const db = require("./db.js");
require('dotenv').config();

const MenuItem = require("./models/Menu.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the router files
const personRoutes = require("./routes/personRoute.js");
const menuRoutes = require("./routes/menuItemRoute.js");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is listening from port 3000!!!");
});
