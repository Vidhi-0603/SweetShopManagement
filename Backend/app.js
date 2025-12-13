const express = require("express");
const app = express();

const authRoutes = require("./src/routes/auth.route");
const sweetRoutes = require("./src/routes/sweets.route");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;