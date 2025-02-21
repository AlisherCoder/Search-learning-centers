import Joi from "joi";

const commentPostValid = Joi.object({
   text: Joi.string().min(3).max(500).required(),
   star: Joi.number().min(0).max(5).required(),
   centerId: Joi.number().required(),
});

const commentPatchtValid = Joi.object({
   text: Joi.string().min(3).max(500).required(),
   star: Joi.number().min(0).max(5).required(),
   centerId: Joi.number().optional()
});

export { commentPostValid, commentPatchtValid };
