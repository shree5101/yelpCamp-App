const Joi = require("joi");

module.exports.campgroundValidationSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports.reviewValidationSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required(),
  }).required(),
});
