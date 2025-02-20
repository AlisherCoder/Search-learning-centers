import Joi from "joi";

const categoryValid = Joi.object({
   name: Joi.string()
      .min(2)
      .max(100)
      .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/)
      .required(),
   image: Joi.string().min(2).max(200).required(),
});

export default categoryValid;
