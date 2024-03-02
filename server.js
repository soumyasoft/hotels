const express = require("express");
const app = express();
const db = require("./db.js");

const MenuItem = require("./models/Menu.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the router files
const personRoutes = require("./routes/personRoute.js");
const menuRoutes = require("./routes/menuItemRoute.js");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("Server is listening from port 3000!!!");
});
