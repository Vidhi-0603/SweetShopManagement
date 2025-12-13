const express = require("express");
const router = express.Router();
const { add_Sweet,get_Sweets,search_Sweets,update_Sweet,delete_Sweet, purchase_Sweet, restock_Sweet} = require("../controller/sweet.controller");
const isAuthenticated = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

router.post("/", isAuthenticated, add_Sweet);
router.get("/", get_Sweets);
router.get("/search", search_Sweets);
router.put("/:id", isAuthenticated, update_Sweet);
router.delete("/:id", isAuthenticated, isAdmin, delete_Sweet);

router.post("/:id/purchase", isAuthenticated, purchase_Sweet);
router.post("/:id/restock", isAuthenticated, isAdmin, restock_Sweet);

module.exports = router;