const express = require("express");
const router = express.Router();
const controller = require("../controller/sweet.controller");

router.post("/", controller.add_Sweet);
router.get("/", controller.get_Sweets);
router.get("/search", controller.search_Sweets);
router.put("/:id", controller.update_Sweet);
router.delete("/:id", controller.delete_Sweet);

module.exports = router;