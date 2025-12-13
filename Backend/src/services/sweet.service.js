const { mongoose } = require("mongoose");
const Sweet = require("../models/Sweets.model");

const createSweet = async ({ name, category, price, quantity }) => {
  if (!name || !category || price == null || quantity == null) {
    throw new Error("Invalid sweet data");
  }

  return await Sweet.create({
    name,
    category,
    price,
    quantity,
  });
};

const getAllSweets = async () => {
  return await Sweet.find().lean();
};

const searchSweets = async (filters = {}) => {
  const query = {};

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  return await Sweet.find(query).lean();
};

const updateSweet = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid sweet id");
  }

  const updatedSweet = await Sweet.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedSweet) {
    throw new Error("Sweet not found");
  }

  return updatedSweet;
};

const deleteSweet = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid sweet id");
  }

  const deletedSweet = await Sweet.findByIdAndDelete(id);

  if (!deletedSweet) {
    throw new Error("Sweet not found");
  }

  return deletedSweet;
};

const purchaseSweet = async (id, qty) => {
  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error("Sweet not found");

    if (sweet.quantity < qty) {
      throw new Error("Insufficient stock");
    }
    sweet.quantity -= qty;
    await sweet.save();

    return sweet;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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