const express = require("express");
const app = express();
const authRoutes = require("./src/routes/auth.route");

app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;