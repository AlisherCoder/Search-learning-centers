import Joi from "joi";

const categoryValid = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    image: Joi.string().min(3).max(200).required()
});

export default categoryValid;