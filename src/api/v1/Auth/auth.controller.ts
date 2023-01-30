import express from 'express';
import { validate } from '../../../middlewares/validate';
import { ApiError } from '../../../utils/ApiError';
import { comparePassword } from '../../../utils/encryption';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../../utils/jwt_service';
import { handleExceptionResponse } from '../../../utils/system';
import { authValidation } from '../../../validations';
import checkUserExist from '../utils/checkUserExist';
import { AuthService } from './auth.service';
import { payloadUser } from './interface/user.interface';
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

    const accessToken = await signAccessToken(email);
    const refreshToken = await signRefreshToken(email);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await authService.assignTokenUser(userExist.id, refreshToken as string);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

AuthController.post('/refresh', async (req, res) => {
  try {
    const [scheme, token] = req.headers['authorization']?.split(' ') || [];
    const refreshToken = req.cookies['jwt'];
    const refreshTokenUser = await authService.findRefreshTokenUser(refreshToken);

    if (refreshToken !== refreshTokenUser.refreshToken || !token) {
      throw new ApiError('', 'Token is invalid');
    }

    const tokenDetail = await verifyRefreshToken(refreshToken);
    const tokenUser = tokenDetail as payloadUser;
    const accessToken = await signAccessToken(tokenUser.email);

    res.json({ accessToken });
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});

AuthController.post('/logout', async (req, res) => {
  try {
    res.clearCookie('jwt');
    res.json('Logged out');
  } catch (err) {
    handleExceptionResponse(res, err);
  }
});
export { controller, prefix };
