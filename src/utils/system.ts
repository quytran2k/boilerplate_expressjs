import { Response } from 'express';
import { errors } from '../constants/errors.constant';
import { ApiError } from './ApiError';

const jsonSuccess = (result = null) => {
  return { success: true, result };
};

const jsonError = (err: unknown) => {
  if (err instanceof ApiError) return { success: false, errors: err.errors, statusCode: err.statusCode };
  return { success: false, errors: err, statusCode: 500 };
};

/**
 * Exception handler in catch controller
 * @param {Object} res response
 * @param {any} error error
 */
const handleExceptionResponse = (res: Response, err: string | unknown) => {
  if (err instanceof ApiError) {
    if (err.message) res.statusMessage = err?.message;
    return res.status(err.statusCode).json(jsonError(err));
  }
  return res.json(jsonError(err));
};

export { errors, jsonSuccess, jsonError, handleExceptionResponse };
