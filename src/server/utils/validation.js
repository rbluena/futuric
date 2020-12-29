const Joi = require('joi');

exports.registerValidation = async (data) => {
  const joiSchema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(5),
    type: Joi.string().required(),
  });

  return joiSchema.validateAsync(data);
};
