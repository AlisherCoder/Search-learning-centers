import Joi from "joi";

export const LikedsPOST = Joi.object({
    centerId: Joi.number().required(),
    
});