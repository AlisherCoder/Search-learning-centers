import Joi from "joi";

const queryValid = Joi.object({
    name: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(500),
    search: Joi.string().trim().max(255),
    priceMin: Joi.number().min(0),
    priceMax: Joi.number().greater(Joi.ref('priceMin')),
    min: Joi.number().min(0),
    max: Joi.number().greater(Joi.ref('min')).max(5),
    sortOrder: Joi.string().valid("ASC", "DESC")
});

export default queryValid;