const { cookieOptions } = require("../config/cookie.config");
const { registerUser, loginUser } = require("../services/auth.service");

const register_user = async (req, res) => {
  const { username, email, password } = req.body;
  const { token, user } = await registerUser(username, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ message: "User registered successfully"});
};
const login_user = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "User login successfull"});
};
module.exports = { register_user, login_user };