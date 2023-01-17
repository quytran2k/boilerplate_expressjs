import { dataSource } from '../../../configs/database/ormconfig';
import { UserToken } from '../../../entities/UserToken.entity';
import { ApiError } from '../../../utils/ApiError';
import { hashPassword } from '../../../utils/encryption';
import logger from '../../../utils/winston';
import { userRepository } from '../User/user.repository';
import checkUserExist from '../utils/checkUserExist';
import { newUser } from './interface/user.interface';

export class AuthService {
  async getPassword(email: string) {
    try {
      // Check exist email
      const userExist = await checkUserExist({ email });
      if (!userExist)
        // Error
        logger.error(`User ${email} does not exist`);

      return userExist?.password;
    } catch (err) {
      throw new ApiError('Invalid password', 'Invalid password', 400);
    }
  }

  async signUpUser(user: newUser) {
    try {
      const generateHashPassword = await hashPassword(user.password);
      const { id, name, email, password } = await userRepository.save({
        name: user.name,
        email: user.email,
        password: generateHashPassword,
      });

      return { id, name, email, password };
    } catch (err: unknown) {
      throw new ApiError('Can not sign up new user', 'Error sign up new user', 400);
    }
  }

  async assignTokenUser(userId = 0, refreshToken: string) {
    try {
      const userTokenRepository = dataSource.getRepository(UserToken);
      const userTokenExist = await userTokenRepository.findOneBy({ user: { id: userId } });
      if (!userTokenExist) await userTokenRepository.save({ refreshToken, user: { id: userId } });
      await userTokenRepository.save({ ...userTokenExist, refreshToken, mes: 123 });
    } catch (err) {
      throw new ApiError('', 'Can not assign token user', 400);
    }
  }
}
