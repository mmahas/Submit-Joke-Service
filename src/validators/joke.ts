import Joi from "joi";

const jokeValidationPost = Joi.object({
  content: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.string(),
});

const jokeValidationPatch = Joi.object({
  content: Joi.string().optional(),
  type: Joi.string().optional(),
  status: Joi.optional(),
});

export {jokeValidationPost, jokeValidationPatch};
