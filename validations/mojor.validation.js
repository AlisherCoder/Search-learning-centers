import Joi from "joi";

export const MojorPOST = Joi.object({
    name: Joi.string().max(15).min(2).required(),
    image: Joi.string().required(),
    fieldId: Joi.number().optional(),
    subjectId: Joi.number().optional(),
});

export const MojorPATCH = Joi.object({
    name: Joi.string().max(15).min(2).optional(),
    image: Joi.string().optional(),
    fieldId: Joi.number().optional(),
    subjectId: Joi.number().optional(),
});
