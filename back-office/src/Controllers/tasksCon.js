const express = require("express");
const router = express.Router();
const repository = require("../Repositories/tasksRep");
const { v1: uuidv1 } = require("uuid");

// Get tasks by group
router.post("/group", async (req, res) => {
  try {
    let filters = req.body;
    let tasks = await repository.getTasksByGroup(filters);
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get tasks by employee
router.post("/employee", async (req, res) => {
  try {
    let filters = req.body;
    let tasks = await repository.getTasksByEmployee(filters);
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get one task
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await repository.getTaskById(id);
    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a task
router.post("/add", async (req, res) => {
  try {
    let uid = uuidv1();
    let name = req.body.name;
    let letter = req.body.letter;
    let employeeUid = req.body.employeeUid;
    let groupUid = req.body.groupUid;
    let result = await repository.addTask(
      uid,
      name,
      letter,
      employeeUid,
      groupUid
    );

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a Task
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let letter = req.body.letter;
    let employeeUid = req.body.employeeUid;
    let groupUid = req.body.groupUid;

    let result = await repository.setTask(
      id,
      name,
      letter,
      employeeUid,
      groupUid
    );

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let result = await repository.deleteTask(id);
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
