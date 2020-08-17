let mongoose = require("mongoose");
const db = require("./db");
let Task = null;

// Start connexion with DB and create Task Model
db.once("open", function () {
  let taskSchema = new mongoose.Schema({
    uid: String,
    name: String,
    letter: String,
    employeeUid: Array,
    groupUid: String,
  });
  Task = mongoose.model("Task", taskSchema);
});

// Get tasks by group
const getTasksByGroup = async (filters) => {
  try {
    const result = await Task.find(filters);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get tasks by employee
const getTasksByEmployee = async (filters) => {
  try {
    const result = await Task.find(filters);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get an task by id
const getTaskById = async (id) => {
  try {
    const result = await Task.findOne({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Create an task
const addTask = async (uid, name, letter, employeeUid, groupUid) => {
  let task = new Task({
    uid,
    name,
    letter,
    employeeUid,
    groupUid,
  });
  try {
    const result = await task.save();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update a task
const setTask = async (id, name, letter, employeeUid, groupUid) => {
  try {
    const result = await Task.findOneAndUpdate(
      { uid: id },
      {
        $set: {
          name: name,
          letter: letter,
          employeeUid: employeeUid,
          groupUid: groupUid,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    const result = await Task.findOneAndDelete({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getTasksByGroup,
  getTasksByEmployee,
  getTaskById,
  addTask,
  setTask,
  deleteTask,
};
