const express = require("express");
const app = express();

const authRoutes = require("./src/routes/auth.route");
const sweetRoutes = require("./src/routes/sweets.route");
const errorHandler = require("./src/middleware/error.middleware");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.use(errorHandler);

module.exports = app;