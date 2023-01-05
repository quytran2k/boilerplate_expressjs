import express from 'express';
import { ApiError } from '../../../utils/ApiError';
import { comparePassword, hashPassword } from '../../../utils/encryption';
import { handleExceptionResponse } from '../../../utils/system';
import { UserService } from './user.service';
const UserController = express.Router();
const controller = [UserController];
const prefix = 'users';
const userService = new UserService();

UserController.get('', async (req, res) => {
  try {
    const response = await userService.findAllUsers();
    res.json(response);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

UserController.post('/sign-up', async (req, res) => {
  try {
    // valid username, password
    const { email, password } = req.body;
    const hashPasswords = await hashPassword(password);
    if (!hashPasswords) throw new ApiError('Can not hash password', 'Hash password fail', 400);
    await userService.signUpUser({ name: 'qt', email, password: hashPasswords });
    res.json('success');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

UserController.post('/log-in', async (req, res) => {
  try {
    // valid username, password
    const { email, password } = req.body;
    const getPasswords = await userService.getPassword(email);
    const response = await comparePassword(password, getPasswords || '');
    res.json(response);
    console.log(response);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});
export { controller, prefix };
