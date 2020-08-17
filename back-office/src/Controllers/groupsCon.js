const express = require("express");
const router = express.Router();
const repository = require("../Repositories/groupsRep");
const { v1: uuidv1 } = require("uuid");

// Get all groups
router.post("/", async (req, res) => {
  try {
    let filters = req.body;
    let groups = await repository.getGroups(filters);
    res.status(200).send(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get one group
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await repository.getGroupById(id);
    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a group
router.post("/add", async (req, res) => {
  try {
    let uid = uuidv1();
    let bacUid = req.body.bacUid;
    let name = req.body.name;
    let number = req.body.number;
    let color = req.body.color;
    let result = await repository.addGroup(uid, bacUid, name, number, color);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Add Group to Bac
router.put("/bac", async (req, res) => {
  try {
    let id = req.body.uid;
    let bacUid = req.body.bacUid;
    let result = await repository.addGroupToBac(id, bacUid);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a Group
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let bacUid = req.body.bacUid;
    let name = req.body.name;
    let number = req.body.number;
    let color = req.body.color;

    let result = await repository.setGroup(id, bacUid, name, number, color);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a group
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let result = await repository.deleteGroup(id);
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
