import joi from "joi";

const centerPostValid = joi.object({
   name: joi.string().min(2).max(20).required(),
   regionId: joi.number().positive().required(),
   address: joi.string().required(),
   seoId: joi.number().positive().required(),
   image: joi.string().required(),
   majorsId: joi.array().required(),
   phone: joi
      .string()
      .pattern(/^(?:\+998|998)?\d{9}$/)
      .required(),
});

const centerPatchValid = joi.object({
   name: joi.string().min(2).max(20),
   regionId: joi.number().positive(),
   address: joi.string(),
   seoId: joi.number().positive(),
   image: joi.string(),
   majorsId: joi.array(),
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
export { centerPostValid, centerPatchValid, Searchvalid };
