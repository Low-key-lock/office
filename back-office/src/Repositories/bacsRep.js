const entity = require("../Entities/bacsEnt");

const EXIST = 2000;
const NOT_EXIST = 2001;

const getError = (code, message) => {
  return { error: { from: "BacsRep", code, message } };
};

// Get all bacs
const getBacs = async (filters) => {
  let bacs = await entity.getBacs(filters);
  return bacs;
};

// Get a bac by Id
const getBacById = async (id) => {
  let bac = await entity.getBacById(id);
  if (!bac) return getError(NOT_EXIST, `Bac ${id} does NOT exist.`);
  return bac;
};

// Create a bac
const addBac = async (uid, name) => {
  let bacId = await entity.getBacs({ uid: uid });
  if (bacId.length > 0) return getError(EXIST, `Bac ${uid} already exists.`);
  let bac = await entity.getBacs({ name: name });
  if (bac.length > 0) {
    return getError(EXIST, `Bac ${name} already exists.`);
  } else {
    let result = await entity.addBac(uid, name);
    return result;
  }
};

// Update a bac
const setBac = async (id, name) => {
  let bac = await getBacById(id);
  if (bac.error) return bac;

  if (name !== bac.name) {
    let bacs = await entity.getBacs({ name: name });
    if (bacs.length > 0) return getError(EXIST, `Bac ${name} already exists.`);
  }
  let result = await entity.setBac(id, name);
  return result;
};

// Delete Bac
const deleteBac = async (id) => {
  let bac = await getBacById(id);
  if (bac.error) return bac;

  if (!bac) return getError(NOT_EXIST, `Bac ${id} DOES not exists.`);
  let result = await entity.deleteBac(id);
  return result;
};

module.exports = {
  getBacs,
  getBacById,
  addBac,
  setBac,
  deleteBac,
};
