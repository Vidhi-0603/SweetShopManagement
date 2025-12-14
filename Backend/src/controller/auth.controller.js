const { cookieOptions } = require("../config/cookie.config");
const { registerUser, loginUser } = require("../services/auth.service");

const register_user = async (req, res, next) => {
  try {
    console.log("REGISTER HIT");

    const { username, email, password, role } = req.body;
    const { token, user } = await registerUser(username, email, password, role);
    console.log("token", token);
    
    res.cookie("accessToken", token, cookieOptions);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error); // 👈 VERY IMPORTANT
  }
};

const login_user = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({
      message: "User login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register_user, login_user };