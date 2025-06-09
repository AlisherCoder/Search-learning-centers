import Joi from 'joi';

const regionValid = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z]+(?:[A-Za-z0-9-]*\s[A-Za-z0-9-]+)*$/)
    .required(),
});

export default regionValid;
