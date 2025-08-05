const express = require("express");
const router = express.Router();
const controller = require("../controllers/interactionController");

router.post("/interactions", controller.createInteraction);
router.get("/interactions/:userId", controller.getInteractions);
router.get("/stats/:userId", controller.getStats);

module.exports = router;