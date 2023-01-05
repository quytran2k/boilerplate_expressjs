import { check } from 'express-validator';
const EMAIL_IS_EMPTY = 'EMAIL_IS_EMPTY';
const PASSWORD_IS_EMPTY = 'PASSWORD_IS_EMPTY';
const PASSWORD_LENGTH_MUST_BE_MORE_THAN_8 = 'PASSWORD_LENGTH_MUST_BE_MORE_THAN_8';
const EMAIL_IS_IN_WRONG_FORMAT = 'EMAIL_IS_IN_WRONG_FORMAT';

export const registerValidation = [
  check('email').exists().withMessage(EMAIL_IS_EMPTY).isEmail().withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('password').exists().withMessage(PASSWORD_IS_EMPTY).isLength({ min: 8 }).withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
export const loginValidation = [
  check('email').exists().withMessage(EMAIL_IS_EMPTY).isEmail().withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('password').exists().withMessage(PASSWORD_IS_EMPTY).isLength({ min: 8 }).withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
