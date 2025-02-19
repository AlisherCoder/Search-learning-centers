import joi from "joi";

const majorItemValid = joi.object({
   majorItems: joi.array().required(),
});

export default majorItemValid;
