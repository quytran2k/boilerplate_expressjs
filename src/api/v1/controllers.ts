import * as AuthController from './Auth/auth.controller';
import * as UserController from './User/user.controller';

const prefixVersion = 'api/v1';
const apiControllers = [AuthController, UserController];

export { prefixVersion, apiControllers };
