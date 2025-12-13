const add_Sweet = async (req, res) => {
  return res.status(201).json({
    message: "Sweet added successfully",
  });
};

const get_Sweets = async (req, res) => {
  return res.status(200).json({
    sweets: [],
  });
};

const search_Sweets = async (req, res) => {
  return res.status(200).json({
    sweets: [],
  });
};

const update_Sweet = async (req, res) => {
  return res.status(200).json({
    message: "Sweet updated successfully",
  });
};

const delete_Sweet = async (req, res) => {
  return res.status(200).json({
    message: "Sweet deleted successfully",
  });
};

module.exports = {
  add_Sweet,
  get_Sweets,
  search_Sweets,
  update_Sweet,
  delete_Sweet,
};
