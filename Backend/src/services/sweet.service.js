const Sweet = require("../models/Sweets.model");

const createSweet = async (data) => {
  return await Sweet.create(data);
};

const getAllSweets = async () => {
  return await Sweet.find();
};

const searchSweets = async (query) => {
  return await Sweet.find(query);
};

const updateSweet = async (id, data) => {
  return await Sweet.findByIdAndUpdate(id, data, { new: true });
};

const deleteSweet = async (id) => {
  return await Sweet.findByIdAndDelete(id);
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
};
