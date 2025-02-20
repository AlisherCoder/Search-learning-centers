import Joi from "joi";

const resourceValid = Joi.object({
   name: Joi.string().min(3).max(100).required(),
   description: Joi.string().min(3).max(500),
   media: Joi.string().min(3).max(200),
   image: Joi.string().min(3).max(200).required(),
});

const resourcePatchValid = Joi.object({
   name: Joi.string().min(3).max(100),
   description: Joi.string().min(3).max(500),
   media: Joi.string().min(3).max(200),
   image: Joi.string().min(3).max(200),
});

export {resourceValid, resourcePatchValid};
