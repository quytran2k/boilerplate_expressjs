import express from 'express';
import { dataSource } from '../../../configs/database/ormconfig';
import { handleExceptionResponse } from '../../../utils/system';
import { UserService } from './user.service';
const UserController = express.Router();
const controller = [UserController];
const prefix = 'user';

const userService = new UserService(dataSource);
UserController.get('', async (req, res) => {
  try {
    const response = await userService.findAllUsers();
    res.json(response);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

export { controller, prefix };
