import joi from "joi";

const filialPostValid = joi.object({
   name: joi.string().min(2).required(),
   phone: joi
      .string()
      .pattern(/^(?:\+998|998)?\d{9}$/)
      .required(),
   regionId: joi.number().positive().required(),
   centerId: joi.number().positive().required(),
   address: joi.string().required(),
   image: joi.string().required(),
});

const filialPatchValid = joi.object({
   name: joi.string().min(2),
   phone: joi.string().pattern(/^(?:\+998|998)?\d{9}$/),
   regionId: joi.number().positive(),
   centerId: joi.number().positive(),
   address: joi.string(),
   image: joi.string(),
});

const SearchValid = joi.object({
   name: joi.string(),
   phone: joi.string(),
   regionId: joi.number(),
   centerId: joi.number(),
   address: joi.string(),
   take: joi.number(),
   page: joi.number(),
   sortOrder: joi.string(),
   sortBy: joi.string(),
});

export { filialPatchValid, filialPostValid, SearchValid };
