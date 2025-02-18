import Joi from "joi";

export const ReceptionPOST = Joi.object({
    userId: Joi.number().required(),
    filialId: Joi.number().required(),
    majorId: Joi.number().required()


});

export const ReceptionPATCH = Joi.object({
    userId: Joi.number().optional(),
    filialId: Joi.number().optional(),
    majorId: Joi.number().optional()
});
