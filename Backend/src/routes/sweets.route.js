const express = require("express");
const router = express.Router();
const { add_Sweet,get_Sweets,search_Sweets,update_Sweet,delete_Sweet} = require("../controller/sweet.controller");

router.post("/", add_Sweet);
router.get("/", get_Sweets);
router.get("/search", search_Sweets);
router.put("/:id", update_Sweet);
router.delete("/:id", delete_Sweet);

module.exports = router;