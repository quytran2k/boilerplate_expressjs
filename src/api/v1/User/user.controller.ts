import express from 'express';
import { tokenCheck } from '../../../middlewares/passport';
import { handleExceptionResponse } from '../../../utils/system';
import { UserService } from './user.service';
const UserController = express.Router();
const controller = [UserController];
const prefix = 'users';
const userService = new UserService();

UserController.get('', tokenCheck, async (req, res) => {
  try {
    const response = await userService.findAllUsers();
    res.json(response);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

export { controller, prefix };
