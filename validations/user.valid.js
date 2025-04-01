import joi from "joi";

const passwordValid = joi.object({
   newPassword: joi.string().min(6).max(16).required(),
});

const createAdminValid = joi.object({
   userId: joi.number().required(),
});

const userRegValid = joi.object({
   firstName: joi
      .string()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z]+$/)
      .required(),
   lastName: joi
      .string()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z]+$/)
      .required(),
   email: joi.string().email().required(),
   phone: joi
      .string()
      .pattern(/^(?:\+998|998)?\d{9}$/)
      .required(),
   role: joi.string().valid("USER", "CEO").required(),
   password: joi.string().min(6).max(16).required(),
   image: joi.string().optional(),
});

const userPatchValid = joi.object({
   firstName: joi
      .string()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z]+$/),
   lastName: joi
      .string()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z]+$/),
   phone: joi.string().pattern(/^(?:\+998|998)?\d{9}$/),
   image: joi.string().optional(),
   isActive: joi.boolean(),
});

const SearchValid = joi.object({
   firstName: joi.string(),
   lastName: joi.string(),
   email: joi.string(),
   phone: joi.string(),
   role: joi.string(),
   isActive: joi.boolean(),
   take: joi.number(),
   page: joi.number(),
   sortOrder: joi.string(),
   sortBy: joi.string(),
});

export { userRegValid, userPatchValid, SearchValid, passwordValid, createAdminValid };
