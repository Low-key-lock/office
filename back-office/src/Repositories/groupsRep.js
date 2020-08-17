const entity = require("../Entities/groupsEnt");

const EXIST = 2000;
const NOT_EXIST = 2001;

const getError = (code, message) => {
  return { error: { from: "GroupsRep", code, message } };
};

// Get all groups
const getGroups = async (filters) => {
  let groups = await entity.getGroups(filters);
  return groups;
};

// Get a group by Id
const getGroupById = async (id) => {
  let group = await entity.getGroupById(id);
  if (!group) return getError(NOT_EXIST, `Group ${id} does NOT exist.`);
  return group;
};

// Create a group
const addGroup = async (uid, bacUid, name, number, color) => {
  let groupId = await entity.getGroups({ uid: uid });
  if (groupId.length > 0)
    return getError(EXIST, `Group ${uid} already exists.`);
  let groupNumber = await entity.getGroups({ number: number });
  if (groupNumber.length > 0)
    return getError(EXIST, `Group ${number} already exists.`);
  let groupName = await entity.getGroups({ name: name });
  if (groupName.length > 0) {
    return getError(EXIST, `Group ${name} already exists.`);
  } else {
    let result = await entity.addGroup(uid, bacUid, name, number, color);
    return result;
  }
};

// Add group to bac
const addGroupToBac = async (id, bacUid) => {
  let group = await getGroupById(id);
  if (group.error) return group;

  // let groupBacId = await entity.getGroups({ bacUid: bacUid });
  // if (groupBacId.length > 0)
  //   return getError(EXIST, `Group already in ${bacUid} bac.`);
  let result = await entity.addGroupToBac(id, bacUid);
  return result;
};

// Update a group
const setGroup = async (id, bacUid, name, number, color) => {
  let group = await getGroupById(id);
  if (group.error) return group;

  if (name !== group.name) {
    let groups = await entity.getGroups({ name: name });
    if (groups.length > 0)
      return getError(EXIST, `Group ${name} already exists.`);
  }
  let result = await entity.setGroup(id, bacUid, name, number, color);
  return result;
};

// Delete Group
const deleteGroup = async (id) => {
  let group = await getGroupById(id);
  if (group.error) return group;

  if (!group) return getError(NOT_EXIST, `Group ${id} DOES not exists.`);
  let result = await entity.deleteGroup(id);
  return result;
};

module.exports = {
  getGroups,
  getGroupById,
  addGroup,
  addGroupToBac,
  setGroup,
  deleteGroup,
};
