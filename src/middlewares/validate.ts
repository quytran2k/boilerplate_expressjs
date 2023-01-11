import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { pick } from 'lodash';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: unknown) => async (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError('error', errorMessage, 400));
  }
  Object.assign(req, value);
  return next();
};
