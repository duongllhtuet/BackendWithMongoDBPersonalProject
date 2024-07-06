const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/courseController");

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.put("/:id", courseController.update);
router.get("/:id/edit", courseController.edit);
router.get("/:slug", courseController.show);

module.exports = router;
