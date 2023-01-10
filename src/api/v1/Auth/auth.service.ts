import { ApiError } from '../../../utils/ApiError';
import logger from '../../../utils/winston';
import { userRepository } from '../User/user.repository';
import { newUser } from './interface/user.interface';

export class AuthService {
  async getPassword(email: string) {
    // Check exist email
    const isExist = await userRepository.findOneBy({ email });
    if (!isExist)
      // Error
      logger.error(`User ${email} does not exist`);
    return isExist?.password;
  }

  async newUser(user: newUser) {
    try {
      console.log(456);
      await userRepository.save({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } catch (err: unknown) {
      console.log(123);
      return new ApiError('Can not create new user', 'Error creating new user', 400);
    }
  }
}
