import express from 'express';
import { handleExceptionResponse } from '../../../utils/system';

const UserController = express.Router();
const controller = [UserController];
const prefix = 'user';

UserController.get('', async (req, res) => {
  try {
    res.json(123);
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

export { controller, prefix };
