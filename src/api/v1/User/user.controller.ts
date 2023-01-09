import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ApiError } from '../../../utils/ApiError';
import { comparePassword, hashPassword } from '../../../utils/encryption';
import { handleExceptionResponse } from '../../../utils/system';
import { UserService } from './user.service';
const UserController = express.Router();
const controller = [UserController];
const prefix = 'users';
const userService = new UserService();

UserController.get('', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const response = await userService.findAllUsers();
    res.json(response);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

UserController.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // valid username, password missing
    const generatePassword = await hashPassword(password);

    if (!generatePassword) throw new ApiError('Can not hash password', 'Hash password fail', 400);

    await userService.newUser({ name: 'qt', email, password: generatePassword });

    res.json('success');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

UserController.post('/login', async (req, res) => {
  try {
    // valid username, password
    const { email, password } = req.body;
    const getPasswords = await userService.getPassword(email);
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

UserController.post('/refresh', async (req, res) => {
  try {
    res.json('refreshToken');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});
export { controller, prefix };
