import Joi from 'joi';
import { password } from './custom.validation';

export const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({ 'string.email': 'Email is invalid' }),
    password: Joi.string().required().custom(password),
  }),
};

export const registerValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};
