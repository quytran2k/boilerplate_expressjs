import express from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../../utils/ApiError';
import { comparePassword, hashPassword } from '../../../utils/encryption';
import { handleExceptionResponse } from '../../../utils/system';
import { AuthService } from './auth.service';
const AuthController = express.Router();
const controller = [AuthController];
const prefix = 'auth';
const authService = new AuthService();

AuthController.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // valid username, password missing
    const generatePassword = await hashPassword(password);

    if (!generatePassword) throw new ApiError('Can not hash password', 'Hash password fail', 400);

    await authService.newUser({ name: 'qt', email, password: generatePassword });

    res.json('success');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

AuthController.post('/login', async (req, res) => {
  try {
    // valid username, password
    const { email, password } = req.body;
    const getPasswords = await authService.getPassword(email);
    const response = await comparePassword(password, getPasswords || '');
    if (!response) throw new ApiError('Passwords do not match', 'Passwords do not match', 400);
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_JWT_SECRET || '', { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_JWT_SECRET || '', { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
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
