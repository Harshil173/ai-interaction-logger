const Interaction = require("../models/interaction");
const validationSchema = require("../models/interactionValidation");

exports.createInteraction = async (req, res) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const interaction = new Interaction(req.body);
    await interaction.save();
    res.status(201).json(interaction);
  } catch (err) {
    console.error("🔥 Error in POST /interactions:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getInteractions = async (req, res) => {
  try {
    const data = await Interaction.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const interactions = await Interaction.find({ userId: req.params.userId });
    const totalMessages = interactions.length;

    const avgMsgLength =
      totalMessages > 0
        ? interactions.reduce((sum, i) => sum + i.message.length, 0) / totalMessages
        : 0;

    const avgResponseTime =
      totalMessages > 0
        ? interactions.reduce((sum, i) => sum + (i.responseTimestamp - i.timestamp), 0) / totalMessages
        : 0;

    res.json({
      totalMessages,
      avgMsgLength,
      avgResponseTimeMs: avgResponseTime
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
