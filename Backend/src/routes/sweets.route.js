const express = require("express");
const router = express.Router();
const { add_Sweet,get_Sweets,search_Sweets,update_Sweet,delete_Sweet} = require("../controller/sweet.controller");
const isAuthenticated = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

router.post("/", isAuthenticated, add_Sweet);
router.get("/",isAuthenticated, get_Sweets);
router.get("/search", isAuthenticated, search_Sweets);
router.put("/:id", isAuthenticated, update_Sweet);
router.delete("/:id", isAuthenticated, isAdmin, delete_Sweet);

module.exports = router;