const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// GET method to get the person data.
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched..");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To save data in MongoDB database.

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved");
    const payload = {
      id: response.id,
      username: response.username
    }
    const token = generateToken(payload);
    console.log('The token is:', token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route

router.post('/login', async (req, res) => {
  // Extract username and password fron req.body
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password!!!" });
    }
    // Generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);

    // Rteurn token as response
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Profile Route

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("Userdata:", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// Parameterised API end point

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched!!!");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person not found!!" });
    }
    console.log("Person data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Person

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    console.log("Person Deleted!!!");
    if (!response) {
      res.status(404).json({ error: "Person not found!!" });
    }
    res.status(200).json({ message: "Person deleted successfully!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error!!" });
  }
});

module.exports = router;
