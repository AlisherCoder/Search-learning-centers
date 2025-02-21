import Joi from "joi";

const likeValid = Joi.object({
   pageLike: Joi.number().integer().min(1).positive(),
   limitLike: Joi.number().integer().min(1).max(500).positive(),
   sortOrder: Joi.string().valid("ASC", "DESC"),
});

export default likeValid;
