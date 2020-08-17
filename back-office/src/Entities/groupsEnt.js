let mongoose = require("mongoose");
const db = require("./db");
let Group = null;

// Start connexion with DB and create Group Model
db.once("open", function () {
  let groupSchema = new mongoose.Schema({
    uid: String,
    bacUid: Array,
    name: String,
    number: Number,
    color: String,
  });
  Group = mongoose.model("Group", groupSchema);
});

// Get all groups
const getGroups = async (filters) => {
  try {
    const result = await Group.find(filters);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get an group by id
const getGroupById = async (id) => {
  try {
    const result = await Group.findOne({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Create an group
const addGroup = async (uid, bacUid, name, number, color) => {
  let group = new Group({
    uid,
    bacUid,
    name,
    number,
    color,
  });
  try {
    const result = await group.save();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Add group to Bac
const addGroupToBac = async (id, bacUid) => {
  try {
    const result = await Group.findOneAndUpdate(
      { uid: id },
      {
        $set: {
          bacUid: bacUid,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update a group
const setGroup = async (id, bacUid, name, number, color) => {
  try {
    const result = await Group.findOneAndUpdate(
      { uid: id },
      {
        $set: {
          bacUid: bacUid,
          name: name,
          number: number,
          color: color,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete a group
const deleteGroup = async (id) => {
  try {
    const result = await Group.findOneAndDelete({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getGroups,
  getGroupById,
  addGroup,
  addGroupToBac,
  setGroup,
  deleteGroup,
};
