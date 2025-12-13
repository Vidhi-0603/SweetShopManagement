const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} = require("../services/sweet.service");

const add_Sweet = async (req, res, next) => {
  try {
    const sweet = await createSweet(req.body);
    res.status(201).json({ message: "Sweet added successfully", sweet });
  } catch (err) {
    next(err);
  }
};

const get_Sweets = async (req, res, next) => {
  try {
    const sweets = await getAllSweets();
    res.status(200).json({ sweets });
  } catch (err) {
    next(err);
  }
};

const search_Sweets = async (req, res, next) => {
  try {
    const sweets = await searchSweets(req.query);
    res.status(200).json({ sweets });
  } catch (err) {
    next(err);
  }
};

const update_Sweet = async (req, res, next) => {
  try {
    await updateSweet(req.params.id, req.body);
    res.status(200).json({ message: "Sweet updated successfully" });
  } catch (err) {
    next(err);
  }
};

const delete_Sweet = async (req, res, next) => {
  try {
    await deleteSweet(req.params.id);
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add_Sweet,
  get_Sweets,
  search_Sweets,
  update_Sweet,
  delete_Sweet,
};
