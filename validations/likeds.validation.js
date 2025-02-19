import Joi from "joi";

export const LikedsPOST = Joi.object({
    userId: Joi.number().required(),
    centerId: Joi.number().required()


});

export const LikedsPATCH = Joi.object({
    userId: Joi.number().optional(),
    centerId: Joi.number().optional(),
});
