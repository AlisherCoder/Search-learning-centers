import Joi from "joi";

const commentValid = Joi.object({
   text: Joi.string().min(3).max(500).required(),
   star: Joi.number().min(0).max(5).required(),
   userId: Joi.number().required(),
   centerId: Joi.number().required(),
});

const commenPatchtValid = Joi.object({
   text: Joi.string().min(3).max(500).required(),
   star: Joi.number().min(0).max(5).required(),
});

export { commentValid, commenPatchtValid };
