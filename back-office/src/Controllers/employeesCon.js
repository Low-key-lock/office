const express = require("express");
const router = express.Router();
const repository = require("../Repositories/employeesRep");
const { v1: uuidv1 } = require("uuid");

// Get all employees
router.post("/", async (req, res) => {
  try {
    let filters = req.body;
    let employees = await repository.getEmployees(filters);
    res.status(200).send(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get one employee
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await repository.getEmployeeById(id);
    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create an employee
router.post("/add", async (req, res) => {
  try {
    let uid = uuidv1();
    let name = req.body.name;
    let photo = req.body.photo;
    let color = req.body.color;
    let groupUid = req.body.groupUid;
    let result = await repository.addEmployee(
      uid,
      name,
      photo,
      color,
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

// Update an Employee
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    let photo = req.body.photo;
    let color = req.body.color;
    let groupUid = req.body.groupUid;

    let result = await repository.setEmployee(id, name, photo, color, groupUid);

    if (result && result.error) {
      return res.status(400).send(result);
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let result = await repository.deleteEmployee(id);
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
