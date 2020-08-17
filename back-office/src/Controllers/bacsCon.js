const express = require("express");
const router = express.Router();
const repository = require("../Repositories/bacsRep");
const { v1: uuidv1 } = require("uuid");

// Get all bacs
router.post("/", async (req, res) => {
  try {
    let filters = req.body;
    let bacs = await repository.getBacs(filters);
    res.status(200).send(bacs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get one bac
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await repository.getBacById(id);
    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a bac
router.post("/add", async (req, res) => {
  try {
    let uid = uuidv1();
    let name = req.body.name;

    let result = await repository.addBac(uid, name);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a Bac
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;

    let result = await repository.setBac(id, name);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a bac
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let result = await repository.deleteBac(id);
    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
