const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/Menu");

// Get Menus from mongo DB

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched..");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Save Menu Item data in Mongo DB

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Tate data fetched!!");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Taste type is not found!!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
