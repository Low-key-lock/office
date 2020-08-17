const entity = require("../Entities/employeesEnt");

const EXIST = 2000;
const NOT_EXIST = 2001;

const getError = (code, message) => {
  return { error: { from: "EmployeesRep", code, message } };
};

// Get all employees
const getEmployees = async (filters) => {
  let employees = await entity.getEmployees(filters);
  return employees;
};

// Get an employee by Id
const getEmployeeById = async (id) => {
  let employee = await entity.getEmployeeById(id);
  if (!employee) return getError(NOT_EXIST, `Employee ${id} does NOT exist.`);
  return employee;
};

// Create an employee
const addEmployee = async (uid, name, photo, color, groupUid) => {
  let employeeId = await entity.getEmployees({ uid: uid });
  if (employeeId.length > 0)
    return getError(EXIST, `Employee ${uid} already exists.`);
  let employeeName = await entity.getEmployees({ name: name });
  if (employeeName.length > 0) {
    return getError(EXIST, `Employee ${name} already exists.`);
  } else {
    let result = await entity.addEmployee(uid, name, photo, color, groupUid);
    return result;
  }
};

// Update an employee
const setEmployee = async (id, name, photo, color, groupUid) => {
  let employee = await getEmployeeById(id);
  if (employee.error) return employee;

  if (name !== employee.name) {
    let employees = await entity.getEmployees({ name: name });
    if (employees.length > 0)
      return getError(EXIST, `Employee ${name} already exists.`);
  }
  let result = await entity.setEmployee(id, name, photo, color, groupUid);
  return result;
};

// Delete Employee
const deleteEmployee = async (id) => {
  let employee = await getEmployeeById(id);
  if (employee.error) return employee;

  if (!employee) return getError(NOT_EXIST, `Employee${id} DOES not exists.`);
  let result = await entity.deleteEmployee(id);
  return result;
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  setEmployee,
  deleteEmployee,
};
