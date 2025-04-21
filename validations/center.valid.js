import joi from "joi";

const centerPostValid = joi.object({
   name: joi
      .string()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z']+(?:[A-Za-z0-9'-]*\s[A-Za-z0-9'-]+)*$/)
      .required(),
   regionId: joi.number().positive().required(),
   address: joi.string().required(),
   image: joi.string().required(),
   majorsId: joi.array().items(joi.number().required()).unique().min(1).required(),
   phone: joi
      .string()
      .pattern(/^(?:\+998|998)?\d{9}$/)
      .required(),
});

const centerPatchValid = joi.object({
   name: joi
      .string()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/),
   address: joi.string(),
   image: joi.string(),
   phone: joi.string().pattern(/^(?:\+998|998)?\d{9}$/),
});

const Searchvalid = joi.object({
   name: joi.string(),
   regionId: joi.number().positive(),
   seoId: joi.number().positive(),
   address: joi.string(),
   take: joi.number(),
   page: joi.number(),
   sortOrder: joi.string(),
   sortBy: joi.string(),
});

const Paging = joi.object({
   take: joi.number(),
   page: joi.number(),
});

export { centerPostValid, centerPatchValid, Searchvalid, Paging };
