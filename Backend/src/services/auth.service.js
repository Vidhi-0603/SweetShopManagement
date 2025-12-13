const { findUserByEmail } = require("../dao/findUser");
const bcrypt = require("bcrypt");
const { getJWTToken } = require("../utils/jwtToken.util");
const userModel = require("../models/User.model");

const registerUser = async (username, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new Error("User already exists");

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const new_user = new userModel({
    username,
    email,
    password: hashedPassword,
  });
  await new_user.save();

  const token = getJWTToken({ id: new_user._id });

  return {
    token,
    user: {
      id: new_user._id,
      username: new_user.username,
      email: new_user.email,
    },
  };
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email, true);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = getJWTToken({ id: user._id });
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  };
};

module.exports = { registerUser, loginUser };