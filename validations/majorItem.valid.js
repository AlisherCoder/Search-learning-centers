import joi from "joi";

const majorItemValid = joi.object({
   centerId: joi.number().positive().required(),
   majorItems: joi
      .array()
      .items(joi.number().required())
      .unique()
      .min(1)
      .required(),
});

export default majorItemValid;
