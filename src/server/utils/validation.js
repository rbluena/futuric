const Joi = require('joi');

exports.registerValidation = async (data) => {
  const joiSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(5).required(),
    type: Joi.string(),
  });

  return joiSchema.validateAsync(data);
};
