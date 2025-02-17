import Joi from "joi";

const queryValid = Joi.object({
    name: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(500),
    search: Joi.string().trim().max(255),
    priceMin: Joi.number().min(0),
    priceMax: Joi.number().greater(Joi.ref('priceMin'))
});

export default queryValid;