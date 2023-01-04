import { Response } from 'express';
import { errors } from '../constants/errors.constant';
import { ApiError } from './ApiError';

const jsonSuccess = (result = null) => {
  return { success: true, result };
};

const jsonError = (err: string) => {
  return { success: false, err };
};

/**
 * Exception handler in catch controller
 * @param {Object} res response
 * @param {any} error error
 */
const handleExceptionResponse = (res: Response, err: string | unknown) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.errors);
  }
  return res.json(jsonError(err as string));
};

export { errors, jsonSuccess, jsonError, handleExceptionResponse };
