const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

// GET method to get the person data.
router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
