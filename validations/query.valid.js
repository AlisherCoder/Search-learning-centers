import Joi from "joi";

const queryValid = Joi.object({
   name: Joi.string(),
   page: Joi.number().integer().min(1).positive(),
   limit: Joi.number().integer().min(1).max(500).positive(),
   search: Joi.string().trim().max(255),
   min: Joi.number().min(0),
   max: Joi.number().greater(Joi.ref("min")).max(5),
   sortOrder: Joi.string().valid("ASC", "DESC"),
   userId: Joi.number().positive().optional(),
   categoryId: Joi.number().positive().optional(),
});

export default queryValid;
