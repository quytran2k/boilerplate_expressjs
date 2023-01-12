import express from 'express';
import jwt from 'jsonwebtoken';
import { validate } from '../../../middlewares/validate';
import { ApiError } from '../../../utils/ApiError';
import { comparePassword } from '../../../utils/encryption';
import { handleExceptionResponse } from '../../../utils/system';
import { authValidation } from '../../../validations';
import checkUserExist from '../utils/checkUserExist';
import { AuthService } from './auth.service';
const AuthController = express.Router();
const controller = [AuthController];
const prefix = 'auth';
const authService = new AuthService();

AuthController.post('/signup', validate(authValidation.registerValidation), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExist = await checkUserExist({ email });
    if (userExist) throw new ApiError('exist user', 'user exist', 400);

    const newUser = await authService.signUpUser({ name, email, password });

    res.json(newUser);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

AuthController.post('/login', validate(authValidation.loginValidation), async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await checkUserExist({ email });
    if (!userExist) throw new ApiError('Not found', `Don't found user with email: ${email}`, 404);

    const getPassword = await authService.getPassword(email);
    const checkPasswordValid = await comparePassword(password, getPassword || '');
    if (!checkPasswordValid) throw new ApiError('Passwords do not match', 'Passwords do not match', 400);

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_JWT_SECRET || '', { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_JWT_SECRET || '', { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

AuthController.post('/refresh', async (req, res) => {
  try {
    res.json('refreshToken');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});
export { controller, prefix };
