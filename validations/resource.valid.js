import Joi from 'joi';

const resourcePostValid = Joi.object({
  categoryId: Joi.number().required(),
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500),
  media: Joi.string().min(3).max(200),
  image: Joi.string().min(3).max(200).optional(),
});

const resourcePatchValid = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(500),
  media: Joi.string().min(3).max(200),
  image: Joi.string().min(3).max(200),
});

export { resourcePatchValid, resourcePostValid };
