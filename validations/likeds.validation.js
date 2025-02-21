import Joi from "joi";

export const LikedsPOST = Joi.object({
    userId: Joi.number().required(),
    centerId: Joi.number().required()
});