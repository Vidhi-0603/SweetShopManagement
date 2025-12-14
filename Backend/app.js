const express = require("express");
const app = express();

const authRoutes = require("./src/routes/auth.route");
const sweetRoutes = require("./src/routes/sweets.route");
const errorHandler = require("./src/middleware/error.middleware");
const cookieparser = require("cookie-parser");
app.use(cookieparser());

const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.use(errorHandler);

module.exports = app;