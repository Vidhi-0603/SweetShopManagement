const Sweet = require("../models/Sweets.model");

const createSweet = async ({ name, category, price, quantity }) => {
  return Sweet.create({ name, category, price, quantity });
};

const getAllSweets = async () => {
  return Sweet.find();
};

const searchSweets = async (filters) => {
  const query = {};

  if (filters.name) query.name = filters.name;
  if (filters.category) query.category = filters.category;
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  return Sweet.find(query);
};

const updateSweet = async (id, data) => {
  return Sweet.findByIdAndUpdate(id, data, { new: true });
};

const deleteSweet = async (id) => {
  return Sweet.findByIdAndDelete(id);
};

const purchaseSweet = async (id, qty) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.quantity -= qty;
  await sweet.save();

  return sweet;
};

const restockSweet = async (id, qty) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error("Sweet not found");

  sweet.quantity += qty;
  await sweet.save();

  return sweet;
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};
