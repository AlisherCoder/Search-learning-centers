import Joi from "joi";

const regionValid = Joi.object({
    name: Joi.string().min(3).max(100).required(),
});

export default regionValid;