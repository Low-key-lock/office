let mongoose = require("mongoose");
const db = require("./db");
let Bac = null;

// Start connexion with DB and create Bac Model
db.once("open", function () {
  let bacSchema = new mongoose.Schema({
    uid: String,
    name: String,
  });
  Bac = mongoose.model("Bac", bacSchema);
});

// Get all bacs
const getBacs = async (filters) => {
  try {
    const result = await Bac.find(filters);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get an bac by id
const getBacById = async (id) => {
  try {
    const result = await Bac.findOne({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Create an bac
const addBac = async (uid, name) => {
  let bac = new Bac({
    uid,
    name,
  });
  try {
    const result = await bac.save();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update a bac
const setBac = async (id, name) => {
  try {
    const result = await Bac.findOneAndUpdate(
      { uid: id },
      {
        $set: {
          name: name,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete a bac
const deleteBac = async (id) => {
  try {
    const result = await Bac.findOneAndDelete({ uid: id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getBacs,
  getBacById,
  addBac,
  setBac,
  deleteBac,
};
