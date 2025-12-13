const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} = require("../services/sweet.service");

const add_Sweet = async (req, res) => {
  const sweet = await createSweet(req.body);
  res.status(201).json(sweet);
};

const get_Sweets = async (req, res) => {
  const sweets = await getAllSweets();
  res.status(200).json({ sweets });
};

const search_Sweets = async (req, res) => {
  const sweets = await searchSweets(req.query);
  res.status(200).json({ sweets });
};

const update_Sweet = async (req, res) => {
  const sweet = await updateSweet(req.params.id, req.body);
  res.status(200).json(sweet);
};

const delete_Sweet = async (req, res) => {
  await deleteSweet(req.params.id);
  res.status(200).json({ message: "Sweet deleted successfully" });
};

module.exports = {
  add_Sweet,
  get_Sweets,
  search_Sweets,
  update_Sweet,
  delete_Sweet,
};