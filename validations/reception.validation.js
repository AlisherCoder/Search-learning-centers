import Joi from 'joi';

export const ReceptionPOST = Joi.object({
  centerId: Joi.number().required(),
  filialId: Joi.number().optional(),
  majorId: Joi.number().required(),
  visitDate: Joi.date().required(),
});

export const ReceptionPATCH = Joi.object({
  status: Joi.string().valid('PENDING', 'VISIT', 'NOT VISIT').required(),
});
