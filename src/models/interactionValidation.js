const Joi = require("joi");

const interactionValidationSchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().required(),
  aiResponse: Joi.string().required(),
  timestamp: Joi.date().required(),
  responseTimestamp: Joi.date().required()
});

module.exports = interactionValidationSchema;