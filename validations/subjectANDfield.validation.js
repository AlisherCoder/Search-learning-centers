import Joi from "joi";

export const ValidationPOST = Joi.object({
   name: Joi.string()
      .max(15)
      .min(2)
      .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/)
      .required(),
   image: Joi.string().required(),
});

export const ValidationPATCH = Joi.object({
   name: Joi.string()
      .max(15)
      .min(2)
      .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/)
      .optional(),
   image: Joi.string().optional(),
});
