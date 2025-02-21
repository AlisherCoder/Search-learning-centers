import Joi from "joi";

export const MojorPOST = Joi.object({
   name: Joi.string()
      .max(30)
      .min(2)
      .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/)
      .required(),
   image: Joi.string().required(),
   fieldId: Joi.number().optional(),
   subjectId: Joi.number().optional(),
});

export const MojorPATCH = Joi.object({
   name: Joi.string().max(30).min(2).optional(),
   image: Joi.string().optional(),
});
