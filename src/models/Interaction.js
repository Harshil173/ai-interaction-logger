const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, required: true },
  responseTimestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Interaction", interactionSchema);