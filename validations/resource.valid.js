import Joi from "joi";

const resourceValid = Joi.object({
  userId: Joi.number().required(),
  categoryId: Joi.number().required(),
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).max(500),
  media: Joi.string().min(3).max(200),
  image: Joi.string().min(3).max(200).required(),
});

export default resourceValid;
