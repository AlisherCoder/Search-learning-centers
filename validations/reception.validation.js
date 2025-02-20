import Joi from "joi";

export const ReceptionPOST = Joi.object({
   userId: Joi.number().required(),
   filialId: Joi.number().required(),
   majorId: Joi.number().required(),
   visitDate: Joi.date()
});

export const ReceptionPATCH = Joi.object({
   status: Joi.string().valid("pending", "visit", "not visit").required(),
});
