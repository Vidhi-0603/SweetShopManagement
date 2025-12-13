const userModel = require("../models/User.model");

const findUserByEmail = async (email, includePassword = false) => {
  if (includePassword) {
    return await userModel.findOne({ email }).select("+password");
  }

  return await userModel.findOne({ email });
};

module.exports = { findUserByEmail };