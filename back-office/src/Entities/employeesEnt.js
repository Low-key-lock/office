let mongoose = require("mongoose");
const db = require("./db");
let Employee = null;

// Start connexion with DB and create Employee Model
db.once("open", function () {
  let employeeSchema = new mongoose.Schema({
    uid: String,
    name: String,
    photo: String,
    color: String,
    groupUid: String,
  });
  Employee = mongoose.model("Employee", employeeSchema);
});

// Get all employees
const getEmployees = async (filters) => {
  try {
    const result = await Employee.find(filters);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get an employee by id
const getEmployeeById = async (id) => {
  try {
    const result = await Employee.findOne({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Create an employee
const addEmployee = async (uid, name, photo, color, groupUid) => {
  let employee = new Employee({
    uid,
    name,
    photo,
    color,
    groupUid,
  });
  try {
    const result = await employee.save();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update an employee
const setEmployee = async (id, name, photo, color, groupUid) => {
  try {
    const result = await Employee.findOneAndUpdate(
      { uid: id },
      {
        $set: {
          name: name,
          photo: photo,
          color: color,
          groupUid: groupUid,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete an employee
const deleteEmployee = async (id) => {
  try {
    const result = await Employee.findOneAndDelete({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  setEmployee,
  deleteEmployee,
};
