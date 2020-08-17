const entity = require("../Entities/tasksEnt");

const EXIST = 2000;
const NOT_EXIST = 2001;

const getError = (code, message) => {
  return { error: { from: "TaskssRep", code, message } };
};

// Get tasks by group
const getTasksByGroup = async (filters) => {
  let tasks = await entity.getTasksByGroup(filters);
  return tasks;
};

// Get tasks by employee
const getTasksByEmployee = async (filters) => {
  let tasks = await entity.getTasksByEmployee(filters);
  return tasks;
};

// Get a task by Id
const getTaskById = async (id) => {
  let task = await entity.getTaskById(id);
  if (!task) return getError(NOT_EXIST, `Task ${id} does NOT exist.`);
  return task;
};

// Create a task
const addTask = async (uid, name, letter, employeeUid, groupUid) => {
  let taskId = await entity.getTasksByGroup({ uid: uid });
  if (taskId.length > 0) return getError(EXIST, `Task ${uid} already exists.`);
  let taskLetter = await entity.getTasksByGroup({ letter: letter });
  if (taskLetter.length > 0)
    return getError(EXIST, `Task ${number} already exists.`);
  let taskName = await entity.getTasksByGroup({ name: name });
  if (taskName.length > 0) {
    return getError(EXIST, `Task ${name} already exists.`);
  } else {
    let result = await entity.addTask(uid, name, letter, employeeUid, groupUid);
    return result;
  }
};

// Update a task
const setTask = async (id, name, letter, employeeUid, groupUid) => {
  let task = await getTaskById(id);
  if (task.error) return task;

  if (name !== task.name) {
    let tasks = await entity.getTasksByGroup({ name: name });
    if (tasks.length > 0)
      return getError(EXIST, `Task ${name} already exists.`);
  }
  let result = await entity.setTask(id, name, letter, employeeUid, groupUid);
  return result;
};

// Delete task
const deleteTask = async (id) => {
  let task = await getTaskById(id);
  if (task.error) return task;

  if (!task) return getError(NOT_EXIST, `Task ${id} DOES not exists.`);
  let result = await entity.deleteTask(id);
  return result;
};

module.exports = {
  getTasksByGroup,
  getTasksByEmployee,
  getTaskById,
  addTask,
  setTask,
  deleteTask,
};
