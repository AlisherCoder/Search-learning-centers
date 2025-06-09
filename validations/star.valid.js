import Joi from 'joi';

const starValid = Joi.object({
  minStar: Joi.number().min(0).max(5).default(0), // minStar uchun validatsiya
  maxStar: Joi.number().min(Joi.ref('minStar')).max(5).default(5), // maxStar uchun validatsiya
});

export default starValid;
